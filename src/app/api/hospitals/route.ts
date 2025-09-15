import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

export const runtime = "nodejs";        // ensure Node, not Edge
export const dynamic = "force-dynamic"; // no caching in dev

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection("hospitals")
      .find({})
      .project({ name: 1, location: 1, hospitalId: 1 }) // <-- include hospitalId
      .toArray();

    const out = docs.map((d: { _id?: object; name?: string; location?: string; hospitalId?: string }) => ({
      _id: d?._id ? String(d._id) : undefined,
      name: d?.name ?? "",
      location: d?.location ?? "",
      hospitalId: d?.hospitalId ?? "",
    }));

    return NextResponse.json(out, { status: 200 });
  } catch (e: unknown) {
    console.error("[api/hospitals] error:", e);
    const errorMessage = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
