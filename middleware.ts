import { clerkMiddleware, authMiddleware } from '@clerk/nextjs/server'

// export default clerkMiddleware({})

export default authMiddleware({
	publicRoutes: ['/', '/api/webhooks(.*)', '/api/uploadthing', '/:username']
})

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}
