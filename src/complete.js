

let todoList = [];


const mainToggle = ()=>{
    const togle = document.querySelectorAll('.complete');
  togle.forEach((toggleItem, index)=> {
    toggleItem.addEventListener('change', ()=>{
      let todoList = getLocalStorage();
      todoList[index].completed= todoList[index].completed ? false : true;
      setLocalStorage(todoList);
    })
  })
  }
  
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


  export { mainToggle, setLocalStorage, getLocalStorage}