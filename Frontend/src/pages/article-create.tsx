import { Formik, Field, Form } from 'formik';
import * as z from 'zod';
import { useCreateArticle } from '@/hooks/Articles/useCreateArticle';
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
    <div className="mx-auto p-4 max-w-6xl">
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
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 mb-4 border-0 border-b-1 border-b-gray-900 text-2xl focus:outline-none focus:border-gray-500"
              onChange={handleChange}
            />
            {errors.title && touched.title && (
              <div className="text-red-500 text-sm">{errors.title}</div>
            )}

            <ArticleEditor name="content" value={values.content} onChange={handleChange} />
            {errors.content && touched.content && (
              <div className="text-red-500 text-sm">{errors.content}</div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-black text-white rounded"
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