

let barChartLabel = [];
let barChartData = [];


let lineChartLabel = [];
let lineChartData = [];

const issuedBooksMonthly = async () => {
  await fetch(`http://localhost:8080/LibraryManagement/issuedBooksMonthly`)
    .then(res => res.json())
    .then(data => {

      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (j == 0) {
            barChartLabel.push(data[i][j]);
          }
          if (j == 1) {
            barChartData.push(data[i][j]);
          }
        }
      }
    })
  showChart();
  getCategoryWiseData();
}


const getCategoryWiseData = async () => {
  await fetch(`http://localhost:8080/LibraryManagement/categoryWiseBooks`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
          if (j == 0) {
            lineChartLabel.push(data[i][j]);
          }
          if (j == 1) {
            lineChartData.push(data[i][j]);
          }
        }
      }
    })
  lineChart();
}



const showChart = async () => {


  let myChart = document.getElementById("myChat").getContext('2d');

  let barChat2 = new Chart(myChart, {

    type: 'bar',
  
    data: {

      labels: barChartLabel,

      datasets: [
        {
          label: "Year" +" "+ barChartLabel[0].split(" ")[1],
          data: barChartData,


          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],

          borderWidth: 1


        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: 'Monthly Issued Books'
      }
    }

  });

}

const lineChart = async () => {


  let myChart2 = document.getElementById("myChat2").getContext('2d');
  let barChat = new Chart(myChart2, {
    type: 'pie',
    options: {
      title: {
        display: true,
        text: 'Books In Each Category'
      }
    },
    data: {
      labels: lineChartLabel,

      datasets: [
        {
          data: lineChartData,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)' ,
            'rgb(255, 170, 129)' ,
            'rgb(255, 205, 140)',
            'rgb(255, 186, 159)',
            'rgb(255, 206, 96)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 170, 129)' ,
            'rgb(255, 205, 140)',
            'rgb(255, 186, 159)'
          ],
          borderWidth: 1
        },
      ]
    }
  });



}
issuedBooksMonthly();
