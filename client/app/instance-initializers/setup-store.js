export function initialize(appInstance) {
  appInstance.inject('route', 'store', 'service:store');
}

export default {
  initialize
};
