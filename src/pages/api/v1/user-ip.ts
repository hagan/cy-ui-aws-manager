// pages/api/user-ip.ts

import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "./types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  const xForwardedFor = req.headers["x-forwarded-for"];
  let ip: string | null = null;

  if (typeof xForwardedFor === "string") {
    // If it's a string, take the first IP address in the list
    ip = xForwardedFor.split(",")[0].trim();
  } else if (Array.isArray(xForwardedFor)) {
    // If it's an array, take the first element, and then take the first IP from it
    ip = xForwardedFor[0].split(",")[0].trim();
  } else {
    // If no x-forwarded-for header or it's in an unexpected format, fall back to other methods
    ip = req.connection?.remoteAddress || req.socket?.remoteAddress || null;
  }

  // const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || // Most accurate in proxy scenarios
  //         req.connection?.remoteAddress ||
  //         req.socket?.remoteAddress ||
  //         null;

  res.status(200).json({ ip });
}
