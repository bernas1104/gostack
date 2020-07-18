const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id))
    return response.status(400).json({error: 'Invalid Repository ID'});

  next();
}

app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateRepositoryId);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
    return response.status(400).json({error: 'Repository doesn\'t not exist'});

  const { likes } = repositories[repositoryIndex];
  repositories[repositoryIndex] = { id, title, url, techs, likes };

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
    return res.status(400).json({error: 'Repository doesn\'t not exist'});

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
    return response.status(400).json({error: 'Repository doesn\'t not exist'});

  const { likes } = repositories[repositoryIndex];
  repositories[repositoryIndex].likes = likes + 1;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
