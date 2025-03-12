import dotenv from 'dotenv'
import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

dotenv.config()

const serviceAccountPath = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

const admin = initializeApp({
	credential: cert(serviceAccountPath),
})

const auth = getAuth(admin)

export { admin, auth }
