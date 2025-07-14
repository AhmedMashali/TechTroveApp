import { Formik, Field, Form } from 'formik';
import * as z from 'zod';
import { useCreateArticle } from '@/hooks/articles/useCreateArticle';
import ArticleEditor from '@/components/articles/articleEditor';

const articleSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
    content: z.string().min(1, 'Content is required'),
});

const ArticleCreate = () => {
    const { mutate: createArticle } = useCreateArticle();

    const handleValidation = (values: { title: string; content: string }) => {
        const result = articleSchema.safeParse(values);

        if (result.success) {
            return {};
        } else {
            const errors: { [key: string]: string } = {};
            result.error.issues.forEach((err) => {
                if (err.path.length > 0) {
                    errors[String(err.path[0])] = err.message;
                }
            });
            return errors;
        }
    };

    return (
        <div className='mx-auto max-w-6xl p-4'>
            <Formik
                initialValues={{
                    title: '',
                    content: '',
                }}
                validate={handleValidation}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    createArticle(values);
                }}
            >
                {({ errors, touched, handleChange, values }) => (
                    <Form>
                        <Field
                            type='text'
                            name='title'
                            placeholder='Title'
                            className='mb-4 w-full border-0 border-b-1 border-b-gray-900 p-2 text-2xl focus:border-gray-500 focus:outline-none'
                            onChange={handleChange}
                        />
                        {errors.title && touched.title && (
                            <div className='text-sm text-red-500'>
                                {errors.title}
                            </div>
                        )}

                        <ArticleEditor
                            name='content'
                            value={values.content}
                            onChange={handleChange}
                        />
                        {errors.content && touched.content && (
                            <div className='text-sm text-red-500'>
                                {errors.content}
                            </div>
                        )}

                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='mt-4 rounded bg-black px-4 py-2 text-white'
                            >
                                Submit Article
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ArticleCreate;
