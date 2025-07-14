import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ErrorAlert = () => {
    return (
        <Alert variant='destructive'>
            <AlertCircleIcon />
            <AlertTitle>
                Unable to process your fetch article operation.
            </AlertTitle>
            <AlertDescription>
                <p>
                    Please verify on the following points related to your
                    article operation and try again.
                </p>
                <ul className='list-inside list-disc text-sm'>
                    <li>Check your network connection</li>
                    <li>Ensure the article exists</li>
                </ul>
            </AlertDescription>
        </Alert>
    );
};

export default ErrorAlert;
