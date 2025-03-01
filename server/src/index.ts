import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import apiRoutes from './routes/routes.ts'

const app = new Hono()

app.use(logger())
// cors
app.use(
	'/api/*',
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	})
)

app.get('/', (c) => {
	return c.text('Hello Hono!') 
})

app.route('/api', apiRoutes)

// error handling
app.onError((err, c) => {
	const status = (err as any)?.status ?? 500
	return c.json(
		{
			success: false,
			error: err.message ?? 'An unexpected error occurred',
		},
		status
	)
})

const port = 5000

serve(
	{
		fetch: app.fetch,
		port,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`)
	}
)
