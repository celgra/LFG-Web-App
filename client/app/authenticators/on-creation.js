import Base from 'ember-simple-auth/authenticators/base';

export default class OnCreationAuthenticator extends Base {
  restore(data) {
    return new Promise((resolve) => {
      resolve(data);
    });
  }

  authenticate(...args) {
    return new Promise( (resolve, reject) => {
        resolve({ user: args[0], token: args[1] });
    });
  }

}
