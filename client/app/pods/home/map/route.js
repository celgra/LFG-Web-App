import Route from '@ember/routing/route';

export default class HomeMapRoute extends Route {
    model({ venue_id }) {
        return this.store.find('venues', venue_id);
    }
}
