const todos = [{
    text:'Finish Javascript',
    completed:false
}, {
    text:'Have lunch',
    completed: true
}, {
    text:'Finish Node',
    completed:false
}, {
    text:'Drink Coffe',
    completed:true
}, {
    text: 'Excercise',
    completed: false
}];


// Starts
const filter = {
    searchText:' '
}

const renderTodos = function(todos){
    document.querySelector('#todos').innerHTML = '';
    todos.forEach(function(todo){
        const p = document.createElement('p');
        p.innerText = todo.text;
        document.querySelector('#todos').appendChild(p);
    });
}

renderTodos(todos);

const filterTodos = function(todos,filter){
    const filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filter.searchText.toLowerCase());
    });
    return filteredTodos;
}




document.querySelector('#add').addEventListener('click',function(e) {
    console.log('i am adding a new todo');
});

document.querySelector('#search-text').addEventListener('input',function(e){
    filter.searchText = e.target.value;
    renderTodos(filterTodos(todos,filter));
});