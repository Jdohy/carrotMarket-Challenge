import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
      query: { id },
      session: { user },
    } = req;
    const tweet = await db.twit.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            like: true,
          },
        },
      },
    });

    const isLiked = Boolean(
      await db.like.findFirst({
        where: {
          twitId: tweet?.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );

    res.json({ ok: true, tweet, isLiked });
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
