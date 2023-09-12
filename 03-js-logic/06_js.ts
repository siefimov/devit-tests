/*
6. Есть функция primitiveMultiply, которая умножает числа, но случайным образом может выбрасывать исключения типа: NotificationException, ErrorException. Задача написать функцию обертку которая будет повторять вычисление при исключении NotificationException, но прекращать работу при исключениях ErrorException

Пример:

function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if(rand > 0.85) {
    throw new ErrorException()
  } else {
    throw new NotificationException()
  }
}

function reliableMultiply(a, b) {
  Ваш код
}

console.log(reliableMultiply(8, 8));
*/

//* ******************************************************* */
// SOLUTION

function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a: number, b: number): number {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if (rand > 0.85) {
    throw new ErrorException();
  } else {
    throw new NotificationException();
  }
}

/*
Оголошуємо функцію-обгортку у вигляді стрілкової функції з двома параметрами, 
кожен із яких має тип number.
*/
const reliableMultiply = (a: number, b: number): number => {
  /* 
  Оскільки нам потрібно повторювати обрахунок при виключнні NotificationException,
  запустимо цикл `while` умовою `true`. По суті while(true) означає безкінечний цикл, тому 
  ми зможемо повторювати обрахунок до тих пір, поки це не вдастся зробити без помилок (за виключенням
  помилки типу ErrorException)
  */
  while (true) {
    /*
    далі використовуємо блок try...catch
    try опрацьовує успішне виконання функції primitiveMultiply()
    catch опрацьовує помилки
    У блоці try викликаємо функцію primitiveMultiply(), яка:
     - або повертає результат множення a * b (якщо rand < 0.5);
     - або викодає помилку типу NotificationException() (якщо rand > 0.85)
     - або викодає помилку типу ErrorException() (в інших випадках)
    Якщо виникла помилка і ця помилка є екземпляром NotificationException, то
    код продовжує ітерацію циклу та повторює множення a на b. На продовження ітерації
    вказує оператор continue.
    Якщо виникла помилка і ця помилка є екземпляром ErrorException, то
    викидається помилка. Програма припиняє спроби множення і виходить з циклу.
    Якщо жоден з винятків не виник, функція primitiveMultiply(a, b) успішно 
    виконує множення і результат повертається з функції reliableMultiply.
    */
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error instanceof NotificationException) {
        console.log('NotificationException: Retry...');
        continue;
      } else if (error instanceof ErrorException) {
        console.log('ErrorException: Stop...');
        throw error;
      } else {
        throw error;
      }
    }
  }
};

// checking
console.log(reliableMultiply(8, 8));
