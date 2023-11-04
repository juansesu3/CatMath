import { NextApiRequest, NextApiResponse } from 'next';
import { mongooseConnect } from "@/lib/mongoose";
import { User, IUser } from "@/models/user";
import bcrypt from "bcryptjs";
import { isAdminRequest } from "./auth/[...nextauth]";

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        name?: string;
        email?: string;
        password?: string;
        image?: string;
    };
    query: {
        id?: string;
    };
}

// Separate the logic into smaller functions
async function getUserById(id: string) {
    return await User.findOne({ _id: id });
}

async function getAllUsers() {
    return await User.find();
}

async function createUser(data: IUser) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({
        ...data,
        password: hashedPassword,
    });
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    await mongooseConnect();
    await isAdminRequest(req, res); // Make sure this function also uses TypeScript for proper type checking.

    try {
        const { method } = req;

        switch (method) {
            case "GET":
                const user = req.query.id ? await getUserById(req.query.id) : await getAllUsers();
                res.json(user);
                break;

            case "POST":
                if (!req.body.name || !req.body.email || !req.body.password || !req.body.image) {
                    res.status(400).json({ message: 'Missing fields' });
                    return;
                }
                const userDoc = await createUser(req.body as IUser);
                res.status(201).json(userDoc);
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export default handler;
