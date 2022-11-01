
import './style.css';
const divContainer = document.querySelector(".books-container");



const todoList = [
    {
      description: 'Go shopping for lunch',
      completed: false,
      index: 0,
    },
    {
      description: 'Take kids to school',
      completed: false,
      index: 1,
    },
    {
      description: 'Work on coding challenges',
      completed: false,
      index: 2,
    },
    {
        description: 'Go to the gym',
        completed: false,
        index: 3,
      },
    {
      description: 'Attend workshop',
      completed: false,
      index: 4,
    },
  ];

  const displayTodo = ({ description, index }) => {
    const divElement = document.createElement('div');
    divElement.className = 'first-item';
    divElement.innerHTML = `
      <div class="item-details">
      <input type="checkbox" id="" name="" value=""> <h4 class="item-desription">${description}</h4>
      </div>
      <i class="fa-solid fa-trash-can" id"${index}"></i>
      `;
  
    return divElement;
  };
  
  todoList.forEach((todo) => {
    divContainer.append(displayTodo(todo));
  });
  
