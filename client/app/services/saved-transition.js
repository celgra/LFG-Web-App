import Service from '@ember/service';
import { reject } from 'rsvp';

export default class SavedTransitionService extends Service {
    transition = null;

    async retryTranstiion() {
        try {
            if (this.transition) {
                let retry = await this.transition.retry();
                this.clearTransition();
                return retry;
            } else {
                return reject('noSavedTransition');
            }
        } catch (error) {
            return error;
        }
    }

    saveTransition(transition) {
        this.set('transition', transition);
    }

    clearTransition() {
        this.set('transition', null);
    }
}