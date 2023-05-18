import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, email, password } = req.body;

  if (req.method !== "POST") {
    return res.status(401).end();
  }

  const nameExists = await db.user.findFirst({
    where: {
      name: username,
    },
  });

  const emailExists = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (nameExists || emailExists) {
    return res.json({
      ok: false,
      exists: nameExists ? "username" : "email",
    });
  }

  await db.user.create({
    data: {
      email,
      password,
      name: username,
    },
  });

  res.json({
    ok: true,
  });
}
