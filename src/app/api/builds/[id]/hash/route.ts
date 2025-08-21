import { status } from "http-status";
import { type NextRequest, NextResponse } from "next/server";

import { hashIds } from "@/lib/utils";

export const GET = async (
  _: NextRequest,
  { params }: RouteContext<"/api/builds/[id]/hash">,
) => {
  const { id } = await params;

  return NextResponse.json(
    {
      status: "success",
      message: status[status.OK],
      data: { hashId: hashIds.encode(id) },
    },
    { status: status.OK },
  );
};
