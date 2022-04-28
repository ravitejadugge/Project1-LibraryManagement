

const createBook = async (e) => {
  // let bookId = document.getElementById('bookId').value;
  let bookName = document.getElementById('bookName').value;
  let author = document.getElementById('author').value;
  let category = document.getElementById('category').value;
  let shelfNumber = document.getElementById('shelfNumber').value;

  if ( !bookName || !author || !category || !shelfNumber) {
    return launch_toast("fail", "enter all details");
  }

  let bookId = Math.random().toString().substring(2,8);
  let data = {
    bookId: bookId,
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
        launch_toast("success", "Successfully Added new Book with Book ID " + data.bookId);
      });

  } catch (error) {
    launch_toast("fail", error)
  }


  document.getElementById('bookId').value = "";
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
    img.innerHTML = ` <i class="fa fa-window-close fa-2x mb-4" aria-hidden="true"></i>`;
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
    console.log(data);
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
    console.log(data);
  });

  
}

const totalBooksIssuedToday =async ()=>{
  await fetch("http://localhost:8080/LibraryManagement/bookissuedtoday")
  .then(response => response.json())
  .then(data => {
    document.getElementById("bookissuedtoday").innerHTML = data;
    console.log(data);
  });
  
}

const totalFineCollected = async()=>{
  await fetch("http://localhost:8080/LibraryManagement/totalFine")
  .then(response => response.json())
  .then(data => {
    document.getElementById("totalfine").innerHTML = "₹ "+ data+".0";
    console.log(data);
  });
  
}



