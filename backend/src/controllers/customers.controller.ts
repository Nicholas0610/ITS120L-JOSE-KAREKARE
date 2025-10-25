import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const listCustomers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(users);
};

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

export const createCustomer = async (req: Request, res: Response) => {
  const { name, email, contactNumber, userType } = req.body;
  const user = await prisma.user.create({ data: { name, email, contactNumber, userType: userType || 'customer' } });
  res.status(201).json(user);
};

export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await prisma.user.update({ where: { id }, data });
    res.json(user);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id } });
  res.json({ success: true });
};