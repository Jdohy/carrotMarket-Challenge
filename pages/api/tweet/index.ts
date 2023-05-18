import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      const tweets = await db.twit.findMany({
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

      res.json({
        ok: true,
        tweets,
      });
    }

    if (req.method === "POST") {
      const {
        body: { tweet },
        session: { user },
      } = req;

      await db.twit.create({
        data: {
          text: tweet,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });

      res.json({
        ok: true,
      });
    }
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
