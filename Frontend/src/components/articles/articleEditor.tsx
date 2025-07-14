import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { TINYMCE_API_KEY } from '@/constants/APIs';

type ArticleEditorProps = {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const ArticleEditor = ({ name, value, onChange }: ArticleEditorProps) => {
    const [editorContent, setEditorContent] = useState(value);

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
        onChange({
            target: { name, value: content },
        });
    };

    return (
        <Editor
            apiKey={TINYMCE_API_KEY}
            value={editorContent}
            name={name}
            onEditorChange={handleEditorChange}
            init={{
                height: 650,
                menubar: false,
                plugins: [
                    'link',
                    'table',
                    'lists',
                    'code',
                    'fullscreen',
                    'preview',
                    'emoticons',
                    'advlist',
                    'autolink',
                    'lists',
                    'formatpainter',
                ],
                toolbar:
                    'undo redo | formatselect fontsizeselect | ' +
                    'bold italic underline strikethrough forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | table | link | code | fullscreen preview emoticons',
                toolbar_mode: 'floating',
                branding: false,
                formats: {
                    bold: { inline: 'strong' },
                    italic: { inline: 'em' },
                    underline: { inline: 'u' },
                    strikethrough: { inline: 'strike' },
                },
                fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt',
            }}
        />
    );
};

export default ArticleEditor;
