/* 
5. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив. Пример:

objectToArray({
	name: 'developer',
	age: 5,
	skills: {
		html: 4,
		css: 5,
		js: 5
	}
})

Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]
*/

/* ******************************************************* */
// SOLUTION

/* 
Визначаємо тип Value, який може приймати типи ланих string, nuьber, booleab або 
Record. Record - використовується для визначення типу об'єкт, у якого у даному випдаку 
ключі будуь з типом string, а значення - з будь-яким типом.  
*/
type Value = string | number | boolean | Record<string, any>;

/*
Оголошуємо стрілкову функцію objectToArray з одним параметром - об'єктом, що підлягає 
перетворенню в масив. 
*/
const objectToArray = (obj: Record<string, Value>): Array<[string, Value]> => {
  /*
  Створюємо змінну arrayFromObject, яка є пустим масивом. 
  Масив має тип [string, Value][], що означає масив кортежів, 
  де кожен кортеж складається з двох елементів:
    - перший елемент кортежу має бути рядком (string).
    - другий елемент кортежу має бути значенням типу Value.
  */
  const arrayFromObject: Array<[string, Value]> = [];

  /*
   Далі потрібно пройтися по кожній парі (ключ-значення) об'єкта `obj`,
   перетворити цю пару в масив, у якому ключ буде першим елементом масиву, 
   значення - другим.
   Для цього скористаємося циклом for...in, якийй дозволяє нам отримувати доступ до 
   до ключів (імен) властивостей об'єкта `obj` на кожній іоетрації.
  */
  for (const key in obj) {
    // За допомогою ключа та дужкової нотації отримуємо поточне значення
    // відповідної властивості об'єкта.
    const value = obj[key];
    /*
    Далі перевіряємо, чи є значення value об'єктом.
    Якщо value є об'єктом, то додаємо новий елемент до масиву `arrayFromObject`.
    `arrayFromObject.push([key, objectToArray(value)]);`
    Новий елемент представляє собоюю також масив, першим елементом якого є ключ 
    від поточної властивості об'кта obj, а другим елементом є результа виклику 
    функції `objectToArray(value)`. 
    Це рекурсивний виклик функції `objectToArray`, який допомагає обробляти
    вкладені об'єкти.
    Якщо value не є об'єктом, то також додаємо новий елемент (масив) до масиву `arrayFromObject`,
    і у якості другого елементу передаємо value без змін.
    */
    if (typeof value === 'object') {
      arrayFromObject.push([key, objectToArray(value)]);
    } else {
      arrayFromObject.push([key, value]);
    }
  }

  // повертаємо у зовнішній код значення змінної arrayFromObject
  return arrayFromObject;
};

// checking
const res = objectToArray({
  name: 'developer',
  age: 5,
  skills: {
    html: 7,
    css: true,
    js: { vanilla: 5 },
  },
});

console.log(res);
