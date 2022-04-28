

let container = document.getElementById("k");

const getUserHighest = async () => {
    getBookHighestLent()
    await fetch(`http://localhost:8080/LibraryManagement/getMostReadUser`)
        .then(res => res.json())
        .then(data => {
            // cardPrinting(data);
            console.log(data);
            data.map((element) => {
                const card = document.createElement('div');
                card.classList = 'card';

                let content = ` 
  
                    <div class="col-md-4 mx-auto">
                    <div class="card" >
                    <div class="card-body">
                    <div class="heading-1 p-3 rounded m-2 text-center ">
                        <i class="fa fa-language" aria-hidden="true"></i>
                        <span> <b>  Higest Book Lent User </b>  </span> 
                    </div>
                    <span class="higest text-center">Highest</span>

                    <div class="container-fluid ">
                    <h6> Username : <b>   ${element.userId}   </b>   </h6>
                    
                        <h6> Username : <b>    ${element.username}    </b>   </h6>
                        <h6>  Gender  : <b>    ${element.gender}       </b> </h6>
                        <h6>  DOB : <b>   ${element.dob}     </b></h6>  
                        <h6> Address : <b> ${element.address}   </b> </h6>  
                        <h6> Mobile : <b> ${element.mobile}   </b> </h6> 
                    </div>
                    </div>
                    </div>
                </div>
  
       `;
                container.innerHTML += content;
            });
           
        })
}


const getBookHighestLent = async () => {


    await fetch(`http://localhost:8080/LibraryManagement/getMostReadBook`)
        .then(res => res.json())
        .then(data => {
            //  cardPrinting(data);
            data.map((element) => {
                const card = document.createElement('div');
                card.classList = 'card';



                let content = ` 
  
    <div class="col-md-4 mx-auto">
    <div class="card" >
     <div class="card-body">
       <div class="heading-1 p-3 rounded m-2 text-center ">
           <i class="fa fa-language" aria-hidden="true"></i>
          <span> <b id="bookId">Higest Read Book </b>  </span> 
       </div>
       <span class="higest text-center">Highest</span>

       <div class="container-fluid ">
       <h6> BookId : <b>     ${element.bookId}    </b>   </h6>
      
        <h6> BookName : <b>    ${element.bookName}    </b>   </h6>
        <h6>  Author  : <b>    ${element.author}       </b> </h6>
        <h6>  Category : <b>   ${element.category}     </b></h6> 
        <h6> shelfNumber : <b> ${element.shelfNumber}   </b> </h6> 
       </div>
     </div>
    </div>
   </div>
  
       `;
                container.innerHTML += content;
            });
            console.log(data);
        })


}