import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('johndoe@example.com')
  })

  it('should not be able to create a new user with email already registered', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should hash user's password", async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(generateHash).toBeCalledWith('123456')
  })
})
