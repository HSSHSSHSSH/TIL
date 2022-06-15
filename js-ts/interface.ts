interface Person {
  name: string;
}

let p: Person;

p = {
  name: "hsh",
};

function showPerson(person: Person) {
  console.log(person);
}

let piem = {
  //piem对象满足 Person接口的形状
  name: "hsh",
  age: 10,
};

showPerson(piem);

// interface LabelledValue {
//   label: string;
// }

// function printLabel(labelledObj: LabelledValue) {
//   console.log(labelledObj.label);
// }

// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);
