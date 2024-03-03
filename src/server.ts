import express from 'express';
import dotenv from 'dotenv';

import route from './routes/items.route';

import cors from 'cors';

const app = express();

const port = process.env.PORT || 3001;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/items', route);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
