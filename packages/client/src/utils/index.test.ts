import { getFirstUpper, getPriceComma } from '.';

describe('유틸', () => {
  it('금액 세자리 단위 콤마 추가', () => {
    const cases = [
      { input: 3000, output: '3,000' },
      { input: 400, output: '400' },
      { input: 4500, output: '4,500' },
      { input: 1000000, output: '1,000,000' },
      { input: 0, output: '0' },
      { input: '', output: '' },
    ];

    cases.forEach((c) => {
      expect(getPriceComma(c.input)).toBe(c.output);
    });
  });

  it('문자 첫 글자만 대문자로 변경', () => {
    const cases = [
      { input: 'tall', output: 'Tall' },
      { input: 'grande', output: 'Grande' },
      { input: '한글', output: '한글' },
      { input: '', output: '' },
    ];

    cases.forEach((c) => {
      expect(getFirstUpper(c.input)).toBe(c.output);
    });
  });
});

export {};
