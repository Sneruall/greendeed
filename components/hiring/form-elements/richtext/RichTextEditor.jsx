import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { render } from 'react-dom';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
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
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
    this.editor = React.createRef();
  }

  handleChange = (content, delta, source, editor) => {
    this.setState({ value: editor.getHTML() });
    console.log(editor.getHTML());
  };

  render() {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: this.state.value }} />
        <QuillNoSSRWrapper
          ref={this.editor}
          onChange={this.handleChange}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </>
    );
  }
}
export default RichTextEditor;
