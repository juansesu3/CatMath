import { IUser, User } from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next'
import { isAdminRequest } from './auth/[...nextauth]';
import { mongooseConnect } from '@/lib/mongoose';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await mongooseConnect();
  await isAdminRequest(req, res);
  const session = await getSession({ req });


  const authenticatedUserEmail = session?.user?.email;

  const { method } = req;

  if (method === 'GET') {
    try {
      // Aquí puedes usar el correo electrónico del usuario autenticado para obtener su información
      const user = await User.findOne({ email: authenticatedUserEmail });
      res.json(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  
  if (method === 'PUT') {
    try {
      // Obtén el ID del usuario desde la consulta
      const userId = req.query.id;
      // Obtén los datos enviados desde el frontend en el cuerpo de la solicitud
      const { points, currentLevel } = req.body;
      // Actualiza los datos del usuario
      const updatedUser = await User.updateOne(
        { _id: userId },
        { points, currentLevel },
         // Devuelve el documento actualizado
      );
      res.json(true);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  if(method === 'POST'){
    
  }
   
  };
  
  
  export default handler;