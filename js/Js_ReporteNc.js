var tablaNotasCredito = null;

function LlenarTablaNc() {
     tablaNotasCredito = $('#datatableNotaCredito').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "LlenarTablaReporteNc"
            },
            type: "POST"
        },
        scrollY: 400,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2,3,4,5,6],
            "orderable": false,
        }],
        dom: '<"top"lBf>rt<"bottom"ip>',
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
            exportOptions: {
                columns: ':visible'
            },
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            footer: true,
            exportOptions: {
                columns: ':visible'
            }
        }],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total debe
            total = api
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            
            $( api.column( 5 ).footer() ).html(
                '$ '+ total.toFixed(2)
            );
        }
    });    
}

LlenarTablaNc();

$(".body").on('click', "#BuscarNCC", function(ev){
    tablaNotasCredito.column(1).search($('#fechaDesdeC').val());
    tablaNotasCredito.column(2).search($('#fechaHastaC').val()).draw();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////FARMACIA//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tablaNotasCreditoF = null;

function LlenarTablaNcF() {
     tablaNotasCreditoF = $('#datatableNotaCreditoF').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaReporteNc"
            },
            type: "POST"
        },
        scrollY: 400,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2,3,4,5,6],
            "orderable": false,
        }],
        dom: '<"top"lBf>rt<"bottom"ip>',
        buttons: [{
            extend: 'excelHtml5',
            footer: true,
            exportOptions: {
                columns: ':visible'
            },
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            footer: true,
            exportOptions: {
                columns: ':visible'
            }
        }],
        "footerCallback": function ( row, data, start, end, display ) {
            var api = this.api(), data;
 
            // Remove the formatting to get integer data for summation
            var intVal = function ( i ) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '')*1 :
                    typeof i === 'number' ?
                        i : 0;
            };
 
            // Total debe
            total = api
                .column( 5 )
                .data()
                .reduce( function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0 );

            
            $( api.column( 5 ).footer() ).html(
                '$ '+ total.toFixed(2)
            );
        }
    });    
}

LlenarTablaNcF();

$(".body").on('click', "#BuscarNCF", function(ev){
    tablaNotasCreditoF.column(1).search($('#fechaDesdeF').val());
    tablaNotasCreditoF.column(2).search($('#fechaHastaF').val()).draw();
});