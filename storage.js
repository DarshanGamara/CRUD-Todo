let prjNewBtn = document.querySelector("#first");
let inp = document.querySelector(".main");
let divA = document.querySelector("#small");
let ul = document.querySelector("#myList");
let adPrjBtn = document.querySelector(".second")
let projectName = [];
let toDoBtn = document.querySelector("#third")
let li = document.querySelector(".li")

let divB = document.querySelector("#big");
let h2 = document.querySelector("h2");
let h4 = document.querySelector(".head4");
let inp2 = document.querySelector(".inp2");
let tArea = document.querySelector(".text");
let priority = document.querySelector(".prt");
let date = document.querySelector(".d");
let lastBtn = document.querySelector(".last");


let getPrjFromLs = () => {
     return JSON.parse(localStorage.getItem("project")) || []; 
};

let addPrjLocalStorage = (add) => {
   return localStorage.setItem("project", JSON.stringify(add));
};

let showPrjName = () => {
   let prjNameValue = getPrjFromLs();

    prjNameValue.forEach((curPrj) => { 
        let listItem = document.createElement("li");
        listItem.innerText = curPrj;

      listItem.addEventListener("click", function() {
        h2.innerText = `All ToDo For ${curPrj}`;

        selectedProject = curPrj;
        toDoBtn.disabled = false;

        loadTodosForProject(curPrj);
     })

        ul.appendChild(listItem);

    });
 }

 function loadTodosForProject(projectName) {
  let data = JSON.parse(localStorage.getItem("userDetails")) || [];
  let userData = data[projectName] || [];
  displayTodos(userData);
}

     showPrjName();

 prjNewBtn.addEventListener("click", function() {
    console.log("Add New Prj button Was Click");

     prjNewBtn.disabled = true;

    let item = document.createElement("p");
    item.innerText = "Project Name";
    
    let inp = document.createElement("input");
       inp.classList.add("main");

    let adPrjBtn = document.createElement("button");
    adPrjBtn.innerText = "Add Project";
     adPrjBtn.classList.add("second");

     adPrjBtn.addEventListener("click", function() {
        console.log("Add Project Button Was Click");

        prjNewBtn.disabled = false;
       
       let prjNameValue = getPrjFromLs();
        let newPrj = inp.value.trim();

        if (newPrj.length != 0 && !prjNameValue.includes(newPrj)) {
			//projectName.push(newPrj);
      prjNameValue.push(newPrj);

			addPrjLocalStorage(prjNameValue);

			let listItem = document.createElement("li");
			listItem.innerText = newPrj;
			ul.appendChild(listItem);

			item.remove();
			inp.remove();
			adPrjBtn.remove();
  
        }

        inp.value = "";
    }); 

    divA.appendChild(item);
    divA.appendChild(inp);
    divA.appendChild(adPrjBtn); 

});

function saveTodosForProject(projectName, todos) {
  let allProjectsData = JSON.parse(localStorage.getItem("projects")) || {};
  allProjectsData[projectName] = todos;
  localStorage.setItem("projects", JSON.stringify(allProjectsData));
}

function loadTodosForProject(projectName) {
  let allProjectsData = JSON.parse(localStorage.getItem("projects")) || {};
  let projectTodos = allProjectsData[projectName] || [];
  displayTodos(projectTodos);  // Call to display todos for the selected project
}

function getTodosForProject(projectName) {
  let allProjectsData = JSON.parse(localStorage.getItem("projects")) || {};
  return allProjectsData[projectName] || [];
}
let selectedProject = ""; 
let isEditOpen = false;

  function displayTodoInput(title = "", description = "", priority = "low", dueDate = "")
 {
  if (isEditOpen) return;
   divB.style.display = "block";

 // Clear only the inputs, not the title

 const existingTitle = divB.querySelector("h4");
 if (!existingTitle) {
   let h4 = document.createElement("h4");
   h4.innerText = title ? "Edit Todo" : "Add New Todo";
   divB.appendChild(h4);
 }

 // Clear previous inputs only

 const inputs = divB.querySelectorAll(".inp2, .text, .prt, .d");
 inputs.forEach(input => input.remove());

  let lbl = document.createElement("label");
  lbl.innerText = "Title";

  let inp2 = document.createElement("input");
  inp2.classList.add("inp2");
  inp2.value = title; 

  let lbl2 = document.createElement("label");
  lbl2.innerText = "Description";

  let tArea = document.createElement("textarea");
  tArea.value = description; // Set value if editing

  let lbl3 = document.createElement("label");
  lbl3.innerText = "Priority";

  let dropdown = document.createElement('select');
  dropdown.classList.add("prt");
  let options = ["High", "Medium", "Low"];
  options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText.toLowerCase().replace(/\s+/g, '-');
      option.textContent = optionText;
      option.selected = option.value === priority;
      dropdown.appendChild(option);
  });

  let lbl4 = document.createElement("label");
  lbl4.innerText = "Due Date";

  let date = document.createElement("input");
  date.type = "date";
  date.classList.add("d");
  date.value = dueDate; 

  let lastBtn = document.createElement("button");
  lastBtn.innerText = title ? "Save Changes" : "Add Todo";
  lastBtn.classList.add("last");

  divB.appendChild(lbl);
  divB.appendChild(inp2);
  divB.appendChild(lbl2);
  divB.appendChild(tArea);
  divB.appendChild(lbl3);
  divB.appendChild(dropdown);
  divB.appendChild(lbl4);
  divB.appendChild(date);
  divB.appendChild(lastBtn);

  isEditOpen = true;

  function updateUserData(userData) {
    localStorage.setItem("userDetails", JSON.stringify(userData));
}

