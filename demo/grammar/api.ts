/**
 * 接口
 *
 */
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

}