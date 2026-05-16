var CargarCieJs = {
    ajax: {
        url: "Ajax/Aj_Consulta.php",
        type: "POST",
        dataType: "json",
        data: {
            q: "{{{q}}}",
            Requerimiento: "CargarCieJs"
        }
    },
    locale: {
        emptyTitle: "Todos"
    },
    preserveSelected: false,
    preprocessData: function(data) {
        var array = [];
        array.push({ 'value': "0", 'text': "Todos" });
        $.each(data, function(i, value) {
            array.push({
                'value': value.id,
                'text': value.nombre
            });
        });
        return array;
    }
};
$("#cbmCie").selectpicker().ajaxSelectPicker(CargarCieJs);

var tablareporte;

function CargarPacientesNuevos() {
    tablareporte = $('#TablaReporte').DataTable({
        "processing": true,
        "serverSide": true,
        "paging": false,
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarPacientesPorDiagnostico"
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
                        '<h4 style="display:block;">REPORTE DE PACIENTES POR DIAGNÓSTICO</h4>' +
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
        "ordering": false,
    });
}
CargarPacientesNuevos()
$(".body").on('click', "#CargarReporte", function(ev) {
    tablareporte.column(1).search($('#fechaDesde').val());
    tablareporte.column(2).search($('#fechaHasta').val());
    tablareporte.column(3).search($('#cbmCie').val());
    tablareporte.column(4).search($('#cbmProcedimiento option:selected').html()).draw();
});