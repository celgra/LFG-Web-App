import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { create, Store } from '@microstates/ember';
import { valueOf } from 'microstates';
import axios from 'axios';

class SignUpForm {
    userName =  String;
    userPassword =  String;
    userPasswordConfirmation =  String;
    email = String;
    errorMessage =  String;
}

export default class SignupController extends Controller {
    @service session;

    @computed
    get signUpForm() {
        return Store(create(SignUpForm), next => this.set('signUpForm', next));
    }
    set signUpForm(state) {
        return state;
    }
    
    @computed('signUpForm')
    get passwordConfirmationMatches() {
        return this.signUpForm.userPassword.state === this.signUpForm.userPasswordConfirmation.state ||
            isEmpty(this.signUpForm.userPasswordConfirmation.state);
    }

    @computed('signUpForm')
    get isFormValid() {
        return !isEmpty(this.signUpForm.userName.state) && 
            !isEmpty(this.signUpForm.userPassword.state) && 
            !isEmpty(this.signUpForm.userPasswordConfirmation.state) &&
            this.passwordConfirmationMatches &&
            !isEmpty(this.signUpForm.email.state);
    }

    @action
    async signUp() {
        try {
            let { 
                userName,
                userPassword,
                email
            } = valueOf(this.signUpForm);
            let res = await axios.post('api/users', { 
                userName,
                email,
                userPassword
            });
            await this.session.authenticate('authenticator:on-creation', res.data, res.headers['x-auth']);
            this.transitionToRoute('home');
        } catch (error) {
            this.signUpForm.errorMessage.set(error);
        }
    }
}