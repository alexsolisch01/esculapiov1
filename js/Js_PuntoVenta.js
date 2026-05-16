$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarPunto').fadeIn(0);
    $('#ModificarPunto').fadeOut(0);
    id = 0;
    $("#SecuenciaFc").val("");
    $("#SecuenciaNc").val("");
    $("#SecuenciaNb").val("");
    $("#SecuenciaRe").val("");
    $("#ImpresoraPunto").val("");
    $("#descuento").val("");
    $("#NombrePunto").val("");
    $("#SecuenciaOculta").val("");
    $("#AmbientePunto").val("0");
    $("#Establecimiento").val("0");
    $(".body div#PuntoVentaDiv").css('visibility', 'visible');
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});
$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12];
    var establecimiento = $('.body').find('select#Establecimiento');
    var ambiente = $('.body').find('select#AmbientePunto');
    var secuenciafc = $('.body').find('input#SecuenciaFc');
    var secuencianc = $('.body').find('input#SecuenciaNc');
    var secuencianb = $('.body').find('input#SecuenciaNb');
    var secuenciare = $('.body').find('input#SecuenciaRe');
    var impresora = $('.body').find('input#ImpresoraPunto');
    var descuento = $('.body').find('input#descuento');
    var nombre = $('.body').find('input#NombrePunto');
    var codigo = $('.body').find('input#SecuenciaOculta');
    var fila = tablapunto.row($(this).parents("tr")).data();
    var campos = [establecimiento, codigo, nombre, ambiente, secuenciafc, secuencianc, secuencianb, secuenciare, impresora, descuento];
    CargarFila(posiciones, campos, fila);
    $('#GuardarPunto').fadeOut(0);
    $('#ModificarPunto').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
    $(".body div#PuntoVentaDiv").css('visibility', 'hidden');
});

// evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
$(".body").on('click', "button#GuardarPunto", function (ev) {
    $(".body").on('submit', "form#RegistroPuntoVenta", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_establecimiento = $(this).find('select#Establecimiento').val().trim();
        var nombre = $(this).find('input#NombrePunto').val().trim();
        var codigo = $(this).find('select#CodigoPunto').val();
        var id1 = $(this).find('select#CodigoPunto option:selected').val();
        var ambiente = $(this).find('select#AmbientePunto').val().trim();
        var secuenciafc = $(this).find('input#SecuenciaFc').val().trim();
        var secuencianc = $(this).find('input#SecuenciaNc').val().trim();
        var secuencianb = $(this).find('input#SecuenciaNb').val().trim();
        var secuenciare = $(this).find('input#SecuenciaRe').val().trim();
        var impresora = $(this).find('input#ImpresoraPunto').val().trim();
        var descuento = $(this).find('input#descuento').val();

        var t = $('#datatablePuntoVenta').DataTable();
        var nc = $('.body').find('select#CodigoPunto option:selected').text().trim();
        var ne = $('.body').find('select#Establecimiento option:selected').text().trim();
        var id = $('.body').find('select#Establecimiento').val().trim();
        if (id == 0) {
            swal("Esculapio!", "Debe seleccionar un Establecimiento", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarPuntoVenta(id_establecimiento, codigo, nombre, ambiente, secuenciafc, secuencianc, secuencianb, secuenciare, t, ne, nc, impresora, descuento);
                $(this).find('select#CodigoPunto option:selected').remove();
                $('.selectpicker').selectpicker('refresh');
                CambiarEstadoCodigoI(id1);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
$(".body").on('click', "button#ModificarPunto", function (ev) {
    $(".body").on('submit', "form#RegistroPuntoVenta", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_establecimiento = $(this).find('select#Establecimiento').val().trim();
        var nombre = $(this).find('input#NombrePunto').val().trim();
        var ambiente = $(this).find('select#AmbientePunto').val().trim();
        var secuenciafc = $(this).find('input#SecuenciaFc').val().trim();
        var secuencianc = $(this).find('input#SecuenciaNc').val().trim();
        var secuencianb = $(this).find('input#SecuenciaNb').val().trim();
        var secuenciare = $(this).find('input#SecuenciaRe').val().trim();
        var impresora = $(this).find('input#ImpresoraPunto').val().trim();
        var descuento = $(this).find('input#descuento').val();

        var t = $('#datatablePuntoVenta').DataTable();
        var id1 = $(this).find('select#CodigoPunto option:selected').val();
        var nc = $('.body').find('input#SecuenciaOculta').val().trim();
        var ne = $('.body').find('select#Establecimiento option:selected').text().trim();
        var id = $('.body').find('select#Establecimiento').val().trim();
        if (id == 0) {
            swal("Esculapio!", "Debe seleccionar un Establecimiento", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarPuntoVenta(id_establecimiento, nombre, ambiente, secuenciafc, secuencianc, secuencianb, secuenciare, t, ne, nc, impresora, descuento);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
$("body").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    var id1 = parseInt($('.body').find('input#SecuenciaOculta').val());
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarPuntoVenta();
            CambiarEstadoCodigoA(id1);
        } 
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarPuntoVenta(id_establecimiento, codigo, nombre, ambiente, secuenciafc, secuencianc, secuencianb, secuenciare, t, ne, nc, impresora, descuento) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Establecimiento.php",
        data: {
            Requerimiento: "GuardaPuntoVenta",
            Establecimiento: id_establecimiento,
            Nombre: nombre,
            Ambiente: ambiente,
            Codigo: codigo,
            SecuenciaFc: secuenciafc,
            SecuenciaNc: secuencianc,
            SecuenciaNb: secuencianb,
            Impresora: impresora,
            SecuenciaRe: secuenciare,
            Descuento: descuento
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablapunto.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al Guardar.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ModificarPuntoVenta(id_establecimiento, nombre, ambiente, secuenciafc, secuencianc, secuencianb, secuenciare, t, ne, nc, impresora, descuento) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Establecimiento.php",
        data: {
            Requerimiento: "ModificaPuntoVenta",
            Establecimiento: id_establecimiento,
            Nombre: nombre,
            Ambiente: ambiente,
            SecuenciaFc: secuenciafc,
            SecuenciaNc: secuencianc,
            SecuenciaNb: secuencianb,
            SecuenciaRe: secuenciare,
            Impresora: impresora,
            Descuento: descuento,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablapunto.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al modificar.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function EliminarPuntoVenta() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Establecimiento.php",
        data: {
            Requerimiento: "EliminaPunto",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablapunto.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar El punto de venta (Ya tiene movimientos).", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CambiarEstadoCodigoI(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Establecimiento.php",
        data: {
            Requerimiento: "CambiaEstadoI",
            Id: id
        },
        dataType: 'JSON',
    });
}

function CambiarEstadoCodigoA(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Establecimiento.php",
        data: {
            Requerimiento: "CambiaEstadoA",
            Id: id
        },
        dataType: 'JSON',
    });
}
var tablapunto = null;
function ConstruirTabla() {

    tablapunto = $('#datatablePuntoVenta').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Empresa.php",
            data: {
                Requerimiento: "CargarTablaPuntoVentaJS"
            },
            type: "POST"
        },
        /*scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false*/
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Punto de venta..."
        }
    });
}

ConstruirTabla();

