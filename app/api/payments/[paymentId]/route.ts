import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { paymentId: string } }) {
  try {
    const response = await fetch(
      `https://api.testnet.minepi.com/v2/payments/${params.paymentId}`,
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
