let str1 = 'str1'
let str2 = `
   str2
`

// var str = text_name.replace(/\ +/g,"");
// str = str.replace(/[\r\n]/g,"");

str2 = str2.replace(/\ +/g,"").replace(/[\r\n]/g,"")


console.log('str1[0]',str1[0]);

console.log('str2[0]',str2[0]);