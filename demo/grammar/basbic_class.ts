/**
 * 基础类型
 */
{
  // 基础类型和js几乎一致，此外还提供了枚举类型；
  let status: boolean = true;

  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d; // 16进制
  let binaryLiteral: number = 0b1010; // 二进制
  let octalLiteral: number = 0o744; //八进制

  /*
   * 数组
   */
  let list0 = [1, 2];
  let list1: number[] = [1, 2];
  let list2: Array<number> = [1, 2];

  /**
   * 元组
   */
  let arr: [string, number];
  arr = ['1', 1];
  // error arr = [1, '0']
  console.log(arr[0].substr(1));
  // error console.log(arr[1].substr(1))
  arr[2] = '1' || 1; // 只能是字符串或者数字

  /**
   * 枚举 enum
   * 默认从 0 开始可以自定义
   */
  enum Color {
    Red = 1,
    Green,
    Blue = 1000
  }
  let c: Color = Color.Green;
  let c2: Color = Color.Blue;
  /* let name: string = Color[1]; */
  console.log(`${c}-----${c2}-----`)

  /**
   * any
   */
  let list: any[] = [1, true, "free"];
  list[1] = 100;

  /**
   * void
   * 声明一个void类型的变量只能为它赋予undefined和null
   */

  let _void: void = undefined;

  /**
   * null和undefined
   * 默认情况下null和undefined是所有类型的子类型,
   * 当指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
   */
  let un: undefined = undefined;
  let obj: object = undefined;

  /**
   * Never
   * 表示的是永不存在的值的类型
   * 是任何类型的子类型，也可以赋值给任何类型
   * 没有类型是never的子类型或可以赋值给never类型（除了never本身之外)
   */
  // 返回never的函数必须存在无法达到的终点
  function error(message: string): never { throw new Error(message); }
  // 该返回值类型为Never
  function fail() {
    return error("Something failed");
  }
  // 返回never的函数必须存在无法达到的终点
  function infiniteLoop(): never {
    while (true) { }
  }

  /**
   * 类型断言
   * 在TypeScript里使用JSX时，只有 as语法断言是被允许的
   */
  let someValue: any = "this is a string";
  let strLength: number = (<string>someValue).length;
  // 另一个为as语法：
  let someValue1: any = "this is a string";
  let strLength1: number = (someValue1 as string).length;
  

}