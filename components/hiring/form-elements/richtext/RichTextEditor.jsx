import React from 'react';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = ['size', 'bold', 'italic', 'underline', 'list', 'bullet'];

function RichTextEditor({
  state,
  defaultValue = '',
  placeholder = 'Write a text here...',
}) {
  // const [value, setValue] = useState({ value: null });

  const editor = React.createRef();

  const handleChange = (content, delta, source, editor) => {
    // setValue({ value: editor.getHTML() });
    state(editor.getHTML());
  };

  return (
    <div className="my-2 bg-white">
      {/* <div dangerouslySetInnerHTML={{ __html: value.value }} /> */}
      <QuillNoSSRWrapper
        placeholder={placeholder}
        ref={editor}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        defaultValue={defaultValue}
      />
    </div>
  );
}
export default RichTextEditor;
