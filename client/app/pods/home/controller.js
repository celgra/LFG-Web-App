import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class HomeController extends Controller {
    @service flashMessages;

    queryParams = ['page'];
    page = 1;

    processLocation(position) {
        let { latitude, longitude } = position.coords;
        this.set('location', { latitude, longitude });
    }

    @action
    locate() {
        if (navigator.geolocation) {
            navigator
            .geolocation
            .getCurrentPosition((position) => this.processLocation(position));
          } else {
            this.flashMessages.add({
                message: 'Geolocation feature is not avaliable on your browser',
                class: 'notification is-danger'
              });
          }
    }

    @action
    nextPage() {
        this.incrementProperty('page');
    }

    @action
    prevPage() {
        if (this.page > 1) {
            this.decrementProperty('page');
        }
    }
}
