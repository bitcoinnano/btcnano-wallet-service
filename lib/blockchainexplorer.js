'use strict';

var _ = require('lodash');
var $ = require('preconditions').singleton();
var log = require('npmlog');
log.debug = log.verbose;

var Insight = require('./blockchainexplorers/insight');

function BlockChainExplorer(opts) {
  $.checkArgument(opts);
  if(!opts.hasOwnProperty('url'))
    throw new Error('Missing URL in config file');
  if(!opts.hasOwnProperty('provider'))
    throw new Error('Missing provider in config file');
  if(!opts.hasOwnProperty('network'))
      throw new Error('Missing network in config file');

  var url = opts.url;
  var provider = opts.provider || 'insight';
  var network = opts.network || 'main';

  switch (provider) {
    case 'insight':
      return new Insight({
        network: network,
        url: url,
        apiPrefix: opts.apiPrefix,
        userAgent: opts.userAgent,
      });
    default:
      throw new Error('Provider ' + provider + ' not supported.');
  };
};

module.exports = BlockChainExplorer;
