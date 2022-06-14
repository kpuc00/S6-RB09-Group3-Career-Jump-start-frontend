export function makeUsername(char_length, num_length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var numbers = '0123456789'
  for ( let i = 0; i < char_length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
        characters.length));
  }
  for ( let i = 0; i < num_length; i++ ) {
    result += numbers.charAt(Math.floor(Math.random() *
        numbers.length));
  }
  return result;
}

export function makePassword(strength) {
  let result = ''
  for ( let i = 0; i < strength; i++ ){
    result += crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
  }
  return result;
}
