
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const todoSearch = document.querySelector("#todoSearch");



let todos = [];

runEvents();
//olayların tanımlandığı fonksiyon
function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosClear);
    todoSearch.addEventListener("keyup",filter);

}
// eklenen verileri local storage den arayüzde görüntüleme
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach((todo)=>{
        addTodoUI(todo);
    });
}
// inputSearch vasıtası ile filtreleme
function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");
    if (todoList.length > 0){
        todoList.forEach((todo)=>{
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style", "display : flex");
            }else {
                todo.setAttribute("style", "display : none");
            }
        })
    }

    
}
// verilerin tamamını local ve kullanıcı arayüzünden silme
function allTodosClear(e){
    const todoList = document.querySelectorAll(".list-group-item");
    e.preventDefault();
     if(todoList.length > 0) {
        const confirmDelete = confirm("Tüm görevleri silmek istediğinizden emin misiniz?");
        if(confirmDelete){
        todoList.forEach((todo)=>{
            todo.remove();
        });
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Liste boş")
    }
    else{
        showAlert("warning", "Silme işlemi iptal edildi.")
    }
    }else{
    showAlert("warning", "Boş liste silinemiyor.")
    }
}
// local den silinen veriyi arayüz e taşıma
function removeTodoToUI(e){
    if (e.target.className === "fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo başarıyla silindi.")
    }
    
}
// localstorage den veri silme
function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach((todo,index)=>{
        if(removeTodo === todo){
            todos.splice(index, 1)
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos))
}

//eklenen elementlerin içine input vasıtası ile veri girişi
function addTodo(e){
    const inputText = addInput.value.trim();
    if (inputText === "" || inputText==null){
        showAlert("warning", "Listeye Boş Todo Eklenemez!")
    }
    else{
        //Arayüze ekleme
        addTodoUI(inputText);
        //Storage ekleme
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.")
    }
    
    e.preventDefault();
}
//Kullanıcı arayüzüne element ekleme
function addTodoUI(newTodo){
    const li = document.createElement("li");
    li.className= "list-group-item";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className ="delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    todoList.appendChild(li);
    li.appendChild(a);
    a.appendChild(i);

addInput.value = "";

}
// kontrol edilen localstorage ye göre push işlemi
function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//local storage kontrol fonksiyonu
function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

// Alert mesajı, css de ki class a göre değişecek olan uyarı mesajı
 function showAlert(type,message){
    const div = document.createElement("div");
    div.className = `alert-${type}`;
    div.textContent = message;
    secondCardBody.appendChild(div);

    setTimeout(()=>{
        div.remove();
    },3000)
 }
