import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from 'next';

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        _id: any;
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
            console.log("filter user >> ", { user })
            user ? res.json(user) : res.status(404).json({ message: 'User not found' });
        } else {
            const users = await User.find().sort('-points');
            console.log({ users })
            res.json(users);
        }
    }

    if (method === "PUT") {
        const { points } = body;
        // console.log("Debug points server side >> ", points)
        const _id = req.body._id;
        // console.log("Debug ids server side >>>> ", _id)


        try {
            const userDoc = await User.updateOne({ _id }, { points });

            res.json(userDoc);

            if (userDoc.modifiedCount === 0) {
                return res.status(404).json({ message: 'User not found or no changes made' });
            }
            res.json({ message: "Points updated successfully" });
        } catch (error) {
            console.error("Error updating user points: ", error);
            res.status(500).json({ message: 'Error updating user points', error: error.message });
        }
    }
};

export default handler;