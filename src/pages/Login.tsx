import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Login() {

    const { login, token } = useAuth()

    useEffect(() => {
        if (token) {
            window.location.href = "/"
        }
    }, [token])

    const handleLogin = (e: any) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        login(email, password)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border border-gray-500/30 rounded-xl p-20 shadow-2xl w-3/8 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center mb-10">Bolsa de Trabajo UACh</h1>
                <img src="/src/assets/uachLogo.png" alt="uachLogo" className="w-45 h-45 mb-10" />
                <form className="flex flex-col w-full gap-1" onSubmit={handleLogin}>
                    <label htmlFor="email">Usuario</label>
                    <input type="text" placeholder="Usuario" id="email" className="border border-gray-500/30 rounded-lg p-2 outline-none focus:border-[#D5A521] transition-colors duration-200 w-full mb-4" />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" placeholder="Contraseña" id="password" className="border border-gray-500/30 rounded-lg p-2 outline-none focus:border-[#D5A521] transition-colors duration-300 w-full mb-8" />
                    <button type="submit" className="border rounded-lg p-2 cursor-pointer bg-[#D5A521] hover:bg-[#967518] text-white font-bold">Entrar</button>
                </form>
            </div>
        </div>
    );
}