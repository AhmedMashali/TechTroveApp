import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { useLogin } from '@/hooks/auth/useLogin';

const schema = z.object({
    username: z
        .string()
        .min(6, 'Username must be at least 6 characters')
        .regex(/^[A-Za-z]+$/, 'Username must contain letters only'),
    password: z
        .string()
        .max(32, 'Password must be at most 32 characters')
        .min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
    const { mutateAsync: loginUser, isPending } = useLogin();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate: (values) => {
            const result = schema.safeParse(values);
            const errors: Record<string, string> = {};
            if (!result.success) {
                for (const issue of result.error.issues) {
                    const key = String(issue.path[0]);
                    errors[key] = issue.message;
                }
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await loginUser(values);
                toast.success('Logged in successfully.');
                navigate('/');
            } catch (error: any) {
                toast.error('Failed to login.');
            }
        },
    });

    return (
        <div className='flex h-full items-center justify-center'>
            <section className='flex grow items-center justify-center'>
                <Card className='w-full max-w-sm'>
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Button variant='link' className='cursor-pointer'>
                                Sign Up
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={formik.handleSubmit}
                            className='flex flex-col gap-6'
                        >
                            <div className='grid gap-2'>
                                <Label htmlFor='username'>Username</Label>
                                <Input
                                    id='username'
                                    type='text'
                                    placeholder='newuser'
                                    {...formik.getFieldProps('username')}
                                    disabled={isPending}
                                />
                                {formik.touched.username &&
                                    formik.errors.username && (
                                        <div className='text-sm text-red-500'>
                                            {formik.errors.username}
                                        </div>
                                    )}
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='••••••••'
                                    {...formik.getFieldProps('password')}
                                    disabled={isPending}
                                />
                                {formik.touched.password &&
                                    formik.errors.password && (
                                        <div className='text-sm text-red-500'>
                                            {formik.errors.password}
                                        </div>
                                    )}
                            </div>

                            {!isPending ? (
                                <Button
                                    type='submit'
                                    className='w-full cursor-pointer'
                                >
                                    Login
                                </Button>
                            ) : (
                                <Button disabled className='w-full'>
                                    <Loader2Icon className='animate-spin' />
                                    Please wait
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};
export default Login;