function getUserData() {
  return JSON.parse(localStorage.getItem("userDetails")) || [];
}

function removeInputsAndLabels() {
  const inputsAndLabels = divB.querySelectorAll(".inp2, textarea, .prt, .d, label, .last, h4");
  inputsAndLabels.forEach(input => input.remove());
}

  function handleTodoAction(isEditing, userData, index) {
      const inp2 = document.querySelector(".inp2");
      const tArea = document.querySelector("textarea");
      const dropdown = document.querySelector(".prt");
      const date = document.querySelector(".d");
         
      const todo = {
        title: inp2.value.trim(),
        description: tArea.value.trim(),
        priority: dropdown.value,
        dueDate: date.value
    };

    if (isEditing) {
        userData[index] = todo; // Editing existing todo
    } else {
        userData.push(todo);    // Adding new todo
    }

    updateUserData(userData);
    displayTodos(userData);
    clearInputsAndCloseForm();
    
}

  lastBtn.addEventListener("click", function() {
      console.log(title ? "Saving Changes" : "Adding Todo");

      let userData = getTodosForProject(selectedProject);
     
       toDoBtn.disabled = false;

      if (title) {
          // Editing an existing todo
          const index = userData.findIndex(item => item.title === title);
          
          if (index !== -1) {
            handleTodoAction(true, userData, index);
        }

      } else {
        // Adding a new todo
        handleTodoAction(false, userData);
    }
    saveTodosForProject(selectedProject, userData); 
       isEditOpen = false;

      clearInputsAndCloseForm();
      removeInputsAndLabels();
  });
}
// Function to display todos
function displayTodos(todos) {
  const todoContainer = document.getElementById('todoContainer');
  todoContainer.innerHTML = ''; // Clear existing todos
  todos.forEach((todo) => {

      let dv1 = document.createElement("div");
      dv1.classList.add("dv5");

      dv1.innerHTML = `
          <h5>${todo.title}</h5>
          <p>${todo.description}</p>
          <button id="hp">${todo.priority}</button>
          <p>${todo.dueDate}</p>
      `;

      let delBtn = document.createElement("button");
      delBtn.classList.add("dBtn");
      delBtn.innerText = "Delete";

      delBtn.addEventListener("click", function() {
        event.stopPropagation();
          dv1.remove();
          
          let allProjectsData = JSON.parse(localStorage.getItem("userDetails")) || {};
          // Remove the item from 
          let updatedProjectTodos = allProjectsData[selectedProject].filter(todo => todo.title !== element.title);
        
         allProjectsData[selectedProject] = updatedProjectTodos;
         // saveTodosForProject(selectedProject, todos);
          localStorage.setItem("userDetails", JSON.stringify(allProjectsData));
          displayTodos(updatedProjectTodos);
      });

      dv1.appendChild(delBtn);
      todoContainer.appendChild(dv1);
      
      // Add event listener to dv1 to show the add/edit todo section when clicked
      dv1.addEventListener("click", function() {
          displayTodoInput(todo.title, todo.description, todo.priority, todo.dueDate); 
      });
  });
}

function clearInputsAndCloseForm() {
  const inp2 = document.querySelector(".inp2");
  const tArea = document.querySelector("textarea");
  const dropdown = document.querySelector(".prt");
  const date = document.querySelector(".d");


  clearInputs(inp2, tArea, dropdown, date);
  
  isEditOpen = false; // Reset the flag
}
function clearInputs(...inputs) {
  inputs.forEach(input => input.value = "");
}

function removeInputsAndLabels() {
  const inputsAndLabels = divB.querySelectorAll(".inp2, textarea, .prt, .d, label, .last, h4");
  inputsAndLabels.forEach(input => input.remove()); 
}

 function loadTodos() {
  let userData = JSON.parse(localStorage.getItem("userDetails")) || [];
  displayTodos(userData);
} 

loadTodos();

toDoBtn.addEventListener("click", function() {
  displayTodoInput();
  toDoBtn.disabled = true;
});  
        

// Hello   


 /* "projects": [
      {
        "name": "Prj-A",
           "todos":[
              {
                "Title": "Prj-I",
                "Description": "Code",
                "Priority": "high",
                "Due Date": "14/9/2024"
              },
              {
                "Title": "Prj-II",
                "Description": "Code",
                "Priority": "low",
                "Due Date": "25/9/2024"
              }
           ]
      },

      {
        "name": "Prj-B",
           "todos":[
              {
                "Title": "Prj-B.I",
                "Description": "Code",
                "Priority": "high",
                "Due Date": "14/9/2024"
              },
              {
                "Title": "Prj-B.II",
                "Description": "Code",
                "Priority": "low",
                "Due Date": "25/9/2024"
              }
           ]
      }
  ]
*/
