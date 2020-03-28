import {LayoutRedux} from 'containers/LayoutContainer';
import {NotFoundPage} from 'pages/NotFoundPage/NotFoundPage';
import {ProfileRedux} from "containers/ProfileContainer";

export const routes = [
    {
        path: '/',
        exact: true,
        component: LayoutRedux,
    },
    {
        path: '/profile',
        exact: true,
        component: ProfileRedux,
    },
    {
        path: '/chats/:id([\\d]+)',
        exact: true,
        component: LayoutRedux
    },
    {
        path: '*',
        exact: false,
        component: NotFoundPage,
    }
];