import Controller from '@ember/controller';
import axios from 'axios';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class LoginController extends Controller {
    userName = '';
    userPassword = '';

    @service store;
    @service session;

    @action
    async login() {
        try {
            await this.session.authenticate('authenticator:custom', 
                this.userName, 
                this.userPassword
            );
        } catch (error) {
            console.warn(error);
            this.set('errorMessage', error);
        }  
    }
}
