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



const incompleteTodos = todos.filter(function(todo){
    return !todo.completed;
})


const summary = document.createElement('h2');
summary.textContent = `You have ${incompleteTodos.length} todos left`;
document.querySelector('body').appendChild(summary);

todos.forEach(function(todo){
    const p = document.createElement('p');
    p.textContent = todo.text;
    document.querySelector('body').appendChild(p);
});

document.querySelector('#add').addEventListener('click',function(e) {
    console.log('i am adding a new todo');
});