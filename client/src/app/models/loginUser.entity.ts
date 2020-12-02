/**
 * Represent currently loggedIn user data
 */
export class LoginUser {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public token: string,
    public tokenExpDate?: number,
    public date?: Date,
  ) { }
}
