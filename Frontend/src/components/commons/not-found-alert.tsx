import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NotFoundAlert = () => {
    return (
        <Alert variant='default'>
            <AlertTitle>Articles or Page Not Found</AlertTitle>
            <AlertDescription>
                <p>Please verify the following points and try again.</p>
                <ul className='list-inside list-disc text-sm'>
                    <li>Check your network connection</li>
                    <li>Ensure the article exists</li>
                </ul>
            </AlertDescription>
        </Alert>
    );
};

export default NotFoundAlert;
