/*
4. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию). Пример:

var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

arrayToObject(arr)
Outputs: {
	name: 'developer',
	age: 5,
	skills: {
		html: 4,
		css: 5,
		js: 5
	}
 */

/* ******************************************************* */
// SOLUTION

/* 
Визначаємо тип KeyValuePair, який представляє собою масив з підмасивами.
Підмасиви мають два значення: перше має бути з типом string, друге може бути 
типом string або number, або array[]
*/
type KeyValuePair = [string, string | number | [string, any][]];
/*
Оголошуємо стрілкову функцію arrayToObject та типізуємо її параметри і результат виконання.
Параметри мають відповідати типу KeyValuePair, результатом має бути об'єкт.
*/
const arrayToObject = (arr: KeyValuePair[]): object => {
  /* 
  оголошуємо змінну objectFromArray та присвоєюмо їй значення пустив об'єкт.
  Типізуємо властивості об'єкта: ключ має бути string, значення - string або number, або
  null, або object
  ця змінна потрібна для того, щоб в неї
  */
  const objectFromArray: { [key: string]: string | number | null | object } =
    {};

  // далі нам потрібне цикл, щоб пройтись по масиву та перетворити його на об'єкт
  for (const item of arr) {
    /*
    почергово беремо кожен підмасив (item) масиву та за допомогою деструктуризації
    оголошуємо змінні key та value, яким присвоюємо відповідно перше та друге значення
    чергового підмасиву
    */
    const [key, value] = item;
    /*
    далі потрібно перевірити чим є value - масивом чи іншим примітивним типом даних.
    Якщо value є масивом (Array.isArray(value)), то для такого value рекурсивно викликаємо
    функцію arrayToObject(value) і в об'єкт objectFromArray додаємо нову пару:
     - ключ - дорівнює значенню key із поточної ітерації;
     - значення - дорівнює результату, який поверне arrayToObject(value).
    Якщо value не є масивом, то в об'єкт objectFromArray додаємо нову пару:
     - ключ - дорівнює значенню key із поточної ітерації;
     - значення - дорівнює value із поточної ітерації.
    */
    if (Array.isArray(value)) {
      objectFromArray[key] = arrayToObject(value);
    } else {
      objectFromArray[key] = value;
    }
  }

  // повертаємо в зовнішній код об'єкт objectFromArray
  return objectFromArray;
};

// cheking
console.log(
  arrayToObject([
    ['brand', 'Mazda'],
    ['one', 2],
    [
      'hero',
      [
        ['name', 'Gojo'],
        ['age', null],
        [
          'power',
          [
            ['max', 10],
            ['min', 1],
          ],
        ],
      ],
    ],
  ])
);
