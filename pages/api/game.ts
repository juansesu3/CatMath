import { IUser, User } from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Obtén la información necesaria de la solicitud
      const { userId, correctAnswers, points } = req.body;
  
      // Consulta y actualiza el usuario en la base de datos
      const updatedUser: IUser | null = await User.findByIdAndUpdate(
        userId,
        {
          $inc: { correctAnswers, points }, // Incrementa las respuestas correctas y los puntos
          $set: { currentLevel: Math.floor(points / 13) + 1 }, // Actualiza el nivel basado en los puntos
        },
        { new: true } // Devuelve el usuario actualizado
      );
  
      // Verifica si el usuario se actualizó correctamente
      if (updatedUser) {
        res.status(200).json({ name: updatedUser.name });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  
  export default handler;