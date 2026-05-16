function LlenarTablaFacturasConFechas(fechaDesde,fechaHasta) {
     tablaFacturas = $('#datatableConsultaFactura').DataTable({
        "processing": true,
        "serverSide": true,
        /*lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],*/
        scrollCollapse: true,
        "paging":false,
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasSri",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta,
                Estado:$('select#cbmFiltro').val()
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4,5,6,7,8],
            "orderable": false,
        }]
    });
    tablaFacturas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFactura tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFactura_filter input').unbind();
    $('#datatableConsultaFactura_filter input').remove();
    $('#datatableConsultaFactura_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
}

$(".body").on('click', "button#BuscarFactura", function(ev) {
    try{
        tablaFacturas.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeF').val();
    var fechaHasta = $('input#fechaHastaF').val();;
    LlenarTablaFacturasConFechas(fechaDesde,fechaHasta);
    tablaFacturas.columns.adjust().draw();
    if($('#cbmFiltro').val()!='N'){
        $('button#autoriazarLote').attr('disabled',true);
        $('button#EnviarCorreo').attr('disabled',true);
    }else{
        $('button#autoriazarLote').attr('disabled',false);
        $('button#EnviarCorreo').attr('disabled',true);
    }
    if($('#cbmFiltro').val()=='S'){
        $('button#EnviarCorreo').attr('disabled',false);   
    }
});
$(document).ready(function() {
    if (parametroURL('pagina') == 'habilitarNC') {
        var fechaDesde = $('input#fechaDesdeF').val();
        var fechaHasta = $('input#fechaHastaF').val();

        var fechaDesdeFarmacia = $('input#fechaDesdeFFarmacia').val();
        var fechaHastaFarmacia = $('input#fechaHastaFFarmacia').val();

        var fechaDesdeFNcCon = $('input#fechaDesdeFNcCon').val();
        var fechaHastaFNcCon = $('input#fechaHastaFNcCon').val();

        LlenarTablaFacturasConFechas(fechaDesde,fechaHasta);    
        LlenarTablaFacturasConFechasFarmacia(fechaDesdeFarmacia,fechaHastaFarmacia);        
        
    }    
});

$(".body").on('dblclick', "table#datatableConsultaFactura tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});


function ObtenerIdLote(){
    var vector = $('.body').find("#datatableConsultaFactura tbody tr");
    var idsFacturas = "";
    
    $.each(vector, function(a) {
        var input = $(this).find('input');
        
        if (input.prop('checked')) {
            idsFacturas += input.attr('id') + ","            
        }
    });
    return idsFacturas;
}

$(".body").on('change', "input.marcarTodos", function(ev) {
     var vector = $('.body').find("#datatableConsultaFactura tbody tr");
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


function ObtenerIdLoteFarmacia(){
    var vector = $('.body').find("#datatableConsultaFacturaFarmacia tbody tr");
    var idsFacturas = "";
    
    $.each(vector, function(a) {
        var input = $(this).find('input');
        
        if (input.prop('checked')) {
            idsFacturas += input.attr('id') + ","            
        }
    });
    return idsFacturas;
}

$(".body").on('change', "input.marcarTodosFarmacia", function(ev) {
     var vector = $('.body').find("#datatableConsultaFacturaFarmacia tbody tr");
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

var tablaFarmacia=null;

function LlenarTablaFacturasConFechasFarmacia(fechaDesde,fechaHasta) {
     tablaFarmacia = $('#datatableConsultaFacturaFarmacia').DataTable({
        "processing": true,
        "serverSide": true,
        scrollCollapse: true,
        "paging":false,
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasFarmaciaSri",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta,
                Estado:$('select#cbmFiltroFarmacia').val()
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4,5,6,7,8],
            "orderable": false,
        }]
    });
    tablaFarmacia.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFacturaFarmacia tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFacturaFarmacia_filter input').unbind();
    $('#datatableConsultaFacturaFarmacia_filter input').remove();
    $('#datatableConsultaFacturaFarmacia_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroFFarmacia').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFarmacia.column(0).search($('input#numeroFFarmacia').val()).draw();
            tablaFarmacia.column(1).search($('input#pacienteFFarmacia').val()).draw();
            tablaFarmacia.column(2).search($('input#clienteFFarmacia').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteFFarmacia').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFarmacia.column(0).search($('input#numeroFFarmacia').val()).draw();
            tablaFarmacia.column(1).search($('input#pacienteFFarmacia').val()).draw();
            tablaFarmacia.column(2).search($('input#clienteFFarmacia').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#clienteFFarmacia').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaFarmacia.column(0).search($('input#numeroFFarmacia').val()).draw();
            tablaFarmacia.column(1).search($('input#pacienteFFarmacia').val()).draw();
            tablaFarmacia.column(2).search($('input#clienteFFarmacia').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
}


$(".body").on('click', "button#BuscarFacturaFarmacia", function(ev) {
    try{
        tablaFarmacia.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeFFarmacia').val();
    var fechaHasta = $('input#fechaHastaFFarmacia').val();;
    LlenarTablaFacturasConFechasFarmacia(fechaDesde,fechaHasta);
    tablaFacturas.columns.adjust().draw();
    if($('#cbmFiltroFarmacia').val()!='N'){
        $('button#autoriazarLoteFarmacia').attr('disabled',true);
        $('button#EnviarCorreoFarmacia').attr('disabled',true);
    }else{
        $('button#autoriazarLoteFarmacia').attr('disabled',false);
        $('button#EnviarCorreoFarmacia').attr('disabled',true);
    }
    if($('#cbmFiltroFarmacia').val()=='S'){
        $('button#EnviarCorreoFarmacia').attr('disabled',false);   
    }
});


$(".body").on('dblclick', "table#datatableConsultaFacturaFarmacia tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(".body").on('click', "button#habiiltarFcConsulta", function(ev) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Habilitar La Factura Para Nota De Credito ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            Habilitar();        
        } else {
            
        }
    });
    
});

function Habilitar(){

    var ids = ObtenerIdLote();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione al menos una factura", "warning");        
        return;
    }
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {               
            Requerimiento :"HabilitarConsulta",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {

        swal("Esculapio!", "Habilitado Con Exito..!!", "success");

    });

}

$(".body").on('click', "button#habiiltarFcFarmacia", function(ev) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Habilitar La Factura Para Nota De Credito ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            HabilitarFarmacia();    
        } else {
            
        }
    });
    
});

function HabilitarFarmacia(){

    var ids = ObtenerIdLoteFarmacia();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione al menos una factura", "warning");        
        return;
    }
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {               
            Requerimiento :"HabilitarFarmacia",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {

        swal("Esculapio!", "Habilitado Con Exito..!!", "success");

    });

}