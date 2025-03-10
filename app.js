const express = require('express');
const app = express();

const {infoCursos} = require('./datos/cursos.js')

const routerProgramacion = require('./routers/programacion.js')

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);
app.use('/api/cursos/programacion', routerProgramacion);

app.get('/', (req, res) => {
    res.send('Mi primer servidor. Cursos Xd 💻.');
});

app.get("/api/cursos", (req, res) => {
    res.send(infoCursos);
})

app.use((req, res, next) => {
    console.log('Middleware ejecutado');
    next(); // Llama al siguiente middleware
  });
  


// app.get('/api/cursos/programacion/:lenguaje', (req, res) => {
//     const lenguaje = req.params.lenguaje;
//     const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

//     if(resultados.length === 0){
//         return res.status(404).send(`No se encontraron cursos de ${lenguaje}`)
//     }

//     res.send(JSON.stringify(resultados));
// })

const PUERTO =  process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`EL servidor esta escuchando en el puerto ${PUERTO}`)
} )