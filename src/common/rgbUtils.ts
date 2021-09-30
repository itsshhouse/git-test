export function rgbToHex(r: number, g: number, b: number) {
  // eslint-disable-next-line no-bitwise
  return ((r << 16) | (g << 8) | b).toString(16);
}

export function hex2rgb(a: string, opacity = 1) {
  if (a === '' || a.indexOf('rbg') !== -1) {
    return '';
  }
  a = a.substring(1);
  a = a.toLowerCase();
  const b = [];
  for (let x = 0; x < 3; x++) {
    b[0] = a.substr(x * 2, 2);
    b[3] = '0123456789abcdef';
    b[1] = b[0].substr(0, 1);
    b[2] = b[0].substr(1, 1);
    b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2]);
  }
  return `rgb(${b[20]},${b[21]},${b[22]},${opacity})`;
}
