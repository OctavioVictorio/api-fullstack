import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    
    const decodeUser = (token)=>{
        try {
            const decoded = jwtDecode(token);
            if (!decoded.exp || decoded.exp * 1000 < Date.now()){
                return null;
            }
            return {
                id: decoded.user.id,
                nombre: decoded.user.nombre,
                email: decoded.user.email,
                edad: decoded.user.edad,
                rol: decoded.user.rol
            }
        } catch (error) {
            return null;
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (!token)return
        
        const userLogued = decodeUser(token)
        if (userLogued) {
            setUser(userLogued)
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            console.log('Usuario cargado desde localStorage:', userLogued);
        }else{
            localStorage.removeItem('token')
            delete axios.defaults.headers.common["Authorization"]
            setUser(null)
        }
        setLoading(false)
    },[])

    const login = async (credentials)=>{
        try {
            const response = await axios.post('http://localhost:3000/auth/login',credentials)
            console.log(response);
            if(response.status === 200){
                const token = response?.data?.token
                localStorage.setItem('token', token)
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                const userLogued = decodeUser(token)
                if (!userLogued) {
                    localStorage.removeItem('token')
                    delete axios.defaults.headers.common["Authorization"]
                    alert("Token inválido o expirado")
                    return
                }
                setUser(userLogued)
                navigate('/')
                console.log("Usuario logueado:", userLogued);
            }else{
                alert('Las credenciales son erroneas')
            }
        } catch (error) {
            console.log(error);
            alert("Hubo error al iniciar sesion")
        }
    }

    const register = async (userData) =>{
        try {
            const response = await axios.post('http://localhost:3000/auth/register', userData)
            if(response.status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("Hubo un error al registrar el usuario")
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        delete axios.defaults.headers.common["Authorization"]
        navigate('/inicio-sesion')
    }

    return(
        <AuthContext.Provider value={{user, setUser, register, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}