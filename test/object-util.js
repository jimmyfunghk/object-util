'use strict';

const ObjectUtil = require('../object-util');

const chai = require('chai');
const should = chai.should();


describe('Testing clone function in object-util', () => {
  it('should return a same object', () => {
    const originData = getTestingData();
    const clonedData = ObjectUtil.clone(originData);

    const isSameData = JSON.stringify(originData) === JSON.stringify(clonedData);

    return isSameData.should.be.equal(true);
  });

  it('should return a same time', () => {
    const originData = new Date();
    const clonedData = ObjectUtil.clone(originData);

    const isSameData = originData.getTime() === clonedData.getTime()

    return isSameData.should.be.equal(true);
  });

  it('should return a same Map', () => {
    const originData = new Map();
    originData.set('name', 'Jimmy');
    const clonedData = ObjectUtil.clone(originData);

    const isSameData = originData.get('name') === clonedData.get('name');

    return isSameData.should.be.equal(true);
  });

  it('should clone with deep copy', () => {
    const originData = getTestingData();
    const clonedData = ObjectUtil.clone(originData);

    clonedData.favouriteLanguage = 'java';
    const isDeepCopy = clonedData.favouriteLanguage !== originData.favouriteLanguage;

    return isDeepCopy.should.be.equal(true)
  });

  function getTestingData() {
    return {
      name: {
        familyName: 'Fung',
        givenName: 'Jimmy'
      },
      favouriteLanguage: 'javascript'
    };
  }
});

describe('Testing isEmpty function in object-util', () => {
  it('should return true if passing null', () => ObjectUtil.isEmpty(null).should.be.equal(true));
  it('should return true if passing \'\'', () => ObjectUtil.isEmpty('').should.be.equal(true));
  it('should return true if passing empty space', () => ObjectUtil.isEmpty(' ').should.be.equal(true));
  it('should return true if passing noting', () => ObjectUtil.isEmpty().should.be.equal(true));
  it('should return true if passing empty array', () => ObjectUtil.isEmpty([]).should.be.equal(true));
  it('should return false if passing 0', () => ObjectUtil.isEmpty(0).should.be.equal(false));
});

describe('Testing getObjectType function in object-util', () => {
  it('should return object if passing null', () => ObjectUtil.getObjectType(null).should.be.equal('object'));
  it('should return object if passing an object', () => ObjectUtil.getObjectType({name: 'Jimmy'}).should.be.equal('object'));
  it('should return array if passing an empty array', () => ObjectUtil.getObjectType([]).should.be.equal('array'));
  it('should return number if passing 0', () => ObjectUtil.getObjectType(0).should.be.equal('number'));
  it('should return string if passing an empty string', () => ObjectUtil.getObjectType('').should.be.equal('string'));
  it('should return undefined if passing nothing', () => ObjectUtil.getObjectType().should.be.equal('undefined'));
  it('should return boolean if passing true', () => ObjectUtil.getObjectType(true).should.be.equal('boolean'));
});

describe('Testing getEmptyValue function in object-util', () => {
  it('should return {} if passing object', () => ObjectUtil.getEmptyValue('object') === {});
  it('should return an empty array if passing array', () => ObjectUtil.getEmptyValue('array') === []);
  it('should return Nan if passing number', () => Number.isNaN(ObjectUtil.getEmptyValue('number')));
  it('should return an empty string if passing string', () => ObjectUtil.getEmptyValue('string').should.be.equal(''));
  it('should return null if passing nothing', () => ObjectUtil.getEmptyValue() === null);
  it('should return null if passing boolean', () => ObjectUtil.getEmptyValue('boolean') === null);
});

describe('Testing isTheSameObject function in object-util', () => {
  it('should return false if comparing null and undefined', () => ObjectUtil.isTheSameObject(null).should.be.equal(false));
  it('should return false if comparing false and 0', () => ObjectUtil.isTheSameObject(false, 0).should.be.equal(false));
  it('should return false if comparing empty string and null', () => ObjectUtil.isTheSameObject('', null).should.be.equal(false));
  it('should return false if comparing empty array and empty object', () => ObjectUtil.isTheSameObject([], {}).should.be.equal(false));
  it('should return false if comparing \'\' and \' \'', () => ObjectUtil.isTheSameObject('', ' ').should.be.equal(false));
  it('should return false if comparing two different objects', () => {
    const case1 = ObjectUtil.isTheSameObject(
      {name: 'Jimmy', job: 'Programmer', age: 25},
      {job: 'Programmer', name: 'Jimmy'}).should.be.equal(false);
    const case2 = ObjectUtil.isTheSameObject(
      {name: 'Jimmy', job: 'Programmer', age: 25},
      {job: 'Programmer', name: 'Jimmy', AGE: 25}).should.be.equal(false);
    return case1 && case2;
  });
  it('should return true if comparing two same object', () => ObjectUtil.isTheSameObject({name: 'Jimmy'}, {name: 'Jimmy'}).should.be.equal(true));
  it('should return true if comparing two same object with different order of attributes', () => {
    return ObjectUtil.isTheSameObject(
      {name: 'Jimmy', job: 'Programmer'},
      {job: 'Programmer', name: 'Jimmy'}).should.be.equal(true);
  });
});


describe('Testing getValueFromObject function in object-util', () => {
  it('should return null if passing noting inside the function', () => ObjectUtil.getValueFromObject() === null);
  it('should return null if passing an array', () => ObjectUtil.getValueFromObject([], 'a') === null);
  it('should return null if not found the targetKey', () => ObjectUtil.getValueFromObject({'a': 'a'}, 'a.b.b.b') === null);
  it('should return the expected value if passing a complex targetKey inside the function', () => {
    const data = {
      name: {
        givenName: {
          firstDigit: 'J',
          fullGivenName: 'Jimmy'
        }
      }
    };
    return ObjectUtil.getValueFromObject(data, 'name.givenName.fullGivenName').should.be.equal('Jimmy');
  });
});