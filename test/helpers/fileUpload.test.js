/* Esta importacion causa un error al no encontrar una dependencia
llamada setimmediate */
import { v2 as cloudinary } from 'cloudinary'
/*
Para solucionarlo instalar la depedencia de la siguiente manera
```
npm install --dev setinmediate
```

Luego en el archivo jest.setup.js importar
```
import 'setimmediate'
```
*/

import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'daldnbcwi',
    api_key: '585677231837965',
    api_secret: 'WoQwrxfyGaWeqjTRvMcMrnDhTYQ',
    secure: true
})

describe('Pruebas en fileUpload', () => {

    test('debe subir el archivo correctamente', async () => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&w=1000&q=80'

        const fileType = 'jpg'

        const resp = await fetch(imageUrl)
        const blob = await resp.blob(resp)
        const file = new File([blob], `foto.${ fileType}`)

        const url = await fileUpload( file )

        expect( typeof url ).toBe('string')

        // Eliminar el archivo de prueba del dashboard de cloudinary
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace(`.${ fileType}`, '')

        const cloudResp = await cloudinary.api.delete_resources([
            `journal/${ imageId }`  
        ], {
            resource_type: 'image'
        })

        console.log({ cloudResp })
    })


    test('debe retornar null', async () => { 
        const file = new File([], 'foto.jpg')

        const url = await fileUpload( file )

        expect( url ).toBe(null)
    })
})