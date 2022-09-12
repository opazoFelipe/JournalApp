// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

// Corregir error setimmediate en testing con cloudfire sdk
import 'setimmediate'


require('dotenv').config({
    path: '.env.test',
})

jest.mock('./src/helpers/getEnvironments.js', () => ({
    getEnvironments: () => ({ ...process.env })
}))