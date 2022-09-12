module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],

    // Resuelve problemas con archivos que llaman firebase en testing ya que no transpila estos archivos e ignora los modulos de node
    transformIgnorePatterns: [],
}