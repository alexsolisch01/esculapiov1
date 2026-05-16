
function LlenarTablaFacturasConFechas(fechaDesde,fechaHasta) {
     tablaFacturas = $('#datatableConsultaFactura').DataTable({
        "processing": true,
        "serverSide": true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        scrollCollapse: true,
        "paging":false,
        buttons: [{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }, {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
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
    if (parametroURL('pagina') == 'sri') {
        var fechaDesde = $('input#fechaDesdeF').val();
        var fechaHasta = $('input#fechaHastaF').val();

        var fechaDesdeFarmacia = $('input#fechaDesdeFFarmacia').val();
        var fechaHastaFarmacia = $('input#fechaHastaFFarmacia').val();

        var fechaDesdeFNcCon = $('input#fechaDesdeFNcCon').val();
        var fechaHastaFNcCon = $('input#fechaHastaFNcCon').val();

        var fechaDesdeFNcFarm = $('input#fechaDesdeFNcFarm').val();
        var fechaHastaFNcFarm = $('input#fechaHastaFNcFarm').val();

        LlenarTablaFacturasConFechas(fechaDesde,fechaHasta);    
        LlenarTablaFacturasConFechasFarmacia(fechaDesdeFarmacia,fechaHastaFarmacia);        
        LlenarTablaFacturasConFechasNcCon(fechaDesdeFNcCon,fechaHastaFNcCon);
        LlenarTablaFacturasConFechasNcFarm(fechaDesdeFNcFarm,fechaHastaFNcFarm);
    }    
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

function AutorizarLote(){
    $("div#loaderPacientes").fadeIn(0);
    var ids = ObtenerIdLote();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea AUTORIZAR", "warning");
        $("div#loaderPacientes").fadeOut(300);
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {               
            Requerimiento :"ValidarComprobanteLote",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
       
            
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLote",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFactura").click();
                $("div#loaderPacientes").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFactura").click();
                $("div#loaderPacientes").fadeOut(300);
            });
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
       // swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();

        $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLote",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFactura").click();
                $("div#loaderPacientes").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFactura").click();
                $("div#loaderPacientes").fadeOut(300);
            });
    });

}

function EnviarCorreos(){

    $("div#loaderPacientes").fadeIn(0);
    var ids = ObtenerIdLote();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea enviar", "warning");
        $("div#loaderPacientes").fadeOut(300);
        return;
    }
    if($('#cbmFiltro').val()!='S'){
        swal("Esculapio!", "Primero debe autorizar la factura", "warning");
        $("div#loaderPacientes").fadeOut(300);
        return;   
    }

        $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"EnviarCorreos",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFactura").click();
                $("div#loaderPacientes").fadeOut(300);
                swal("Esculapio!", "Correos enviados con Exito", "success");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
}


$(".body").on('click', "button#autoriazarLote", function(ev) {
    AutorizarLote();
});

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

$('button#EnviarCorreo').attr('disabled',true);
$(".body").on('click', "button#EnviarCorreo", function(ev) {
    EnviarCorreos();
});

$(".body").on('dblclick', "table#datatableConsultaFactura tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});


var tablaFarmacia=null;

function LlenarTablaFacturasConFechasFarmacia(fechaDesde,fechaHasta) {
     tablaFarmacia = $('#datatableConsultaFacturaFarmacia').DataTable({
        "processing": true,
        "serverSide": true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        scrollCollapse: true,
        "paging":false,
        buttons: [{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }, {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
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

function AutorizarLoteFarmacia(){
    $("div#loaderPacientesFarmacia").fadeIn(0);
    var ids = ObtenerIdLoteFarmacia();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea AUTORIZAR", "warning");
        $("div#loaderPacientesFarmacia").fadeOut(300);
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {               
            Requerimiento :"ValidarComprobanteLoteFarmacia",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
       
            
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLoteFarmacia",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaFarmacia").click();
                $("div#loaderPacientesFarmacia").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFacturaFarmacia").click();
                $("div#loaderPacientesFarmacia").fadeOut(300);
            });
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
       // swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
        $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLoteFarmacia",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaFarmacia").click();
                $("div#loaderPacientesFarmacia").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFacturaFarmacia").click();
                $("div#loaderPacientesFarmacia").fadeOut(300);
            });
    });

}

