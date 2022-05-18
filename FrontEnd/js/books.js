const newbook = async (e) => { 
  let bookName = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;
  let category = document.getElementById('dropdowncategory').value;




    if( /[^a-zA-Z0-9\s\_\/]/.test( bookName) || !bookName  ) {
      document.getElementById('bookName').style = 'border: 2px solid red !important';
      return launch_toast("fail", "Enter a valid Name Characters are not allowed."); 
  }

  if( /[^a-zA-Z0-9\s\_\/]/.test( author) || !author) {
    document.getElementById('author').style = 'border: 2px solid red !important';
    return launch_toast("fail", "Author is required ");
  } 
  if( !category) {
    document.getElementById('category').style = 'border: 2px solid red !important';
    return launch_toast("fail", "category is required");
  }
 


  let data = {
    bookName: bookName,
    author: author,
    category: category
  };

  try {
    await fetch('http://localhost:8080/LibraryManagement/create', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': "*",
        'mode': 'no-cors',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
        if(data) {
          booksData();
        }
       

         launch_toast("success", "Successfully Added new Book" + data.bookId);
      });

  } catch (error) {
    launch_toast("fail", error)
  }

  
  document.getElementById('bookName').value = "";
  document.getElementById('bookName').style=""
  document.getElementById('author').value = "";
  document.getElementById('author').style=""
  document.getElementById('dropdowncategory').value = "";


}












const getData = async () => {
  await fetch("http://localhost:8080/LibraryManagement/get")
    .then(response => response.json())
    .then(data => {
      if (data) {
        tdBody.innerHTML = "";
        cardPrinting(data);
      }
    });
    getCategory();
}


const getCategory = async () => {
  await fetch("http://localhost:8080/LibraryManagement/getCategories")
    .then(response => response.json())
    .then(data => {
      if (data) {
      let select =   document.getElementById("dropdowncategory");
      select.innerHTML = "";
      data.map(element=>{
        let option = document.createElement("option");
        option.innerHTML = element.name;
        option.value = element.name;
        select.appendChild(option);
      })
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



  tdBody.innerHTML = "";
  books.map((element,index) => {
 
    let available = element[6];
    let styleEle ="";

    if(available===1){
      styleEle =  "color:green;font-weight: 1000;";
    }
  
let content = `
              <tr  scope="row" > 
              <td > ${index+1}   </td>
              <td style=${styleEle} title="Available"> ${element[1]}   </td>
              <td > ${element[2]}   </td>
              <td > ${element[3]}   </td>
              <td > ${element[4]}   </td>
              <td > ${element[5]}   </td>
              <td >   <i class="fa fa-edit text-center " aria-hidden="true" onclick="editBook(${element[1]})" ></i> </td>
              <td>  
              <i class="fa fa-trash  text-center " aria-hidden="true" onclick="deleteBook(${element[0]})" ></i>
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
  but2.className = "btn btn-secondary"
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
  myModal.hide();
}

  })

 
  let container  =   document.getElementById('foot')
  container.innerHTML = "";

  container.appendChild(but2);
  container.appendChild(but);

    myModal.show()  


 

}

const editBook =async (id)=>{
 await getCategories();
  var myModal = await new bootstrap.Modal(document.getElementById('updateModal'))
  try {
    await fetch(`http://localhost:8080/LibraryManagement/get/${id}`)
    .then(res => res.json())
    .then(data => {
      data.map(element=>{
        document.getElementById("updateId").value = element.id ;
        document.getElementById("updatebookId").value = element.bookId ;
        document.getElementById("updatebookName").value = element.bookName ;
        document.getElementById("updateauthor").value = element.author;
        document.getElementById("updatedropdowncategory").value = element.category;
      })
    })
  } catch (error) {
    console.log(error);
  }

  myModal.show()

}

const updateBook = async ()=>{
let id =  document.getElementById("updateId").value;
 let bookId =  document.getElementById("updatebookId").value;
 let bookName = document.getElementById("updatebookName").value;
 let author = document.getElementById("updateauthor").value ;
 let category = document.getElementById("updatedropdowncategory").value ;


 if( /[^a-zA-Z0-9\s\_\/]/.test( bookName) || !bookName  ) {
  document.getElementById('bookName').style = 'border: 2px solid red !important';
  return launch_toast("fail", " Enter a valid Name Special Characters are not allowed."); 
}

if( /[^a-zA-Z0-9\s\_\/]/.test( author) || !author) {
  document.getElementById('author').style = 'border: 2px solid red !important';
  return launch_toast("fail", "Enter a valid Name Special Characters are not allowed. ");
} 
if( !category) {
  document.getElementById('category').style = 'border: 2px solid red !important';
  return launch_toast("fail", "category is required");
}









 let data = {
  id,
  bookId ,
  bookName,
  author,
  category
};



try {
  await fetch('http://localhost:8080/LibraryManagement/updatebook', {
    method: 'PUT',
    headers: {
      'Access-Control-Allow-Origin': "*",
      'mode': 'no-cors',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => {
      if(data) {
        booksData();
      }
       launch_toast("success", "Successfully Updated");
    });

} catch (error) {
  launch_toast("fail", error)
}


}



const getCategories = async () => {
  await fetch("http://localhost:8080/LibraryManagement/getCategories")
    .then(response => response.json())
    .then(data => {
      if (data) {
      let select =   document.getElementById("updatedropdowncategory");
      select.innerHTML = "";
      data.map(element=>{
        let option = document.createElement("option");
        option.innerHTML = element.name;
        option.value = element.name;
        select.appendChild(option);
      })
      }
    });
}

