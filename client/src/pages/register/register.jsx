import React, {useState} from 'react';
import axios from 'axios';

const api = axios.create({
   baseURL: '/'
})



const RegistrationForm = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [pass, setPass] = useState('');
   const [confPass, setConfPass] = useState('');
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState([]);

   const handleOnSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      let resolution = await api.post('/register-user',{
         firstName,
         lastName,
         email: email,
         password: pass,
         confirmPassword: confPass
      }).then((res)=>{
         setLoading(false);
         console.log(res)
      });



   }

   const handleOnChange = (type, e) => {
      switch(type){
         case 'firstName':
            setFirstName(e.target.value);
            break;
         case 'lastName':
            setLastName(e.target.value);
            break;
         case 'email': 
            setEmail(e.target.value);
            break;
         case 'pass':
            setPass(e.target.value);
            break;
         case 'confPass':
            setConfPass(e.target.value);
            break;
         default:
            break;
      }
   }


   return(
      <form onSubmit={handleOnSubmit}>
         <input type='text' name='first_name' placeholder='First Name' value={firstName} onChange={handleOnChange.bind(null,'firstName')}/>
         <input type='text' name='last_name' placeholder='Last Name' value={lastName} onChange={handleOnChange.bind(null,'lastName')}/>
         <input type='text' name='email' placeholder='Email' value={email} onChange={handleOnChange.bind(null,'email')}/>
         <input type='password' name='password' placeholder='Password' value={pass} onChange={handleOnChange.bind(null,'pass')}/> 
         <input type='password' name='confirm_password' placeholder='Confirm Password' value={confPass} onChange={handleOnChange.bind(null,'confPass')}/> 
         <input type='submit' value='Submit'/>
      </form>
   )
}

export default RegistrationForm;