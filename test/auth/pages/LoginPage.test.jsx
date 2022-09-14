import { fireEvent, render, screen } from "@testing-library/react"
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

// Para definir afuera el mock de la function, la constante debe comenzar con el prefijo mock o sino no va a funcionar
const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()


// Mock completo de una libreria y re-definir para propositos de testing cuales son los metodos que contiene eliminando el resto de metodos
jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => { 
        return () => mockStartLoginWithEmailPassword({ email, password })    
    },
}))

// Mock completo de una libreria de terceros (o una propia custom) y re-definir para propositos de testing metodos especificos pero conservando el resto de metodos con sus definiciones originales
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    // Re definir el useDispatch para que retorne una funcion
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    //preloadedState permite precargar un cierto estado en el store de antemano. En el test 2 permite que el boton no este disabled para poder gatillar el evento click
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks())

    test('debe mostrar el componente correctamente', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        // screen.debug()

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)

    })

    test('boton de google debe llamar el startGoogleSignIn', () => {

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn')

        // Solo funciona si el boton no esta disabled
        fireEvent.click(googleBtn)

        expect(mockStartGoogleSignIn).toHaveBeenCalled()

    })

    test('submit debe llamar startLoginWithEmailPassword', () => {
        const email = 'felipe@gmail.com'
        const password = '123456'

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change( emailField, { target: {
            name: 'email',
            value: email
        }})

        const passwordField = screen.getByTestId('password')
        fireEvent.change( passwordField, { target: {
            name: 'password',
            value: password
        }})

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit( loginForm )


        // Test un dispatch que usa argumentos especificos
        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        })

    })
})



