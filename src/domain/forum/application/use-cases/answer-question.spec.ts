import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAanswerRespository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAanswerRespository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAanswerRespository)
  })

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAanswerRespository.items[0].id).toEqual(answer.id)
  })
})
