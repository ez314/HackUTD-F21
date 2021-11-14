import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../util/Firebase";

export async function handleProfileUpdate(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    let doc = await db.doc(`account/${data.phone}`).get();
    if (!doc.exists) {
      return res.status(201).json({});
    } else {
      await db.doc(`account/${data.phone}`).update({
        ...data
      });
      return res.status(200).json({ data });
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleProfileUpdateRequest(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return handleProfileUpdate(req, res);
  } else {
    return;
  }
}