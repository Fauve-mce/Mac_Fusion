import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./components/Navbar.jsx";
import Footer from './components/Footer.jsx';
import Todo from './components/Apps/Todo-List/Todo.jsx'; 
import TodoForm from './components/Apps/Todo-List/TodoForm.jsx';
import './styles/index.css';
import './styles/App.css';
import './components/styles/TodoList.scss';
import './components/styles/Footer.css';
import './components/styles/Navbar.css';



const API_URL = 'http://localhost:3000/todos';

function App() {
  const appRef = useRef(null);
  // 💡 GESTION DES LISTES
// State, comportements, affichage, vont interragir les un avec les autres via des flues. Ce sont ses flues la qui vont rendre nos compostant interactif.

// state (état ou des données) Accueil de la données dynamique qu'on va procheter sur notre affichage, pour le rendre dynamiue lui aussi.
  const [todos, setTodos] = useState([]);

  const [isTodoVisible, setTodoVisible] = useState(true);


// Charger les todos depuis JSON seveur 
useEffect(() => {
  axios
    .get(API_URL)
    .then(response => setTodos(response.data))
    .catch(error => console.error('Erreur lrs du chargement des todos:', error));
}, []);


useEffect(() => { 
  const appElement = appRef.current; 
  let isDragging = false; 
  let offsetX, offsetY; 
  
  const onMouseDown = (e) => { 
    isDragging = true; 
    offsetX = e.clientX - appElement.getBoundingClientRect().left; 
    offsetY = e.clientY - appElement.getBoundingClientRect().top; 
    document.addEventListener('mousemove', onMouseMove); 
    document.addEventListener('mouseup', onMouseUp); 
  }; 
  
  const onMouseMove = (e) => {
    if (isDragging) {
      appElement.style.left = `${e.clientX - offsetX}px`; 
      appElement.style.top = `${e.clientY - offsetY}px`; 
    } 
  }; 
  
  const onMouseUp = () => {
      isDragging = false; 
      document.removeEventListener('mousemove', onMouseMove); 
      document.removeEventListener('mouseup', onMouseUp); 
    }; 
    
    appElement.addEventListener('mousedown', onMouseDown); 
    
    return () => {
      appElement.removeEventListener('mousedown', onMouseDown); 
    }; 
  }, []);



// Comportements (on va pouvoir décrire de manière complètement arbitraire ce qu'ils font au niveau de ses instruction. 
// Souvent les instructions vont impliquer de modifié le State et lorsque le State est modifié le composant va réagir --> React de la il va réactualisé l'affichage. --> rerender)
const handleDelete = async (id) => {
  try {
      // Envoi de la requête DELETE au serveur
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
      });

      // Vérification de la réponse
      if (!response.ok) {
          throw new Error(`Erreur serveur : ${response.status} ${response.statusText}`);
      }

      // Mise à jour de l'état local après suppression réussie sur le serveur
      const todosUpdated = todos.filter(todo => todo.id !== id);
      setTodos(todosUpdated);
  } catch (error) {
      console.error("Erreur lors de la suppression sur le serveur :", error);
      alert("La suppression côté serveur a échoué. Veuillez vérifier la connexion ou l'ID.");
  }
};


const handleAdd = (todoAAjouter) =>{
  axios
    .post(API_URL, todoAAjouter)
    .then(response => setTodos([...todos, response.data]))
    .catch(error => console.error('Erreur lors de ajout du todo:', error));
   //1. Copie du State
  const todosCopy = [...todos]
  //2. Manipulation sur la copie su State
  todosCopy.push(todoAAjouter);
  //3. Modifier le State avec le setter dédier
  setTodos(todosCopy);
}

const handleEdit = (id, newName) => {
   // Mise à jour sur le serveur
  axios
  .patch(`${API_URL}/${id}`, { nom: newName })
  .then(() => {
  setTodos(
    todos.map( (todo) =>
      todo.id === id ? {...todo, nom: newName, isEditing: false} : todo
    )
  );
})
.catch((error) => console.error('Erreur lors de la modification du todo:', error));
};

const toggleEditMode = (id) => {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? {...todo, isEditing: !todo.isEditing } : todo
    )
  );
}

const toggleTodoVisibility = () => {
    setTodoVisible(!isTodoVisible); 
  };

//lorsque une fonction est lié à un évènement, cette fonction va reçevoir dans ses paramètres l'évènement.
// Avec l'objet event on va pouvoir accéder à sa méthode preventDefault. On va l'appeler avec () pour empecher le rechargement de la page.

// Affichage (render) sur chacun de ses éléments d'affichage on va brancher des comportements via des événements.

  return (
    <div className='Body-mac_fusion'>
      <Navbar />
      <main>
        <div className={`todo-app draggable ${!isTodoVisible ? 'hidden' : ''}`} ref={appRef}>
        <h1>Todo List</h1>
        <TodoForm handleAdd={handleAdd} />
        <ul className="todo-list">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todoInfo={todo}
              onTodoDelete={handleDelete}
              onTodoEdit={handleEdit}
              toggleEditMode={toggleEditMode}
            />
          ))}
        </ul>
        </div>
      </main>
      <Footer toggleTodoVisibility={toggleTodoVisibility} />
    </div>
  );
};

export default App



// 💡 GESTION DU FORMULAIRES

// 1. création du formaulaire

// 2. soumission du formulaire (onSubmit / handleSubmit)

// 3. collecte des données du formulaire

// 3a. Première méthode que l'on évite. 
// Pourquoi ? Car useRef et inputRef ne provoque pas de rerender automatique du composant et de l'affichage. Il ne passe pas par le State. On l'évite pour gérer les données dns un formulaire.
// On manupile JAMAIS au DOM directement, on laisse React manipuler l'affichage pour nous.
// Méthide 1: documentGetElementById et QuerySelector "React" (useRef)
// c'est la que interviens UseRef. c'est un Hook, une fonction de la librairie React qui lorsque elle est appeler va crée un object référence, 
// qu'on va pouvoir stocker dans une variable. 
// Cette variable la on va l'associer a un élément d'affichage en particulier.
// De fait, quand on va appeler cette variable, on va faire référence pour ensuite le manipuler comme on veut.

// 3b. Deuxième méthode qu'on utilise souvent.
// Méthode synchrnisation déscendante, ascendante. (onChange / handleChange)
// Attention!!! On ne change JAMAIS la valeur du State direcgement. On est obliger de passé par son setter si on veut qu'il y ai un update au niveau de l'affichage.
// donc on prend la valeur handleChnage et intersepter cette valeur la, on la balance dans le setter du State concerne pour qu'il le modifie et ensuite quand il est modifier il va actualiser l'affichage.

// todosCopy.push({id: id, nom: nom}); 
// quand le nom de la valeur et le nom de la clef sont identique dans une propriété on peut supp. :nom et :id

