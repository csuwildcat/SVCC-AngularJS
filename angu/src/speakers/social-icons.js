'use strict';

import template from './social-icons.html';

export default function () {
  return {
    restrict: 'EA',
    template,
    scope: {
      speaker: '='
    },
    controller: SpeakerSocialIconController,
    controllerAs: 'social',
    bindToController: true
  };
}

function SpeakerSocialIconController () {}
SpeakerSocialIconController.prototype.has =
SpeakerSocialIconController.prototype.url = function (network) {
  return this.speaker[network.property];
};
SpeakerSocialIconController.prototype.has = function (network) {
  return this.speaker[network.property];
};
SpeakerSocialIconController.prototype.networks = [
  {
    name: 'Twitter',
    property: 'twitterUrl',
    class: 'twitter' 
  },
  {
    name: 'Facebook',
    property: 'facebookUrl',
    class: 'fb'
  },
  {
    name: 'Google+',
    property: 'googlePlusUrl',
    class: 'gplus'
  },
  {
    name: 'LinkedIn',
    property: 'linkedInUrl',
    class: 'linkedin'
  }
];
