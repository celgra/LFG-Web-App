import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
    @service session;
    @service savedTransition;

    beforeModel(transition) {
        if (!this.session.isAuthenticated) {
            this.savedTransition.saveTransition(transition);
            this.transitionTo('login');
        }
    }
}
