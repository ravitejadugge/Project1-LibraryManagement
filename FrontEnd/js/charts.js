

 let barChartLabel= [];
 let barChartData= [];


 let lineChartLabel= [];
 let lineChartData= [];

 const issuedBooksMonthly = async () => {
    await fetch(`http://localhost:8080/LibraryManagement/issuedBooksMonthly`)
    .then(res => res.json())
    .then(data => {

      for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data.length; j++) {
              if(j==0){
                barChartLabel.push(data[i][j]);
              }
              if(j==1){
                barChartData.push(data[i][j]);
              }
          }
      } 
    })
    showChart();
    getCategoryWiseData();
  }


  const getCategoryWiseData =async ()=>{
    await fetch(`http://localhost:8080/LibraryManagement/categoryWiseBooks`)
    .then(res => res.json())
    .then(data => {

      for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data.length; j++) {
              if(j==0){
                lineChartLabel.push(data[i][j]);
              }
              if(j==1){
                lineChartData.push(data[i][j]);
              }
          }
      } 
    })
    lineChart();
  }














const showChart =async () =>{

    
let myChart = document.getElementById("myChat").getContext('2d');
    
let barChat2 = new Chart(myChart,{
 type : 'bar',
 data : {

   labels : barChartLabel,
   
   datasets : [
       {
           label :"Monthly Issued Books",
           data : barChartData, 
           
 
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
  }
}
  
 });

}

const lineChart = async() =>{
    

let myChart2 = document.getElementById("myChat2").getContext('2d');
let barChat = new Chart(myChart2,{
type : 'line',
data : {
labels : lineChartLabel,

datasets : [
{
    label :"Books In Each Category",
    data : lineChartData,   
    backgroundColor: [
    'rgba(54, 162, 235, 0.2)'
],
borderColor: [
    'rgba(255, 99, 132, 1)'
],
borderWidth: 1 
},
]
} ,
});



}
issuedBooksMonthly();
