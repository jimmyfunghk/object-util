# object-util
A JavaScript object utility library

## Functions
| Name | Description  | Remarks |
| ---- | ------------| ------- |
| function clone(o) | To clone an object | |
| function isEmpty(o) | To check whether the object is empty | |
| function getObjectType(o) | To get the type of an object | only support `object, array, number, string, undefined, boolean, date, map` |
| function getEmptyValue(objectType) | To return an empty value based on the object type you given | only support `object, array, number, string, undefined, boolean, date, map` |
| function isTheSameObject(o1, o2, skipFields = []) | To check whether the two objects you provided are the same | |
| function getValueFromObject(o, t) | To object the value in the object safely | ||