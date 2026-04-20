import { makeAutoObservable } from "mobx";
export class User {
  user: string = "jiacheng_huang";
  constructor() {
    makeAutoObservable(this);
  }
  set(name: string) {
    this.user = name;
  }
}
