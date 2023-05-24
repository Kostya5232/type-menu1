import Point from './Point';

export default class Light extends Point {

  lumen: number;
  constructor(x=0, y=0, z=0, lumen = 10000) {
    super(x, y, z);
    this.lumen = lumen;
  }
}

