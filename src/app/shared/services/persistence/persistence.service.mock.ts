import { Injectable } from '@angular/core';
import { alertController } from '@ionic/core';
import { Storage } from '@ionic/storage';
import { Tag } from '../../models/tag';
import { TagValidation } from '../../models/tag-validation';
import { User } from '../../models/user';

const API_BASE = '';

@Injectable({
  providedIn: 'root',
})
export class PersistenceServiceStub {
  public readonly local = local;
  public readonly auth = auth;
  public readonly user = user;
  public readonly tag = tag;
  public readonly contact = contact;
}

const local = {
  setEmail: async (email: string) => {
    const storage = new Storage();
    await storage.create();
    await storage.set('email', email);
  },

  getEmail: async () => {
    const storage = new Storage();
    await storage.create();
    return storage.get('email');
  },
};

const auth = {
  register: async (user: User) => {
    const response = await postData('register', user);

    // ...
  },

  verify: async (userId: number, verificationId: string) => {
    return putData(`register/${userId}/${verificationId}`);
  },
};

const user = {
  getById: async (userId: number) => {
    return {
      userId: userId,
      firstName: 'MaxMock',
      lastName: 'Mustermann',
      dhbw: 'Karlsruhe',
      course: 'Informatik',
      courseAbr: 'TINF20B2',
      specialization: 'Angewandte Informatik',
      email: 'mustermann.max@student.dhbw-karlsruhe.de',
      city: 'Ettlingen',
      biography: 'Hello World!!',
      isVerified: true,
      tmsCreated: '2022-04-24T21:37:07.183',
    };
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
    return postData(`users/${user.userId}/edit`, user);
  },

  delete: async (userId: number) => {
    return deleteData(`users/${userId}`);
  },
};

const tag = {
  create: async (user: User, text: string) => {
    return postData(`users/${user.userId}/tags/add/${text}`, user);
  },

  getByUser: async (userId: number) => {
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

  delete: async (tagId: number) => {
    return deleteData(`tags/${tagId}`);
  },
};

const contact = {
  add: async (userId: number, toAddUserId: number) => {
    return postData(`users/${userId}/contacts/add/${toAddUserId}`);
  },

  remove: async (userId: number, toRemoveUserId: number) => {
    return deleteData(`users/${userId}/contacts/${toRemoveUserId}`);
  },

  getByUserId: async (userId: number) => {
    return { userId: 1000, firstName: 'Max', lastName: 'Mustermann' };
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
  return response.json();
}
