// Доступні страви
export const DISHES = [
  { id: 1, name: 'Борщ', prepTime: 25 },
  { id: 2, name: 'Піца Маргарита', prepTime: 20 },
  { id: 3, name: 'Салат Цезар', prepTime: 15 },
  { id: 4, name: 'Пельмені', prepTime: 15 },
  { id: 5, name: 'Стейк з яловичини', prepTime: 30 }
];

// Назви колонок
export const COLUMNS = [
  { id: 'waiting', title: '🕒 Очікують на виконання', buttonText: 'Готувати' },
  { id: 'cooking', title: '👨‍🍳 Виконуються', buttonText: 'Готово' },
  { id: 'ready', title: '✅ Готові до виносу', buttonText: 'Подано' }
];

export default DISHES;
