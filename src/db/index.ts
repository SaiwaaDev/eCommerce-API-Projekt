import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectToDatabase = async (): Promise<void> => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI ist nicht gesetzt. Bitte in der .env-Datei hinterlegen.');
  }

  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB-Verbindung erfolgreich aufgebaut.');
};

export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('MongoDB-Verbindung sauber getrennt.');
};
