

let container = document.getElementById("k");


const getIssueDatails = async () => {
  let booksIssueDeatils;
  await fetch("http://localhost:8080/LibraryManagement/bookIssue")
    .then(response => response.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting2(data);
    });
}

let cardPrinting2 = async (booksIssueDeatils) => {

  booksIssueDeatils.map((element) => {

    const card = document.createElement('div');
    card.classList = 'card';
    let btn1 = "";
    let btn2 = "";
    if(!element.actualReturnDate){
      element.actualReturnDate = " ";
    }

    if (element.isReturned !== "YES") {
      btn1 = ` <button onclick="renewBook(${element.issueId})" class="custom-btn btn " id='renewBookbtn2'>
            Renew
        </button>` ;
      btn2 = `<button onclick="returnBook(${element.issueId})" class="custom-btn-2 btn " id='returnBookbtn'> Return </button>`

    }

    let content = ` 

        <div class="col-md-4 mx-auto">
        <div class="card" >
         <div class="card-body">
           <div class="heading-1 p-3 rounded m-2 text-center ">
               <i class="fa fa-book" aria-hidden="true"></i>
              <span> <b id="bookId"> ${element.issueId}    </b>  </span> 
           </div>
           <div class="container-fluid text-align-justify">

            

               <div class="row btn-secondary">
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

         
              ${btn1}
              ${btn2}

        
  
           </div>
         </div>
       </div>
     </div>
         
           `;

    container.innerHTML += content;


  });

}



const searchIssuedBook = async () => {
  let id = document.getElementById("searchIssueId").value;
  console.log(id);

  await fetch(`http://localhost:8080/LibraryManagement/bookIssueByBookId/${id}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting2(data);
    })
}


const searchIssuedBookAnyId = async () => {
  let id = document.getElementById("searchId").value;
  console.log(id);

  await fetch(`http://localhost:8080/LibraryManagement/bookIssues/${id}`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";
      cardPrinting2(data);
    })
}


