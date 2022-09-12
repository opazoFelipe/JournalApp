export const initialState = {
    status: 'checking', //'not-authenticated', ''autehnticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', //'not-authenticated', ''autehnticated
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //'not-authenticated', ''autehnticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'ABC123',
    email: 'demo@google.cl',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
}