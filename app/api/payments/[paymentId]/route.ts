import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await context.params;
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get payment" }, { status: 500 });
  }
}
