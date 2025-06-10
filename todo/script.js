const list = document.getElementById("list");
const createBtn = document.getElementById("create-Btn");

let todos = [];

createBtn.addEventListener('click', createNewTodo) //리스너 함수 등록

function createNewTodo(){
   // 새로운 아이템 객체 생성
   const item={
        id:new Date().getTime(), // 현재시간의 타임스ㅌ탬프를 ID로 사용
        text:'',
        complete:false
   }

   //배열에 새로운 아이템을 추가
   todos.unshift(item);

   //요소생성하기
   const {
        itemEl,
        inputEl,
        editBtnEl,
        removeBtnEl
    } = createTodoElement(item);

    //리스트 요소안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    //입력창에 포커스
    inputEl.removeAttribute('disabled');
    inputEl.focus;

    saveToLocalStorage();

}

function createTodoElement(item){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if(item.complete){
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.setAttribute('disabled',"");
    inputEl.value = item.text;

    const actionEl = document.createElement('div');
    actionEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText ='edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';

    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionEl);

    checkboxEl.addEventListener('change',() => {
        item.complete = checkboxEl.checked;

        if(item.complete){
            itemEl.classList.add('complete');
        }else{
            itemEl.classList.remove('complete');
        }

        saveToLocalStorage();
    })

    inputEl.addEventListener('input',()=>{
        item.text = inputEl.value;
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled',"");
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click',() => {
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })


    return {itemEl,inputEl,editBtnEl,removeBtnEl}
}

function saveToLocalStorage(){
    const date = JSON.stringify(todos);
    localStorage.setItem("my-todos",date);
}

function loadFromLocalStorage(){
    const date = localStorage.getItem.apply('my-todos');
    
    if(date){
        JSON.parse(date);
    }
}

