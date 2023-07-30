import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const content = "Nova resposta";

  const answer = answerQuestion.execute({
    questionId: "1",
    instructorId: "1",
    content,
  });

  expect(answer.content).toEqual(content);
});
