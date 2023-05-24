export default class Vector {
  values:number[]
  constructor(values:number[] = []) {
    this.values = [];
    values.forEach((elem) => this.values.push(elem));
  }

  toString():string  {
    return `(${this.values.map((elem) => elem.toString()).join(',')})`;
  }
}
