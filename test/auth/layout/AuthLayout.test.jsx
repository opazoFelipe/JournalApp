import { render, screen } from "@testing-library/react"
import { AuthLayout } from "../../../src/auth/layout/AuthLayout"

describe('Pruebas en <AuthLayout />', () => {

    test('debe hacer match con el snapshot', () => {

        const { container } = render(<AuthLayout title={''} />)

        expect(container).toMatchSnapshot()
    })

})