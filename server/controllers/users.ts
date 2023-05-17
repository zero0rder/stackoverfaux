import { /*Prisma,*/ PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id }: { id?: string } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: id },
    // select: { //=> choose a subset of relation fields to return
    //     name: true,
    //     questions: {
    //         select: {
    //             title: true
    //         }
    //     }
    // }
  });
  res.json(user);
};

export const getUserDetails = async (req: Request, res: Response) => {
  const { id }: { id?: string } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      answers: true,
    },
  });

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await prisma.user.create({ data: { ...userData } });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({ where: { id: id } });
  res.json(user);
};
