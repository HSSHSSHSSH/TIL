const obj = {
  'js'() {
    console.log('jssss');
  },
  json() {
    console.log('jsssson');
  }
}

obj['js']();
obj['json']();
obj.js()
obj.json()