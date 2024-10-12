import { Category } from "next-auth";

export const updateMenu = async (
  params: any,
  categories: any,
  theme: any,
  columns: number,
  menuType: string,
  menuName: string
) => {
  try {
    const categoriesWithImageURLs = await Promise.all(
      categories.map(async (category: Category) => {
        const updatedItems = await Promise.all(
          category.items.map(async (item: any) => {
            if (item.image && item.image instanceof File) {
              const newUrl = await uploadImage(item.image);
              return {
                ...item,
                image: newUrl,
              };
            }
            return item;
          })
        );

        return {
          ...category,
          items: updatedItems,
        };
      })
    );

    const response = await fetch(`/api/menu/${params.menuId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: categoriesWithImageURLs,
        theme,
        menuType,
        columns,
        menuName,
      }),
    });

    if (!response.ok) return false;
    return true;
  } catch (error: unknown) {
    console.error(error);
  }
};

// Upload image to Cloudinary
export const uploadImage = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Image upload failed");

    const data = await response.json();
    return data.url; // Get the URL from the server response
  } catch (error) {
    console.error("Error uploading image:", error);
    return undefined;
  }
};

export const handleSubscription = async (
  id: string,
  productId: number,
  storeId: number
) => {
  try {
    const response = await fetch("/api/payments/subscribe", {
      method: "POST",
      body: JSON.stringify({
        userId: id,
        productId: productId,
        storeId: storeId,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to subscribe");
    }
    // Await the response to resolve the JSON data
    const { checkoutURL } = await response.json();
    // Now you can use checkoutURL
    window.open(checkoutURL, "_blank");
    console.log(checkoutURL);
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch("/api/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      return data;
    } else {
      console.error("Error updating menu", data.message);
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};
