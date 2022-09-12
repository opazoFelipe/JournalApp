import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"

describe('Pruebas en authSlice', () => {

    test('debe regresar el estado inicial y llamarse "auth"', () => {

        expect(authSlice.name).toBe('auth')

        const state = authSlice.reducer(initialState, {})

        expect(state).toEqual(initialState)

    })

    test('debe realizar la autenticacion', () => {

        // Se pasa el estado original y el action creator, lo cual devolvera un nuevo estado segun el reducer login(demoUser)
        const state = authSlice.reducer(initialState, login(demoUser))

        // Ver la accion que se va a ejecutar
        // esta manera se traduce en el objeto que esta esperando el reducer
        // console.log(login(demoUser))

        // console.log(state)

        // Evaluar el nuevo estado que genera el reducer 

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        })
    })

    test('debe realizar el logout', () => {

        const state = authSlice.reducer(initialState, logout(null))

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })

    })

    test('debe realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'test message'

        const state = authSlice.reducer(initialState, logout({ errorMessage: errorMessage }))

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })

        expect(state.errorMessage).toBe(errorMessage)

    })

    test('debe cambiar el estado a checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials())

        expect(state.status).toBe('checking')
    })

})