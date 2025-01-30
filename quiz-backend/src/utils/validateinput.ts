import { z } from "zod";

export const validateQuizInput = (input: any) => {
  const schema = z.object({
    title: z.string(),
    questions: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
      })
    ),
    userId: z.string(),
  });

  return schema.parse(input);
};
