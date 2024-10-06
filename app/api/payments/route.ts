import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const lsUrl = "https://api.lemonsqueezy.com/v1/products";
export async function GET(req: NextRequest) {
  try {
    const response = await fetch(lsUrl, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Error: ${response.status} - ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const productData = data.data;
    return NextResponse.json({ productData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed to fetch data: ${error.message}` },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const body = await req.json()
//   const { variant_id } = body; 
//   if (!session)
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

//   try {

//   } catch (error) {}
// }
