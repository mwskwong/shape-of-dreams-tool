import { status } from "http-status";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { nonEmpty, object, pipe, safeParse, string } from "valibot";

const requestSchema = object({
  tag: pipe(string(), nonEmpty()),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { success, output, issues } = safeParse(requestSchema, body);

  if (!success) {
    return NextResponse.json(
      { status: "error", message: status[status.BAD_REQUEST], data: issues },
      { status: status.BAD_REQUEST },
    );
  }

  revalidateTag(output.tag);

  return NextResponse.json(
    { status: "success", message: status[status.OK], data: {} },
    { status: status.OK },
  );
};
