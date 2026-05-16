
$("textarea#plantillarxWord").wysihtml5();
var editorObj = $("textarea#plantillarxWord").data('wysihtml5');
var editor = editorObj.editor;

$(".body").on('click', "button#CargarPlantillaRx", function(ev) {
    
    var id = $(this).parent().parent().attr('id');
    var nplantilla = $(this).attr('nplantilla');
    CargarPlantillaRx(id,nplantilla);
    var nombreP = $(this).parent().parent().find('td').eq(1).html();
    $('.body div#nombreProcedimientoRx').find('label#nombreRx').html(nombreP);
    $('.body div#idProcedimientoRx').find('label').html(id);
    $('.body div#idProcedimientoRx').find('span').html(nplantilla);
    $('.body li#TabPlantillaRx').fadeIn();
    $('.body li#TabPlantillaRx a').trigger('click');
         
});

$(".body").on('click', "li#TabProcRx a", function(ev) {
	editor.setValue("");
    $('div#plantillarx').find('input#nombrePlantilla').val("");
    $('.body div#nombreProcedimientoRx').find('label#nombreRx').text('ELEGIR PROCEDIMIENTO');
    $('.body div#idProcedimientoRx').find('label').text('');
    $('.body li#TabPlantillaRx').fadeOut(1);
    $('.body li#TabPlantilla').fadeOut(1);
    $('.body li#TabPlantillaEco').fadeOut(1);
});

$(".body").on('click', "button#GuardarPlantillaRx", function(ev) {
    var idProcRx = $('.body div#idProcedimientoRx').find('label').html();
    var numero = $('.body div#idProcedimientoRx').find('span').html();
    var nombre = $('div#plantillarx').find('input#nombrePlantilla').val();
    GuardarPlantillaRx(idProcRx,$('textarea#plantillarxWord').val(),nombre,numero);
    

    
});


function GuardarPlantillaRx(idProcRx,plantilla,nombre,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "GuardarPlantillaRx",
            Procedimiento: idProcRx,
            Plantilla : plantilla,
            Nombre : nombre,
            Numero : numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Plantilla Guardado.!", "success");
            ActualizarEstadoProcedimientoRx(idProcRx,numero);

            $('.body li#TabProcRx a').trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function CargarPlantillaRx(idProcRx,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "CargarPlantillaRx",
            Procedimiento: idProcRx,
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
 
		editor.setValue(respuesta[0][0]); 
        $('div#plantillarx').find('input#nombrePlantilla').val(respuesta[0][1]);
		

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function ActualizarEstadoProcedimientoRx(idProcRx,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoRx",
            Procedimiento: idProcRx,
            Numero: numero
        },
        dataType: 'JSON',
    });
    CambiarBotonRxAModificar(idProcRx,numero);
}

function CambiarBotonRxAModificar(idProcRx,numero) {
    var tablaProce = $('#datatableProRxPlantilla').DataTable();
    var fila = $('#datatableProRxPlantilla tbody').find('tr[id="' + idProcRx + '"]');
    var nombre = fila.find('td').eq(1).html();
    var boton1 = fila.find('td').eq(2).html();
    var boton2 = fila.find('td').eq(3).html();
    var boton3 = fila.find('td').eq(4).html();
    tablaProce.row(fila).remove().draw(false);

    if(numero==1){
        boton1 = '<button nplantilla="1" idEstado="11" type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==2){
        boton2 = '<button nplantilla="2" idEstado="11" type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==3){
        boton3 = '<button nplantilla="3" idEstado="11" type="submit" id="CargarPlantillaRx" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }

    var campos = [idProcRx, nombre, boton1, boton2, boton3];
    tablaProce.row.add(campos).node().id = idProcRx;
    tablaProce.draw(false);
}
