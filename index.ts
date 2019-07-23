export const defaultCharSet: string =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export interface ChangeRadixConfig {
  /**
   * @default
   * '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   */
  fromCharSet?: string;
  /**
   * @default
   * fromCharSet.length
   */
  fromRadix?: number;
  /**
   * @default
   * '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
   */
  toCharSet?: string;
  /**
   * @default
   * toCharSet.length
   */
  toRadix?: number;
}

function inputCharNotFound(messgae: number | string, char: string, fromCharSet: string) {
  throw new Error(`
[radix] The input message \`${messgae}\` include the char \`${char}\` \
that does not exist in char set \`${fromCharSet}\`
`);
}

function checkRadix(radix: number, charSet: string) {
  if (radix < 2 || radix > charSet.length || parseInt(radix as any, 10) !== radix)
    throw new Error(`
[radix] The radix must be an integer between \`2\` and \
\`charSet.length (${charSet.length})\`, but got \`${radix}\`
`);
}

export function changeRadix(message: number | string, config: ChangeRadixConfig = {}): string {
  let { fromCharSet = defaultCharSet, toCharSet = defaultCharSet } = config;
  const toRadix = config.toRadix || toCharSet.length;
  const fromRadix = config.fromRadix || fromCharSet.length;
  toCharSet = toCharSet.slice(0, toRadix);
  fromCharSet = fromCharSet.slice(0, fromRadix);
  checkRadix(toRadix, toCharSet);
  checkRadix(fromRadix, fromCharSet);
  const digits: number[] = [];
  let isNegative: string | false = false;
  if (typeof message === 'number') message = `${message}`;
  if (message[0] === '-') isNegative = message = message.slice(1);
  message.split('').forEach((char: string) => {
    let num = fromCharSet.indexOf(char);
    if (num === -1) inputCharNotFound(message, char, fromCharSet);
    for (let i = 0; num || i < digits.length; i++) {
      num += (digits[i] || 0) * fromRadix;
      digits[i] = num % toRadix;
      num = (num - digits[i]) / toRadix;
    }
  });
  const res = digits.reverse().map(num => toCharSet[num || 0]);
  if (!res.length) res.push(toCharSet[0]);
  if (isNegative) res.unshift('-');
  return res.join('');
}

export default changeRadix;
