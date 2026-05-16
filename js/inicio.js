

var chartFormasPago = null;
function CargarGraficoBarras(){
  var ctx =  document.getElementById('chartventas').getContext('2d');
  chartFormasPago = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Efectivo', 'Cheques','Transferencias','Tarjeta', 'Credito','Anticipos'],
          datasets: [{
              label: 'FORMAS DE PAGO $',
              //data: [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false,                      
                  }
              }]
          }
      }
  });
}
var chartCredito = null;
function CargarGraficoBarrasCredito(){
  var ctx = document.getElementById('chartCreditos').getContext('2d');
  chartCredito = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Consultas', 'Farmacia',"Nc Consultas","Nc Farmacias"],
          datasets: [{
              label: "VENTAS $",              
              backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: false,                      
                  }
              }]
          }
      }
  });
}
CargarGraficoBarras();
CargarGraficoBarrasCredito();
function addData(chart, data) {    
    chart.data.datasets.forEach((dataset) => {        
        dataset.data=data;
    });
    chart.update();
}
$("#cbmMesChart").val(new Date().getMonth()+1);
function CargarTotalFormasPago(){

    $.ajax({
              method:"POST",
              url:"Ajax/Aj_Forma_pago.php",
              data: {Requerimiento:"CargarTotalFormasPago",Mes:$("#cbmMesChart").val(),Año:$("#AñoChart").val()},
              dataType: 'JSON',

    }).done(function(respuesta) {
        addData(chartFormasPago, respuesta);
    });
}

CargarTotalFormasPago();

function CargarTotalVentas(){

    $.ajax({
              method:"POST",
              url:"Ajax/Aj_Forma_pago.php",
              data: {Requerimiento:"CargarTotalVentas",Mes:$("#cbmMesChart").val(),Año:$("#AñoChart").val()},
              dataType: 'JSON',

    }).done(function(respuesta) {
        addData(chartCredito, respuesta);
    });
}

CargarTotalVentas()


$(".body").on('change', "#cbmMesChart", function(evt){
    CargarTotalFormasPago();    
    CargarTotalVentas()
});
$(".body").on('change', "#AñoChart", function(evt){
    CargarTotalFormasPago();    
    CargarTotalVentas()
});




