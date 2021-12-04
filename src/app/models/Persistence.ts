import { User } from './User';
export class Persistence {
  API_BASE = 'https://dhbw-experts-api.azurewebsites.net';
  registerUser(user: User) {
    postData(this.API_BASE + '/register', user);
  }
  verifyUser(userId: number, verificationId: number) {
    //TODO check status to check if succes
    putData(this.API_BASE + '/register/' + userId + '/' + verificationId);
  }
  getUserById(id: number): Promise<User> {
    return (
      fetch(this.API_BASE + '/users/id/' + id)
        // the JSON body is taken from the response
        .then((res) => res.json())
        .then((res) => {
          // The response has an `any` type, so we need to cast
          // it to the `User` type, and return it from the promise
          console.log(res);
          return res as User;
        })
    );
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
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function putData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
