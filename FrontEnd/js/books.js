
const getData = async () => {
  let books;
  await fetch("http://localhost:8080/LibraryManagement/get")
    .then(response => response.json())
    .then(data => {
      if (data) {
        tdBody.innerHTML = "";
        cardPrinting(data);
      }
    });
 
}



const searchBookById = async () => {
  let id = document.getElementById("searchId").value;
  await fetch(`http://localhost:8080/LibraryManagement/get/${id}`)
    .then(res => res.json())
    .then(data => {
      tdBody.innerHTML = "";
      cardPrinting(data);
    })
}


const searchBookByName = async () => {
  let bookName = document.getElementById("searchName").value;
  await fetch(`http://localhost:8080/LibraryManagement/searchBookName/${bookName}`)
    .then(res => res.json())
    .then(data => {
      tdBody.innerHTML = "";

      cardPrinting(data);
    })
}


const tdBody = document.getElementById('tableDataContainer');







let cardPrinting = (books) => {
  books.map((element,index) => {
  
let content = `
              <tr  scope="row"> 
              <td > ${index+1}   </td>
              <td > ${element.bookId}   </td>
              <td > ${element.bookName}   </td>
              <td > ${element.author}   </td>
              <td > ${element.category}   </td>
              <td > ${element.shelfNumber}   </td>
              <td >   <i class="fa fa-trash  text-center " aria-hidden="true" onclick="deleteBook(${element.id})" ></i>
              </td>
              </tr>

`
    tdBody.innerHTML += content;

  });
}





const deleteBook = async(id)=> {

  var myModal =  new bootstrap.Modal(document.getElementById('modalConform'))

 


  let but2 = document.createElement("button");
  but2.innerHTML ="Cancel"
  but2.id = id;
  but2.className = "btn btn-info"
  but2.addEventListener("click",function(){
    myModal.hide();
  })

  let but = document.createElement("button");
  but.innerHTML = "Delete";
  but.id = id;
  but.className = "btn btn-danger"
  but.addEventListener("click", async function(){
    try {
  
  await fetch(`http://localhost:8080/LibraryManagement/delete/${id}`,{
    method: 'DELETE',
    headers: {
      'Access-Control-Allow-Origin': "*",
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

  })
    .then(response => response.json())
    .then(data => {
      books = data;
      getData();
    });

  launch_toast("fail", "Successfully deleted Book");

  myModal.hide();
} catch (error) {
  launch_toast("fail", error);
}

  })

 
  let container  =   document.getElementById('foot')
  container.innerHTML = "";

  container.appendChild(but2);
  container.appendChild(but);

    myModal.show()  


 

}