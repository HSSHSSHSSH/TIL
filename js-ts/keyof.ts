type myUnion = 'string'  | 'boolean'


interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

 type a = keyof Todo

 const test:a = 'completed'
 