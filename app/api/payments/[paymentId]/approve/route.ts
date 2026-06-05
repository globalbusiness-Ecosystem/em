import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await context.params;
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to approve payment" }, { status: 500 });
  }
}
