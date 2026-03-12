import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { connectToDatabase } from '#db';
import { apiRouter } from '#routes';
import { errorHandler } from '#middleware';
import { openApiSpec } from '#swagger';

const PORT = Number(process.env.PORT ?? 3000);

const app = express();

// Gemeinsame Middleware gemaess FR010.
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ message: 'API ist erreichbar' });
});

// FR023: API-Dokumentation unter /docs bereitstellen.
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/api', apiRouter);

// 404-Fallback fuer nicht vorhandene Routen.
app.use((_req, res) => {
  res.status(404).json({ error: 'Route wurde nicht gefunden.' });
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server laeuft auf http://localhost:${PORT}`);
  });
};

startServer().catch(error => {
  console.error('Serverstart fehlgeschlagen:', error);
  process.exit(1);
});
