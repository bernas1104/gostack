import React, { useState, useEffect } from 'react';

import api from './services/api';
import Header from './components/Header';

import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  // const [title, setTitle] = useState('');
  // const [owner, setOwner] = useState('');

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: "Meu App Hibernate",
      owner: "Bernardo"
    });

    const project = response.data;

    setProjects([...projects, project]);
    
    // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      {/* <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
      <input type="text" value={owner} onChange={e => setOwner(e.target.value)}/> */}
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;