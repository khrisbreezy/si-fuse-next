import Cookies from 'js-cookie';

const Token = (ctx) => {
    const isServer = typeof window === 'undefined';

    if (isServer && ctx) {
        return ctx.req.cookies.token;
    }

    return Cookies.get('token');
}

export default Token;