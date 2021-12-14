import { Tag } from './tag';
import { TagValidation } from './tag-validation';
import { User } from './user';
import { alertController } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../auth/login/login.page';

export class Persistence {
  API_BASE = 'https://dhbw-experts-api.azurewebsites.net';

  saveUserIdToLocalStorage(id: number): void {
    const storage = new Storage();
    storage.create();
    storage.set('userId', id).finally(() => console.log('done'));
  }

  async getUserIdFromLocalStorage(): Promise<number> {
    const storage = new Storage();
    storage.create();
    let result = await storage.get('userId');
    return result;
  }

  getUserByEmail(email: String): Promise<User> {
    return fetch(this.API_BASE + '/login/' + email)
      .then((res) => res.json())
      .then((res) => {
        return res as User;
      });
  }
  addTag(user: User, tagText: String): Promise<any> {
    return postData(
      this.API_BASE + '/users/' + user.userId + '/tags/add/' + tagText,
      user
    );
  }
  getTags(user: User): Promise<Tag[]> {
    return fetch(this.API_BASE + '/users/' + user.userId + '/tags')
      .then((res) => res.json())
      .then((res) => {
        return res as Tag[];
      });
  }
  getTagValidation(tagId: number): Promise<TagValidation[]> {
    return fetch(this.API_BASE + '/tags/' + tagId + '/validations')
      .then((res) => res.json())
      .then((res) => {
        return res as TagValidation[];
      });
  }
  editUser(user: User) {
    postData(this.API_BASE + '/users/' + user.userId + '/edit', user);
  }

  registerUser(user: User) {
    const response = postData(this.API_BASE + '/register', user);
  }

  verifyUser(userId: number, verificationId: String) {
    putData(this.API_BASE + '/register/' + userId + '/' + verificationId);
  }

  getUserById(id: number): Promise<User> {
    return fetch(this.API_BASE + '/users/' + id)
      .then((res) => res.json())
      .then((res) => {
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

  const status = String(response.status);
  if (!status.startsWith('2')) {
    console.log('Error while posting data, status code: ' + status); //TODO add user Popup
    const alert = await alertController.create({
      header: 'Fehler',
      message: 'Fehler ' + status,
      buttons: ['Ok'],
    });
    await alert.present();
  } else {
    console.log('success with status ' + status);
  }

  return response.json();
}

async function showPopUp(text: string) {
  const alert = await alertController.create({
    header: 'Fehler',
    message: text,
    buttons: ['Ok'],
  });
  await alert.present();
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

  const status = String(response.status);

  if (!status.startsWith('2')) {
    console.log('Error while putting data, status code: ' + status);
    const alert = await alertController.create({
      header: 'Fehler',
      message: 'Fehler ' + status,
      buttons: ['Ok'],
    });
    await alert.present();
  } else {
    console.log('success' + status);
  }
  return response.json();
}
