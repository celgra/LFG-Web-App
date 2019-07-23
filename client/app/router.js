import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signup');
  this.route('login');
  this.route('authenticated', { path: '' }, function() {
    this.route('profile');
  });
  this.route('home', { path: '/' }, function() {
    this.route('map', { path: '/map/:venue_id' });
  });
});

export default Router;
