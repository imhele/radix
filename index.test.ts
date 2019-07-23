import 'jest';
import { changeRadix, defaultCharSet } from './index';

describe('Test for `index.ts`', () => {
  it('API exists', () => {
    expect(changeRadix).toBeTruthy();
    expect(defaultCharSet).toBeTruthy();
  });

  it('Basic test', () => {
    expect(changeRadix(2, { toRadix: 2 })).toBe('10');
    expect(changeRadix(0)).toBe('0');
  });

  it('Test changRadix', () => {
    const toRadix = Math.floor(Math.random() * 34 + 2);
    const fromRadix = Math.floor(Math.random() * 34 + 2);
    const testNum = Math.floor(Math.random() * Math.pow(10, 16));
    const fromStr = testNum.toString(fromRadix).toUpperCase();
    const toStr = testNum.toString(toRadix).toUpperCase();
    expect(changeRadix(fromStr, { fromRadix, toRadix })).toBe(toStr);
    expect(changeRadix(`-${fromStr}`, { fromRadix, toRadix })).toBe(`-${toStr}`);
  });

  it('Throw error', () => {
    expect(() => {
      changeRadix('1.1');
    }).toThrowError();
    expect(() => {
      changeRadix(1, { fromRadix: 1 });
    }).toThrowError();
    expect(() => {
      changeRadix(1, { fromRadix: 22.2 });
    }).toThrowError();
    expect(() => {
      changeRadix(1, { toRadix: 100, toCharSet: '012' });
    }).toThrowError();
    expect(() => {
      changeRadix('f', { fromRadix: 10 });
    }).toThrowError();
  });
});
