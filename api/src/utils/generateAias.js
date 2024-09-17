//generateAlias
export const generateAlias = (first_name, last_name) => {
    let alias;
  
    function generateRandomString(length) {
      // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-.';
  
  
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
  
      }
      return result;
    }
  
    if (first_name && last_name) {
      // alias = `${first_name.charAt(0)}.${last_name.substring(0, Math.min(last_name.length, 8))}`;
      alias = `${first_name.charAt(0)}${last_name.substring(0, Math.min(last_name.length, 8))}.noabank`;
  
      //agregamos caracteres aleatorios hasta completar la longitud deseada
      while (alias.length < 6) {
        alias += generateRandomString(1);
      }
    } else {
      alias = `${first_name.substring(0, Math.min(first_name.length, 8))}.noabank`;
      //agregamos caracteres aleatorios hasta completar la longitud deseada
      while (alias.length < 6) {
        alias += generateRandomString(1);
      }
    }
    // return alias;
    return alias.toLowerCase()
  }