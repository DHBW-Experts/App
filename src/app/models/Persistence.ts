import { User } from './User';
export class Persistence {
  API_BASE = 'https://dhbw-experts-api.azurewebsites.net';
  registerUser(user: User) {}
  verifyUser(userId: number, verificationId: number) {}
  getUserById(id: number): Promise<User> {
    return (
      fetch(this.API_BASE + '/users/id/' + id)
        // the JSON body is taken from the response
        .then((res) => res.json())
        .then((res) => {
          // The response has an `any` type, so we need to cast
          // it to the `User` type, and return it from the promise
          return res as User;
        })
    );
  }
  getUserByRFID(rfid: number) {}
}
