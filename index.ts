export const defaultCharMap: string =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export interface ChangeRadixConfig {
  /**
   * @default
   * '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   */
  fromCharMap?: string;
  /**
   * @default
   * fromCharMap.length
   */
  fromRadix?: number;
  /**
   * @default
   * '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   */
  toCharMap?: string;
  /**
   * @default
   * toCharMap.length
   */
  toRadix?: number;
}

function inputCharNotFound(messgae: number | string, char: string, fromCharMap: string) {
  throw new Error(`
[radix] The input message \`${messgae}\` include the char \`${char}\`
that does not exist in char map \`${fromCharMap}\`
`);
}

export function changeRadix(message: number | string, config: ChangeRadixConfig = {}): string {
  const { fromCharMap = defaultCharMap, toCharMap = defaultCharMap } = config;
  const fromRadix = config.fromRadix || fromCharMap.length;
  const toRadix = config.toRadix || toCharMap.length;
  const digits: number[] = [];
  let isNegative: string | false = false;
  if (typeof message === 'number') message = `${message}`;
  if (message[0] === '-') isNegative = message = message.slice(1);
  message.split('').forEach((char: string) => {
    let num = fromCharMap.indexOf(char);
    if (num === -1) inputCharNotFound(message, char, fromCharMap);
    for (let i = 0; num || i < digits.length; i++) {
      num += (digits[i] || 0) * fromRadix;
      digits[i] = num % toRadix;
      num = (num - digits[i]) / toRadix;
    }
  });
  const res = digits.reverse().map(num => toCharMap[num || 0]);
  if (!res.length) res.push(toCharMap[0]);
  if (isNegative) res.unshift('-');
  return res.join('');
}

export default changeRadix;