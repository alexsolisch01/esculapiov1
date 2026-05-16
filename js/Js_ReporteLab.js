var tablareportlab;
function CargarTabla(){
  tablareportlab = $('#TablaReporteLab').DataTable({
        "processing": true,
        "serverSide": true,
        'paging': false,
        'lengthChange': false,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "CargarReporteLabJs"
            },
            type: "POST"
        },
        scrollY: 400,                
        keys:true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        buttons: [{
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'print',
            text: 'Imprimir',
            title:'PACINETES DE LABORATORIO',
            message: '',
            exportOptions: {
                columns: ':visible'
            }
        }]
    });


   
 }
 CargarTabla();

 $(".body").on('click', "#CargarReporteLab", function(ev){    
    tablareportlab.column(1).search($('#fechaDesde').val());
    tablareportlab.column(2).search($('#fechaHasta').val()).draw();
});


 $(document).keydown(function(tecla) {
            
            
               //tecla.preventDefault();
            
            if ( 112 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#CargarReporteLab').click();
            }
            
           // alert(tecla.keyCode);
        });


var tablareportlab2;
function CargarTabla2(){
  tablareportlab2 = $('#TablaReporteLab2').DataTable({
        "processing": true,
        "serverSide": true,
        'paging': false,
        'lengthChange': false,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "CargarReporteLa2bJs"
            },
            type: "POST"
        },
        scrollY: 400,                
        keys:true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        buttons: [{
            extend: 'excelHtml5',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'pdfHtml5',
            exportOptions: {
                columns: ':visible'
            }
        }, {
            extend: 'print',
            text: 'Imprimir',
            title:'PACINETES DE LABORATORIO',
            message: '',
            exportOptions: {
                columns: ':visible'
            }
        }]
    });

    var column = tablareportlab2.column( 3 );
    column.visible( false);
   
 }
 CargarTabla2();

$(".body").on('click', "#CargarReporteLab2", function(ev){    
    if($("#cbmTipo").val()=="1"){
        var column = tablareportlab2.column( 3 );
        column.visible( false);
    }else{
        var column = tablareportlab2.column( 3 );
        column.visible( true);
    }

    tablareportlab2.column(1).search($('#fechaDesde2').val());
    tablareportlab2.column(2).search($('#fechaHasta2').val());
    tablareportlab2.column(3).search($('#cbmTipo').val()).draw();
});