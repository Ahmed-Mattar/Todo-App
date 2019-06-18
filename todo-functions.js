// fetch existing todos from local storage

const getSavedTodos = function(){
    const todosJSON = localStorage.getItem('todos');

    if(todosJSON !== null){
        return JSON.parse(todosJSON);
    }else {
        return [] ;
    }
}

// save todos to local storage 
const saveTodos = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
}

// render application todos based on filters 

const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos)); 

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    })
}

//Get the DOM elements for an individual note
const generateTodoDOM = function (todo){
    const todoEL = document.createElement('div');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute("type", "checkbox");
    todoEL.appendChild(checkbox);

    //setup the todo text 
    todoText.textContent = todo.text;
    todoEL.appendChild(todoText);

    //setup the remove button
    removeButton.textContent = 'x';
    todoEL.appendChild(removeButton);
    

    return todoEL ;
}


// Get the DOM elements for List summary
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary 
}