/**
 * 금액 세자리 단위 콤마 추가
 */
export const getPriceComma = (price: number | string) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 문자의 첫 글자만 대문자로 변경
 */
export const getFirstUpper = (text: string) => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};

/**
 * 문자열 날짜를 숫자로 변환하여 반환
 *
 * @params (string) YYYY-MM-DD
 * @returns (number) YYYYMMDD
 */
export const getDateNumber = (date: string) =>
  Number(date.slice(0, 10).replace(/-/g, ''));

/**
 * 주문 내역 날짜를 내림차순으로 정렬
 */
export const sortDateDesc = (prev: string, curr: string) => {
  if (prev === '오늘') return -1;
  return getDateNumber(curr) - getDateNumber(prev);
};
