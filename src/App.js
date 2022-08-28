import './App.css';
import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";

function App() {

  const schema = yup.object().shape({
    username: yup.string().required("Input required").min(3, "Minimum of 3 characters"),
    email: yup.string().email().required("Input required"),
    age: yup.number().typeError('Invalid input').positive().min(18,"Minimum age is 18").integer().required("Input required"),
    password: yup.string().min(8,"Min of 8 characters").required("Input required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required("Input required")
  });

    const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  function formSubmitted(data) {
    
  }
  return (
    <div className="App">
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(formSubmitted)}>
          <div className='input'>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Enter Username' {...register("username")}/>
            <small>{errors.username?.message}</small>
          </div>
          <div className='input'>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder='Enter Email' {...register("email")}/>
            <small>{errors.email?.message}</small>
          </div>
          <div className='input'>
            <label htmlFor="age">Age</label>
            <input type="number" placeholder='Enter Age' {...register("age")}/>
            <small>{errors.age?.message}</small>
          </div>
          <div className='input'>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Enter Password' autoComplete='password' {...register("password")}/>
            <small>{errors.password?.message}</small>
          </div>
          <div className='input'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder='Confirm Password' autoComplete='password' {...register("confirmPassword")}/>
            <small>{errors.confirmPassword?.message}</small>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
