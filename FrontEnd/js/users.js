
const getUserData = async () =>{
  await fetch("http://localhost:8080/LibraryManagement/getUser")
    .then(res=>res.json())
    .then(data=>{
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
        <div class="col-md-3">
        
        <div class="card cardprint">

        <div class="float-end abc">
        <i class="fa fa-trash   float-end trash-user mt-1 me-1" aria-hidden="true"  onclick="deleteUser(${element.id})" ></i>
        </div>

        <div class="row align-items-center">
        <img src="${element.image}" alt="user Image" />
        </div>
        <div class="container text-center">

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

    
    if ( !membername) {
        document.getElementById('membername').style = 'border: 2px solid red !important';
        return launch_toast("fail", "Member Name Cannot be null");
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
  
  }



  const deleteUser = async (id)=>{

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
    




  }