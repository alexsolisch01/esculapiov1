
$("textarea#plantillaTacWord").wysihtml5();
var editorObjEco = $("textarea#plantillaTacWord").data('wysihtml5');
var editorRx = editorObjEco.editor;

$(".body").on('click', "button#CargarPlantillaTac", function(ev) {
    
    var id = $(this).parent().parent().attr('id');
    var nplantilla = $(this).attr('nplantilla');
    CargarPlantillaTac(id,nplantilla);
    var nombreP = $(this).parent().parent().find('td').eq(1).html();
    $('.body div#nombreProcedimientoTac').find('label#nombreRx').html(nombreP);
    $('.body div#idProcedimientoTac').find('label').html(id);
    $('.body div#idProcedimientoTac').find('span').html(nplantilla);
    $('.body li#TabPlantillaTac').fadeIn();
    $('.body li#TabPlantillaTac a').trigger('click');
         
});

$(".body").on('click', "li#TabProcTac a", function(ev) {
	editorRx.setValue("");   
    $('div#plantillaTac').find('input#nombrePlantilla').val("");
    $('.body div#nombreProcedimientoTac').find('label#nombreRx').text('ELEGIR PROCEDIMIENTO');
    $('.body div#idProcedimientoTac').find('label').text('');
    $('.body li#TabPlantillaTac').fadeOut(1);
    $('.body li#TabPlantilla').fadeOut(1);
    $('.body li#TabPlantillaRx').fadeOut(1);
    $('.body li#TabPlantillaEco').fadeOut(1);
});

$(".body").on('click', "button#GuardarPlantillaTac", function(ev) {
    var idProcTac = $('.body div#idProcedimientoTac').find('label').html();
    var numero = $('.body div#idProcedimientoTac').find('span').html();
    var nombre = $('div#plantillaTac').find('input#nombrePlantilla').val();
    GuardarPlantillaTac(idProcTac,$('textarea#plantillaTacWord').val(),nombre,numero);
});


function GuardarPlantillaTac(idProcTac,plantilla,nombre,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaTac.php",
        data: {
            Requerimiento: "GuardarPlantillaTac",
            Procedimiento: idProcTac,
            Plantilla : plantilla,
            Nombre : nombre,
            Numero : numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Plantilla Guardado.!", "success");
            ActualizarEstadoProcedimientoTac(idProcTac,numero);

            $('.body li#TabProcTac a').trigger('click');
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

function CargarPlantillaTac(idProcTac,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaTac.php",
        data: {
            Requerimiento: "CargarPlantillaTac",
            Procedimiento: idProcTac,
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) { 
       
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
 
		editorRx.setValue(respuesta[0][0]); 
		$('div#plantillaTac').find('input#nombrePlantilla').val(respuesta[0][1]);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function ActualizarEstadoProcedimientoTac(idProcTac,numero) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaTac.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoTac",
            Procedimiento: idProcTac,
            Numero: numero
        },
        dataType: 'JSON',
    });
    CambiarBotonTacAModificar(idProcTac,numero);
}

function CambiarBotonTacAModificar(idProcTac,numero) {
    var tablaProce = $('#datatableProTacPlantilla').DataTable();
    var fila = $('#datatableProTacPlantilla tbody').find('tr[id="' + idProcTac + '"]');
    var nombre = fila.find('td').eq(1).html();
    var boton1 = fila.find('td').eq(2).html();
    var boton2 = fila.find('td').eq(3).html();
    var boton3 = fila.find('td').eq(4).html();
    tablaProce.row(fila).remove().draw(false);

    if(numero==1){
        boton1 = '<button nplantilla="1" idEstado="11" type="submit" id="CargarPlantillaTac" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==2){
        boton2 = '<button nplantilla="2" idEstado="11" type="submit" id="CargarPlantillaTac" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    if(numero==3){
        boton3 = '<button nplantilla="3" idEstado="11" type="submit" id="CargarPlantillaTac" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    }
    
    var campos = [idProcTac, nombre, boton1,boton2,boton3];
    tablaProce.row.add(campos).node().id = idProcTac;
    tablaProce.draw(false);
}
