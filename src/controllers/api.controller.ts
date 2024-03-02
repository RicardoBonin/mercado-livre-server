import { Request, Response } from 'express';

export const findAll = async (req: Request, res: Response) => {
  try {
    res.send({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    }
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    res.status(201).send({ message: 'Success' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    }
  }
};
