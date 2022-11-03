
  import './style.css';
  const divContainer = document.querySelector(".books-container");
  const inputDiv = document.querySelector("#title");
  const inputSubmit = document.querySelector("#submit");
  
  let todoList = [];
  
  let isEdit = false
  let editId = null;

  
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
    
      removeEvents()
      editEvents()
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
  
        deleteTask(id)
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
        editId =id
  
        inputDiv.value = todoList[id].description
        inputDiv.focus();
  
      }))
    }
  
    const displayTodo = ({ description, index, completed}) => {
      
        const divElement = document.createElement('div');
  
        divElement.className = 'first-item';
        divElement.innerHTML = `
        <div class="item-details">
        <input type="checkbox" name="" value="" class="complete" ${completed? 'checked':''}> <h4 class="item-desription">${description}</h4>
        </div>
        <i class="fa-solid fa-trash-can" id"${index}"></i>
        <button class="edit" id="${index}">edit</button>
        <button type="button" id="${index}" class="delete">del</button>
              `;
    
      return divElement;
      
      
    
    };
  
    inputSubmit.addEventListener('click', (e) => {
      e.preventDefault();
        if(inputDiv.value.trim()!== ''){
          if(isEdit === false) {
                      const list = {
              description: inputDiv.value,
              completed: false,
              index: todoList.length +1, 
          };

          todoList.push(list);
          setLocalStorage(todoList);
          todoList = getLocalStorage();
          divContainer.innerHTML='';setLocalStorage(todoList);
          todoList.forEach((item)=>{
            divContainer.append(displayTodo(item));
          })
          } else {
            todoList[editId].description = inputDiv.value
            setLocalStorage(todoList);
            todoList = getLocalStorage();
            divContainer.innerHTML='';
            todoList.forEach((item)=>{
              divContainer.append(displayTodo(item));
            })
            isEdit = false;
            
          }
          inputDiv.value = ``;
          removeEvents();
         editEvents();
         
          }; 
    
    });
  
    
    todoList = getLocalStorage();
    divContainer.innerHTML='';
    todoList.forEach((item)=>{
      divContainer.append(displayTodo(item));

    
    })
    const togle = document.querySelectorAll('.complete');
    togle.forEach((toggleItem, index)=> {
      toggleItem.addEventListener('change', ()=>{
        let todoList = getLocalStorage();
        todoList[index].completed= todoList[index].completed ? false : true;
        setLocalStorage(todoList);
      })
    })
    removeEvents()
    editEvents() 
  
    
    

    