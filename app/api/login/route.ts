import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pi_auth_token } = body;

    const response = await fetch("https://api.testnet.minepi.com/v2/me", {
      headers: {
        Authorization: `Bearer ${pi_auth_token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    const userData = await response.json();

    return NextResponse.json({
      id: userData.uid,
      username: userData.username,
      credits_balance: 0,
      terms_accepted: true,
      app_id: process.env.NEXT_PUBLIC_PI_APP_ID || "em-87efeb2a845a2aa4",
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
