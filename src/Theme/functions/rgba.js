import hexToRgb from 'src/Assets/theme/functions/hexToRgb';

function rgba(color, opacity) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}

export default rgba;
