import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Item {
  id?: string;
  itemName: string;
  itemDescription: string;
  price: string;
  image: string;
}

interface Category {
  id?: string;
  categoryName: string;
  items: Item[];
}

interface Params {
  menuId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const { menuId } = params;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const menu = await db.menu.findFirst({
      where: {
        id: menuId,
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        categories: {
          include: {
            items: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
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

    return NextResponse.json(
      {
        id: menu.id,
        menuName: menu.menuName,
        categories: menu.categories,
        menuType: menu.menuType,
        theme: menu.theme,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { menuId } = params;
    const body = await req.json();
    const { categories, theme, columns, menuType, menuName } = body;

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userHasMenu = await db.menu.findFirst({
      where: {
        id: menuId,
        userId: session.user.id,
      },
      include: {
        categories: {
          include: {
            items: true,
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

    await db.menu.update({
      where: { id: menuId },
      data: {
        menuName: menuName || userHasMenu.menuName,
        menuType: menuType || userHasMenu.menuType,
        theme: theme || userHasMenu.theme,
      },
    });

    const existingCategoryIds = userHasMenu.categories.map((cat) => cat.id);
    const incomingCategoryNames = categories.map(
      (cat: Category) => cat.categoryName
    );

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

    await Promise.all(
      categories.map(async (category: Category) => {
        const existingCategory = await db.category.findFirst({
          where: { categoryName: category.categoryName, menuId },
          include: { items: true },
        });

        if (existingCategory) {
          const existingItemIds = existingCategory.items.map((item) => item.id);
          const incomingItemIds = category.items.map((item: Item) => item.id);

          await db.item.deleteMany({
            where: {
              id: {
                in: existingItemIds.filter(
                  (id) => !incomingItemIds.includes(id)
                ),
              },
            },
          });

          await db.category.update({
            where: { id: existingCategory.id },
            data: {
              categoryName: category.categoryName,
              columns: columns || existingCategory.columns,
              items: {
                upsert: category.items.map((item: Item) => ({
                  where: { id: item.id ?? "" },
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
          await db.category.create({
            data: {
              categoryName: category.categoryName,
              columns: columns || 2,
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
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred!";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
