'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();

var Address = require('../../lib/model/address');

describe('Address', function() {
  describe('#create', function() {
    it('should create main address', function() {
      var x = Address.create({
        address: 'XyeQcLRXz116nTgjhEE7cLS321C94DNtPv',
        walletId: '123',
        isChange: false,
        path: 'm/0/1',
        publicKeys: ['123', '456'],
      });
      should.exist(x.createdOn);
      x.network.should.equal('main');
    });
    it('should create testnet address', function() {
      var x = Address.create({
        address: 'yjNjJx2J3tns2MESsyK4KKZj356fPEimMm',
        walletId: '123',
        isChange: false,
        path: 'm/0/1',
        publicKeys: ['123', '456'],
      });
      x.network.should.equal('testnet');
    });
  });
  describe('#derive', function() {
    it('should derive multi-sig P2SH address', function() {
      var address = Address.derive('wallet-id', 'P2SH', [{
        xPubKey: 'xpub686v8eJUJEqxzAtkWPyQ9nvpBHfucVsB8Q8HQHw5mxYPQtBact2rmA8wRXFYaVESK8f7WrxeU4ayALaEhicdXCX5ZHktNeRFnvFeffztiY1'
        // PubKey(xPubKey/0/0) -> 03fe466ea829aa4c9a1c289f9ba61ebc26a61816500860c8d23f94aad9af152ecd
      }, {
        xPubKey: 'xpub68tpbrfk747AvDUCdtEUgK2yDPmtGKf7YXzEcUUqnF3jmAMeZgcpoZqgXwwoi8CpwDkyzVX6wxUktTw2wh9EhhVjh5S71MLL3FkZDGF5GeY'
        // PubKey(xPubKey/0/0) -> 03162179906dbe6a67979d4f8f46ee1db6ff81715f465e6615a4f5969478ad2171
      }], 'm/0/0', 1, 'main', false);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('7q5f2uj8RTxtuCVWaZBrhbPgaRdDzkgnzn');
      address.network.should.equal('main');
      address.isChange.should.be.false;
      address.path.should.equal('m/0/0');
      address.type.should.equal('P2SH');
    });
    it('should derive 1-of-1 P2SH address', function() {
      var address = Address.derive('wallet-id', 'P2SH', [{
        xPubKey: 'xpub686v8eJUJEqxzAtkWPyQ9nvpBHfucVsB8Q8HQHw5mxYPQtBact2rmA8wRXFYaVESK8f7WrxeU4ayALaEhicdXCX5ZHktNeRFnvFeffztiY1'
        // PubKey(xPubKey/0/0) -> 03fe466ea829aa4c9a1c289f9ba61ebc26a61816500860c8d23f94aad9af152ecd
      }], 'm/0/0', 1, 'main', false);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('7cFh9KuqgGxchHDycum2dLxXMDTJ9ganzL');
      address.network.should.equal('main');
      address.isChange.should.be.false;
      address.path.should.equal('m/0/0');
      address.type.should.equal('P2SH');
    });
    it('should derive 1-of-1 P2PKH address', function() {
      var address = Address.derive('wallet-id', 'P2PKH', [{
        xPubKey: 'xpub686v8eJUJEqxzAtkWPyQ9nvpBHfucVsB8Q8HQHw5mxYPQtBact2rmA8wRXFYaVESK8f7WrxeU4ayALaEhicdXCX5ZHktNeRFnvFeffztiY1'
        // PubKey(xPubKey/1/2) -> 0232c09a6edd8e2189628132d530c038e0b15b414cf3984e532358cbcfb83a7bd7
      }], 'm/1/2', 1, 'main', true);
      should.exist(address);
      address.walletId.should.equal('wallet-id');
      address.address.should.equal('XqknWxoSxUf36MAzMDqcvpAHgEyudx7kKf');
      address.network.should.equal('main');
      address.isChange.should.be.true;
      address.path.should.equal('m/1/2');
      address.type.should.equal('P2PKH');
    });
  });
});
