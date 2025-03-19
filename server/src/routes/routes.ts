import { Hono } from 'hono'

import authRoutes from './auth.ts'
import productsRoutes from './products.ts'
import categoriesRoutes from './categories.ts'
import ordersRoutes from './orders.ts'
import wishlistRoutes from './wishlist.ts'

const app = new Hono()

app.route('/', authRoutes)
app.route('/products', productsRoutes)
app.route('/categories', categoriesRoutes)
app.route('/orders', ordersRoutes)
app.route('/wishlist', wishlistRoutes)

export default app
