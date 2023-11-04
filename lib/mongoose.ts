import mongoose from 'mongoose';

export const mongooseConnect = () => {
    // Verificar si ya existe una conexión.
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    } else {
        const uri = process.env.MONGODB_URI;
        if (typeof uri === 'undefined') {
            throw new Error('The MONGODB_URI is not defined.');
        }
        return mongoose.connect(uri); // Ahora sabemos que uri es una cadena no nula.
    }
};
