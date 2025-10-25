import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const listOrders = async (_req: Request, res: Response) => {
  const orders = await prisma.order.findMany({ include: { items: true, customer: true }, orderBy: { createdAt: 'desc' } });
  res.json(orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true, customer: true } });
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, items } = req.body as { customerId?: string; items: { menuItemId: number; quantity: number; price: number }[] };
  const total = items.reduce((s, it) => s + it.quantity * it.price, 0);
  const order = await prisma.order.create({
    data: {
      status: 'Pending',
      total,
      customerId,
      items: { create: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity, price: i.price })) }
    },
    include: { items: true }
  });
  res.status(201).json(order);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await prisma.order.update({ where: { id }, data: { status } });
    res.json(order);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.order.update({ where: { id }, data: { status: 'Cancelled' } });
  res.json({ success: true });
};