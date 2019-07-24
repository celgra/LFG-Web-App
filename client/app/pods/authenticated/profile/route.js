import Route from '@ember/routing/route';
import { inject as service } from '@ember-decorators/service';

export default class AuthenticatedProfileRoute extends Route {
    @service session;

    model() {
        return this.store.find('users', this.session.data.authenticated.user.id);
    }
}
