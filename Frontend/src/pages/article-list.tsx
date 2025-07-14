import useArticles from '@/hooks/articles/useArticles';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorAlert from '@/components/commons/error-alert';
import ArticleCard from '@/components/articles/card';
import NotFoundAlert from '@/components/commons/not-found-alert';

const ArticleList = () => {
    const { data: articles, isLoading, error } = useArticles();

    if (isLoading) {
        // here we gonna use selekelaton
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
        // handle error state
        return <ErrorAlert />;
    }

    return articles?.length ? (
        articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
        ))
    ) : (
        <NotFoundAlert />
    );
};

export default ArticleList;
