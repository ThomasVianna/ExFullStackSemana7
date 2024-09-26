import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [alunoUnico, setAlunoUnico] = useState(null);

  const listar = () => {
    axios.get("http://localhost:3005/aluno").then((resultado) => {
      setAlunos(resultado.data);  // Armazena a lista de alunos no estado
    });
  };

  const consultarUnico = (id) => {
    axios.get(`http://localhost:3005/aluno/${id}`).then((resultado) => {
      setAlunoUnico(resultado.data);  // Armazena o aluno específico no estado
    });
  };

  const excluir = (id) => {
    axios.delete(`http://localhost:3005/aluno/${id}`).then((resultado) => {
      console.log(`Status de exclusão: ${resultado.status}`);
      listar(); // Atualiza a lista após excluir
    });
  };

  const inserir = () => {
    const aluno = { id: 4, nome: "Dani", matricula: "124" };
    axios.post("http://localhost:3005/aluno", aluno).then((resultado) => {
      console.log(`Status de inserção: ${resultado.status}`);
      listar(); // Atualiza a lista após inserir
    });
  };

  const alterar = (id) => {
    axios.get(`http://localhost:3005/aluno/${id}`).then((resultado) => {
      let aluno = resultado.data;
      aluno.nome += " (alterado)";
      axios.put(`http://localhost:3005/aluno/${id}`, aluno).then((resultado) => {
        console.log(`Status de alteração: ${resultado.status}`);
        listar(); // Atualiza a lista após alterar
      });
    });
  };

  return (
    <div>
      <header>
        <h1>CRUD de Alunos</h1>
      </header>

      <div>
        <button onClick={listar}>Listar</button>
        <button onClick={() => consultarUnico(1)}>Consultar Único</button>
        <button onClick={inserir}>Inserir</button>
        <button onClick={() => alterar(1)}>Alterar</button>
        <button onClick={() => excluir(3)}>Excluir</button>
      </div>

      
      <h2>Lista de Alunos:</h2>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.nome} - Matrícula: {aluno.matricula}
          </li>
        ))}
      </ul>

      
      {alunoUnico && (
        <div>
          <h2>Detalhes do Aluno:</h2>
          <p>ID: {alunoUnico.id}</p>
          <p>Nome: {alunoUnico.nome}</p>
          <p>Matrícula: {alunoUnico.matricula}</p>
        </div>
      )}
    </div>
  );
}

export default App;
