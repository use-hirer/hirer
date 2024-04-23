import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  let body = Object.fromEntries(data);

  // Print name of file from request
  console.log(body);

  return NextResponse.json(body);
}
