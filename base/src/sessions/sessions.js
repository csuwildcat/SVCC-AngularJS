'use strict';

exports = module.exports = function (Model, $q) {
  return Model.extend({
    $levelName: function () {
      switch (this.sessionLevelId) {
        case 1:
          return 'Beginner';
        case 2:
          return 'Intermediate';
        case 3:
          return 'Advanced';
        default:
          return 'Unknown';
      }
    }
  },
  {
    url: '/rest/sessions',
    findByUrl: function (url) {
      return this.find(function (session) {
        return session.sessionUrl === url;
      });
    },
    fetchByUrl: function (url) {
      return $q.when(this.findByUrl(url) || this.fetchOne(url));
    }
  });
};
exports.$inject = ['Model', '$q'];