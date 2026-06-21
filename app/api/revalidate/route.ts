import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Sanity webhook → on publish, revalidate the whole site so edits appear instantly
// (instead of waiting for the 60s ISR window). Configure the webhook to POST here
// with header `x-revalidate-secret: <SANITY_REVALIDATE_SECRET>`.
export async function POST(req: NextRequest) {
  const secret =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");

  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Bust the cache for the homepage and every case-study page in one call.
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
