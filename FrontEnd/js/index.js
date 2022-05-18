




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

    let available = element[6];
    let styleEle ="";

    if(available===1){
      styleEle =  "color:green;font-weight: 1000;";
    }
  
let content = `
              <tr  scope="row"> 
              <td > ${index+1}   </td>
              <td > ${element[1]}   </td>
              <td > ${element[2]}   </td>
              <td > ${element[3]}   </td>
              <td > ${element[4]}   </td>
              <td > ${element[5]}   </td>
              <td >   <i class="fa fa-edit text-center " aria-hidden="true" onclick="editBook(${element[1]})" ></i> </td>
              <td >   <i class="fa fa-trash" aria-hidden="true" onclick="deleteBook(${element[0]})"></i>
              </tr>

`
    tdBody.innerHTML += content;

  });
}



