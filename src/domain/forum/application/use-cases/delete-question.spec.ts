import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionRespository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionRespository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRespository)
  })

  it('should be able to get a question by id and delete it', async () => {
    const idTest = 'question-01'
    const authorIdTest = 'author-01'

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(authorIdTest),
      },
      new UniqueEntityId(idTest),
    )

    inMemoryQuestionRespository.create(newQuestion)

    await sut.execute({
      questionId: idTest,
      authorId: authorIdTest,
    })

    expect(inMemoryQuestionRespository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const idTest = 'question-01'
    const authorIdTest = 'author-01'

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(authorIdTest),
      },
      new UniqueEntityId(idTest),
    )

    inMemoryQuestionRespository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: idTest,
        authorId: 'author-02',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
