var tablaVoucher;

function LlenarTablaVentasEspecialidad() {
    tablaVoucher = $('#TablaReporte').DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": false,
        scrollCollapse: true,
        "paging": false,
        "ajax": {
            url: "Ajax/Aj_Forma_pago.php",
            data: {
                Requerimiento: "CargarVentasVoucherJS"
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
            customize: function(win) {
                $(win.document.body)
                    .css('font-size', '10pt')
                    .prepend(
                        '<center><h4 style="display: block;">' + $("#Empresa").val() + '</h4>' +
                        '<h4 style="display:block;">REPORTE DE VOUCHERS</h4>' +
                        '<h4 style="display:block;">DEL ' + $("#fechaDesde").val() + " HASTA " + $("#fechaHasta").val() + '</h4></center>'
                    ).append("<span style='display: block;'>REPORTE GENERADO EL : " + $("#FechaActualEsculapio").val() + " USUARIO : <label>" + $("#nombresUsuario").html() + "</label> </span>")
                    .append($("#pieSistema").html());

                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', '10px');
            }

        }],
        scrollY: 500,
        scrollX: true,
        keys: true,
        "columnDefs": [{
            "targets": [8],
            "className": "text-right",
        }, ],
        "footerCallback": function(row, data, start, end, display) {
            var api = this.api(),
                data;

            // Remove the formatting to get integer data for summation
            var intVal = function(i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                    i : 0;
            };


            // Total haber
            total = api
                .column(8)
                .data()
                .reduce(function(a, b) {
                    return intVal(a) + intVal(b);
                }, 0);


            $(api.column(8).footer()).html(
                '$ ' + formatoDinero(total)
            );

        }
    });
}
LlenarTablaVentasEspecialidad()
$(".body").on('click', "#CargarReporte", function(ev) {
    tablaVoucher.column(1).search($('#fechaDesde').val());
    tablaVoucher.column(2).search($('#fechaHasta').val());
    tablaVoucher.column(3).search($('#cbmServico').val()).draw();
});