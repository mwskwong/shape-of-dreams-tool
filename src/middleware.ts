import { status } from "http-status";
import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from "next/server";

export const middleware = (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET ?? ""}`) {
    return NextResponse.json(
      { status: "error", message: status[status.UNAUTHORIZED], data: {} },
      { status: status.UNAUTHORIZED },
    );
  }
};

export const config: MiddlewareConfig = {
  matcher: "/api/:path*",
};
