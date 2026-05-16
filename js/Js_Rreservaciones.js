var tablaReporte;
function CargarReservaciones() {
     tablaReporte = $('#TablaReporte').DataTable({
        "processing": true,
        "serverSide": true,        
        scrollCollapse: true,
        "paging":false,
        "ajax": {
            url: "Ajax/Aj_Reserva.php",
            data: {
                Requerimiento: "CargarReservaciones"
            },
            type: "POST"
        },
        dom: '<"top"lBf>rt<"bottom"ip>',                
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            footer: true,
            exportOptions: {
                columns: ':visible'
            },
            title: "",            
            message: '',
            customize: function ( win ) {
                    $(win.document.body)
                        .css( 'font-size', '10pt' )
                        .prepend(
                            '<center><h4 style="display: block;">'+$("#Empresa").val()+'</h4>'                            
                            +'<h4 style="display:block;">REPORTE DE RESERVACIONES</h4>'
                            +'<h4 style="display:block;">DEL '+$("#fechaDesde").val()+" HASTA "+$("#fechaHasta").val()+'</h4></center>'
                        ).append("<span style='display: block;'>REPORTE GENERADO EL : "+$("#FechaActualEsculapio").val()+" USUARIO : <label>"+$("#nombresUsuario").html()+"</label> </span>")
                        .append($("#pieSistema").html());
 
                    $(win.document.body).find( 'table' )
                        .addClass( 'compact' )
                        .css( 'font-size', '10px' );                    
                }
            
        }],
        scrollY: 500,
        scrollX: true,
        keys: true        
    });
}
CargarReservaciones()
$(".body").on('click', "#CargarReporte", function(ev){
    tablaReporte.column(1).search($('#fechaDesde').val());
    tablaReporte.column(2).search($('#fechaHasta').val()).draw();
});