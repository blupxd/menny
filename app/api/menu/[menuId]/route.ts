import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Item {
  id: string;
  itemName: string;
  itemDescription: string;
  price: string;
  image: string;
}

export async function GET(req: NextRequest, { params }: any) {
  try {
    const { menuId } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ensure that the user owns the menu
    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'asc', // Order by creation date (ascending)
      },
      include: {
        categories: {
          include: {
            items: true, // Include the related items in the result
          },
          orderBy:{
            createdAt: 'desc'
          }
        },
      },
    });

    if (!menu) {
      return NextResponse.json(
        {
          message: "User doesn't have this menu in their account!",
        },
        { status: 403 }
      );
    }

    // Return the menu name along with categories and items
    return NextResponse.json(
      {
        menuName: menu.menuName,
        categories: menu.categories,
        theme: menu.theme, // Include theme in the response
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// PATCH method to update menu, categories, and items
export async function PATCH(req: NextRequest, { params }: any) {
  try {
    const { menuId } = params;
    const body = await req.json();
    const { categories, theme, columns } = body;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ensure that the user owns the menu
    const userHasMenu = await db.menu.findFirst({
      where: {
        id: menuId,
        userId: session.user.id,
      },
      include: {
        categories: {
          include: {
            items: true, // Include items in the query
          },
        },
      },
    });

    if (!userHasMenu) {
      return NextResponse.json(
        {
          message: "User doesn't have this menu in their account!",
        },
        { status: 403 }
      );
    }

    // Update menu with theme and columns
    await db.menu.update({
      where: { id: menuId },
      data: {
        theme: theme || userHasMenu.theme, // Update theme if provided
      },
    });

    // First, delete categories and items that are not in the updated list
    const existingCategoryIds = userHasMenu.categories.map((cat) => cat.id);
    const incomingCategoryNames = categories.map(
      (cat: any) => cat.categoryName
    );

    // Delete categories that are not in the incoming categories
    await db.category.deleteMany({
      where: {
        id: {
          in: existingCategoryIds.filter(
            (id) =>
              !incomingCategoryNames.includes(
                userHasMenu.categories.find((cat) => cat.id === id)?.categoryName
              )
          ),
        },
      },
    });

    // Loop through incoming categories to upsert or delete items
    await Promise.all(
      categories.map(async (category: any) => {
        // Find existing category
        const existingCategory = await db.category.findFirst({
          where: { categoryName: category.categoryName, menuId },
          include: { items: true }, // Include items to check for deletions
        });
        if (existingCategory) {
          // Update category and its items
          const existingItemIds = existingCategory.items.map((item) => item.id);
          const incomingItemIds = category.items.map((item: Item) => item.id);

          // Delete items that are no longer in the updated list
          await db.item.deleteMany({
            where: {
              id: {
                in: existingItemIds.filter(
                  (id) => !incomingItemIds.includes(id)
                ),
              },
            },
          });
          console.log(category)
          // Upsert items (update existing or create new)
          await db.category.update({
            where: { id: existingCategory.id },
            data: {
              categoryName: category.categoryName,
              columns: columns || existingCategory.columns, // Update columns at category level
              items: {
                upsert: category.items.map((item: Item) => ({
                  where: { id: item.id ?? "" }, // Use `id` for updates, skip if no `id`
                  update: {
                    itemName: item.itemName,
                    itemDescription: item.itemDescription,
                    price: item.price,
                    image: item.image,
                  },
                  create: {
                    itemName: item.itemName,
                    itemDescription: item.itemDescription,
                    price: item.price,
                    image: item.image,
                  },
                })),
              },
            },
          });
        } else {
          // Create new category and items
          await db.category.create({
            data: {
              categoryName: category.categoryName,
              columns: columns || 2, // Use default columns if not provided
              menu: { connect: { id: menuId } },
              items: {
                create: category.items.map((item: Item) => ({
                  itemName: item.itemName,
                  itemDescription: item.itemDescription,
                  price: item.price,
                  image: item.image,
                })),
              },
            },
          });
        }
      })
    );

    return NextResponse.json(
      { message: "Menu updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
