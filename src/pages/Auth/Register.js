import styles from "./Register.module.css";

import { useState, useEffect } from "react";

import Input from "../../components/form/Input";
import Submit from "../../components/form/Submit";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const {createUser, error: authError, loading} = useAuthentication();
  
  const message = (text) => {
    setError(text)
    setTimeout(() => {
      setError('')
    }, 3000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('')

    const user = {
      name,
      email,
      password
    }

    // Remover os espaços em branco antes e depois
    setName(name.trim());
    setEmail(email.trim());

    // Verificar se o campo nome está vazio
    if (name === "" || typeof name == undefined || typeof name == null) {
      message("Campo nome não pode ser vazio!")
      return;
    }

    // Limpar o nome de caracteres especiais(Apenas letras)
    setName(name.replace(/[^A-zÀ-ú\s]/gi, ""));

    // name validation
    if(!name.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
      message('Nome inválido!')
      return;
    }

    // Verificar se o campo email está vazio
    if (email === "" || typeof email == undefined || typeof email == null) {
      message("Campo email não pode ser vazio!")
      return;
    }

    // email validation
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      message('Email inválido!')
      return;
    }

    // password validation
    if(password !== confirmPassword) {
      message("As senhas precisam ser iguais!")
      return;
    }

    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
      message('A senha precisa conter: No mínimo 8 caracteres, com pelo menos uma letra, um número e um caractere especial!')
      return;
    }

    const res = await createUser(user) 
  };

  useEffect(() => {
    if(authError) {
      setError(authError)
      setTimeout(() => {
        setError('')
      }, 2500);
    }
  },[authError])
  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="Name"
          spanText="Name:"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          name="confirmPassword"
          spanText="Confirm password:"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!loading && <Submit value="Register" />}
        {loading && <Submit value="Wait..." disabled />}

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
