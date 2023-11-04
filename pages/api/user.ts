import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from 'next';

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        name?: string;
        email?: string;
        password?: string;
        points?: number;

    };
    query: {
        id?: string;
    };
}


const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {



    await mongooseConnect();
    //await isAdminRequest(req, res);

    const { method, body, query } = req;

    if (method === "GET") {
        if (query?.id) {
            const user = await User.findOne({ _id: query.id });
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } else {
            res.json(await User.find({}));
        }
    }
    if (method === "PUT") {
        const { points } = body;

        const _id = query.id

        await User.updateOne(
            { _id },
            {
                points
            }
        );
        res.json(true);
    }
};

export default handler;