import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Tag } from '../../models/tag';
import { TagValidation } from '../../models/tag-validation';
import { User } from '../../models/user';

const API_BASE = 'https://dhbw-experts-api.azurewebsites.net';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {

  public readonly user;
  public readonly tag;
  public readonly contact;
  public readonly search;

  constructor(public auth: AuthService, private http: HttpClient) {
    this.user = {
      register: async (user: User, userId: string) => {
        return this.http.post<User>(`${API_BASE}/register/${userId}`, user).toPromise();
      },

      getById: async (userId: string) => {
        return this.http.get<User>(`${API_BASE}/users/${userId}`).toPromise();
      },

      edit: async (user: User) => {
        this.http.patch(`${API_BASE}/users/${user.userId}`, user).pipe(
          catchError(async error => {
                return throwError(String(error));
              })
          ).toPromise();
      },

      delete: async (userId: string) => {
        return this.http.delete(`${API_BASE}/users/${userId}`).toPromise();
      },
    };
    this.tag = {
      create: async (user: User, text: string) => {
        return this.http.post<Tag>(`${API_BASE}/users/${user.userId}/tags/${text}`, null).toPromise();
      },

      getByUser: async (userId: string) => {
        return this.http.get<Tag[]>(`${API_BASE}/users/${userId}/tags`).toPromise();
      },

      getValidations: async (tagId: number) => {
        return this.http.get<TagValidation[]>(`${API_BASE}/tags/${tagId}/validations`).toPromise();
      },

      addValidation: async (tagId: number, validation: string, validatedBy:number) =>{
        return this.http.post<TagValidation>(`${API_BASE}/tags/${tagId}/validations`,{
          "tag": tagId,
          "validatedBy": validatedBy ,
          "comment": validation
        }).toPromise();
      },

      delete: async (tagId: number, userId: string) => {
        return this.http.delete(`${API_BASE}/users/${userId}/tags/${tagId}`).toPromise();
      },
      getById: async (id: string) => {
        return this.http.get<Tag>(`${API_BASE}/tags/${id}`).toPromise();
      },
    };
    this.contact = {
      add: async (userId: string, toAddUserId: string) => {
        return this.http.post<Tag[]>(`${API_BASE}/users/${userId}/contacts/${toAddUserId}`, null).toPromise();
      },

      remove: async (userId: string, toRemoveUserId: string) => {
        return this.http.delete<Tag[]>(`${API_BASE}/users/${userId}/contacts/${toRemoveUserId}`).toPromise();
      },

      getByUserId: async (userId: string) => {
        return this.http.get<Tag[]>(`${API_BASE}/users/${userId}/contacts`).toPromise();
      },
    };
    this.search = {
      searchUsersByTag: async (tag: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/tags/${tag}`).toPromise();
      },

      searchUsersByEmail: async (email: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/email/${email}`).toPromise();
      },

      searchUserByRfid: async (rfidId: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/rfid/${rfidId}`).toPromise();
      },

      searchUsersByName: async (name: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/name/${name}`).toPromise();
      },

      searchUsersByCourse: async (course: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/course/${course}`).toPromise();
      },

      searchUsersByCourseAbbr: async (abbr: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/course-abbr/${abbr}`).toPromise();
      },

      searchUsersByLocation: async (location: string) => {
        return this.http.get<User[]>(`${API_BASE}/search/users/location/${location}`).toPromise();
      },
      searchTags: async (searchText: string) => {
        return this.http.get<Tag[]>(`${API_BASE}/search/tags/${searchText}`).toPromise();
      },
    };
  }

  // getData(path: string) {
  //   return this.http.get(path)
  //     .pipe(
  //       catchError(async error => {
  //         let errorMsg: string;
  //         if (error.error instanceof ErrorEvent) {
  //           errorMsg = `Error: ${error.error.message}`;
  //         } else {
  //           errorMsg = `Error: ${error.status}`;
  //         }
  //         console.log(errorMsg);
  //         const alert = await alertController.create({
  //           header: error.status,
  //           message: errorMsg,
  //           buttons: ['Ok'],
  //         });
  //         await alert.present();
  //         return throwError(errorMsg);
  //       })
  //   );
  // }
  //
  // async postData(path = '', data = {}) {
  //   const response = await fetch(`${API_BASE}/${path}`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data),
  //   });
  //
  //   const status = String(response.status);
  //
  //   if (!status.startsWith('2')) {
  //     console.log('Error while posting data, status code: ' + status);
  //
  //     const alert = await alertController.create({
  //       header: 'Fehler',
  //       message: 'Fehler ' + status,
  //       buttons: ['Ok'],
  //     });
  //     await alert.present();
  //     return Promise.reject(status);
  //   } else {
  //     console.log('success with status ' + status);
  //   }
  //   return response.json();
  // }
  //
  // async putData(path = '', data = {}) {
  //   const response = await fetch(`${API_BASE}/${path}`, {
  //     method: 'PUT',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data),
  //   });
  //
  //   const status = String(response.status);
  //
  //   if (!status.startsWith('2')) {
  //     console.log('Error while putting data, status code: ' + status);
  //
  //     const alert = await alertController.create({
  //       header: 'Fehler',
  //       message: 'Fehler ' + status,
  //       buttons: ['Ok'],
  //     });
  //     await alert.present();
  //   } else {
  //     console.log('success' + status);
  //   }
  //
  //   return response.json();
  // }
  //
  // async patchData(path = '', data = {}) {
  //   const response = await fetch(`${API_BASE}/${path}`, {
  //     method: 'PATCH',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //     body: JSON.stringify(data),
  //   });
  //
  //   const status = String(response.status);
  //
  //   if (!status.startsWith('2')) {
  //     console.log('Error while patching data, status code: ' + status);
  //
  //     const alert = await alertController.create({
  //       header: 'Fehler',
  //       message: 'Fehler ' + status,
  //       buttons: ['Ok'],
  //     });
  //     await alert.present();
  //   } else {
  //     console.log('success' + status);
  //     return Promise.resolve(200);
  //   }
  //
  //   return response.json();
  // }
  //
  // async deleteData(path = '') {
  //   const response = await fetch(`${API_BASE}/${path}`, {
  //     method: 'DELETE',
  //     mode: 'cors',
  //     cache: 'no-cache',
  //     credentials: 'same-origin',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //   });
  //
  //   const status = String(response.status);
  //
  //   if (!status.startsWith('2')) {
  //     console.log('Error while deleting data, status code: ' + status);
  //
  //     const alert = await alertController.create({
  //       header: 'Fehler',
  //       message: 'Fehler ' + status,
  //       buttons: ['Ok'],
  //     });
  //     await alert.present();
  //   } else {
  //     console.log('success' + status);
  //   }
  //
  //   return response.json();
  // }
}
