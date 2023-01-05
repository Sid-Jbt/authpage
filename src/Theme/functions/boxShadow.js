import rgba from 'src/Assets/theme/functions/rgba';
import pxToRem from 'src/Assets/theme/functions/pxToRem';

function boxShadow(offset = [], radius = [], color, opacity, inset = '') {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;
