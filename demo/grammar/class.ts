/**
 * 类
 */
class Greeter {
  greeting : string;
  constructor(message : string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
let greeter = new Greeter("world");

/**
 * 继承
 */
{
  class Animal {
    move(distanceInMeters : number = 0) {
      console.log(`Animal moved ${distanceInMeters}m.`);
    }
  }

  class Dog extends Animal {
    bark() {
      console.log('Woof! Woof!');
    }
  }

  const dog = new Dog();
  dog.bark();
  dog.move(10);
  dog.bark();
}

{
  // 派生类（子类）包含了一个构造函数，它 必须调用 super()，它会执行基类超类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用
  // super()。 这个是TypeScript强制执行的一条重要规则。
  class Animal {
    name : string;
    constructor(theName : string) {
      this.name = theName;
    }
    move(distanceInMeters : number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Snake extends Animal {
    constructor(name : string) {
      super(name);
    }
    move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
    }
  }

  class Horse extends Animal {
    constructor(name : string) {
      super(name);
    }
    move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
    }
  }
  let sam = new Snake("Sammy the Python");
  // 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法
  let tom: Animal = new Horse("Tommy the Palomino");

  sam.move();
  tom.move(34);
}

/**
 * 公共，私有与受保护的修饰符
 * TypeScript里，成员都默认为 public
 * 当成员被标记成 private时，它就不能在声明它的类的外部访问。
 */
{
  class Animal {
    private name : string;
    constructor(theName : string) {
      this.name = theName;
    }
  }

  // new Animal("Cat").name; // 错误: 'name' 是私有的.
}

{
  // 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员，
  // 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则
  class Animal {
    aa : string;
    private name : string;
    constructor(theName : string) {
      this.name = theName;
      this.aa = theName;
    }
  }

  class Rhino extends Animal {
    // aa : string;
    constructor() {
      super("Rhino");
      // this.aa = 'cc';
    }
    test() {
      console.log(this.aa)
    }
  }

  class Employee {
    private name : string;
    constructor(theName : string) {
      this.name = theName;
    }
  }

  let animal = new Animal("Goat");
  let rhino = new Rhino();
  let employee = new Employee("Bob");
  rhino.test();
  animal = rhino;
  // animal = employee; // 错误: Animal 与 Employee 不兼容.
}

/**
 * 理解 protected
 * protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
 */
{
  class Person {
    protected name : string;
    constructor(name : string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department : string;

    constructor(name : string, department : string) {
      super(name)
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // 错误 注意，不能在 Person类外使用 name，但是仍然可以通过
  // Employee类的实例方法访问，因为 Employee是由 Person派生而来的。
}

{
  // 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承
  class Person {
    protected name : string;
    protected constructor(theName : string) {
      this.name = theName;
    }
  }

  // Employee 能够继承 Person
  class Employee extends Person {
    private department : string;

    constructor(name : string, department : string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  let howard = new Employee("Howard", "Sales");
  // let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
}

/**
 * readonly修饰符
 * 可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
 */

{
  class Octopus {
    readonly name : string;
    readonly numberOfLegs : number = 8;
    constructor(theName : string) {
      this.name = theName;
    }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
}

// 在上面的例子中，我们不得不定义一个受保护的成员 name和一个构造函数参数 theName在 Person类里，并且立刻给 name和
// theName赋值。 这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前
// Animal类的修改版，使用了参数属性：
{
  class Animal {
    constructor(private name : string) {}
    move(distanceInMeters : number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }
  // 注意看我们是如何舍弃了 theName，仅在构造函数里使用 private name: string参数来创建和初始化 name成员。
  // 我们把声明和赋值合并至一处。 
  //参数属性通过给构造函数参数添加一个访问限定符来声明。 使用 private限定一个参数属性会声明并初始化一个私有成员；对于
  // public和 protected来说也是一样。
}

/**
 * 存取器
 * TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。
 */

{
  class Employee {
    fullName: string;
  }

  let employee = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
      console.log(employee.fullName);
  }
  // 可以随意的设置 fullName，这是非常方便的，但是这也可能会带来麻烦。
}
{
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
  }

  let employee = new Employee();
  employee.fullName = "Bob Smith";
  if (employee.fullName) {
      alert(employee.fullName);
  }
  // 存取器有下面几点需要注意的：
  // 首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 
  // 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 
  // 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。
}

/**
 * 静态属性
 * 创建类的静态成员，这些属性存在于类本身上面而不是类的实例上
 */
{
  class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
  }

  let grid1 = new Grid(1.0);  // 1x scale
  let grid2 = new Grid(5.0);  // 5x scale

  console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
  console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
  // 这个例子里，我们使用 static定义 origin，因为它是所有网格都会用到的属性。 
  // 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。
  // 如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性。
}

/**
 * 抽象类
 * 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
 * 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
 */
{
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
  }
}
{
  // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。 
  // 两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
  abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {

      constructor() {
          super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
      }

      printMeeting(): void {
          console.log('The Accounting Department meets each Monday at 10am.');
      }

      generateReports(): void {
          console.log('Generating accounting reports...');
      }
  }

  let department: Department; // 允许创建一个对抽象类型的引用
  // department = new Department(); // 错误: 不能创建一个抽象类的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
  // department.generateReports(); // 错误: 方法在声明的抽象类中不存在
}

/**
 * 高级技巧
 * 构造函数
 * 当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型。
 */
{
  class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
  }

  let greeter: Greeter;
  greeter = new Greeter("world");
  console.log(greeter.greet());

  // let greeter: Greeter，意思是 Greeter类的实例的类型是 Greeter。
}

{
  // 创建了一个叫做 构造函数的值。 这个函数会在我们使用 new创建类实例的时候被调用。
  // 上面的代码被编译成JavaScript后:
  let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
  })();

  let greeter;
  greeter = new Greeter("world");
  console.log(greeter.greet());
  // let Greeter将被赋值为构造函数。 当我们调用 new并执行了这个函数后，便会得到一个类的实例。
  //  这个构造函数也包含了类的所有静态属性。 换个角度说，我们可以认为类具有 实例部分与 静态部分这两个部分。
}
{
  // 改写
  class Greeter {
    static standardGreeting = "Hello, there";
    greeting: string;
    greet() {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter.standardGreeting;
        }
    }
  }

  let greeter1: Greeter;
  greeter1 = new Greeter();
  console.log(greeter1.greet());

  let greeterMaker: typeof Greeter = Greeter;
  greeterMaker.standardGreeting = "Hey there!";

  let greeter2: Greeter = new greeterMaker();
  console.log(greeter2.greet());
  // greeter1与之前看到的一样。 我们实例化 Greeter类，并使用这个对象。 与之前看到的一样。
  // 再之后，我们直接使用类。 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。 
  // 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。 
  // 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 
  // 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。
}

/**
 * 把类当做接口使用
 * 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
 */
{
  class Point {
    x: number;
    y: number;
  }

  interface Point3d extends Point {
      z: number;
  }

  let point3d: Point3d = {x: 1, y: 2, z: 3};
}