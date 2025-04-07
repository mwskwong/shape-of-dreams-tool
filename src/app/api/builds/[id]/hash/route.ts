import { status } from "http-status";
import { NextResponse } from "next/server";

import { hashIds } from "@/lib/utils";

export const GET = async (
  _: unknown,
  { params }: { params: Promise<{ id: string }> },
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
