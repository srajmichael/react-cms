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
      }).then((res)=>{
         setIsLoading(false);
         console.log(res)
      });

   }

   const test = async (e) => {
      e.preventDefault();
      let res = await api.get('/check-user-session')
      .then(data=>{
         console.log(data)
      })
   }


   return(
      <form onSubmit={handleOnSubmit}>
         <button onClick={test}>Test</button>
         { 
         isLoading 
         &&
         <p className='form-loading'>Loading</p>
         }
         <input type='text' placeholder='Email' value={email} onChange={handleOnChange.bind(null,'email')}/>
         <input type='password' placeholder='Password' value={password} onChange={handleOnChange.bind(null,'password')}/>
         <input type='submit' value='Submit'/>
      </form>
   )
}

export default LoginForm;