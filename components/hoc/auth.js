import Router, {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import nookies from 'nookies';

export const auth = Component => {

    const isServer = typeof window === 'undefined';

    const Wrapper = (props) => {
        if (!props.isLoggedIn && !isServer) {
            Router.push('/login')
        }

        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn;
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            if (!isLoggedIn) {
                nookies.set(ctx, 'redirectIntended', ctx.pathname, {});
                ctx.res.writeHead(302, {Location: '/login'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn};
    }

    return Wrapper;
}

export const withoutAuth = Component => {
    const isServer = typeof window === 'undefined';

    const Wrapper = (props) => {
        if (props.isLoggedIn && !isServer) {
            Router.push('/')
        }

        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {

        let isLoggedIn;
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            if (isLoggedIn) {
                ctx.res.writeHead(302, {Location: '/'});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn};
    }

    return Wrapper;
}

export const profileMiddleWare = Component => {
    const isServer = typeof window === 'undefined';
    const Wrapper = (props) => {
        if (props.isLoggedIn && !props.hasProfile && !isServer && props.currentPage !== '/profile/edit') {
            Router.push(props.user && JSON.parse(props.user).user_type.user_type === 'Investor' ? '/profile/edit' : '/profile/edit-levels');
        }
        return <Component {...props} />
    }

    Wrapper.getInitialProps = async (ctx) => {
        let isLoggedIn, hasProfile, currentPage, user;
        if (isServer && ctx.res) {
            isLoggedIn = !!ctx.req.cookies.token;
            user = ctx.req.cookies.user;
            console.log(user);
            hasProfile = user ? JSON.parse(user).has_profile : false;
            currentPage = ctx.pathname;
            if (isLoggedIn && !hasProfile && currentPage !== '/profile/edit-levels') {
                const location = user && JSON.parse(user).user_type.user_type === 'Investor' ? '/profile/edit' : '/profile/edit-levels';
                ctx.res.writeHead(302, {Location: location});
                ctx.res.end();
            }
        } else {
            isLoggedIn = !!Cookies.get('token');
            user = Cookies.get('user');
            hasProfile = user ? JSON.parse(user).has_profile : false;
            currentPage = ctx.pathname;
        }

        const componentProps =
            Component.getInitialProps &&
            (await Component.getInitialProps(ctx));

        return {...componentProps, isLoggedIn, hasProfile, currentPage, user};
    }

    return Wrapper;
}