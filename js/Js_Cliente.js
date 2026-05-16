var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarCliente').fadeIn(0);
    $('#ModificarCliente').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $('#credito').val("N");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});
var tablaCliente = null;
LlenarTablaCliente();
/////////////////////////////////////////////////////////////////////////////
$(".body").on('click', "button#GuardarCliente", function (ev) {
    $(".body").on('submit', "form#RegistroCliente", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var ruc = $(this).find('input#cedula').val().trim();
        var apellido = $(this).find('input#apellido').val().trim();
        var nombre = $(this).find('input#nombre').val().trim();
        var telefono = $(this).find('input#telefono').val().trim();
        var email = $(this).find('input#correo').val().trim();
        var direccion = $(this).find('input#direccion').val().trim();
        var credito = $(this).find('#credito').val().trim();
        var confirmados = ExisteCedula(ruc);
        var campos = {
            ruc
        };
        if (CamposLLenos(campos)) {
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
                if (confirmados == true) {
                    swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los pacientes registrados", "error");
                    var cerrar = $('.body').find('button.close');
                    cerrar.click();
                    return;
                } else {
                    GuardarCliente(ruc, apellido, nombre, telefono, email, direccion, credito);
                }
            } else {
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarCliente(ruc, apellido, nombre, telefono, email, direccion, credito) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cliente.php",
        data: {
            Requerimiento: "GuardarCliente",
            Ruc: ruc,
            Apellido: apellido,
            Nombre: nombre,
            Telefono: telefono,
            Email: email,
            Direccion: direccion,
            Credito: credito

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        if (respuesta[0] == true) {
            swal("Esculapio!", "Cliente Registrado.!", "success");
            tablaCliente.search("").draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el cliente!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////
$(".body").on('click', "button#ModificarCliente", function (ev) {
    $(".body").on('submit', "form#RegistroCliente", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();

        var ruc = $(this).find('input#cedula').val().trim();
        var apellido = $(this).find('input#apellido').val().trim();
        var nombre = $(this).find('input#nombre').val().trim();
        var telefono = $(this).find('input#telefono').val().trim();
        var email = $(this).find('input#correo').val().trim();
        var direccion = $(this).find('input#direccion').val().trim();
        var credito = $(this).find('#credito').val().trim();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
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
                ModificarCliente(ruc, apellido, nombre, telefono, email, direccion, credito);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarCliente(ruc, apellido, nombre, telefono, email, direccion, credito) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cliente.php",
        data: {
            Requerimiento: "ModificarCliente",
            Ruc: ruc,
            Apellido: apellido,
            Nombre: nombre,
            Telefono: telefono,
            Email: email,
            Direccion: direccion,
            Credito: credito

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        if (respuesta[0] == true) {
            swal("Esculapio!", "Cliente Modificado..!", "success");
            tablaCliente.search("").draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "...........!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar la bodega..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

////////////////////////////////////////////////////////////////ELIMINAR///////////////////////////////////////////////////////////
$("body").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarCliente(id);
        } else {
        }
    });
});

function EliminarCliente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cliente.php",
        data: {
            Requerimiento: "EliminarCliente",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Cliente Eliminado..!", "success");
            tablaCliente.search("").draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar el cliente.", "error");
            console.log(respuesta);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
function LlenarTablaCliente() {
    tablaCliente = $('#datatableCliente').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Cliente.php",
            data: {
                Requerimiento: "LlenarTablaClienteJS"
            },
            type: "POST"
        },
        scrollY: "350px",
        scrollX: true,
        keys: true,
        ordering: false,
        pageLength: 10,
        responsive: true,
        paging: true,
        searching: true,
        info: true,
        autoWidth: false, 
        scrollCollapse: true,
        language: {
            search: "Buscar:",
            searchPlaceholder: "🔍 Buscar clientes...",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            paginate: {
                next: "→",
                previous: "←"
            }
        }
        
    });
}
////////////////VALIDAD CEDULA///////////////////
function ExisteCedula(ruc, limpiar) {
    var encontro = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Cliente.php",
        data: {
            Requerimiento: "ExisteCedula",
            Ruc: ruc
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (a) {
            encontro = true;
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return encontro;
}


$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var cedula = $(this).parent().parent().find('td').eq(1).html();
    var ape_pat = $(this).parent().parent().find('td').eq(2).html();
    var ape_mat = $(this).parent().parent().find('td').eq(3).html();
    var nombre = $(this).parent().parent().find('td').eq(4).html();
    var email = $(this).parent().parent().find('td').eq(6).html();
    var direccion = $(this).parent().parent().find('td').eq(7).html();
    var telefono = $(this).parent().parent().find('td').eq(5).html();
    var fila = tablaCliente.row($(this).parents("tr")).data();
    $('.body').find('input#cedula').val(cedula);
    $('.body').find('input#nombre').val(nombre);
    $('.body').find('input#apellido').val(ape_pat + " " + ape_mat);
    $('.body').find('input#direccion').val(direccion);
    $('.body').find('input#correo').val(email);
    $('.body').find('input#telefono').val(telefono);
    $('.body').find('#credito').val(fila[8]);
    $(".modalNuevo").modal();
    $('#GuardarCliente').fadeOut(0);
    $('#ModificarCliente').fadeIn(0);
});



$(".body").on('click', "#GenerarArchivo", function (ev) {

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea EXPORTAR TODOS LOS DATOS (ESTO PUEDE TARDAR UNOS MINUTOS) ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            $('#modal-cargando').modal();
            GenerarArchivo();
        } else {

        }
    });
});

function GenerarArchivo() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cliente.php",
        data: {
            Requerimiento: "ExportarDatos"
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        var elemento = '<a href="' + respuesta[0] + '" class="btn btn-sm btn-success" download>Descargar</a>';
        $("#elementoDescarga").html(elemento);
        $('#modal-cargando').modal("hide");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        $('#modal-cargando').modal("hide");
    });
}