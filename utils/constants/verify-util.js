const MD5 = require('MD5');
import * as keyMap from './key-map.js';
export const sortParam = (params) => {
  const secretParams = {};
  Object.keys(params).forEach((key) => {
    secretParams[key] = params[key];
  });
  secretParams.appSecret = keyMap.appSecret;
  const keyArr = Object.keys(secretParams);
  keyArr.sort();
  let temp = '';
  Object.keys(keyArr).forEach((value, index) => {
    if (secretParams[keyArr[index]]) {
      temp = `${temp}&${keyArr[index]}=${secretParams[keyArr[index]]}`;
    } else {
      temp = `${temp}&${keyArr[index]}=`;
    }
  });
  temp = temp.substring(1);
  const encryptParm = MD5(temp);
  delete secretParams.appSecret;
  secretParams.appSign = encryptParm.toLocaleUpperCase();
  return secretParams;
}