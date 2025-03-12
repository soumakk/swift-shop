import { verifySessionMiddleware } from '@/lib/auth.middleware.ts'
import { ZSignupReqBody, type ISignupReqBody, type IVariables } from '@/types/auth.types.ts'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { auth } from '../lib/firebase.ts'
import prisma from '../lib/prisma.ts'

const app = new Hono<{ Variables: IVariables }>()

app.post('/login', async (ctx) => {
	try {
		// get the token from req body
		const { token } = await ctx.req.json()

		// verify the token and get the metadata
		const metadata = await auth.verifyIdToken(token)

		// find the user in db with userId
		const user = await prisma.user.findUnique({
			where: {
				id: metadata.userId,
			},
		})
		if (!user) {
			throw new HTTPException(401, {
				message: 'Login failed',
			})
		}

		// create session cookie with the token and set it to the response
		const expiresIn = 1000 * 60 * 60 * 24 * 5 // 5 days
		const sessionCookie = await auth.createSessionCookie(token, { expiresIn })
		setCookie(ctx, 'session', sessionCookie, {
			maxAge: expiresIn / 1000,
			httpOnly: true,
			secure: true,
			path: '/',
		})

		return ctx.json({ success: true, user })
	} catch (error) {
		throw new HTTPException(400, {
			message: 'Login failed',
		})
	}
})

app.get('/verify-session', async (ctx) => {
	// get the cookie from the req
	const sessionCookie = getCookie(ctx, 'session') || ''

	try {
		const metadata = await auth.verifySessionCookie(sessionCookie, true)
		return ctx.json({ metadata })
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})

app.post('/signup', zValidator('json', ZSignupReqBody), async (c) => {
	try {
		const body = (await c.req.json()) as ISignupReqBody

		// find the already existing user
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		})

		if (user) {
			throw new HTTPException(400, {
				message: 'User already exists',
			})
		}

		// create the new user
		const newUser = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				uid: body.uid,
				role: body?.role ?? 'Customer',
			},
		})

		// store role and userId in the token
		await auth.setCustomUserClaims(newUser?.uid, { role: newUser.role, userId: newUser.id })

		return c.json({ success: true })
	} catch (error) {
		console.log(error)
		throw new HTTPException(400, {
			message: 'Signup failed! Try again',
		})
	}
})

app.get('/profile', verifySessionMiddleware, async (c) => {
	try {
		const userId = c.get('userId')
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		})
		if (!user) {
			throw new HTTPException(401, {
				message: 'Unauthorized',
			})
		}
		return c.json({ data: user })
	} catch (error) {
		throw new HTTPException(401, {
			message: 'Unauthorized',
		})
	}
})

app.delete('/logout', (c) => {
	deleteCookie(c, 'session')
	return c.json({ success: true })
})

export default app
