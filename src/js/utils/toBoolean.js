export default function toBoolean (input) {
  if (typeof input === 'boolean') {
    return input;
  }

  if (typeof input !== 'string') {
    return void 0;
  }

  return (input.toLowerCase() === 'true');
}