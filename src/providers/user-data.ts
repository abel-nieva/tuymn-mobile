import { Injectable } from '@angular/core';

import Parse from 'parse';

@Injectable()
export class UserData {

  constructor() {}

  signUp(username: string, password: string, email: string): Promise<Parse.Object> {
    let User = new Parse.User();

    User.set('username', username);
    User.set('password', password);
    User.set('email', email);

    return new Promise((resolve, reject) => {
      User.signUp(null)
        .then(user => {
          resolve(user);
        }, error => {
          reject(error);
        });
    });
  }

  logIn(username: string, password: string): Promise<Parse.Object> {
    return new Promise((resolve, reject) => {
      Parse.User.logIn(username, password)
        .then(user => {
          resolve(user);
        }, error => {
          reject(error);
        });
    });
  }

  getByUsername(username: string): Promise<Parse.Object> {
    let User = Parse.Object.extend('User');
    let userQuery = new Parse.Query(User);

    userQuery.equalTo('username', username);

    return new Promise((resolve, reject) => {
      userQuery.first()
        .then(user => {
          resolve(user);
        }, error => {
          reject(error);
        });
    });
  }

  getByEmail(email: string): Promise<Parse.Object> {
    let User = Parse.Object.extend('User');
    let userQuery = new Parse.Query(User);

    userQuery.equalTo('email', email);

    return new Promise((resolve, reject) => {
      userQuery.first()
        .then(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
    });
  }

}
