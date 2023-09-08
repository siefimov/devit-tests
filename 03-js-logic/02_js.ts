/*
2. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

Пример:

const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
iterator.next() // { value: [1,2,3], done: false }
iterator.next() // { value: [4,5,6], done: false }
iterator.next() // { value: [7,8], done: false }
iterator.next() // { value: undefined, done: true }
*/

/* ******************************************************* */
// SOLUTION

// оголошуємо функцію генератор та типізуємо її параметри та результат виконання
// для оголошення функції генератора використовується синтаксис function*
// функція приймає два параметри: масив елементів та розмір частини масиву,
// яка має повертатися
function* chunkArray<T>(array: T[], chunkSize: number): Generator<T[]> {
  // Циклом for ітеруємося по масиву array з початку до кінця з кроком chunkSize.
  // Цикл дає можливість отрмати частину з масиву array розміром chunkSize на кожній ітерації.
  for (let i = 0; i < array.length; i += chunkSize) {
    // оператор yield поверає частину масиву array, починаючи з індексу i, та закінчуючи індексом i + chunkSize.
    // для отримання частини масиву заданої довжини використовуємо метод масиву slice()
    yield array.slice(i, i + chunkSize);
  }
}

// створюємо ітератор
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
// За допомогою методу next() повертаємо об'єкт з властивостями value та done
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
