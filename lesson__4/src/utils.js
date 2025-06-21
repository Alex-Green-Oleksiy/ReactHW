export const isNumberUsed = (number, playerNumbers) =>
    playerNumbers[0].includes(number) || playerNumbers[1].includes(number);

export const getError = (value, playerNumbers) => {
    if (!value) return '';
    const number = parseInt(value);
    if (isNaN(number)) return 'Введіть цифру';
    if (isNumberUsed(number, playerNumbers)) return 'Це число вже було введене!';
    return '';
};
