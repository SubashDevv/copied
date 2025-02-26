// //all the initialization
// const addBtn=document.querySelector("#addList");
// const addedList=document.querySelector("#addedList")
// const Completed=document.querySelectorAll(".greenColor");
// //even i dont understand what i did here but it works 
// let listNo=(localStorage.getItem("listIndexCount")!=null)?Number(localStorage.getItem("listIndexCount")):0;
// let lists={};
// let currList;
// let currElement;
// let currListName;
// let compIcon;
// let delIcon;
// let listId;
// //create list func
// let createList=(num)=>{
//     let ListArr=JSON.parse(localStorage.getItem(`lists`) );
//     currElement=document.createElement("div");
//     currElement.classList.add("listItems");
//     addedList.appendChild(currElement);
//     currListName=document.createElement("div")
//     currListName.classList.add("listName");
//     currListName.innerHTML=`<p>${ListArr[num]}</p>`
//     currElement.appendChild(currListName);
//     compIcon=document.createElement("div")
//     compIcon.classList.add("fa-solid","fa-check","fa-2x","greenColor");
//     currElement.appendChild(compIcon);
//     delIcon=document.createElement("div")
//     delIcon.classList.add("fa-solid","fa-trash","fa-2x","redColor",num);
//     currElement.appendChild(delIcon);
//     //completed
//     document.querySelectorAll(".greenColor").forEach((val)=>{
//         val.addEventListener("click",()=>{
//             val.previousElementSibling.style.textDecoration="line-through 4px #FFA07A";
//             val.style.opacity=0;
//         })

//     })
//     //delete
//     document.querySelectorAll(".redColor").forEach((value)=>{
//         value.addEventListener("click",()=>{
//          listId=parseInt(value.classList[4]);
//          localStorage.removeItem(`list${listId}`);
//          console.log(listNo);
//          for(let i=listId+1;i<=parseInt(localStorage.getItem("listCount"));i++)
//          {
//            let tempList= localStorage.getItem(`list${i}`);
//            console.log(tempList)
//            localStorage.setItem(`list${i-1}`,tempList);
           
//          }
//          listNo=listNo-1;
//          localStorage.setItem("listCount",listNo);

//         })
//     })
    

// }
// //retriving from l.s
// if(lists.length!=0){
// for(let i=0;i<lists.length;i++){
//     createList(i);
// }
// }
// //adding list
// addBtn.addEventListener("click",()=>{
//     if(document.querySelector("#TDlistName").value!="")
//     {

// const listName=document.querySelector("#TDlistName").value;
// document.querySelector("#TDlistName").value=null;
// lists[listNo]=listName;
// console.log(lists)
// localStorage.setItem("listIndexCount",listNo);
// localStorage.setItem("lists",JSON.stringify(lists))
// createList(listNo);
// listNo+=1;
// }
// })
// //i hate my life

// Initialization
const addBtn = document.querySelector("#addList");
const addedList = document.querySelector("#addedList");
const progressBar = document.querySelector("#progressColor");
const progressMsg = document.querySelector("#progressMsg");

let lists = JSON.parse(localStorage.getItem("lists")) || [];

// Function to update progress bar
const updateProgressBar = () => {
  const total = lists.length;
  const completed = lists.filter((item) => item.completed).length;
  const progress = total ? (completed / total) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  progressMsg.textContent =
    progress === 100
      ? "ALL DONE! 🎉"
      : progress >= 50
      ? "KEEP GOING! 💪"
      : "VERY GOOD!!!";
};

// Function to create a single list item
const createList = ({ id, name, completed }) => {
  const currElement = document.createElement("div");
  currElement.classList.add("listItems");
  currElement.dataset.id = id;

  currElement.innerHTML = `
    <div class="listName"><p style="${
      completed ? "text-decoration: line-through 4px #FFA07A;" : ""
    }">${name}</p></div>
    <div class="fa-solid fa-check fa-2x greenColor" style="opacity: ${
      completed ? 0 : 1
    };"></div>
    <div class="fa-solid fa-trash fa-2x redColor"></div>
  `;

  addedList.appendChild(currElement);
};

// Render all existing lists
lists.forEach(createList);
updateProgressBar();

// Handle adding a new list
addBtn.addEventListener("click", () => {
  const listName = document.querySelector("#TDlistName").value.trim();
  if (listName) {
    const newList = { id: Date.now(), name: listName, completed: false };
    lists.push(newList);
    localStorage.setItem("lists", JSON.stringify(lists));
    createList(newList);
    updateProgressBar();
    document.querySelector("#TDlistName").value = "";
  }
});

// Event delegation for complete & delete
addedList.addEventListener("click", (e) => {
  const parent = e.target.closest(".listItems");
  if (!parent) return;
  const listId = Number(parent.dataset.id);

  if (e.target.classList.contains("greenColor")) {
    const task = lists.find((item) => item.id === listId);
    task.completed = !task.completed;
    e.target.style.opacity = task.completed ? 0 : 1;
    parent.querySelector(".listName p").style.textDecoration = task.completed
      ? "line-through 4px #FFA07A"
      : "none";
    localStorage.setItem("lists", JSON.stringify(lists));
    updateProgressBar();
  }

  if (e.target.classList.contains("redColor")) {
    lists = lists.filter((item) => item.id !== listId);
    localStorage.setItem("lists", JSON.stringify(lists));
    parent.remove();
    updateProgressBar();
  }
});

// Allow adding tasks by pressing Enter
document.querySelector("#TDlistName").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

