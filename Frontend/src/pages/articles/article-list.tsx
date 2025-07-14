import useArticles from '@/hooks/articles/useArticles';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorAlert from '@/components/commons/error-alert';
import NotFoundAlert from '@/components/commons/not-found-alert';
import type { Article } from '@/types/article';
import ArticleCard from '@/components/articles/card';

const ArticleList = () => {
    const { data: articles, isLoading, error } = useArticles();

    if (isLoading) {
        return (
            <>
                <div className='flex flex-col space-y-3 p-4'>
                    <Skeleton className='w-100px h-[125px] rounded-xl' />
                    <div className='space-y-2'>
                        <Skeleton className='w-100px h-4' />
                        <Skeleton className='w-100px h-4' />
                    </div>
                </div>
                <hr />
                <div className='flex flex-col space-y-3 p-4'>
                    <Skeleton className='w-100px h-[125px] rounded-xl' />
                    <div className='space-y-2'>
                        <Skeleton className='w-100px h-4' />
                        <Skeleton className='w-100px h-4' />
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <ErrorAlert
                title='Error fetching articles'
                description='There was an issue fetching the articles.'
                userMessage={[
                    'Make sure the route exists',
                    'Check your network connection',
                    'Please try again later.',
                ]}
            />
        );
    }

    return articles?.length ? (
        articles.map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
        ))
    ) : (
        <NotFoundAlert />
    );
};

export default ArticleList;
