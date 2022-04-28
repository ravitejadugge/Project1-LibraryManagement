
const getUserData = async () =>{


  await fetch("http://localhost:8080/LibraryManagement/getUser")
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        container.innerHTML = "";

        userCardPrinting(data);
    })
}

let container = document.getElementById("k");


const userCardPrinting = (data)=>{
 


    data.map(element=>{
        const card = document.createElement('div');
        card.classList = 'cards';
        card.className = "cardprint"
    

    let content = ` 
        <div class="col-md-3 mx-auto ">
        <div class="card cardprint text-center">
        <img src="${element.image}" alt="">
        <h2>${element.username}</h2>
        <div class="cont">

        <h5>  ${element.userId}</h5>
        <h5>  ${element.dob}</h5>
        <h5>  ${element.mobile}</h5>
        <h5> ${element.address}</h5>

        

        </div>
        </div>
       


     </div>
         
           `;

    container.innerHTML += content;
})

}






let searchUser = async()=>{

    let key = document.getElementById("searchkeyWord").value;

    await fetch(`http://localhost:8080/LibraryManagement/getUser/${key}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        container.innerHTML = "";
        userCardPrinting(data);
    })



    // console.log(id);
    
}