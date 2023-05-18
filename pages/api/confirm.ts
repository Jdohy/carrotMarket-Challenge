import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(401).end();
    }

    const { email, password } = req.body;
    const loginUser = await db.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!loginUser) {
      return res.json({
        ok: false,
      });
    }

    req.session.user = {
      id: loginUser.id,
    };

    await req.session.save();

    res.json({
      ok: true,
    });
  },
  {
    cookieName: "carrotChallenge",
    password: process.env.COOKIE_PASSWORD!,
  }
);
