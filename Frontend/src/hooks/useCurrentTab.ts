import { useLocation } from 'react-router-dom';

const useCurrentTab = () => {
    const location = useLocation();

    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/' || path === '/articles') {
            return 'articles';
        } else if (path === '/about') {
            return 'about';
        } else if (path === '/my-articles') {
            return 'my-articles';
        } else if (path === '/create') {
            return 'create';
        } else if (path === '/login') {
            return 'login';
        } else if (path === '/register') {
            return 'register';
        } else {
            return 'not-found';
        }
    };

    return getActiveTab();
};

export default useCurrentTab;
