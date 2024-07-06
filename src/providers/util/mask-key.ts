export default function MaskKey(key: string): string {
  let maskedKey = '';
  for (let i = 0; i < key.length; i++) {
    if (i > 4 && i < key.length - 4) {
      maskedKey += '*';
    } else {
      maskedKey += key[i];
    }
  }

  return maskedKey;
}
