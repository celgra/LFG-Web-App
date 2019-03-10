import Controller from '@ember/controller';
import { computed, action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import axios from 'axios';

export default class SignupController extends Controller {
    @service session;
    
    @computed('userPassword', 'userPasswordConfirmation')
    get passwordConfirmationMatches() {
        return this.userPassword === this.userPasswordConfirmation;
    }

    @action
    async signUp() {
        let res = await axios.post('api/users', { 
            userName: this.userName,
            emai: this.email,
            userPassword: this.userPassword
        });
        this.session.authenticate('authenticator:on-creation', res.data, res.headers['x-auth']);
    }
}