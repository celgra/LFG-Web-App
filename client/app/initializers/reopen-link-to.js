import LinkComponent from '@ember/routing/link-component';

export function initialize() {
  LinkComponent.reopen({
    activeClass: 'is-active'
  });
}

export default {
  initialize
};
