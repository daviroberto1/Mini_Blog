import {db} from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error,setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled]= useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
                await updateProfile(user,{
                    name: data.name
                })
                setLoading(false);
                return user;
        }catch(err) {
            console.log(err);
            console.log(typeof err.message);
            let systemErrorMessage;

            if(err.message.includes('Password')){
                systemErrorMessage = 'A senha pecisa conter pelo menos seis caracteres'
            } else if(err.message.includes("email-already")){
                systemErrorMessage = 'E-mail já cadastrado!'
            }else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente novamente mais tarde!'
            }
            setError(systemErrorMessage)
        }   
        setLoading(false);
    }
    // logout

    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    // login 
    const login = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            await signInWithEmailAndPassword(auth,data.email,data.password)
            setLoading(false)
        } catch(err) {
            let systemErrorMessage;

            if(err.message.includes('user-not-found')){
                systemErrorMessage = 'Usuário não encontrado!'
            } else if(err.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta!'
            }else {
                systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde!'
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    },[])
    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}