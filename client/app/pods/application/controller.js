import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
    @service session;
    @service router;
    @service flashMessages;

    @action
    logOut() {
        this.session.invalidate();
        if (this.router.currentRouteName.includes('authenticated')) {
            this.router.transitionTo('login');
        }
    }
}