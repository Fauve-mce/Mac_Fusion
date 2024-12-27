import '../../styles/TodoList.scss';

export default function Todo({
    todoInfo, 
    onTodoDelete, 
    onTodoEdit, 
    toggleEditMode}) {
    // DECOUPER SON COMPOSANT
    // State
    // const todoInfo = props.todoInfo;
    // const onTodoDelete = props.onTodoDelete;
    // Destructurer l'objet props -->
    // const {todoInfo, onTodoDelete} = props
    // au lieu de faire ce dernier on va directement mettre en paramètre de la fonction.

    // comportments
    // Gestion de la touche "Enter"
    const handleKeyPress = (event) =>{
        if (event.key == "Enter"){
            // Apelle onBlur si Enter est pressé
            onTodoEdit(todoInfo.id, event.target.value);
        }
    };

    //Affichage (render)
    return (
        <li>
          {todoInfo.isEditing ? (
            <input
              type="text"
              defaultValue={todoInfo.nom}
              onBlur={(e) => onTodoEdit(todoInfo.id, e.target.value)}
              onKeyDown={handleKeyPress}
            />
          ) : (
            <span onClick={() => toggleEditMode(todoInfo.id)}>{todoInfo.nom}</span>
          )}
          <button onClick={() => onTodoDelete(todoInfo.id)}>✖️</button>
        </li>
      );
      
}