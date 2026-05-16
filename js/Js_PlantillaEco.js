
$("textarea#plantillaecoWord").wysihtml5();
var editorObjEco = $("textarea#plantillaecoWord").data('wysihtml5');
var editorEco = editorObjEco.editor;

$(".body").on('click', "button#CargarPlantillaEco", function(ev) {
    
    var id = $(this).parent().parent().attr('id');
    var nplantilla = $(this).attr('nplantilla');
    CargarPlantillaEco(id,nplantilla);
    var nombreP = $(this).parent().parent().find('td').eq(1).html();
    $('.body div#nombreProcedimientoEco').find('label#nombreRx').html(nombreP);
    $('.body div#idProcedimientoEco').find('label').html(id);
    $('.body div#idProcedimientoEco').find('span').html(nplantilla);
    $('.body li#TabPlantillaEco').fadeIn();
    $('.body li#TabPlantillaEco a').trigger('click');
         
});

$(".body").on('click', "li#TabProcEco a", function(ev) {
	editorEco.setValue("");   
    $('div#plantillaeco').find('input#nombrePlantilla').val("");
    $('.body div#nombreProcedimientoEco').find('label#nombreRx').text('ELEGIR PROCEDIMIENTO');
    $('.body div#idProcedimientoEco').find('label').text('');
    $('.body li#TabPlantillaEco').fadeOut(1);
    $('.body li#TabPlantilla').fadeOut(1);
    $('.body li#TabPlantillaRx').fadeOut(1);
});

$(".body").on('click', "button#GuardarPlantillaEco", function(ev) {
    var idProcEco = $('.body div#idProcedimientoEco').find('label').html();
    var numero = $('.body div#idProcedimientoEco').find('span').html();
    var nombre = $('div#plantillaeco').find('input#nombrePlantilla').val();
    GuardarPlantillaEco(idProcEco,$('textarea#plantillaecoWord').val(),nombre,numero);
    

    
});


function GuardarPlantillaEco(idProcEco,plantilla,nombre,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaEco.php",
        data: {
            Requerimiento: "GuardarPlantillaEco",
            Procedimiento: idProcEco,
            Plantilla : plantilla,
            Nombre : nombre,
            Numero : numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Plantilla Guardado.!", "success");
            ActualizarEstadoProcedimientoEco(idProcEco,numero);

            $('.body li#TabProcEco a').trigger('click');
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

function CargarPlantillaEco(idProcEco,numero) {
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaEco.php",
        data: {
            Requerimiento: "CargarPlantillaEco",
            Procedimiento: idProcEco,
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) { 
       
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
 
		editorEco.setValue(respuesta[0][0]); 
		$('div#plantillaeco').find('input#nombrePlantilla').val(respuesta[0][1]);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function ActualizarEstadoProcedimientoEco(idProcEco,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaEco.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoEco",
            Procedimiento: idProcEco,
            Numero: numero
        },
        dataType: 'JSON',
    });
    CambiarBotonEcoAModificar(idProcEco,numero);
}

function CambiarBotonEcoAModificar(idProcEco,numero) {
    var tablaProce = $('#datatableProEcoPlantilla').DataTable();
    var fila = $('#datatableProEcoPlantilla tbody').find('tr[id="' + idProcEco + '"]');
    var nombre = fila.find('td').eq(1).html();
    var boton1 = fila.find('td').eq(2).html();
    var boton2 = fila.find('td').eq(3).html();
    var boton3 = fila.find('td').eq(4).html();
    tablaProce.row(fila).remove().draw(false);

    if(numero==1){
        boton1 = '<button nplantilla="1" idEstado="11" type="submit" id="CargarPlantillaEco" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==2){
        boton2 = '<button nplantilla="2" idEstado="11" type="submit" id="CargarPlantillaEco" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==3){
        boton3 = '<button nplantilla="3" idEstado="11" type="submit" id="CargarPlantillaEco" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    
    var campos = [idProcEco, nombre, boton1,boton2,boton3];
    tablaProce.row.add(campos).node().id = idProcEco;
    tablaProce.draw(false);
}
