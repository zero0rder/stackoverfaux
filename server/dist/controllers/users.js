import { formatUsers } from '../utils/format.js';
import { seedQuestions } from '../utils/seedQuestions.js';
// const prisma = new PrismaClient()
export const getAllUsers = async (_, res) => {
    // const users = await prisma.user.findMany()
    res.json(formatUsers(seedQuestions));
};
export const getUser = async () => {
    // const { id }: { id?: string } = req.params
    // const user = await prisma.user.findUnique({ where: { id: id } })
    // // may want to retrieve questions, answers, comments here!
    // res.json(user)
};
export const createUser = async () => {
    // const userData = req.body
    // const user = await prisma.user.create({ data: {...userData} })
    // res.json(user)
};
export const deleteUser = async () => {
    // const { id } = req.params
    // const user = await prisma.user.delete({ where: {id: id} })
    // res.json(user)
};
//# sourceMappingURL=users.js.map