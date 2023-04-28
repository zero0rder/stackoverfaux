import { /*Prisma,*/ PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export const getAllQuestions = async(_:Request, res:Response) => {
    const questions = await prisma.question.findMany()
    res.json(questions)
}

export const getQuestion = async(req:Request, res:Response) => {
    const { id }: { id?: string } = req.params
    const question = await prisma.question.findUnique({ where: { id: id } })
    console.log(question, id)
    res.json(question)
}

export const createQuestion = async(req:Request, res:Response) => {
    const query = req.body
    const user = await prisma.question.create({ data: {...query} })
    res.json(user)
}

export const deleteQuestion = async(req:Request, res:Response) => {
    const { id } = req.params
    const user = await prisma.question.delete({ where: {id: id} })
    res.json(user)
}

export const getUserQuestions = async(req:Request, res:Response) => {
    const { id }: { id?: string } = req.params
    const questions = await prisma.question.findMany({ where: { userId: id } })
    res.json(questions)
}
