import { PrismaClient /*,Prisma*/ } from "@prisma/client";
import { formatUsers } from "../utils/format";
import { seedQuestions } from "../utils/seedQuestions";
const prisma = new PrismaClient();

const userSeed: any[] = formatUsers(seedQuestions);

async function main() {
  console.log(`Start seeding ...`);

  const addUsersRes = await prisma.user.createMany({
    data: userSeed.map((user) => ({ ...user, id: user.id.toString() })),
    skipDuplicates: true,
  });

  const addQuestionsRes = await prisma.question.createMany({
    data: seedQuestions.map<any>((question) => {
      return {
        id: question.id.toString(),
        userId: question.user.id.toString(),
        title: question.title,
        body: question.body,
      };
    }),
    skipDuplicates: true,
  });

  type AnsType = {
    id: string;
    body: string;
    score: number;
    userId: string;
    questionId: string;
  };

  function handleAnswers(): any[] {
    const res: AnsType[] = [];
    seedQuestions.forEach((question) => {
      if (question.answers.length) {
        question.answers.forEach((answer) => {
          const data = {
            id: answer.id.toString(),
            body: answer.body,
            score: 0,
            userId: answer.user.id.toString(),
            questionId: question.id.toString(),
          };

          res.push(data);
        });
      }
    });

    return res;
  }

  const addAnswersRes = await prisma.answer.createMany({
    data: handleAnswers(),
    skipDuplicates: true,
  });

  console.log(`Seeding finished.`, addUsersRes, addQuestionsRes, addAnswersRes);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
