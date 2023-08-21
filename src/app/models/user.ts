export interface User {
    userName: string
    displayName: string
    token: string
    image?: string
    age: number
  }
  
  export interface UserFormValues {
    email: string
    password: string
    displayName?: string
    userName?: string
    age?: number
  }
  