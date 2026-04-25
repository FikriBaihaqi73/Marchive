import { defineMiddleware } from 'astro:middleware';
import { verifyToken } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;

  // Protect all /admin routes
  if (url.pathname.startsWith('/admin')) {
    // Exception for login page (though login usually isn't under /admin, we check just in case)
    if (url.pathname === '/login') {
      return next();
    }

    const token = cookies.get('marchive_auth_token')?.value;

    if (!token) {
      return redirect('/login');
    }

    const payload = await verifyToken(token);
    if (!payload) {
      // Token invalid or expired
      cookies.delete('marchive_auth_token', { path: '/' });
      return redirect('/login');
    }

    // Attach user info to locals if needed
    context.locals.user = payload as any;
  }

  return next();
});
