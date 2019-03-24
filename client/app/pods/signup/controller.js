import Controller from '@ember/controller';
import { computed, action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { isEmpty } from '@ember/utils';
import axios from 'axios';

export default class SignupController extends Controller {
    @service session;
    
    @computed('userPassword', 'userPasswordConfirmation')
    get passwordConfirmationMatches() {
        return this.userPassword === 
        this.userPasswordConfirmation ||
        isEmpty(this.userPasswordConfirmation);
    }

    @computed('userName', 'userPassword', 'passwordConfirmationMatches', 'email')
    get isFormValid() {
        return !isEmpty(this.userName) && !isEmpty(this.userPassword) && 
        !isEmpty(this.userPasswordConfirmation) &&
        this.passwordConfirmationMatches &&
        !isEmpty(this.email);
    }

    @action
    async signUp() {
        let res = await axios.post('api/users', { 
            userName: this.userName,
            email: this.email,
            userPassword: this.userPassword
        });
        await this.session.authenticate('authenticator:on-creation', res.data, res.headers['x-auth']);
        this.transitionToRoute('home');
    }
}