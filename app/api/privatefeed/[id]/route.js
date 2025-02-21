import { NextResponse } from "next/server";
import { fetchAccountsByUserType } from "../../db/queries";

export async function GET(request, context) {
  const { params } = await context;
  const { id } = params;

  try {
    const accounts = await fetchAccountsByUserType(id);
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.message === "User not found" ? 404 : 500 }
    );
  }
}