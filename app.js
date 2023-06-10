const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowInformacion = addKeyword(['informacion', 'info', 'Informacion']).addAnswer(
    [
        '📄 Somos una solución digital  en el almacenaje de tu información vehicular',
        'https://sanisikars.com/',
        '\n*menu* Para volver al menu principal.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowSolicito = addKeyword('solicito').addAnswer('Por favor deja tu correo y un numero telefonico y uno de nuestros especialistas se comunicara contigo',
{
    buttons:[
        {
            body:'menu'
        }
       
    ]
}
)

const flowServicios = addKeyword(['servicios', 'Servicios']).addAnswer(
    [
        '🚀 Resguardamos de manera segura y confiable la información que necesitas de tu vehículo',
        '📄 Pedimento de Importacion',
        '📄 Factura vehicular',
        '📄 Folio Electronico',
        '📄 Titulo',
        '📄 Acta de reporte de No Robo',
        '📄 Identificacion Oficial',
        '📄 Tarjeta de circulacion',
        '📄 Poliza de seguro',
        '\n*menu* Para volver al menu principal.',
    ],
    null,
    null,
    {
        buttons:[
            {body:'menu'}
        ]
    }
    [flowSecundario]
)

const flowCodigo = addKeyword('codigo').addAnswer('Te mando instrucciones',{
    media:'https://sanisikars.com/EtiquetaRedikars.png'
})
.addAnswer('Si extraviaste el codigo, dejanos tu Modelo vehicular y tu VIN para proporcionarte uno nuevo')
.addAnswer({
    buttons:[
        {
            body:'menu'
        }
    ]
})

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'menu'])
    .addAnswer('🙌 Hola bienvenido al servicio de Redikars, te saluda *RediBot*')
    .addAnswer(
        [
            'Por favor indicame en que puedo ayudarte?',
            '👉 *informacion* Que es Redikars?',
            '👉 *servicios*  Servicios que ofrecemos para ti?',
            '👉 *codigo* Cual es mi codigo de acceso?',
            '👉 *solicito* Como puedo obtener el servicio?',
            'Por favor, solo teclea lo que esta en negritas y envia el mensaje en negritas.'
        ],
        null,
        null,
        [flowInformacion, flowServicios, flowSolicito, flowCodigo]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowInformacion])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
