// api/search/route.ts

import { NextRequest, NextResponse } from 'next/server';

const BRAVE_API_KEY = process.env.BRAVE_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "web";

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const endpoints: Record<string, string> = {
    web: "https://api.search.brave.com/res/v1/web/search",
    images: "https://api.search.brave.com/res/v1/images/search",
    videos: "https://api.search.brave.com/res/v1/videos/search",
    news: "https://api.search.brave.com/res/v1/news/search",
  };

  const endpoint = endpoints[type] || endpoints.web;

  try {
    const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
      headers: {
        Accept: "application/json",
        "X-Subscription-Token": BRAVE_API_KEY ?? "",
        "User-Agent": "MyBraveSearchApp/1.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "API request failed", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Search failed", details: err.message },
      { status: 500 }
    );
  }
}
