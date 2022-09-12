import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase"
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth"
import { clearNotesLogout } from "../../../src/store/journal"
import { demoUser } from "../../fixtures/authFixtures"

jest.mock('../../../src/firebase/providers')

describe('pruebas en el checkingCredentials', () => {
    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('debe invocar el checkingCredentials', async () => {
        // llamar el thunk y ejecutar su callback dispatch de respuesta
        await checkingAuthentication()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    })

    test('startGoogleSignIn debe llamar checkingCredentials y login - Exito', async () => {

        const loginData = { ok: true, user: demoUser }

        // Se hace el mock de esta funcion porque en realidad abre un popup y eso no se puede simular pero si se puede simular el resultado retornado por el popup
        await signInWithGoogle.mockResolvedValue(loginData)

        // thunk
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn debe llamar checkingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Un test error en Google' }

        // Se hace el mock de esta funcion porque en realidad abre un popup y eso no se puede simular pero si se puede simular el resultado retornado por el popup
        await signInWithGoogle.mockResolvedValue(loginData)

        // thunk
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    })

    test('startLoginWithEmailPassword debe llamar checkingCredentials y login - Exito', async () => {
        const formData = { email: demoUser.email, password: '123456' }
        const loginData = { ok: true, ...demoUser }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())

    })
})