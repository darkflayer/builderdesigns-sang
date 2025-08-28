import type { NextApiRequest, NextApiResponse } from "next";
import type { DemoResponse } from "@shared/api";

export default function handler(_req: NextApiRequest, res: NextApiResponse<DemoResponse>) {
  const response: DemoResponse = { message: "Hello from Next.js API" };
  res.status(200).json(response);
}
