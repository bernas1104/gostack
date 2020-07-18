import React, { useState, useEffect } from "react";

import './services/api';
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [num, setNum] = useState(1);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${num}`,
      url: `https://github.com/bernas1104/repositorio-${num}`,
      techs: ['NodeJS', 'ReactJS', 'React Native']
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
    setNum(num + 1);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}>
            {repository.title}

            <button type="button" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
})}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
