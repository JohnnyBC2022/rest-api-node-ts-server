// Este archivo sirve para limpiar la BD después de hacer test y que no se vayan acumulando registros de prueba (He añadido el script "db" en el package.json)
import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async ()=>{
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}
// cuando haces npm run db el process.argv[2] corresponde al --clear del package.json (ese nombre se lo hemos puesto nosotros)
if(process.argv[2] === '--clear') {
    clearDB()
}

//console.log(process.argv)

// Para no tener que estar haciendo npm run test (o npm test) y luego npm run db, continuamente, hay un script especial que se llama pretest que se ejecuta automáticamente antes de hacer los test. (Cambio db por pretest en el package.json)
// También existe un script posttest que ejecuta un script después de finalizar los test