/**
 * Функція для скорочення тексту до заданої максимальної довжини.
 * Якщо довжина тексту перевищує максимум, текст обрізається і до нього додається '...'.
 *
 * @param text {string} - текст для скорочення.
 * @param maxLength {number} - максимальна довжина тексту.
 * @returns {string} - скорочений текст.
 */
export const shortenText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength - 3)}...`;
  }
  return text;
};
