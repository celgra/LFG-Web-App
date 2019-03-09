import Controller from '@ember/controller';
import { inject as service } from '@ember-decorators/service'
import { action } from '@ember-decorators/object';

export default class ApplicationController extends Controller {
    @service session;

    @action
    logOut() {
        this.session.invalidate();
    }
}