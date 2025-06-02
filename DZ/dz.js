function isPalindrome1(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, ''); // Удаляем пробелы и символы, оставляем только буквы и цифры
  //toLowerCase - нижний регистр
  //replace удаляет все символы кроме рус анг букв и циферок, g - все вхождение а не только 1 раз
  const reversedStr = cleanedStr.split('').reverse().join('');
  //сплитуем побуквенно ["м", "а",]
  //реверсим и джоиним(соединяем опять в одну строку)
  return cleanedStr === reversedStr;
  //сравниваем то что было с тем что получилось и лог возвращаем
}

// Пример использования:
console.log(isPalindrome1("А роза упала на лапу Азора")); // true
console.log(isPalindrome1("racecar")); // true
console.log(isPalindrome1("hello")); // false

function isPalindrome2(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-zа-яё0-9]/g, '');
  let left = 0;
  let right = cleanedStr.length - 1;
  //делаем указатели на первый символ и последний

  while (left < right) {
//пока не пересекутся
    if (cleanedStr[left] !== cleanedStr[right]) {
        //если начальный символ(текущий) не равен последнему(текущий) то возвращаем фолз
      return false;
    }
    //+1 буква и -1буква для левого и правого
    left++;
    right--;
  }
  return true;
}

// Пример использования:
console.log(isPalindrome2("Madam, I'm Adam")); // true
console.log(isPalindrome2("12321")); // true
console.log(isPalindrome2("not a palindrome")); // false

//console.log("Привет, мир!");