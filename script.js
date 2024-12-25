let input = document.querySelector("#input");
let Add = document.querySelector(".btn-add");
let container = document.querySelector(".container");
let todos = [];

let getFromLS = () => {
  return JSON.parse(localStorage.getItem("MyTodoLists")) || [];
};

let showTodo = () => {
  container.innerHTML = "";
  let valuesFromLS = getFromLS();

  valuesFromLS.map((ele, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<span>${ele} </span> 
           <button class='edit-btn'>Edit</button>
           <button class='delete-btn'>delete</button>`;

    container.append(li);

    // ! adding delete functionality

    li.querySelector(".delete-btn").addEventListener("click", () => {
      // alert(valuesFromLS[index])
      deleteTodo(index);
    });

    //   !  adding edit functionality

    li.querySelector(".edit-btn").addEventListener("click", () => {
      editTodo(index, ele);
    });
  });
};

let addTodo = () => {
  let newTodo = input.value.trim();
  // console.log(newTodo)

  input.value = "";

  // !  taking the todos from the local storage
  todos = getFromLS();

  if (newTodo.length !== 0 && !todos.includes(newTodo)) {
    // ! taking newtodo and add to local storage
    todos.unshift(newTodo);
    // console.log(todos)

    localStorage.setItem("MyTodoLists", JSON.stringify(todos));

    // ! creating list and add to container

    // let li = document.createElement("li");
    // li.textContent = newTodo;
    // container.append(li)

    showTodo();
  }
};

let deleteTodo = (index) => {
  todos = getFromLS();
  todos.splice(index, 1);
  localStorage.setItem("MyTodoLists", JSON.stringify(todos));
  showTodo();
};

let editTodo = (index, oldEle) => {
  let newEle = prompt("enter new value", oldEle);

  if (newEle && newEle.length > 0) {
    let todos = getFromLS();
    todos[index] = newEle;
    localStorage.setItem("MyTodoLists", JSON.stringify(todos));
    showTodo();
  }
};

// !  show the todo when page loads

showTodo();

// ! adding event on the button

Add.addEventListener("click", (e) => {
  e.preventDefault(e);
  // console.log('clicked')

  // ! adding todolist
  addTodo();
});
