const express = require('express');
const app = express();
app.use(express.json());
const projects = [];
let Cont = 0; 

//middleware

//middleware global - todas as rotas passam por ela.
app.use((req, res, next) => {
  Cont == Cont++;
  console.log(`Requisições: ${Cont}`);
  return next();
  }
);


//Middleware Local
function CheckExisteID(req, res, next) {
  if (!projects[req.params.id]) {
    return res.status(404).json({error: 'id não encontrado.'});
  }
  return next();
}


//consulta
app.get('/projects', (req, res) => {
  return res.json(projects);
}); //OK

//atualiza tasks
app.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  return res.json(projects);
});
//atualiza um task
app.post('/projects/:id/tasks', CheckExisteID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//atualizar um projeto
app.put('/projects/:id', CheckExisteID, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;
  return res.json(projects);
});

//delete OK

app.delete('/projects/:id', CheckExisteID, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.send(projects);
}); 

app.listen(3000);