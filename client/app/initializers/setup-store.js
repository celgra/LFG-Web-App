export function initialize(application) {
  application.inject('route', 'store', 'service:store');
}

export default {
  initialize
};
