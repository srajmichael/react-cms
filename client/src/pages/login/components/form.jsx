import React, {useState} from 'react';
import axios from 'axios';

const api = axios.create({
   baseURL: '/'
})

const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const handleOnChange = (type, event) =>{
      switch(type){
         case 'email':
            setEmail(event.target.value);
            break;
         case 'password':
            setPassword(event.target.value);
            break;
         default:
            break;
      }
   }

   const handleOnSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      let res = await api.post('/validate-user',{
         email: email,
         password: password
      });
      console.log(res)
   }


   return(
      <form onSubmit={handleOnSubmit}>
         { 
         isLoading 
         &&
         <p className='form-loading'>Loading!</p>
         }
         <input type='text' placeholder='Email' value={email} onChange={handleOnChange.bind(null,'email')}/>
         <input type='password' placeholder='Password' value={password} onChange={handleOnChange.bind(null,'password')}/>
         <input type='submit' value='Submit'/>
      </form>
   )
}

export default LoginForm;