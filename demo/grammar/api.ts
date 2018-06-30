/**
 * 接口
 *
 */

//类型检查器会查看printLabel的调用。 printLabel 有一个参数，并要求这个对象参数有一个名为label类型为string的属性
{
  function printLabel(labelledObj : {
    label: string
  }) {
    console.log(labelledObj.label);
  }

  let myObj = {
    size: 10,
    label: "Size 10 Object"
  };
  printLabel(myObj);

  /**
   * 接口形式
   */
  interface LabelledValue {
    label : string;
  }

  function printLabel1(labelledObj : LabelledValue) {
    console.log(labelledObj.label);
  }

  let myObj1 = {
    size: 10,
    label: "Size 10 Object"
  };
  printLabel1(myObj1);

  /**
   * 可选属性
   * 可选属性名字定义的后面加一个? 符号；可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。
   * 疑问？？？： 函数冒号后面的{ color: string; area: number } ----冒号后面应该是返回值
   */

  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config : SquareConfig): {
    color: string;
    area: number
  }
  {
    let newSquare = {
      color: "white",
      area: 100
    };
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }

  let mySquare = createSquare({color: "black"});

  /**
   * 只读属性
   * 用 readonly来指定只读属性
   * 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
   */
  interface Point {
    readonly x : number;
    readonly y : number;
  }
  let p1: Point = {
    x: 10,
    y: 20
  };
  // p1.x = 5; // error!

  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  // ro[0] = 12; // error!
  // ro.push(5); // error!
  // ro.length = 100; // error!
  // a = ro; // error! ----用类型断言重写：a = ro as number[];


  /**
   * 额外的属性检查(该例和上面‘额外属性’一样)
   */
  {
    interface SquareConfig {
      color?: string;
      width?: number;
      // [propName: string]: any; //如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性，那么我们可以这样定义它
      // ^ 前提是能够确定这个对象可能具有某些做为特殊用途使用的额外属性
    }
  
    function createSquare1(config : SquareConfig): {
      color: string;
      area: number
    }
    {
      let newSquare = {
        color: "white",
        area: 100
      };
      if (config.color) {
        newSquare.color = config.color;
      }
      if (config.width) {
        newSquare.area = config.width * config.width;
      }
      return newSquare;
    }
  
    // let mySquare = createSquare1({color: "black"});
    // let mySquare = createSquare1({color: "black", aa: 'b'}); // error (绕开这些检查,可以使用使用类型断言,也可以使用[propName: string]: any;)
    let mySquare = createSquare1({color: "black", aa: 'b'} as SquareConfig);

    // 以下这种方式也能绕开
    // let squareOptions = { colour: "red", width: 100 };
    // let mySquare = createSquare(squareOptions);
  }

  /**
   * 函数类型
   */

  interface SearchFunc {
    (source: string, subString: string): boolean;
  }

  let mySearch: SearchFunc;
  mySearch = function(source: string, sub: string) {
    let result = source.search(sub);
    return result > -1;
  }

  // 不指定类型
  mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
  } 

  /**
   * 可索引的类型
   * 共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
   */
  interface StringArray {
    [index: number]: string;
  }
  
  let myArray: StringArray;
  myArray = ["Bob", "Fred"];
  
  let myStr: string = myArray[0];
  console.log(myStr)

  interface NumberDictionary {
    [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }
  
  class Animal {
    name: string;
  }
  class Dog extends Animal {
      breed: string;
  }

  // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
  interface NotOkay {
      // [x: number]: Animal;
      [x: string]: Dog;
  }

  // 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 obj.property和obj["property"]两种形式都可以
  interface NumberDictionary {
    // [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  }

  //将索引签名设置为只读，这样就防止了给索引赋值：
  interface ReadonlyStringArray {
    readonly [index: number]: string;
  }
  // let myArray: ReadonlyStringArray = ["Alice", "Bob"];
  myArray[2] = "Mallory"; // error!

  /**
   * 类类型
   * 
   */
  interface ClockInterface {
    currentTime: Date;
  }

  class Clock implements ClockInterface {
      currentTime: Date;
      constructor(h: number, m: number) { }
  }

  // 可以在接口中描述一个方法，在类里实现它（接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。）
  {
    interface ClockInterface {
      currentTime: Date;
      setTime(d: Date);
    }

    class Clock implements ClockInterface {
      currentTime: Date;
      setTime(d: Date) {
          this.currentTime = d;
      }
      constructor(h: number, m: number) { }
    }
  }
  
  {
    //类静态部分与实例部分的区别
    //当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：
    //这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
    interface ClockConstructor {
      // new (hour: number, minute: number);
    }
  
    class Clock implements ClockConstructor {
      // currentTime: Date;
      // constructor(h: number, m: number) { }
    }
  }

  {
    // 因此，我们应该直接操作类的静态部分。
    // 看下面的例子，我们定义了两个接口， ClockConstructor为构造函数所用和ClockInterface为实例方法所用。 
    // 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
    // 因为createClock的第一个参数是ClockConstructor类型，在createClock(AnalogClock, 7, 32)里，会检查AnalogClock是否符合构造函数签名。
    interface ClockConstructor {
      new (hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
        tick();
    }
    
    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }
    
    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("beep beep");
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("tick tock");
        }
    }
    
    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
  }

  /**
   * 继承接口
   * 和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
   */
  {
    interface Shape {
      color: string;
    }
    
    interface Square extends Shape {
        sideLength: number;
    }
    
    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
  }

  {
    // 一个接口可以继承多个接口，创建出多个接口的合成接口。
    interface Shape {
      color: string;
    }
    
    interface PenStroke {
        penWidth: number;
    }
    
    interface Square extends Shape, PenStroke {
        sideLength: number;
    }
    
    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
  }

  /**
   * 混合类型
   * 一个对象可以同时具有多种类型。
   * 使用JavaScript第三方库的时候，你可能需要像下面那样去完整地定义类型。
   */
  {
    interface Counter {
      (start: number): string;
      interval: number;
      reset(): void;
    }
    
    function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }
    
    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
  }

  /**
   * 接口继承类
   * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
   * 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
   * 接口同样会继承到类的private和protected成员。 
   * 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
   * 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。
   */
  {
    class Control {
      private state: any;
    }
    
    interface SelectableControl extends Control {
        select(): void;
    }
    
    class Button extends Control implements SelectableControl {
        select() { }
    }
    
    class TextBox extends Control {
        select() { }
    }
    
    // 错误：“Image”类型缺少“state”属性。
    // class Image implements SelectableControl {
    //     select() { }
    // }
    
    class Location {
    
    }
    // 在上面的例子里，SelectableControl包含了Control的所有成员，包括私有成员state。 
    // 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。 
    // 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，这对私有成员的兼容性是必需的。

    // 在Control类内部，是允许通过SelectableControl的实例来访问私有成员state的。 
    // 实际上， SelectableControl接口和拥有select方法的Control类是一样的。 
    // Button和TextBox类是SelectableControl的子类（因为它们都继承自Control并有select方法），但Image和Location类并不是这样的。
  }

}