import { sql } from "drizzle-orm";
import { status } from "http-status";
import { NextResponse } from "next/server";

import { builds, db } from "@/lib/db";

// Cron endpoints must be GET
export const GET = async () => {
  await db.execute(sql`VACUUM (FREEZE, ANALYZE) ${builds}`);

  return NextResponse.json(
    { status: "success", message: status[status.OK], data: {} },
    { status: status.OK },
  );
};
