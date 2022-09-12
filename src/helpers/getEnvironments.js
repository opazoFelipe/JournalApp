export const getEnvironments = () => {

    // Cargar las variables de entorno
    import.meta.env

    // Exportar las variables de entorno
    return {
        ...import.meta.env
    }

}