function EnviarCorreosFarmacia(){

    $("div#loaderPacientesFarmacia").fadeIn(0);
    var ids = ObtenerIdLoteFarmacia();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea enviar", "warning");
        $("div#loaderPacientesFarmacia").fadeOut(300);
        return;
    }
    if($('#cbmFiltroFarmacia').val()!='S'){
        swal("Esculapio!", "Primero debe autorizar la factura", "warning");
        $("div#loaderPacientesFarmacia").fadeOut(300);
        return;   
    }

        $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"EnviarCorreosFarmacia",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFactura").click();
                $("div#loaderPacientesFarmacia").fadeOut(300);
                swal("Esculapio!", "Correos enviados con Exito", "success");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
}


$(".body").on('click', "button#autoriazarLoteFarmacia", function(ev) {
    AutorizarLoteFarmacia();
});

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

$('button#EnviarCorreoFarmacia').attr('disabled',true);
$(".body").on('click', "button#EnviarCorreoFarmacia", function(ev) {
    EnviarCorreosFarmacia();
});

$(".body").on('dblclick', "table#datatableConsultaFacturaFarmacia tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// NC CONSULTA
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tablanc=null;
function LlenarTablaFacturasConFechasNcCon(fechaDesde,fechaHasta) {
     tablanc = $('#datatableConsultaFacturaNC').DataTable({
        "processing": true,
        "serverSide": true,        
        dom: '<"top"lBf>rt<"bottom"ip>',
        scrollCollapse: true,
        "paging":false,
        buttons: [{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }, {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasNC",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta,
                Estado:$('select#cbmFiltroNcCon').val()
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
    tablanc.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFacturaNC tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFacturaNC_filter input').unbind();
    $('#datatableConsultaFacturaNC_filter input').remove();
    $('#datatableConsultaFacturaNC_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroFNcCon').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablanc.column(0).search($('input#numeroFNcCon').val()).draw();
            tablanc.column(1).search($('input#pacienteFNcCon').val()).draw();
            tablanc.column(2).search($('input#clienteFNcCon').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNC tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteFNcCon').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablanc.column(0).search($('input#numeroFNcCon').val()).draw();
            tablanc.column(1).search($('input#pacienteFNcCon').val()).draw();
            tablanc.column(2).search($('input#clienteFNcCon').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNC tbody tr td').eq(0).click();
        }
    });
    $('input#clienteFNcCon').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablanc.column(0).search($('input#numeroFNcCon').val()).draw();
            tablanc.column(1).search($('input#pacienteFNcCon').val()).draw();
            tablanc.column(2).search($('input#clienteFNcCon').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNC tbody tr td').eq(0).click();
        }
    });
}

$(".body").on('click', "button#BuscarFacturaNcCon", function(ev) {
    try{
        tablanc.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeFNcCon').val();
    var fechaHasta = $('input#fechaHastaFNcCon').val();
    LlenarTablaFacturasConFechasNcCon(fechaDesde,fechaHasta);
    tablanc.columns.adjust().draw();
    if($('#cbmFiltroNcCon').val()!='N'){
        $('button#autoriazarLoteNcCon').attr('disabled',true);
        $('button#EnviarCorreoNcCon').attr('disabled',true);
    }else{
        $('button#autoriazarLoteNcCon').attr('disabled',false);
        $('button#EnviarCorreoNcCon').attr('disabled',true);
    }
    if($('#cbmFiltroNcCon').val()=='S'){
        $('button#EnviarCorreoNcCon').attr('disabled',false);   
    }
});




function ObtenerIdLoteNcCon(){
    var vector = $('.body').find("#datatableConsultaFacturaNC tbody tr");
    var idsFacturas = "";
    
    $.each(vector, function(a) {
        var input = $(this).find('input');
        
        if (input.prop('checked')) {
            idsFacturas += input.attr('id') + ","            
        }
    });
    return idsFacturas;
}

function AutorizarLoteNcCon(){
    $("div#loaderPacientesNcCon").fadeIn(0);
    var ids = ObtenerIdLoteNcCon();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea AUTORIZAR", "warning");
        $("div#loaderPacientesNcCon").fadeOut(300);
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {               
            Requerimiento :"ValidarComprobanteLoteNcCon",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
       
            
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLoteNcCon",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaNcCon").click();
                $("div#loaderPacientesNcCon").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFacturaNcCon").click();
                $("div#loaderPacientesNcCon").fadeOut(300);
            });
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
       $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLoteNcCon",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaNcCon").click();
                $("div#loaderPacientesNcCon").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFacturaNcCon").click();
                $("div#loaderPacientesNcCon").fadeOut(300);
            });
    });

}

