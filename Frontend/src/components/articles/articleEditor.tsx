import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { TINYMCE_API_KEY } from "@/constants/APIs";

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
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'emoticons',
        ],
        toolbar:
          'undo redo | bold italic underline strikethrough | ' +
          'alignleft aligncenter alignright alignjustify | formatselect fontsizeselect' +
          'bullist numlist table outdent indent | link image | code | fullscreen | preview | ' +
          'forecolor backcolor emoticons',
        toolbar_mode: 'floating',
        content_style: 'body { font-family:Arial,sans-serif; font-size:14px; }',
        branding: false,
      }}
    />
  );
};

export default ArticleEditor;
