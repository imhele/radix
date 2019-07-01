import 'jest';
import { changeRadix, defaultCharMap } from './index';

describe('Test for `index.ts`', () => {
  it('API exists', () => {
    expect(changeRadix).toBeTruthy();
    expect(defaultCharMap).toBeTruthy();
  });

  it('Basic test', () => {
    expect(changeRadix(2, { toRadix: 2 })).toBe('10');
    expect(changeRadix(0)).toBe('0');
  });

  it('Test changRadix', () => {
    const toRadix = Math.floor(Math.random() * 34 + 2);
    const fromRadix = Math.floor(Math.random() * 34 + 2);
    const testNum = Math.floor(Math.random() * Math.pow(10, 16));
    expect(changeRadix(testNum.toString(fromRadix), { fromRadix, toRadix })).toBe(
      testNum.toString(toRadix),
    );
    expect(changeRadix(`-${testNum.toString(fromRadix)}`, { fromRadix, toRadix })).toBe(
      `-${testNum.toString(toRadix)}`,
    );
  });

  it('Throw error', () => {
    expect(() => {
      changeRadix('1.1');
    }).toThrowError();
  });
});
