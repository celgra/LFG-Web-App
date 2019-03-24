import Base from 'ember-simple-auth/authenticators/base';
import { Promise } from 'rsvp';
import axios from 'axios';

export default class CustomAuthenticator extends Base {
  restore(data) {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  authenticate(...args) {
    return new Promise( async (resolve, reject) => {
      try {
          let res = await axios.post('api/users/login', { 
            userName: args[0], 
            userPassword: args[1], 
        });
        resolve({ user: res.data, token: res.headers['x-auth'] });
      } catch (error) {
        reject(error.response.data);
      }  
    });
  }

}
