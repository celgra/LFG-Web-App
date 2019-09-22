import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { create, Store } from '@microstates/ember';

class LoginForm {
    userName = String;
    userPassword = String;
    errorMessage =  String;
}

export default class LoginController extends Controller {
    @service session;
    @service savedTransition;

    @computed
    get loginForm() {
        return Store(create(LoginForm), next => this.set('loginForm', next));
    }
    set loginForm(state) {
        return state;
    }

    @computed('loginForm')
    get formIsEmpty() {
        return isEmpty(this.loginForm.userName.state) && 
            isEmpty(this.loginForm.userPassword.state);
    }

    @action
    async login() {
        try {
            await this.session.authenticate('authenticator:custom', 
                this.loginForm.userName.state, 
                this.loginForm.userPassword.state
            );

            this.loginForm.set({
                userName: '',
                userPassword: '',
                errorMessage: ''
            });

            try {
                await this.savedTransition.retryTranstiion();
            } catch (error) {
                this.transitionToRoute('home');
            }
        } catch (error) {
            this.loginForm.errorMessage.set(error);
        }  
    }
}
