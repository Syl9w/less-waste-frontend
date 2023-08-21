import { User } from "./user"

export interface Reporter {
  userName: string
  displayName: string
  age: number
}

export class Reporter implements Reporter{
  constructor(user:User){
    this.userName = user.userName
    this.displayName = user.displayName
    this.age = user.age
  }
}