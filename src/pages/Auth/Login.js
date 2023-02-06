import styles  from './Login.module.css'

import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

import Input from '../../components/form/Input'
import Submit from '../../components/form/Submit'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState("");

    const {login,error: authError, loading} = useAuthentication();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setError('')
  
      const user = {
        email,
        password
      }  

      const res = await login(user)
    };
  
    useEffect(() => {
      if(authError) {
          setError(authError)
          setTimeout(() => {
            setError('')
          }, 3000);
      }
    },[authError])
  return (
    
    <div className={styles.login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <Input
          type="email"
          name="email"
          spanText="Email:"
          placeholder="E-mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          spanText="Password:"
          placeholder="User password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loading && <Submit value="Login" />}
        {loading && <Submit value="Wait..." disabled />}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login