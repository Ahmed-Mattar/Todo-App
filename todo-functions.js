// fetch existing todos from local storage

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        return todosJSON ? JSON.parse(todosJSON) : [] ;
    }catch (e){
        return [];
    }
    

}

// save todos to local storage 
const saveTodos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos));
}

// render application todos based on filters 
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter( (todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos)); 

    filteredTodos.forEach( (todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    })
}

//remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo)=>todo.id === id)

    if(todoIndex > -1) {
        todos.splice(todoIndex,1);
    }
}

// toggle todos 

const toggleTodo = (id) => {
    const todo = todos.find((todo)=> todo.id === id)

    if(todo){
        todo.completed = !todo.completed;
    }

}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo) =>{
    const todoEL = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed ;
    todoEL.appendChild(checkbox);

    checkbox.addEventListener('change',(e)=>{
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    //setup the todo text 
    todoText.textContent = todo.text;
    todoEL.appendChild(todoText);

    //setup the remove button
    removeButton.textContent = 'x';
    todoEL.appendChild(removeButton);
    removeButton.addEventListener('click',(e)=>{
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos,filters);
    })

    return todoEL ;
}


// Get the DOM elements for List summary
const generateSummaryDOM = (incompleteTodos) =>{
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary 
}