import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service'
import { action } from '@ember-decorators/object';

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