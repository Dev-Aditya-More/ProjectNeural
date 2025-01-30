import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create QuizResult
export const createQuizResult = async (
  userId: string,
  quizId: number,
  score: number,
  answers: object // Adjusted type to match the schema
) => {
  const quizResult = await prisma.quizResult.create({
    data: {
      userId,
      quizId,
      score,
      answers,
    },
  });
  return quizResult;
};

// Get QuizResults by User
export const getUserQuizResults = async (userId: string) => {
  const quizResults = await prisma.quizResult.findMany({
    where: { userId },
    include: {
      quiz: true, // Includes quiz details for the result
    },
  });
  return quizResults;
};

// Get Quiz Results for a Specific Quiz
export const getQuizResults = async (quizId: number) => {
  const quizResults = await prisma.quizResult.findMany({
    where: { quizId },
    include: {
      user: true, // Includes user details for the result
    },
  });
  return quizResults;
};

// Update QuizResult (e.g., Update Score)
export const updateQuizResult = async (quizResultId: number, newScore: number) => {
  const updatedQuizResult = await prisma.quizResult.update({
    where: { id: quizResultId },
    data: { score: newScore },
  });
  return updatedQuizResult;
};

// Delete QuizResult (if needed)
export const deleteQuizResult = async (quizResultId: number) => {
  const deletedQuizResult = await prisma.quizResult.delete({
    where: { id: quizResultId },
  });
  return deletedQuizResult;
};

// Close the Prisma Client when the process ends
process.on("SIGINT", async () => {
  await prisma.$disconnect();
});
