import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/main-layout';
import ArticleList from './pages/article-list';
import ArticleCreate from './pages/article-create';
import ArticleEdit from './pages/article-edit';
import ArticleView from './pages/article-view';
import MyArticleList from './pages/my-article-list';
import Login from './pages/auth/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Register } from './pages/auth/register';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAuthStore } from './store/auth';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} />
            <Router>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route index element={<ArticleList />} />
                        <Route path='articles' element={<ArticleList />} />
                        <Route path='my-articles' element={<MyArticleList />} />
                        <Route path='create' element={<ArticleCreate />} />
                        <Route path='edit/:id' element={<ArticleEdit />} />
                        <Route path='view/:id' element={<ArticleView />} />
                        <Route path='about' element={<div>About Page</div>} />
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        <Route path='*' element={<div>Not Found</div>} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
