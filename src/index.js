
import './style.css';
const divContainer = document.querySelector(".books-container");
const inputDiv = document.querySelector("#title");
const inputSubmit = document.querySelector("#submit");


let todoList = [];


  const setLocalStorage = (todoList)=>{
    localStorage.setItem('formInputs', JSON.stringify(todoList));
  }

  const getLocalStorage = ()=>{
    if (localStorage.getItem('formInputs') !== null) {
      todoList = JSON.parse(localStorage.getItem('formInputs'));
      } else {
      todoList = [];

      }
      return todoList;
  }

  const displayTodo = ({ description, index}) => {
    
      const divElement = document.createElement('div');

      divElement.className = 'first-item';
      divElement.innerHTML = `
      <div class="item-details">
      <input type="checkbox" id="" name="" value=""> <h4 class="item-desription">${description}</h4>
      </div>
      <i class="fa-solid fa-trash-can" id"${index}"></i>
      <button class="edit">edit</button>
      <button type="button" id"${index}" class="delete">del</button>
            `;
  
    return divElement;
    
    
  
  };

  inputSubmit.addEventListener('click', (e) => {
    e.preventDefault();
      if(inputDiv.value.trim()!== ''){
        
          const list = {
            description: inputDiv.value,
            completed: false,
            index: todoList.length +1, 
        };
        console.log(list);
        todoList.push(list);
        setLocalStorage(todoList);
        todoList = getLocalStorage();
        divContainer.innerHTML='';
        console.log(todoList);
        todoList.forEach((item)=>{
          divContainer.append(displayTodo(item));
          
        })
        
        removeEvents();
        }; 
  
  });

  

  const removeEvents = ()=>{
    document.querySelectorAll('.delete').forEach((button)=> button.addEventListener('click', (e)=>{
      e.preventDefault();
      console.log(button.id, e.target.getAttribute('id'));
    }))
  }

  
 