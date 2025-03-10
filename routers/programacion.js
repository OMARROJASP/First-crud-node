const express = require("express");
const app = express();

const { programacion } = require("../datos/cursos.js").infoCursos;

const routerProgramacion = express.Router();
//middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
});

// Llamado a un lenguaje por ID
routerProgramacion.get("/:id", (req, res) => {
    const idCurso = req.params.id;
    const curso = programacion.filter(lenguaje => lenguaje.id == idCurso);
    return res.send(curso)
} )

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  console.log();
  const resultados = programacion.filter(
    (curso) => (curso.lenguaje = lenguaje)
  );

  if (resultados.lenguaje === 0) {
    return res
      .status(404)
      .send(`no se encuentraron cursos con lenguaje ${lenguaje}`);
  }

  return res.send(resultados);
});

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  console.log("lleGO EL DATO: ", cursoNuevo)
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

routerProgramacion.put("/:id", (req, res) => {
  const cursoActualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    programacion[indice] = cursoActualizado;
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoModificador = programacion[indice];
    Object.assign(cursoModificador, infoActualizada);
  }

  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete("/", (req, res) => {
  const id = req.params.id;

  const indice = findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});
module.exports = routerProgramacion;
