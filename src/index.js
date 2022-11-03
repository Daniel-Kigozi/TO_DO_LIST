
import './style.css';
const divContainer = document.querySelector(".books-container");
const inputDiv = document.querySelector("#title");
const inputSubmit = document.querySelector("#submit");


let todoList = [];
let isEdit = false
let editId = null;

console.log(editId)



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
      
      <button class="edit">edit</button>
      <button type="button" class="delete" id="${index}">del</button>
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
        isEdit = false;
        
    
        }; 
        inputDiv.value = ``;
        removeEvents();
        editEvents();
  
  });
  

  const reassignIndex = (todoList) => {
    todoList.forEach((item, i) => {
      item.index = i + 1;
    });
  }
  
  const deleteTask = (id) => {
    let todoList = getLocalStorage();
    const taskToDelete = todoList[id];
  
    todoList = todoList.filter((item) => item !== taskToDelete);
    reassignIndex(todoList)
  
    setLocalStorage(todoList);

    divContainer.innerHTML='';
    todoList.forEach((item)=>{
      divContainer.append(displayTodo(item));
      
    })
  
    removeEvents();
  };

  const removeEvents = ()=>{
    document.querySelectorAll('.delete').forEach((button)=> button.addEventListener('click', (e)=>{
      e.preventDefault();
      let id;
      if (button.id > 0) {
        id = button.id - 1;
      } else {
        id = 0;
      }
      deleteTask(id);
    }))
  }

  const editEvents = ()=>{
    document.querySelectorAll('.edit').forEach((button)=> button.addEventListener('click', (e)=>{
      e.preventDefault();
      let id;
      if (button.id > 0) {
        id = button.id - 1;
      } else {
        id = 0;
      }

      isEdit = true;
      editId =id;

      inputDiv.value = todoList[id].description;
      inputDiv.focus();
    }))
  }

 