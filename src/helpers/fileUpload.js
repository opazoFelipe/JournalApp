// Sube solo 1 archivo a la vez, si se necesitan multiples subidas disparar las veces que sean necesarias
export const fileUpload = async (file) => {
    // if (!file) throw new Error('No tenemos ningún archivo a subir')
    if (!file) return null

    const cloudUrl = 'https://api.cloudinary.com/v1_1/daldnbcwi/upload'

    const formData = new FormData()

    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if (!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url

    } catch (error) {
        // console.error(error)
        // throw new Error(error.message)
        return null
    }
}