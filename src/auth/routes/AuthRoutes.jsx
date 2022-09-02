import { Route, Routes, Navigate } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route 
                path='login' 
                element={ <LoginPage /> }
            />

            <Route
                path='register'
                element={ <RegisterPage />}
            />

            {/* Redireccionar cuando se entra al AuthRoutes sin estar en login ni register */}

            <Route 
                path='/*' 
                element={ <Navigate to='/auth/login' /> }
            />
        </Routes>
    )
}
