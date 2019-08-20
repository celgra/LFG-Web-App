import Component from '@ember/component';
import { classNames } from '@ember-decorators/component';
import { computed, action } from '@ember/object';

@classNames('card')
export default class LfCardComponent extends Component {
    showMore = false;

    @computed('showMore', 'event.games[]')
    get gamesToDisplay() {
        if (this.showMore) {
            return this.event.games;
        } else {
            return this.event.games.slice(0, 3);
        }
    }

    @action
    toggleShowMore() {
        this.toggleProperty('showMore');
    }
}
