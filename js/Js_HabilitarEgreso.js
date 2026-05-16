var tablaEgresoHabilitar = null;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    if (parametroURL('pagina') == 'habilitarEgreso') {
        LlenarParaEgreso();
    }
});

$(".body").on('click', "button#BuscarFacturaEHabilitar", function(ev) {
    var fechaDesde = $('input#fechaDesdeFEHabilitar').val();
    var fechaHasta = $('input#fechaHastaFEHabilitar').val();;
    tablaEgresoHabilitar.column(2).search(fechaDesde).draw();
    tablaEgresoHabilitar.column(3).search(fechaHasta).draw();
    try {
        var tid = setInterval(function() {
        tablaEgresoHabilitar.columns.adjust().draw();
        clearInterval(tid);
    }, 500);
    } catch (error) {
        console.log(error);
    }
});

$(document).keydown(function(tecla) {
    //tecla.preventDefault();
    /*if (112 == tecla.keyCode) {
        tecla.preventDefault();
        $('div#consultasFactura').click();
    }
    if (121 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#GuardarDetalleCuentas').click();
    }*/
    // alert(tecla.keyCode);
});

$(".body").on('click', "button#HabilitarEgreso", function(ev) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Habilitar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var vector = $('.body').find("#datatableIngresoHabilitarE tbody tr");
            $.each(vector, function(a) {
                var input = $(this).find('input');
                var anticipo = $(this).find('td').eq(1).html();
                if (input.prop('checked')) {
                    ModificarEstadoAnticipo(anticipo);   
                }
            });    
        } else {

        }
    });
});

function ModificarEstadoAnticipo(anticipo){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "ModificarEstadoAnticipo",
            Anticipo: anticipo       
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Egreso Habilitado!", "success");
            $('.body').find('button#BuscarFacturaEHabilitar').click(); 
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            //location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la admGRSDSDFSDSDFinistracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body").on('click', "button#HabilitarEgresoFacturacion", function(ev) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Habilitar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var vector = $('.body').find("#datatableIngresoHabilitarE tbody tr");
            $.each(vector, function(a) {
                var input = $(this).find('input');
                var anticipo = $(this).find('td').eq(1).html();
                if (input.prop('checked')) {
                    ModificarEstadoAnticipoFacturacion(anticipo);   
                }
            });    
        } else {

        }
    });
});

function ModificarEstadoAnticipoFacturacion(anticipo){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "ModificarEstadoAnticipoFacturacion",
            Anticipo: anticipo       
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Egreso Habilitado!", "success");
            $('.body').find('button#BuscarFacturaEHabilitar').click(); 
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            //location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la admGRSDSDFSDSDFinistracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function LlenarParaEgreso() {
    tablaEgresoHabilitar = $('#datatableIngresoHabilitarE').DataTable({
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
            url: "Ajax/Aj_Anticipo.php",
            data: {
                Requerimiento: "CargarParaEgreso",
                FechaDesde: $('input#fechaDesdeFEHabilitar').val(),
                FechaHasta: $('input#fechaHastaFEHabilitar').val()
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }]
    });
    tablaEgresoHabilitar.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableIngresoHabilitarE tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableIngresoHabilitarE_filter input').unbind();
    $('#datatableIngresoHabilitarE_filter input').remove();
    $('#datatableIngresoHabilitarE_filter label').remove(); 
    $('input#nombreFiltroEHabilitar').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaEgresoHabilitar.column(1).search($('input#nombreFiltroEHabilitar').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableIngresoHabilitarE tbody tr td').eq(0).click();
        }
    });
}

$(".body").on('change', "input.marcarTodos", function(ev) {
     var vector = $('.body').find("#datatableIngresoHabilitarE tbody tr");
     if ($(this).prop('checked')) {
        $.each(vector, function(a) {
            var input = $(this).find('input');
            input.prop('checked',true);
        });
    }else{
        $.each(vector, function(a) {
            var input = $(this).find('input');
            input.prop('checked',false);
        });
    }
});