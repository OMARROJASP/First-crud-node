const express = require('express');
const app = express();

const { matematicas } = require('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

// routerMatematicas.get('/', (req, res) => {
//     res.send(JSON.stringify(matematicas));
// });

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema == tema);

    if(resultados.length === 0){
        return res.status(404).send(`No se encuentraron cursos de ${tema}`)
    }

    res.send(JSON.stringify(resultados)); 
})

routerMatematicas.use((req, res, next ) => {
    console.log("El nidd")
    next();
});

routerMatematicas.get('/', (req, res) => {
    const { nivel } = req.query;
    console.log("Aqui de envio el dato de nivel", nivel);

    if (!nivel) {
       return res.send(JSON.stringify(matematicas));
    }

    const resultado = matematicas.filter(materia => materia.nivel === nivel);

    if (resultado.length === 0) {
        return res.status(404).json({ error: "No se encontraron datos para esta búsqueda" });
    }

    res.json(resultado);


});


module.exports  = routerMatematicas;