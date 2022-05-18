
const getUserData = async () =>{
  await fetch("http://localhost:8080/LibraryManagement/getUser")
    .then(res=>res.json())
    .then(data=>{
        container.innerHTML = "";
        userCardPrinting(data);
    })
}

let container = document.getElementById("k");1
const userCardPrinting = (data)=>{
    data.map(element=>{
        const card = document.createElement('div');
        card.classList = 'cards';
        card.className = "cardprint"
    

    let content = ` 
        <div class="col-md-3">
        
        <div class="card cardprint">

        <div class="float-end abc">
        
        </div>

        <div class="">


        <div class="top-right"> <i class="fa fa-trash trash-user " aria-hidden="true"  onclick="deleteUser(${element.id})"  ></i>
        </div>

        <img src="${element.image}" alt="user Image"  class="card-img-top" />

        </div>
        <div class="container float-end">
      
        <h3>${element.username}</h3>
        <div >
        <h6>  ${element.userId}</h6>
 
        <h6>  ${element.email}</h6>
        <h6>  ${element.dob}</h6>
        <h6>  ${element.mobile}</h6>
        <h6> ${element.address}</h6>

        </div>
        
       

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
        container.innerHTML = "";
        userCardPrinting(data);
    })    
}



const addUser = async (e) => {
    
    // let bookId = document.getElementById('bookId').value;
    let membername = document.getElementById('membername').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;
    let dob = document.getElementById('dob').value;
    let address = document.getElementById('address').value;

    
    if ( /[^a-zA-Z0-9\s\_\/]/.test( membername) || !membername) {
        document.getElementById('membername').style = 'border: 2px solid red !important';
        return launch_toast("fail", "Enter a valid Name");
      }

    if(membername.length <= 0 ){
        document.getElementById('membername').style = 'border: 2px solid red !important';
        return launch_toast("fail", "min 3  characters required for name" );
    }

    // let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!regex.test(email)){
        document.getElementById('email').style = 'border: 2px solid red !important';
        return launch_toast("fail", "Enter a valid email Address");
    }


    

    const regexExpMobile = /^[6-9]\d{9}$/gi;

    if(regexExpMobile.test(mobile) && mobile.length === 10) {
     mobile = mobile;
    }else {
        document.getElementById('mobile').style = 'border: 2px solid red !important';
        return launch_toast("fail", "Enter a valid Mobile Number");
    }
    if ( /[^a-zA-Z0-9._-\s\/]/.test( address) || !address) {
      
      document.getElementById('address').style = 'border: 2px solid red !important';

      return launch_toast("fail", "Enter a valid Address");
    }


    let gender;
    if (document.getElementById('option-1').checked) {
        gender = document.getElementById('option-1').value;
      } else {
        gender = document.getElementById('option-2').value;
      }

      let data = {
        username: membername,
        email: email,
        mobile: mobile,
        address: address,
        dob : dob,
        gender: gender
      };
    
    try {
      await fetch('http://localhost:8080/LibraryManagement/createUser', {
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
            getUserData();
          }
           launch_toast("success", "Successfully Added new User");
        });
  
    } catch (error) {
      launch_toast("fail", error)
    }
  
    
    document.getElementById('membername').value = "";
    document.getElementById('mobile').value = "";
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
    document.getElementById('dob').value = "";


    document.getElementById('membername').style = "";
    document.getElementById('mobile').style = "";
    document.getElementById('email').style = "";
    document.getElementById('address').style = "";
    document.getElementById('dob').style="";
  
  }

  const deleteUser = async (id)=>{
      var myModal =  new bootstrap.Modal(document.getElementById('modalConform'))

      let but = document.createElement("button");
      but.innerHTML = "Delete";
      but.id = id;
      but.className = "btn btn-danger"
      // but.addEventListener("click", confirmDelete(id));
      but.addEventListener("click", async function(){
        console.log(id);
        try {
        await fetch(`http://localhost:8080/LibraryManagement/deleteuser/${id}`, {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin': "*",
            'mode': 'no-cors',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(response => response.json())
          .then(data => {
            if(data) {
              getUserData();
            }
             launch_toast("fail", "Successfully Deleted  User");
          });
    
      } catch (error) {
        launch_toast("fail", error)
      }
      myModal.hide();
    

      });



      let but2 = document.createElement("button");
      but2.innerHTML ="Cancel"
      but2.id = id;
      but2.className = "btn btn-info"
      but2.addEventListener("click",function(){
        myModal.hide();
      })
     
      let container  =   document.getElementById('foot')
      container.innerHTML = "";

      container.appendChild(but2);
      container.appendChild(but);


      // but2.addEventListener("click",confirmDelete());

      //container.appendChild(but2);
    myModal.show()
    





  }
