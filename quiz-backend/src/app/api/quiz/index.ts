import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a User
export const createUser = async (name: string, email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
};

// Create a Quiz
export const createQuiz = async (
  title: string,
  questions: object,
  topic: string,
  id: number,
  userId: string
) => {
  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions,
      topic,
      id,
      userId
    },
  });
  return quiz;
};

// Record a Quiz Result
export const recordQuizResult = async (
  userId: string,
  quizId: number,
  score: number,
  answers: object
) => {
  const result = await prisma.quizResult.create({
    data: {
      userId,
      quizId,
      score,
      answers,
    },
  });
  return result;
};

// Get all Quizzes
export const getAllQuizzes = async () => {
  const quizzes = await prisma.quiz.findMany({
    include: {
      results: true, // Includes related quiz results
    },
  });
  return quizzes;
};

// Get User Quiz Results
export const getUserQuizResults = async (userId: string) => {
  const results = await prisma.quizResult.findMany({
    where: { userId },
    include: {
      quiz: true, // Includes the quiz details
    },
  });
  return results;
};

// Close the Prisma Client on termination
process.on("SIGINT", async () => {
  await prisma.$disconnect();
});
