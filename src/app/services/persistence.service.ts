import { Injectable } from '@angular/core';
import { alertController } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Tag } from '../models/tag';
import { TagValidation } from '../models/tag-validation';
import { User } from '../models/user';

const API_BASE = 'https://dhbw-experts-api.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor(
    public readonly local: LocalPersistence,
    public readonly auth: AuthPersistence,
    public readonly user: UserPersistence,
    public readonly tag: TagPersistence,
    public readonly contact: ContactPersistence,
  ) { }

}

class LocalPersistence {
  constructor(
    private storage: Storage
  ) { }

  async setEmail(email: string) {
    await this.storage.create();
    await this.storage.set('email', email);
  }

  async getEmail() {
    await this.storage.create();
    return this.storage.get('email');
  }
}

class AuthPersistence {
  async register(user: User) {
    const response = await postData('register', user);

    // ...
  }

  async verify(userId: number, verificationId: string) {
    return putData(`register/${userId}/${verificationId}`);
  }
}

class UserPersistence {
  async getById(userId: number) {
    return getData(`users/${userId}`)
      .then(res => { return res as User });
  }

  async getByTag(searchText: string) {
    return getData(`search/users/tags/${searchText}`)
      .then(res => { return res as User[] });
  }
  
  async getByEmail(email: String) {
    return getData(`login/${email}`)
      .then(res => { return res as User });
  }
  
  async getByRfid(rfid: string) {
    return getData(`users/rfid/${rfid}`)
      .then(res => { return res as User });
  }

  async edit(user: User) {
    return postData(`users/${user.userId}/edit`, user);
  }

  async delete(userId: number) {
    return deleteData(`users/${userId}`);
  }
}

class TagPersistence {
  async create(user: User, text: string) {
    return postData(`users/${user.userId}/tags/add/${text}`, user);
  }

  async getByUser(userId: number) {
    return getData(`users/${userId}/tags`)
      .then(res => { return res as Tag[] });
  }

  async getDistinctByText(serachText: string) {
    return getData(`search/tags/${serachText}`)
      .then(res => { return res as Tag[] });
  }

  async getValidations(tagId: number) {
    return getData(`tags/${tagId}/validations`)
      .then(res => { return res as TagValidation[] });
  }

  async delete(tagId: number) {
    return deleteData(`tags/${tagId}`);
  }
}

class ContactPersistence {
  async add(userId: number, toAddUserId: number) {
    return postData(`users/${userId}/contacts/add/${toAddUserId}`);
  }

  async remove(userId: number, toRemoveUserId: number) {
    return deleteData(`users/${userId}/contacts/${toRemoveUserId}`);
  }

  async getByUserId(userId: number) {
    return getData(`users/${userId}/contacts`)
      .then(res => { return res as User[] });
  }
}

// ========================================================
// ========================================================

async function getData(path = '') {
  return fetch(`${API_BASE}/${path}`)
    .then(res => res.json());
}

async function postData(path = '', data = {}) {
  const response = await fetch(`${API_BASE}/${path}`, {
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
    console.log('Error while posting data, status code: ' + status);

    const alert = await alertController.create({
      header: 'Fehler',
      message: 'Fehler ' + status,
      buttons: [ 'Ok' ],
    });
    await alert.present();   
  } else {
    console.log('success with status ' + status);

    return Promise.resolve(200);
  }

  return response.json();
}

async function putData(path = '', data = {}) {
  const response = await fetch(`${API_BASE}/${path}`, {
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
      buttons: [ 'Ok' ],
    });
    await alert.present();
  } else {
    console.log('success' + status);
  }

  return response.json();
}

async function deleteData(path = '') {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

  const status = String(response.status);

  if (!status.startsWith('2')) {
    console.log('Error while deleting data, status code: ' + status);

    const alert = await alertController.create({
      header: 'Fehler',
      message: 'Fehler ' + status,
      buttons: [ 'Ok' ],
    });
    await alert.present();
  } else {
    console.log('success' + status);
  }

  return response.json();
}