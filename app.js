const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $$$ = document.getElementsByClassName.bind(document);
const toDo = {
   deleteContent: function (element) {
      for (let x of element) {
         x.addEventListener('click', (e) => {
            x.parentNode.remove();
         });
      }
   },
   delLocal: function (element) {
      for (let i = 0; i < element.length; i++) {
         element[i].onclick = () => {
            let value = JSON.parse(localStorage.getItem('value'));
            localStorage.removeItem(value[i]);
         };
      }
   },
   createContent: function () {
      $('.submit').addEventListener('click', (e) => {
         //   Submit content
         e.preventDefault();
         const li = document.createElement('li');
         const text = `
          <span class="data">${$('.input').value}</span>
          <button class="delete">Delete</button>
          <button class="edit">Edit</button>`;
         li.innerHTML = text;
         $('.list-todo').appendChild(li);
         $('.input').value = '';
         //  Delete content
         this.deleteContent($$('.delete'));
         editContent();
      });
      //  Edit content
      editContent = function () {
         const edit = $$('.edit');
         for (let i of edit) {
            i.addEventListener('click', (e) => {
               e.preventDefault();
               i.parentNode.innerHTML = `<form id="edit-form">
                 <input type="text" class="input-edit" placeholder="Enter here" />
                 <input type="submit" class="input-submit" value="Ok" />
              </form>`;
               $('.input-submit').addEventListener('click', (e) => {
                  e.preventDefault();
                  $('#edit-form').parentNode.innerHTML = `
                    <span class="data">${$('.input-edit').value}</span>
                    <button class="delete">Delete</button>
                    <button class="edit">Edit</button>`;
                  toDo.deleteContent($$('.delete'));
                  editContent();
               });
            });
         }
      };
      // Local Storage
      $('.save').addEventListener('click', () => {
         let arr = [];
         for (let i of $$('.data')) {
            let data = i.innerHTML;
            arr.push(data);
            localStorage.setItem('value', JSON.stringify(arr));
         }
      });
      function localSt() {
         let local = JSON.parse(localStorage.getItem('value'));
         if (local) {
            for (let i of local) {
               const li = document.createElement('li');
               const text = `
                <span class="data">${i}</span>
                <button class="delete">Delete</button>
                <button class="edit">Edit</button>`;
               li.innerHTML = text;
               $('.list-todo').appendChild(li);
               toDo.deleteContent($$('.delete'));
               toDo.delLocal($$('.delete'));
               editContent();
            }
         }
      }
      localSt();
   },
};
toDo.createContent();
