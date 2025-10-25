import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const listComplaints = async (_req: Request, res: Response) => {
  const complaints = await prisma.complaint.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
  res.json(complaints);
};

export const createComplaint = async (req: Request, res: Response) => {
  const { userId, issue, details } = req.body;
  const complaint = await prisma.complaint.create({ data: { userId, issue, details, status: 'Open' } });
  res.status(201).json(complaint);
};

export const updateComplaintStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const complaint = await prisma.complaint.update({ where: { id }, data: { status } });
    res.json(complaint);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};