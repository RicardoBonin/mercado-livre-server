import { Router } from 'express';
import { findAll, findById } from '../controllers/api.controller';

const route = Router();

route.get('/', findAll);
route.get('/:id', findById);

export default route;
