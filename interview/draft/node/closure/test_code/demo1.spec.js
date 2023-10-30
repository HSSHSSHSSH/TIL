

describe('closure', () => {
  test('demo1', () => {
    function func () {
      const guang = 'guang'
      function func2 () {
        const ssh = 'ssh'
        function func3 () {
          const suzhe = 'suzhe'
          console.log('guang', guang);
          console.log('ssh', ssh);
          console.log('suzhe', suzhe);
        }
        return func3
      }
      return func2
    }
    
    const func2 = func()
    const func3 = func2()
    func3()
  }) 
})