import { Hono } from 'hono'

import authRoutes from './auth.ts'

const app = new Hono()

app.route('/', authRoutes)

export default app
