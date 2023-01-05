function hexToRgb(color) {
  const [r, g, b] = color.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `${r},${g},${b}`;
}

export default hexToRgb;
