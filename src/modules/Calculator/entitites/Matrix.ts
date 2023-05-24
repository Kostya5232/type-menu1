export default class Matrix {

  values:number[][]

  constructor(values:number[][] = [[]]) {
    this.values = [];
    values.forEach((arr, i) => {
      this.values[i] = [];
      arr.forEach((elem) => this.values[i].push(elem));
    });
  }

  toString():string  {
    return `[${this.values
      .map((arr) => arr.map((el) => el.toString()).join('; '))
      .join('|\n')
      .replaceAll('; NaN', '')}]`;
  }
}
