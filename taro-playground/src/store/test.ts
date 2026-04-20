import { makeAutoObservable } from "mobx";

export class Store {
  count: number = 0; // 这些属性会被自动标记为observable
  price: number = 0;
  constructor() {
    makeAutoObservable(this);
  } // 改变observable的方法，会被自动标记为action
  add() {
    this.price += 1;
  } // 使用get set的方法，会被自动标记为computed
  get total() {
    console.log("computed render");
    return this.price;
  }
  set total(value: number) {
    this.price = value;
  }
}
