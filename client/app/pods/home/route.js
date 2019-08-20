import Route from '@ember/routing/route';

export default class HomeRoute extends Route {
    queryParams = {
        page: {
          refreshModel: true
        }
    };

    model(params) {
        return this.store.query('events', params);
    }
}
