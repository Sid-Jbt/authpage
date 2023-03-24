import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import Skeleton from '@mui/material/Skeleton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '../../Elements/Button';
import Box from '../../Elements/Box';

const CropperImage = ({ src, getCroppedFile, imageType }) => {
  const cropperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const handleClick = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const img = cropper.getCroppedCanvas().toDataURL();
    // convert to file
    let mimeType = 'image/png';
    if (img.toLowerCase() !== 'png') {
      mimeType = 'image/jpeg';
    }
    const file = new File([img], 'File name', { type: mimeType });
    getCroppedFile(file, img, imageType);
  };
  const rotate = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    cropper.rotate(90);
  };
  const flip = (type) => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (type === 'h') {
      cropper.scaleX(scaleX === 1 ? -1 : 1);
      setScaleX(scaleX === 1 ? -1 : 1);
    } else {
      cropper.scaleY(scaleY === 1 ? -1 : 1);
      setScaleY(scaleY === 1 ? -1 : 1);
    }
  };
  return (
    <Box pt={2}>
      {loading && <Skeleton variant="rectangular" width="100%" height={400} />}
      <Cropper
        src={src}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={imageType === 'small' ? 1 : 16 / 9}
        guides={false}
        ready={() => {
          setLoading(false);
        }}
        ref={cropperRef}
      />
      <Box
        display="flex"
        justifyContent="flex-start"
        mt={2}
        pb={0}
        sx={{ display: 'inline-block' }}
      >
        <ButtonGroup disableElevation variant="contained">
          <Button variant="contained" color="dark" onClick={rotate} size="small">
            Rotate
          </Button>
          <Button variant="contained" color="dark" onClick={() => flip('h')} size="small">
            Flip H
          </Button>
          <Button variant="contained" color="dark" onClick={() => flip('v')} size="small">
            Flip V
          </Button>
        </ButtonGroup>
      </Box>

      <Button
        sx={{
          float: 'right',
          mt: 2
        }}
        size="small"
        onClick={() => handleClick()}
        color="dark"
        variant="contained"
      >
        Crop
      </Button>
    </Box>
  );
};

export default CropperImage;
