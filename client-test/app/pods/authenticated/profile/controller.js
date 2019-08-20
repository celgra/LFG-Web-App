import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
import { action } from '@ember/object';

const editProfileForm = { bio: '' };

export default class AuthenticatedProfileController extends Controller {
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
            await this.store
                .update('users', this.session.data.authenticated.user.id, { ...editForm });
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        } catch (error) {
            this.toggleEditMode();
            this.set('model', { ...this.model, ...editForm });
        }
    }
}