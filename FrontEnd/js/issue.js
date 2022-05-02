
document.getElementById("issueDate").valueAsDate = new Date();

const issueFormHandle = async () => {

  let bookId = document.getElementById('bookId').value;
  let userId = document.getElementById('userId').value;
  let issueDate = document.getElementById('issueDate').value;
  // let issueId = document.getElementById('issueId').value;

  let issueId = Number(Math.random().toString().substring(2,8));

  if (!bookId || !issueDate || !userId || !issueId) {
    return launch_toast("fail", "Enter all details");
  }

  let data = {
    issueId: issueId,
    userId: userId,
    bookId: bookId,
    issueDate: issueDate
  };


  try {
    await fetch('http://localhost:8080/LibraryManagement/issueHandleForm', {
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
        launch_toast("success", "Successfully Issued book to user" + data.userId);
      });
  } catch (error) {
    launch_toast("fail", error);
  }
  finally {
    document.getElementById('bookId').value = "";
    document.getElementById('userId').value = "";
    document.getElementById('issueDate').value = "";
    document.getElementById('issueId').value = "";

  }

}



