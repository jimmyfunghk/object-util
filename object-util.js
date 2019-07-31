"use strict";

/**
 * Check whether it is an empty object
 * @param {*} o, The object needed to be verified
 * @returns {boolean}, The result of the empty verification
 */
function isEmpty(o) {
  if (o === null || o === undefined || o === '' || typeof o === 'undefined') {
    return true;
  }
  const objectType = getObjectType(o);
  switch (objectType) {
    case 'object':
      return Object.keys(o).length === 0;
    case 'array':
      return o.length === 0;
    case 'string':
      return o.trim().length === 0;
    case 'map':
      console.log(o);
      return o.size === 0;
    case 'htmlElement':
      return typeof o.click === 'undefined';
    default:
      return false;
  }
}

/*
* use to obtain the type of the object
* @param {*} o, The object needed to be verified
* @returns {string} object, array, number, string, undefined, boolean, date, map, htmlElement
* */
function getObjectType(o) {
  if (Array.isArray(o)) return 'array';
  else if (o instanceof Map) return 'map';
  else if (o instanceof Date) return 'date';
  // else if (o instanceof HTMLElement) return 'htmlElement';
  return typeof o;
}

/*
* get the empty value of a particular object type
* */
function getEmptyValue(objectType) {
  switch (objectType) {
    case 'string':
      return '';
    case 'object':
      return {};
    case 'array':
      return [];
    case 'number':
      return NaN;
    case 'date':
      return new Date();
    case 'map':
      return new Map();
    case 'htmlElement':
      return new HTMLElement();
    default:
      return null;
  }
}

function getValueFromObject(o, t) {
  if (isEmpty(o) || isEmpty(t) || getObjectType(o) !== 'object') return null;

  const keyArr = t.split('.');
  const firstKey = keyArr.splice(0, 1); // remove the first key from the array

  if (isEmpty(keyArr)) return o[firstKey.toString()];

  return getValueFromObject(o[firstKey.toString()], keyArr.join('.'));
}

// get a deep copy of an object
function clone(o) {
  if (isEmpty(o) || typeof o !== 'object') return o;

  if (o instanceof Date) {
    return new Date(o);
  }

  if (o instanceof Map) {
    return new Map(o);
  }

  if (o instanceof Array) {
    return JSON.parse(JSON.stringify(o));
  }

  if (o instanceof Object) {
    const copy = o.constructor();
    for (let attr in o) {
      if (o.hasOwnProperty(attr)) copy[attr] = o[attr];
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

// check whether the two object are the same or not
function isTheSameObject(o1, o2, skipFields = []) {
  if ((!o1 && o2) || (o1 && !o2)) {
    return false;
  } else if (typeof o1 !== typeof o2) {
    return false;
  } else if (typeof o1 === 'object' && Array.isArray(o1) !== Array.isArray(o2)) {
    return false;
  }

  if (typeof o1 === 'string') {
    return o1.toLowerCase().trim() === o2.toLowerCase().trim();
  } else if (Array.isArray(o1)) {
    return o1.every(item => o2.includes(item)) && o1.length === o2.length;
  } else if (typeof o1 === 'object') {
    return checkIfSameObject();
  } else {
    return o1 === o2;
  }

  // inner function to specifically check object
  function checkIfSameObject() {
    if (Object.keys(o1).length !== Object.keys(o2).length) {
      return false;
    }
    if (Object.keys(o1).some(o1Key => !Object.keys(o2).includes(o1Key))) {
      return false;
    }
    return Object.keys(o1)
      .filter(key => !skipFields.includes(key))
      .every(o1Key => {
        const o1Value = o1[o1Key];
        return isTheSameObject(o1Value, o2[o1Key]);
      });
  }
}

exports.clone = clone;
exports.isEmpty = isEmpty;
exports.getObjectType = getObjectType;
exports.getEmptyValue = getEmptyValue;
exports.isTheSameObject = isTheSameObject;
exports.getValueFromObject = getValueFromObject;
