import { Router } from 'express'

import eventRouter from '@modules/events/infra/http/routes/events.routes'
import userRouter from '@modules/users/infra/http/routes/users.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/events', eventRouter)

export default routes
