import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ErrorAlertProps = {
    title?: string;
    description?: string;
    userMessage?: string[];
};

const ErrorAlert = ({ title, description, userMessage }: ErrorAlertProps) => {
    return (
        <Alert variant='destructive'>
            <AlertCircleIcon />
            <AlertTitle>{title || 'An error occurred'}</AlertTitle>
            <AlertDescription>
                <p>
                    {description ||
                        'Something went wrong while processing your request.'}
                </p>
                <ul className='list-inside list-disc text-sm'>
                    {userMessage?.length
                        ? userMessage.map((msg, index) => (
                              <li key={index}>{msg}</li>
                          ))
                        : 'Please try again later.'}
                </ul>
            </AlertDescription>
        </Alert>
    );
};

export default ErrorAlert;
