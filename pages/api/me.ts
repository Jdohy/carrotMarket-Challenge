import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ ok: false });
    }

    async function handler(req: NextApiRequest, res: NextApiResponse) {
      const profile = await db.user.findUnique({
        where: {
          id: req.session.user?.id,
        },
      });

      res.json({ ok: true, profile });
    }

    handler(req, res);
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
