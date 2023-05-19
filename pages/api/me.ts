import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.session.user) {
      return res.status(401).json({ ok: false });
    }
    const profile = await db.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });

    res.json({ ok: true, profile });
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
