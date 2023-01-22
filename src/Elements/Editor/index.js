import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorRoot = styled('div')(({ theme }) => {
  const { palette, borders, typography } = theme;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text } = palette;

  return {
    '& .ql-toolbar': {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`
    },

    '& .ql-container': {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`
    },

    '& .ql-editor': {
      '& p': {
        fontSize: size.md,
        color: text.main
      },

      '& ul li': {
        color: text.main
      }
    }
  };
});

const Editor = (props) => (
  <EditorRoot>
    <ReactQuill theme="snow" {...props} />
  </EditorRoot>
);

export default Editor;
