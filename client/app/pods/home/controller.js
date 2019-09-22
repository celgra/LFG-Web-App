import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

import { create, Store } from '@microstates/ember';

  class Location {
      latitude = Number;
      longitude = Number;
  }
  
export default class HomeController extends Controller {
    @service flashMessages;

    queryParams = ['page'];
    page = 1;

    @computed
    get location() {
        return Store(create(Location), next => this.set('location', next));
    }
    set location(state) {
        return state;
    }

    processLocation(position) {
        let { latitude, longitude } = position.coords;
        this.location.set({ latitude, longitude });
    }

    @computed('model.totalCount')
    get isNextDisabled() {
        return (((this.page - 1) * 10) + this.model.events.length) >= 
            this.model.totalCount;
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
