

let container = document.getElementById("k");


const getissued = async () => {
  let booksIssueDeatils;
  await fetch("http://localhost:8080/LibraryManagement/bookIssue")
    .then(response => response.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting3(data);
    });
}

let cardPrinting3 = async (booksIssueDeatils) => {

  booksIssueDeatils.map((element) => {

    const card = document.createElement('div');
    card.classList = 'card';
    let btn1 = "";
    let btn2 = "";
    if(!element.actualReturnDate){
      element.actualReturnDate = " ";
    }

    if (element.isReturned !== "YES") {



      let content = ` 

      <div class="col-md-4 mx-auto">
      <div class="card" >
       <div class="card-body">
         <div class="heading-1 p-2 rounded m-2 text-center ">
             <i class="fa fa-book" aria-hidden="true"></i>
            <span> <b id="bookId"> ${element.issueId}    </b>  </span> 
         </div>
         <div class="container-fluid text-align-justify">

             <div class="row btn-secondary rounded">
                <div class="col-6"> 
                  BookID : <b> ${element.bookId} </b>
                </div>

                <div class="col-6">
                 UserID:<b>  ${element.userId} </b> 
                </div>
             </div>
          
          <span>  IssueDate : <b>   ${element.issueDate}     </b></span>  </br>
          <span> ReturnDate : <b>    ${element.returnDate}    </b>   </span></br>
          <span> ActualReturnDate : <b> ${ element.actualReturnDate}    </b>   </span></br>
          <span> Fine : <b> ${element.fine}   </b> </span>  </br>
          <button onclick="renewBook(${element.issueId})" class="custom-btn btn mt-1" id='renewbtn2'>
          Renew
          </button>
          <button onclick="returnBook(${element.issueId})" class="custom-btn-2 btn mt-1" id='returnbtn'> Return </button>

      

         </div>
       </div>
     </div>
   </div>
       
         `;

  container.innerHTML += content;
    
      
    }
  

  });

}



const searchIssuedBook = async () => {
  let id = document.getElementById("searchIssueId").value;
  await fetch(`http://localhost:8080/LibraryManagement/bookIssueByBookId/${id}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting3(data);
    })
}


const searchIssuedBookAnyId = async () => {
  let id = document.getElementById("searchId").value;
  await fetch(`http://localhost:8080/LibraryManagement/bookIssues/${id}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting3(data);
    })
}


