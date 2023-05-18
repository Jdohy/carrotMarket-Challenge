import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(401).end();
    }
    const {
      query: { id },
      session: { user },
    } = req;
    const alreadyExists = await db.like.findFirst({
      where: {
        twitId: Number(id),
        userId: user?.id,
      },
    });
    if (alreadyExists) {
      await db.like.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      await db.like.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          twit: {
            connect: {
              id: Number(id),
            },
          },
        },
      });
    }
    res.json({ ok: true });
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
