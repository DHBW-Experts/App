import { VerifyPage } from '../auth/verify/verify.page';
import { User } from './User';
export class Persistence {
  API_BASE = 'https://dhbw-experts-api.azurewebsites.net';
  registerUser(user: User) {
    const response = postData(this.API_BASE + '/register', user);
  }
  verifyUser(userId: number, verificationId: String) {
    //TODO check status to check if succes
    putData(this.API_BASE + '/register/' + userId + '/' + verificationId);
  }
  getUserById(id: number): Promise<User> {
    return fetch(this.API_BASE + '/users/id/' + id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res as User;
      });
  }
  getUserByRFID(rfid: number): Promise<User> {
    return fetch(this.API_BASE + '/users/rfid/' + rfid)
      .then((res) => res.json())
      .then((res) => {
        return res as User;
      });
  }
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json(); //TODO response doesnt work if succes
}

async function putData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}
