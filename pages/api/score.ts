import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from 'next';
import { IUser, User } from "@/models/user";

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


async function updateUserPoints(id: string, points: number) {
    // Buscar y actualizar el documento del usuario.
    const user = await User.findByIdAndUpdate(id, { $inc: { points: points } }, { new: true });
    return user;
}
const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    await mongooseConnect();
    await isAdminRequest(req, res); // Make sure this function also uses TypeScript for proper type checking.

    const { method } = req;

    switch (method) {
        case "GET":
            const user = req.query.id ? await User.findById(req.query.id).select("points currentLevel correctAnswers") : null;
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
            break;

        case "PUT":
            const { id } = req.query;
            const { points } = req.body; // Captura los puntos desde el cuerpo de la solicitud.
            if (id && points !== undefined) {
                const updatedUser = await updateUserPoints(id, points);
                res.status(200).json(updatedUser);
            } else {
                res.status(400).json({ message: 'Bad Request: Missing id or points' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default handler;