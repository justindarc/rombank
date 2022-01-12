/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const compactMap = (array: any[], callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any): any[] => {
  const newArray = [];
  array.forEach((value, index, array) => {
    const mapResult = callbackfn.call(thisArg ?? this, value, index, array);
    if (mapResult !== undefined) {
      newArray.push(mapResult);
    }
  });
  return newArray;
};
