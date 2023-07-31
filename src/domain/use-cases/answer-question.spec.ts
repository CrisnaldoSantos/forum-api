import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async (answer: Answer) => {
    // eslint-disable-next-line no-useless-return
    return
  },
}
test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const content = 'Nova resposta'

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content,
  })

  expect(answer.content).toEqual(content)
})
