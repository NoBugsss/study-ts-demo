/**
 * 函数
 * 和JavaScript一样，TypeScript函数可以创建有名字的函数和匿名函数。
 */

 /**
  * 函数类型
  * 为函数定义类型
  */
{
  function add(x: number, y: number): number {
    return x + y;
  }

  let myAdd = function(x: number, y: number): number { return x + y; };
  // 可以给每个参数添加类型之后再为函数本身添加返回值类型。 TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它.
}

/**
 * 书写完整函数类型
 */
{
  let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
}