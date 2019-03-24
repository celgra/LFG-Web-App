import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';
import { isEmpty } from '@ember/utils';

export default class LoginController extends Controller {
    userName = '';
    userPassword = '';

    @service store;
    @service session;

    @computed('userName', 'userPassword')
    get formIsEmpty() {
        return isEmpty(this.userName) && isEmpty(this.userName);
    }

    @action
    async login() {
        try {
            await this.session.authenticate('authenticator:custom', 
                this.userName, 
                this.userPassword
            );

            this.setProperties({
                userName: '',
                userPassword: '',
                errorMessage: ''
            });
            this.transitionToRoute('home');
        } catch (error) {
            this.set('errorMessage', error);
        }  
    }
}
