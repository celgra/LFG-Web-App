import Route from '@ember/routing/route';

export default class HomeMapRoute extends Route {
    model({ venueId }) {
        return this.store.find('venues', venueId);
    }
}
