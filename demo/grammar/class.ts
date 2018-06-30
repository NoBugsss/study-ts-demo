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