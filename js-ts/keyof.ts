interface Person {
  name: string;
  age: number;
  location: string;
}
type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // "length" | "push" | "pop" | "concat" | ...  array所有属性为字面量的类型
type K3 = keyof string; // 'chatAt' | 'slice' | 'split'| ...   string所有的属性为字面量的类型
type K4 = keyof { [x: string]: Person }; // string
type K5 = keyof { [x: number]: Person }; //number

// const k3: K3 = "s";
/**
 * 返回指定type的key的字面量类型
 *对于索引类型的type 返回其索引的类型
 */
