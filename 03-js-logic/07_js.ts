/* 7.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( '/').

Пример:
const obj = {
  a: {
    b: {
      c: 12,
      d: 'Hello World'
    },
    e: [1,2,3]
  }
};

mapObject(demoData);
Outputs: {
  'a/b/c': 12,
  'a/b/d': 'Hello World',
  'a/e': [1,2,3]
}
*/

//* ******************************************************* */
// SOLUTION
const obj = {
  a: {
    b: {
      c: 12,
      d: 'Hello World',
    },
    e: [1, 2, 3],
  },
};

/*
Ооголошуємо функцію mapObject з двома параметрами: 
- obj: початковий об'єкт, що підлягає перетворенню
- parentKey: рядок, в який буде записуватись ієрархія ключів початкового об'єкту.
По замовчуванню parentKey - це пустий рядок.
*/
const mapObject = (obj: any, parentKey = ''): Record<string, any> => {
  /* 
  Функція починається з використання метода Object.keys(obj), щоб отримати масив 
  ключів початкового об'єкта obj.
  Далі використовуємо метод reduce() до масиву отриманих ключів об'єкта.
  Метод reduce приймає два аргументи: колбек функцію та початкове значення (initialValue), що буде використане 
  колбек функцією як перший її аргумент при першому її виклику. 
  Початкове значення - порожній масив {}.
  Колбек функція примає два аргументи: 
    - acc - порожній об'єкт {}, та 
    - key - дорівнює першому елементу в масиві отриманих ключів, тобто, елементу з індексом 0 (array[0]).
  */
  return Object.keys(obj).reduce((acc, key) => {
    /*
    Створюємо змінну newKey.
    За допомогою тернарного оператора присвоюємо значненя змінній:
    - якщо значення newKey truthy, то виконується вираз після `?`, і змінна newKey
    отримує значення типу string за допомогою шаблонного рядка - значення parentKey, slash, значення key;
    - якщо значення newKey falsy, то виконується вираз після `:`, і змінна newKey
    отримує значення key.
    */
    const newKey = parentKey ? `${parentKey}/${key}` : key;
    /*
    Якщо значення властивості об'єкта є об'єктом (не null і не масивом), 
    то виконується ця гілка if.
    */
    if (
      typeof obj[key] === 'object' &&
      !Array.isArray(obj[key]) &&
      obj[key] !== null
    ) {
      /*
      Спочатку ми створюємо нову змінну nestedObj, викликаючи рекурсивно функцію mapObject().
      До функції mapObject ми передаємо значення поточної властивості об'єкта (obj[key]) і новий ключ (newKey), 
      який містить шлях до поточної властивості в глибокій структурі даних.
      */
      const nestedObj = mapObject(obj[key], newKey);
      /*
      Потім ми об'єднуємо об'єкт `acc` і отриманий об'єкт `nestedObj` за допомогою оператора spread.
      Це дозволяє додати всі властивості з `nestedObj` до `acc`.
      */
      return { ...acc, ...nestedObj };
    } else {
      // Якщо значення властивості не є об'єктом, то ми просто присвоюємо його до ключа newKey
      // в об'єкті `acc`.
      if (Array.isArray(obj[key])) {
        acc[newKey] = obj[key];
      } else {
        // Якщо значення властивості не є масивом, ми просто присвоюємо його до ключа newKey
        // в об'єкті `acc`. Це також стосується простих значень, наприклад, чисел або рядків.
        acc[newKey] = obj[key];
      }
      // На кожному кроці обробки об'єкта ми повертаємо актуальний стан об'єкта `acc`.
      return acc;
    }
  }, {});
};

console.log(mapObject(obj));