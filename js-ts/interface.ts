interface Person {
  // age: number;
  name: string;
}

let p: Person;

p = {
  name: "hsh",
  // age: 10,
};

function showPerson(person: Person) {
  console.log(person);
}

let piem = {
  //piem对象满足 Person接口的形状   piem的属性要包含接口的属性
  name: "hsh",
  age: 10,
};

showPerson(piem);

//可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
  // return
}

// as 关键字 进行类型断言
// let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
let mySquare = createSquare({ colour: "red", width: 100 });

/**
 * 函数类型接口
 */

interface SearchFunc {
  ({ source: string, index: number }): boolean;
}

let mysearch: SearchFunc;

mysearch = function ({ index: number, source: string }) {
  return true;
};

/**
 * 可索引类型
 */

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
/**
 * TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
 * 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
 */
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}

interface Okay {
  [x: number]: Dog;
  [x: string]: Animal;
}

interface NumberDictionary {
  // ???
  [index: number]: number | string;
  length: number; // 可以，length是number类型
  name: string; // 错误，`name`的类型与索引类型返回值的类型不匹配
}

let numberDictionary: NumberDictionary = {
  name: "name",
  length: 10,
};
numberDictionary[10] = 123;

console.log(
  numberDictionary.name,
  numberDictionary["name"],
  numberDictionary.length,
  numberDictionary["length"]
);

// interface ClockConstructor {
//   new (hour: number, minute: number);
// }

// class Clock implements ClockConstructor {
//   currentTime: Date;
//   constructor(h: number, m: number) { }
// }
