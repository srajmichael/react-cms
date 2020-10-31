exports.passwordValidationInformation = (pass, passConf = null, compareBoth = false) => {
   const results = {
      errors:[],
      valid: true
   }
   //check if comparing 2 passwords
   if(compareBoth){
      if(pass !== passConf){
         results.errors.push('Password and confirmation do not match');
         results.valid = false;
      }
   }


   return results;
}