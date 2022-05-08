

const newbook = async (e) => {
  // let bookId = document.getElementById('bookId').value;
  
  let bookName = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;
  let category = document.getElementById('category').value;
  let shelfNumber = document.getElementById('shelfNumber').value;

  if ( !bookName) {
    document.getElementById('bookName').style = 'border: 2px solid red !important';
    return launch_toast("fail", "Book Name is required");
  }
  if(  !author) {
    document.getElementById('author').style = 'border: 2px solid red !important';
    return launch_toast("fail", "Author is required ");
  } 
  if( !category) {
    document.getElementById('category').style = 'border: 2px solid red !important';
    return launch_toast("fail", "category is required");
  }
  if( !shelfNumber) {
    document.getElementById('shelfNumber').style = 'border: 2px solid red !important';
    return launch_toast("fail", "shelfNumber is required ");

  }


  let data = {
    bookName: bookName,
    author: author,
    category: category,
    shelfNumber: shelfNumber
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
         launch_toast("success", "Successfully Added new Book with Book ID " + data.bookId);
      });

  } catch (error) {
    launch_toast("fail", error)
  }

  
  document.getElementById('bookName').value = "";
  document.getElementById('author').value = "";
  document.getElementById('category').value = "";
  document.getElementById('shelfNumber').value = "";

}



const launch_toast = (status, msg) => {

  var x = document.getElementById("toast")
  var img = document.getElementById("img");

  if (status === "success") {
    x.style.backgroundColor = "green";
    img.innerHTML = ` <i class="fa fa-check-circle fa-2x mb-4" aria-hidden="true"></i>`;
    img.style.backgroundColor = "green";
    x.appendChild(img);
  }
  else if (status === "fail") {
    x.style.backgroundColor = "red";
    img.style.backgroundColor = "red";
    img.innerHTML = ` <i class="fa fa-times fa-2x mb-4" aria-hidden="true"></i>`;
    x.appendChild(img);
  } else {
    x.style.backgroundColor = "yellow";
    img.style.backgroundColor = "yellow";
    img.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> `
    x.appendChild(img);
  }
  var desc = document.getElementById("desc");
  desc.innerHTML = msg;
  x.appendChild(desc);
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 5000);
}








//  dashboard



const totalBooks = async ()=>{
  await fetch("http://localhost:8080/LibraryManagement/totalBooks")
  .then(response => response.json())
  .then(data => {
    document.getElementById("totalBooks").innerHTML = data;
  });
  totalMembers();
  totalFineCollected();
  totalBooksIssuedToday();
}

const totalMembers =async ()=>{
  await fetch("http://localhost:8080/LibraryManagement/totalUsers")
  .then(response => response.json())
  .then(data => {
    document.getElementById("totalUsers").innerHTML = data;
  });

  
}

const totalBooksIssuedToday =async ()=>{
  await fetch("http://localhost:8080/LibraryManagement/bookissuedtoday")
  .then(response => response.json())
  .then(data => {
    document.getElementById("bookissuedtoday").innerHTML = data;
  });
  
}

const totalFineCollected = async()=>{
  await fetch("http://localhost:8080/LibraryManagement/totalFine")
  .then(response => response.json())
  .then(data => {
    document.getElementById("totalfine").innerHTML = "₹ "+ data+".0";
  });
  
}



const booksData = async () => {
  let books;
  await fetch("http://localhost:8080/LibraryManagement/get")
    .then(response => response.json())
    .then(data => {
      books = data;
    });
  if (books) {
    tdBody.innerHTML = "";
    cardPrinting2(books);
  }
}


let cardPrinting2 = (books) => {
  books.map((element,index) => {
  
let content = `
              <tr  scope="row"> 
              <td > ${index+1}   </td>
              <td > ${element.bookId}   </td>
              <td > ${element.bookName}   </td>
              <td > ${element.author}   </td>
              <td > ${element.category}   </td>
              <td > ${element.shelfNumber}   </td>
              <td >   <i class="fa fa-trash" aria-hidden="true" onclick="deleteBook(${element.id})"></i>
              </tr>

`
    tdBody.innerHTML += content;

  });
}
