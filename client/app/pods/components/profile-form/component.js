import Component from '@ember/component';
import { computed, action } from '@ember-decorators/object';

export default class ProfileFormComponent extends Component { 
    //props
    bio = '';
    save = null;
    toggleEdit = null;
}