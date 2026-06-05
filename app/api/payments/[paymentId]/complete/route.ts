import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ paymentId: string }> }
) {
  try {
    const { paymentId } = await context.params;
    const body = await request.json();
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txid: body.txid }),
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to complete payment" }, { status: 500 });
  }
}
