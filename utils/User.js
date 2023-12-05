import Cookies from 'js-cookie';

export const User = (ctx) => {
    const isServer = typeof window === 'undefined';

    if (isServer && ctx) {
        return ctx.req.cookies.user ? JSON.parse(ctx.req.cookies.user) : null;
    }

    return Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
}