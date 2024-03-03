import { Router } from 'express';
import { findAll, findById } from '../controllers/items.controller';

const route = Router();

route.get('/', findAll);
route.get('/:id', findById);

export default route;
