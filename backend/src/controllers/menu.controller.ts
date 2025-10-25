import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const listMenu = async (_req: Request, res: Response) => {
  const items = await prisma.menuItem.findMany();
  res.json(items);
};

export const getMenuItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
};

export const createMenuItem = async (req: Request, res: Response) => {
  const data = req.body;
  const item = await prisma.menuItem.create({ data });
  res.status(201).json(item);
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const item = await prisma.menuItem.update({ where: { id }, data });
    res.json(item);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.menuItem.delete({ where: { id } });
  res.json({ success: true });
};