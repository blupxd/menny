export const updateMenu = async (
  params: any,
  categories: any,
  theme: any,
  columns: number,
  menuType: string,
  menuName: string
) => {
  try {
    // Loop through each category and its items to upload images first
    const categoriesWithImageURLs = await Promise.all(
      categories.map(async (category: any) => {
        const updatedItems = await Promise.all(
          category.items.map(async (item: any) => {
            if (item.image && item.image instanceof File) {
              const newUrl = await uploadImage(item.image);
              return {
                ...item,
                image: newUrl, // Replace the image file with the uploaded URL
              };
            }
            return item; // If no image upload is needed, return the item as is
          })
        );

        return {
          ...category,
          items: updatedItems, // Replace the items with updated image URLs
        };
      })
    );

    // After images are uploaded, proceed with the PATCH request
    const response = await fetch(`/api/menu/${params.menuId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: categoriesWithImageURLs,
        theme,
        menuType,
        columns,
        menuName,
      }), // Send the updated categories
    });

    if (!response.ok) return false;
    return true;
  } catch (error: any) {
    console.error(error.message);
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
