import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { paymentId: string } }) {
  try {
    const response = await fetch(
      `https://api.testnet.minepi.com/v2/payments/${params.paymentId}/approve`,
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
