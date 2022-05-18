

const renewBook = async (id) => {

  await fetch(`http://localhost:8080/LibraryManagement/bookIssue/${id}`)
    .then(res => res.json())
    .then(data => {
      return getfun(data)
    })

}

// let issueId = document.getElementById("issueId");
// let bookId = document.getElementById("issueId");


const getfun = async (data) => {
  data.map(i => {
    document.getElementById("ID").value = i.id;
    document.getElementById("issueId").value = i.issueId;
    document.getElementById("userId").value = i.userId;
    document.getElementById("bookID1").value = i.bookId;
    document.getElementById("issueDate1").valueAsDate = new Date(i.issueDate);

    if (i.returnDate) {
      var numberOfDaysToAdd = 15;
      let returnDate = new Date();
      var result = returnDate.setDate(returnDate.getDate() + numberOfDaysToAdd);
      document.getElementById("returnDate").valueAsDate = new Date(result)
    }

  })

  var myModal = await new bootstrap.Modal(document.getElementById('exampleModal'))
  myModal.show()


}



















