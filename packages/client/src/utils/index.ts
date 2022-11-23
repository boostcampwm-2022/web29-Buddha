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
