import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Article } from '@/types/article';

type CardAvatarProps = {
    icon: React.ReactNode;
};

const CardAvatar = ({ icon }: CardAvatarProps) => {
    return <div className='flex items-center space-x-2'>{icon}</div>;
};

const ArticleCard = ({ avataricon, title, content, author }: Article) => {
    return (
        <Card>
            <CardHeader>
                <CardAvatar icon={avataricon} />
                <CardTitle>{title}</CardTitle>
                <CardDescription>{author}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardAction>
                <button className='text-blue-500'>Read more</button>
            </CardAction>
        </Card>
    );
};

export default ArticleCard;
