import { Box, styled } from '@mui/material';
import CustomBox from 'Elements/Box';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';

const DropzoneRoot = styled(Box)(({ theme, item, err }) => {
  const { palette, typography, borders } = theme;

  const { text, inputColors, white, success, error } = palette;
  const { size } = typography;
  const { borderRadius, borderWidth } = borders;

  return {
    display: 'flex',
    height: 'auto',
    minHeight: 150,
    alignItems: 'center',
    padding: 10,
    border: item
      ? `${borderWidth[1]} solid ${success.main} !important`
      : err
      ? `${borderWidth[1]} solid ${error.main} !important`
      : `${borderWidth[1]} solid ${inputColors.borderColor.main} !important`,
    borderRadius: borderRadius.md,
    backgroundColor: white.main,

    '& div': {
      display: 'flex',
      margin: item ? 'auto 0' : '0 auto !important',
      color: err ? `${error.main} !important` : `${text.main} !important`,
      fontSize: `${size.sm} !important`
    },

    '& img': {
      width: 120,
      height: 120,
      borderRadius: borderRadius.md
    }
  };
});

const CustomDropzone = ({
  setExistingFile,
  selectedFile,
  maxFiles = 1,
  multiple = false,
  validator,
  error,
  accept = { 'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.pdf'] },
  title = "Drag 'n' drop some files here, or click to select files"
}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    selectedFile(files);
  }, [files]);

  return (
    <Dropzone
      maxFiles={maxFiles}
      multiple={multiple}
      accept={accept}
      validator={validator}
      onDrop={(acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <DropzoneRoot {...getRootProps()} item={files.length || setExistingFile} err={error}>
          <div>
            <input {...getInputProps()} />
            {files.length ? (
              files.map((file) => (
                <CustomBox
                  component="img"
                  src={file.preview}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              ))
            ) : setExistingFile ? (
              <CustomBox
                component="img"
                src={setExistingFile}
                onLoad={() => {
                  URL.revokeObjectURL(setExistingFile);
                }}
              />
            ) : (
              <p>{title}</p>
            )}
          </div>
        </DropzoneRoot>
      )}
    </Dropzone>
  );
};

export default CustomDropzone;
