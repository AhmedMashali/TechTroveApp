import useArticle from '@/hooks/articles/useArticle';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorAlert from '@/components/commons/error-alert';
import NotFoundAlert from '@/components/commons/not-found-alert';

const ArticleView = () => {
    const { id } = useParams();
    const { data: article, isLoading, error } = useArticle(id!);

    if (isLoading) {
        return (
            <div className='flex flex-col space-y-3 p-4'>
                <Skeleton className='w-100px h-[250px] rounded-xl' />
                <div className='space-y-2'>
                    <Skeleton className='w-100px h-4' />
                    <Skeleton className='w-100px h-4' />
                </div>
            </div>
        );
    }

    if (error)
        return (
            <ErrorAlert
                title='Error fetching article'
                description='There was an issue fetching the article.'
                userMessage={[
                    'Make sure the article exists',
                    'Check your network connection',
                    'Please try again later.',
                ]}
            />
        );

    if (!article) {
        return <NotFoundAlert />;
    }

    return (
        <div className={'mx-auto max-w-6xl p-4'}>
            <h1 className='my-7 text-2xl font-bold'>{article.title}</h1>
            {/* want to display that div to get wrapping and styling */}
            <div
                className={'prose prose-lg break-words whitespace-pre-wrap'}
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    );
};

export default ArticleView;
