import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { alertController } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Tag } from '../../models/tag';
import { TagValidation } from '../../models/tag-validation';
import { User } from '../../models/user';

const API_BASE = 'https://dhbw-experts-api.azurewebsites.net';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  public readonly user = user;
  public readonly tag = tag;
  public readonly contact = contact;
}

const user = {
  register: async (user: User, userId: string) => {
    return postData(`register/${userId}`, user) as Promise<User>;
  },

  getById: async (userId: string) => {
    return getData(`users/${userId}`).then((res) => {
      return res as User;
    });
  },

  getByTag: async (searchText: string) => {
    return getData(`search/users/tags/${searchText}`).then((res) => {
      return res as User[];
    });
  },

  getByEmail: async (email: String) => {
    return getData(`login/${email}`).then((res) => {
      return res as User;
    });
  },

  getByRfid: async (rfid: string) => {
    return getData(`users/rfid/${rfid}`).then((res) => {
      return res as User;
    });
  },

  getByName: async (name: string) => {
    return getData(`users/??/${name}`).then((res) => {
      return res as User[];
    });
  },

  getByCourse: async (course: string) => {
    return getData(`users/??/${course}`).then((res) => {
      return res as User[];
    });
  },
  getByCourseAbr: async (abr: string) => {
    return getData(`users/??/${abr}`).then((res) => {
      return res as User[];
    });
  },
  getByLocation: async (location: string) => {
    return getData(`users/??/${location}`).then((res) => {
      return res as User[];
    });
  },

  edit: async (user: User) => {
    return patchData(`users/${user.userId}`, user);
  },

  delete: async (userId: string) => {
    return deleteData(`users/${userId}`);
  },
};

const tag = {
  create: async (user: User, text: string) => {
    return postData(`users/${user.userId}/tags/${text}`, user);
  },

  getByUser: async (userId: string) => {
    return getData(`users/${userId}/tags`).then((res) => {
      return res as Tag[];
    });
  },

  getDistinctByText: async (searchText: string) => {
    return getData(`search/tags/${searchText}`).then((res) => {
      return res as Tag[];
    });
  },

  getValidations: async (tagId: number) => {
    return getData(`tags/${tagId}/validations`).then((res) => {
      return res as TagValidation[];
    });
  },

  delete: async (tagId: number, userId: string) => {
    return deleteData(`users/${userId}/tags/${tagId}`);
  },
  getById: async (id: string) => {
    return getData(`tags/${id}`).then((res) => {
      return res as Tag;
    });
  },
};

const contact = {
  add: async (userId: string, toAddUserId: string) => {
    return postData(`users/${userId}/contacts/${toAddUserId}`);
  },

  remove: async (userId: string, toRemoveUserId: string) => {
    return deleteData(`users/${userId}/contacts/${toRemoveUserId}`);
  },

  getByUserId: async (userId: string) => {
    return getData(`users/${userId}/contacts`).then((res) => {
      return res as User[];
    });
  },
};

// ========================================================
// ========================================================

async function getData(path = '') {
  return fetch(`${API_BASE}/${path}`).then((res) => res.json());
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
      buttons: ['Ok'],
    });
    await alert.present();
    return Promise.reject(status);
  } else {
    console.log('success with status ' + status);
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
      buttons: ['Ok'],
    });
    await alert.present();
  } else {
    console.log('success' + status);
  }

  return response.json();
}

async function patchData(path = '', data = {}) {
  const response = await fetch(`${API_BASE}/${path}`, {
    method: 'PATCH',
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
    console.log('Error while patching data, status code: ' + status);

    const alert = await alertController.create({
      header: 'Fehler',
      message: 'Fehler ' + status,
      buttons: ['Ok'],
    });
    await alert.present();
  } else {
    console.log('success' + status);
    return Promise.resolve(200);
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
      buttons: ['Ok'],
    });
    await alert.present();
  } else {
    console.log('success' + status);
  }

  return response.json();
}