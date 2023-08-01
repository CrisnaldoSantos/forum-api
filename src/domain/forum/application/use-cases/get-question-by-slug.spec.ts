import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionRespository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Get Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionRespository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRespository)
  })

  it('should be able to get a question by slug', async () => {
    const slugTest = 'example-question'

    const newQuestion = makeQuestion({
      slug: Slug.create(slugTest),
    })

    inMemoryQuestionRespository.create(newQuestion)

    const { question } = await sut.execute({
      slug: slugTest,
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual(slugTest)
  })
})
