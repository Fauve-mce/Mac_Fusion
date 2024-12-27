import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import '../../styles/TodoList.scss';

export default function TodoForm({handleAdd}){
    // State pour le nouveau todo
    const [nouveauTodo, setNouveauTodo] = useState("");

    // Comportement
     // Soumission du formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Générer un identifiant unique
        const id = uuidv4();
        const nom = nouveauTodo;
        const todoAAjouter = { id, nom };
    
        // Ajouter le nouveau todo
        handleAdd(todoAAjouter);
        setNouveauTodo("");
    };
    
    //Gestion du changement dans l'input
    const handleChange = (event) =>{
        setNouveauTodo(event.target.value);
    };

    // Affichage (render)
    return (
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            value={nouveauTodo}
            type="text"
            placeholder="Ajouter une tâche..."
            onChange={handleChange}
          />
          <button>Ajouter</button>
        </form>
      );
      
}

// Best proctis !!! lrsqu'on crée un composant enfant que l'on appel par un composant parent,
// il faut que chaque composant encapsule toute les résponsabilité et les logique dont il est en charge.
// donc par exemple comme j'ai CTRL X le form et coller dans ce fichier, je dois faire suivre le handleChange et le handleSubmit pour que tout cela fonctionne bien.

// Best practis !!! lorsqu'on défini un State dans un composant et qu'il est partager à d'autres composant.
// Si il y a des manipulation sur ce state la, alors ce state la dois être défini et réaliser le plus proche du state qui est concerner.
// (On définit les comportments qui manipule un state là ou ce state est défini!)