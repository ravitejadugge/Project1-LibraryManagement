

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
    let renewButton = "";
    if(!element.actualReturnDate){
      element.actualReturnDate = " ";
    }



    
    const date1 = new Date(element.returnDate);
    const today = new Date();

    const diffTime = today - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalFine = 0;
    if (diffDays > 0) {
      totalFine = diffDays * 5;
    }

    if(totalFine > 0) {
      renewButton = "";
    } else {
      renewButton = `<button onclick="renewBook(${element.issueId})" class="custom-btn btn mt-1" id='renewbtn2'>  Renew </button>`;
    }

    

    // if (element.isReturned !== "YES") {



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
                  Book Id : <b> ${element.bookId} </b>
                </div>

                <div class="col-6">
                 User Id:<b>  ${element.userId} </b> 
                </div>
             </div>

            
          
          <span>  Issue Date : <b>   ${element.issueDate}     </b></span>  </br>
          <span> Return Date : <b>    ${element.returnDate}    </b>   </span></br>
          <span> Fine : <b> ${totalFine}   </b> </span>  </br>
          ${renewButton}
          
          <button onclick="returnBook(${element.issueId})" class="custom-btn-2 btn mt-1" id='returnbtn'> Return </button>
         </div>
       </div>
     </div>
   </div>
       
         `;

  container.innerHTML += content;
    
      
    // }
  

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


