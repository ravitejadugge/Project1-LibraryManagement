
const getData = async () => {
  let books;
  await fetch("http://localhost:8080/LibraryManagement/get")
    .then(response => response.json())
    .then(data => {
      books = data;
    });
  if (books) {
    cardPrinting(books);
  }
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
  books.map((element) => {
  
let content = `
              <tr  scope="row"> 
              <td class="state-5"> ${element.id}   </td>
              <td class="state-1"> ${element.bookId}   </td>
              <td class="state-2"> ${element.bookName}   </td>
              <td class="state-3"> ${element.author}   </td>
              <td class="state-4"> ${element.category}   </td>
              <td class="state-6"> ${element.shelfNumber}   </td>
              </tr>

`
    tdBody.innerHTML += content;

  });


}





const deleteBookById = (id)=> {
  console.log(id);

}