import { classToClass } from 'class-transformer'
import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = container.resolve(AuthenticateUserService)

  const data = await authenticateUser.execute({
    email,
    password
  })

  return response.json(classToClass(data))
})

export default sessionsRouter
