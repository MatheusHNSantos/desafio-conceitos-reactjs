import React, { useState, useLayoutEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useLayoutEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
  
    const response = await api.post('repositories', {
      title: `repository ${Date.now()}`,
      url: `https://github.com/MatheusHNSantos/repository-${Date.now()}`,
      techs: ["ReactJS", "NodeJS"],
      likes: 0
    });

    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    console.log(id);
    
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);


    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
