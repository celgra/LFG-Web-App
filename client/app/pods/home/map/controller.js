import Controller from '@ember/controller';
import { computed } from '@ember-decorators/object';

export default class HomeMapController extends Controller {
    @computed('model')
    get geo() {
        let [lng, lat] = this.model.geo.coordinates;
        return {
            lat, 
            lng
        }
    }
}
