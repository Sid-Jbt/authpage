import { styled } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Typography from '../Typography';

const EditorRoot = styled('div')(({ theme, backgroundContainerColor }) => {
  const { palette, borders, typography, functions } = theme;

  const { borderRadius } = borders;
  const { size, fontWeightBold } = typography;
  const { text, dark } = palette;
  const { pxToRem } = functions;

  return {
    '& .typography': {
      color: dark.main,
      fontSize: size.sm,
      fontWeight: fontWeightBold,
      lineHeight: 2,
      marginLeft: pxToRem(6),
      '&.Mui-focused': {
        color: dark.main
      }
    },
    '& .ql-toolbar': {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`
    },

    '& .ql-container': {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
      background: backgroundContainerColor,
      height: 100
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
  <EditorRoot {...props}>
    <Typography className="typography">{props.title}</Typography>
    <ReactQuill theme="snow" {...props} />
  </EditorRoot>
);

export default Editor;
