const returnBook = async (sid) => {

  await fetch(`http://localhost:8080/LibraryManagement/bookIssue/${sid}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return getfun2(data)
    })

}



const getfun2 = async (data) => {


  data.map(i => {
    console.log(i.bookId);

    document.getElementById("ID2").value = i.id;
    document.getElementById("issueId2").value = i.issueId;
    document.getElementById("userId2").value = i.userId;
    document.getElementById("bookID2").value = i.bookId;
    document.getElementById("issueDate2").value = i.issueDate;
    document.getElementById("returnDate2").valueAsDate = new Date(i.returnDate);
    document.getElementById("actualReturnDate2").valueAsDate = new Date();

    const date1 = new Date(i.returnDate);
    const today = new Date();

    const diffTime = today - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalFine = 0;
    if (diffDays > 0) {
      totalFine = diffDays * 5;
    }
    document.getElementById("fine2").value = totalFine;



    if (i.returnDate) {
      var numberOfDaysToAdd = 15;

      let returnDate = new Date(i.returnDate);

      var result = returnDate.setDate(returnDate.getDate() + numberOfDaysToAdd);

      console.log(new Date(result))
      document.getElementById("returnDate").valueAsDate = new Date(result)
    }
  })

  var myModal = await new bootstrap.Modal(document.getElementById('exampleModal2'))
  myModal.show()

}






const returnBookFine = async () => {

  let id = document.getElementById("ID2").value;
  let userId = document.getElementById('userId2').value;
  let issueId = document.getElementById('issueId2').value;
  let bookId = document.getElementById('bookID2').value;
  let issueDate = document.getElementById('issueDate2').value;
  let returnDate = document.getElementById('returnDate2').value;
  let actualReturnDate = document.getElementById('actualReturnDate2').value;
  let fine = document.getElementById("fine2").value;

  if (document.getElementById('option-1').checked) {
    isReturned = document.getElementById('option-1').value;
  } else {
    isReturned = document.getElementById('option-2').value;
  }



  let data = {
    id: id,
    issueId: issueId,
    userId: userId,
    bookId: bookId,
    issueDate: issueDate,
    returnDate: returnDate,
    actualReturnDate: actualReturnDate,
    fine: fine,
    isReturned: isReturned
  };

  try {
    await fetch('http://localhost:8080/LibraryManagement/issueFineHandleForm', {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': "*",
        'mode': 'no-cors',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => {
        launch_toast("success", "Successfully Returned book ");
      });
  } catch (error) {
    launch_toast("fail", error);
  }
}