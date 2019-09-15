import Component from '@ember/component';
import { action } from '@ember/object';
import { oneWay } from '@ember/object/computed';

export default class ProfileFormComponent extends Component { 
    /*
    props
        bio: String
        onSave: Function
        toggleEdit: Boolean
    */

    @oneWay('bio') editedBio;

    @action save(editForm) {
        this.onSave(editForm);
    }

    @action toggle() {
        this.toggleEdit();
    }
}