function EnviarCorreosNcCon(){

    $("div#loaderPacientesNcCon").fadeIn(0);
    var ids = ObtenerIdLoteNcCon();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea enviar", "warning");
        $("div#loaderPacientesNcCon").fadeOut(300);
        return;
    }
    if($('#cbmFiltroNcCon').val()!='S'){
        swal("Esculapio!", "Primero debe autorizar la factura", "warning");
        $("div#loaderPacientesNcCon").fadeOut(300);
        return;   
    }

        $.ajax({
                method: "POST",
                url: "Ajax/Aj_SriNC.php",
                data: {                    
                    
                    Requerimiento :"EnviarCorreosNcCon",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaNcCon").click();
                $("div#loaderPacientesNcCon").fadeOut(300);
                swal("Esculapio!", "Correos enviados con Exito", "success");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
}


$(".body").on('click', "button#autoriazarLoteNcCon", function(ev) {
    AutorizarLoteNcCon();
});

$(".body").on('change', "input.marcarTodosNcCon", function(ev) {
     var vector = $('.body').find("#datatableConsultaFacturaNC tbody tr");
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

$('button#EnviarCorreo').attr('disabled',true);
$(".body").on('click', "button#EnviarCorreoNcCon", function(ev) {
    EnviarCorreosNcCon();
});

$(".body").on('dblclick', "table#datatableConsultaFacturaNC tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////// NC FARMACIA
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tablancfarm=null;
function LlenarTablaFacturasConFechasNcFarm(fechaDesde,fechaHasta) {
     tablancfarm = $('#datatableConsultaFacturaNCFarm').DataTable({
        "processing": true,
        "serverSide": true,        
        dom: '<"top"lBf>rt<"bottom"ip>',
        scrollCollapse: true,
        "paging":false,
        buttons: [{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }, {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Farmacia.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasNcFarm",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta,
                Estado:$('select#cbmFiltroNcFarm').val()
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
    tablancfarm.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFacturaNCFarm tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFacturaNCFarm_filter input').unbind();
    $('#datatableConsultaFacturaNCFarm_filter input').remove();
    $('#datatableConsultaFacturaNCFarm_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroFNcFarm').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablancfarm.column(0).search($('input#numeroFNcFarm').val()).draw();
            tablancfarm.column(1).search($('input#pacienteFNcFarm').val()).draw();
            tablancfarm.column(2).search($('input#clienteFNcFarm').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNCFarm tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteFNcFarm').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablancfarm.column(0).search($('input#numeroFNcFarm').val()).draw();
            tablancfarm.column(1).search($('input#pacienteFNcFarm').val()).draw();
            tablancfarm.column(2).search($('input#clienteFNcFarm').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNCFarm tbody tr td').eq(0).click();
        }
    });
    $('input#clienteFNcFarm').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablancfarm.column(0).search($('input#numeroFNcFarm').val()).draw();
            tablancfarm.column(1).search($('input#pacienteFNcFarm').val()).draw();
            tablancfarm.column(2).search($('input#clienteFNcFarm').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaNCFarm tbody tr td').eq(0).click();
        }
    });
}

$(".body").on('click', "button#BuscarFacturaNcFarm", function(ev) {
    try{
        tablancfarm.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeFNcFarm').val();
    var fechaHasta = $('input#fechaHastaFNcFarm').val();
    LlenarTablaFacturasConFechasNcFarm(fechaDesde,fechaHasta);
    tablancfarm.columns.adjust().draw();
    if($('#cbmFiltroNcFarm').val()!='N'){
        $('button#autoriazarLoteNcFarm').attr('disabled',true);
        $('button#EnviarCorreoNcFarm').attr('disabled',true);
    }else{
        $('button#autoriazarLoteNcFarm').attr('disabled',false);
        $('button#EnviarCorreoNcFarm').attr('disabled',true);
    }
    if($('#cbmFiltroNcFarm').val()=='S'){
        $('button#EnviarCorreoNcFarm').attr('disabled',false);   
    }
});




function ObtenerIdLoteNcFarm(){
    var vector = $('.body').find("#datatableConsultaFacturaNCFarm tbody tr");
    var idsFacturas = "";
    
    $.each(vector, function(a) {
        var input = $(this).find('input');
        
        if (input.prop('checked')) {
            idsFacturas += input.attr('id') + ","            
        }
    });
    return idsFacturas;
}

function AutorizarLoteNcFarm(){
    $("div#loaderPacientesNcFarm").fadeIn(0);
    var ids = ObtenerIdLoteNcFarm();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea AUTORIZAR", "warning");
        $("div#loaderPacientesNcFarm").fadeOut(300);
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {               
            Requerimiento :"ValidarComprobanteLoteNcFarm",
            Id:ids
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
       
            
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    
                    Requerimiento :"autorizacionComprobanteLoteNcFarm",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaNcFarm").click();
                $("div#loaderPacientesNcFarm").fadeOut(300);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
                $("#BuscarFacturaNcFarm").click();
                $("div#loaderPacientesNcFarm").fadeOut(300);
            });
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
       // swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });

}

function EnviarCorreosNcFarm(){

    $("div#loaderPacientesNcFarm").fadeIn(0);
    var ids = ObtenerIdLoteNcFarm();
    
    if(ids==""){
        swal("Esculapio!", "Seleccione las facturas que desea enviar", "warning");
        $("div#loaderPacientesNcFarm").fadeOut(300);
        return;
    }
    if($('#cbmFiltroNcFarm').val()!='S'){
        swal("Esculapio!", "Primero debe autorizar la factura", "warning");
        $("div#loaderPacientesNcFarm").fadeOut(300);
        return;   
    }

        $.ajax({
                method: "POST",
                url: "Ajax/Aj_SriNC.php",
                data: {                    
                    
                    Requerimiento :"EnviarCorreosNcFarm",
                    Id:ids
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                $("#BuscarFacturaNcFarm").click();
                $("div#loaderPacientesNcFarm").fadeOut(300);
                swal("Esculapio!", "Correos enviados con Exito", "success");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
}


$(".body").on('click', "button#autoriazarLoteNcFarm", function(ev) {
    AutorizarLoteNcFarm();
});

$(".body").on('change', "input.marcarTodosNcFarm", function(ev) {
     var vector = $('.body').find("#datatableConsultaFacturaNCFarm tbody tr");
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

$('button#EnviarCorreo').attr('disabled',true);
$(".body").on('click', "button#EnviarCorreoNcFarm", function(ev) {
    EnviarCorreosNcFarm();
});

$(".body").on('dblclick', "table#datatableConsultaFacturaNCFarm tbody tr", function(ev) {
    var clave = $(this).find('td').eq(7).html();
    $("#modal-ride #Ride").empty();
    $("#modal-ride #Ride").append('<object data="Rides/'+clave+'.pdf" type="application/pdf" width="100%" height="100%"></object>');
    $("#modal-ride").modal();
});




//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

$(document).keydown(function(tecla) {

if ( 112 == tecla.keyCode && $('div#tab_1').hasClass('active')) {
        tecla.preventDefault();       
        $('button#BuscarFactura').click();
    }
     if ( 121 == tecla.keyCode && $('div#tab_1').hasClass('active')) {
        tecla.preventDefault();       
        $('button#autoriazarLote').click();
    }
     if ( 113 == tecla.keyCode && $('div#tab_1').hasClass('active')) {
        tecla.preventDefault();       
        $('button#EnviarCorreo').click();
    }

    


    if ( 112 == tecla.keyCode && $('div#tab_2').hasClass('active')) {
        tecla.preventDefault();       
        $('button#BuscarFacturaFarmacia').click();
    }
     if ( 121 == tecla.keyCode && $('div#tab_2').hasClass('active')) {
        tecla.preventDefault();       
        $('button#autoriazarLoteFarmacia').click();
    }
     if ( 113 == tecla.keyCode && $('div#tab_2').hasClass('active')) {
        tecla.preventDefault();       
        $('button#EnviarCorreoFarmacia').click();
    }




     if ( 112 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();       
        $('button#BuscarFacturaNcCon').click();
    }
     if ( 121 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();       
        $('button#autoriazarLoteNcCon').click();
    }
     if ( 113 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();       
        $('button#EnviarCorreoNcCon').click();
    }



     if ( 112 == tecla.keyCode && $('div#tab_4').hasClass('active')) {
        tecla.preventDefault();       
        $('button#BuscarFacturaNcFarm').click();
    }
     if ( 121 == tecla.keyCode && $('div#tab_4').hasClass('active')) {
        tecla.preventDefault();       
        $('button#autoriazarLoteNcFarm').click();
    }
     if ( 113 == tecla.keyCode && $('div#tab_4').hasClass('active')) {
        tecla.preventDefault();       
        $('button#EnviarCorreoNcFarm').click();
    }
    


});

$(".body").on('click', "#firmarnuevamente", function(ev) {
    console.log("firmando")
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {                    
            
            Requerimiento :"Refirmar"
        },
        dataType: "JSON",

    }).done(function(respuesta1) {
        console.log(respuesta1)        
        swal("Esculapio!", "Refirmados", "success");
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        
    });
});