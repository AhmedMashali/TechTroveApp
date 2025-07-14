import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Article } from '@/types/article';
import sanitizeHTML from '@/utils/santizeHTML';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }: { article: Article }) => {
    const formatedDate = new Date(article.createdAt).toLocaleDateString(
        'en-US',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    );
    const formatedContent = sanitizeHTML(article.content);

    return (
        <Link to={`/articles/${article._id}`} className='no-underline'>
            <Card className='mb-4 w-full shadow-md transition-shadow duration-300 hover:shadow-lg'>
                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.author.username}</CardDescription>
                    <CardDescription className='float-end text-sm text-gray-500'>
                        {formatedDate}
                    </CardDescription>
                </CardHeader>
                <CardContent
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginRight: 16,
                    }}
                >
                    <p>{formatedContent}</p>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ArticleCard;
