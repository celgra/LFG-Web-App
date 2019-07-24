import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember-decorators/service'
import { action } from '@ember-decorators/object';

const editProfileForm = { bio: '' };

export default class AuthenticatedProfileController extends Controller {
    @service store;
    @service session;
    @service router;

    isInEditMode = false;

    editForm = { ...editProfileForm };

    resetController() {
        this.set('editForm', { ...editProfileForm });
    }

    @action
    toggleEditMode() {
        if (this.isInEditMode) {
            this.resetController();
        }
        this.toggleProperty('isInEditMode');
    }

    @action
    async saveProfile(editForm) {
        try {
            let resp = await this.store
                .update('users', this.session.data.authenticated.user.id, { ...editForm });
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        } catch (error) {
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        }
    }
}