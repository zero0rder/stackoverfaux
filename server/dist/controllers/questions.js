import { seedQuestions } from '../utils/seedQuestions.js';
// const prisma = new PrismaClient()
export const getAllQuestions = async (_, res) => {
    // const questions = await prisma.question.findMany()
    res.json(seedQuestions);
};
export const getQuestion = async () => {
    // const { id }: { id?: string } = req.params
    // const question = await prisma.question.findUnique({ where: { id: id } })
    // console.log(question, id)
    // res.json(question)
};
export const createQuestion = async () => {
    // const query = req.body
    // const user = await prisma.question.create({ data: {...query} })
    // res.json(user)
};
export const deleteQuestion = async () => {
    // const { id } = req.params
    // const user = await prisma.question.delete({ where: {id: id} })
    // res.json(user)
};
export const getUserQuestions = async () => {
    // const { id }: { id?: string } = req.params
    // const questions = await prisma.question.findMany({ where: { userId: id } })
    // res.json(questions)
};
//# sourceMappingURL=questions.js.map