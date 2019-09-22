import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { action, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { create, Store } from '@microstates/ember';

export default class AuthenticatedProfileController extends Controller {
    @service session;
    @service router;

    @computed
    get isInEditMode() {
        return Store(create(Boolean, false), next => this.set('isInEditMode', next));
    }
    set isInEditMode(state) {
        return state;
    }

    @task(function * (editForm) {
        try {
            yield this.store
                .update(
                    'users', 
                    this.session.data.authenticated.user.id, 
                    { ...editForm }
            );
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        } catch (error) {
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        }
    }) saveProfileTask;

    @action
    toggleEditMode() {
        this.isInEditMode.toggle();
    }

    @action
    saveProfile(editForm) {
        this.saveProfileTask.perform(editForm);
    }
}