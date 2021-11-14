import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../util/Firebase";

export async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    const doc = await db.doc(`account/${data.phone}`).get();
    if (doc.exists) {
      return res.status(200).json({ data: doc.data() });
    } else {
      return res.status(401).json({});
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleLoginRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handleLogin(req, res);
  } else {
    return;
  }
}