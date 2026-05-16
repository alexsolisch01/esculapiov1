$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarUsuario').fadeIn(0);
    $('#ModificarUsuario').fadeOut(0);
    id = 0;

    $("#Usuario").val("");
    $("#cbmPerfiles").val("0");
    $("#cbmEmpleado").val("0");
    $("#cbmMedico").val("0");
    $('.body').find('div#ComboEmpleado').fadeIn(1);
    $('.body').find('div#ComboMedico').fadeIn(1);
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});
var id = 0;
var Emple = "";

// evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
$(".body").on('click', "button#GuardarUsuario", function (ev) {
    $(".body").on('submit', "form#RegistroUsuario", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var perfil = $(this).find('select#cbmPerfiles').val().trim();
        var nombrePerfil = $(this).find('select#cbmPerfiles option:selected').text().trim();
        var punto = $(this).find('select#cbmPuntos').val().trim();
        var nombrePunto = $(this).find('select#cbmPuntos option:selected').text().trim();
        var empleado = $(this).find('select#cbmEmpleado').val().trim();
        var nombreEmpleado = $(this).find('select#cbmEmpleado option:selected').text().trim();
        var medico = $(this).find('select#cbmMedico').val().trim();
        var nombreMedico = $(this).find('select#cbmMedico option:selected').text().trim();
        var res;

        var separar;
        if (perfil == 0 || punto == 0) {
            swal("Esculapio!", "Debe seleccionar un Perfil y un Establecimiento", "error");
            return;
        }
        if (empleado == 0) {
            res = medico;
            nombreEmpleado = nombreMedico;
            separar = nombreMedico.split(" ", 3);
        }
        if (medico == 0) {
            res = empleado;
            nombreEmpleado = nombreEmpleado;
            separar = nombreEmpleado.split(" ", 3);
        }
        var n1 = separar[2].substring(0, 1);
        var a1 = separar[0];
        var user = n1 + a1;
        var usuario = user;
        var campos = {
            usuario
        };

        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarUsuario(usuario, perfil, punto, res, nombreEmpleado, nombrePerfil, nombrePunto);
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo usuario
function GuardarUsuario(usuario, perfil, punto, empleado, nombreEmpleado, nombrePerfil, nombrePunto) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "GuardarUsuario",
            Usuario: $("#Usuario").val(),
            Perfil: perfil,
            Punto: punto,
            Empleado: empleado
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaUsuarios.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('change', "select#cbmEmpleado", function (ev) {
    var nombre = $(this).find('option:selected').text();
    if (nombre != 'SELECCIONAR..') {
        $('.body').find('div#ComboMedico').fadeOut(1);
        try {
            var separar = nombre.split(" ", 3);
            var n1 = separar[2].substring(0, 1);
            var a1 = separar[0];
            var user = n1 + a1;
        }
        catch (error) {
        }
        $('.body').find('input#Usuario').val(user);
    } else {
        $('.body').find('div#ComboMedico').fadeIn();
        $('.body').find('input#Usuario').val('');
    }
});

$(".body").on('change', "select#cbmMedico", function (ev) {
    var nombre = $(this).find('option:selected').text();
    if (nombre != 'SELECCIONAR..') {
        $('.body').find('div#ComboEmpleado').fadeOut(1);
        var separar = nombre.split(" ", 3);
        var n1 = separar[2].substring(0, 1);
        var a1 = separar[0];
        var user = n1 + a1;
        $('.body').find('input#Usuario').val(user);
    } else {
        $('.body').find('div#ComboEmpleado').fadeIn();
        $('.body').find('input#Usuario').val('');
    }
});
$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    
    var res;
    var posiciones = [2, 3, 4];
    var fila = tablaUsuarios.row($(this).parents("tr")).data();
    var perfil = $('.body').find('select#cbmPerfiles');
    var usuario = $('.body').find('input#Usuario');
    var puntoVenta = $('.body').find('select#cbmPuntos');
    $('.body').find('div#ComboEmpleado').fadeOut(1);
    $('.body').find('div#ComboMedico').fadeOut(1);
    var campos = [perfil, usuario, puntoVenta];
    CargarFila(posiciones, campos, fila);
    $('#GuardarUsuario').fadeOut(0);
    $('#ModificarUsuario').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
});
$("body").on('click', ".btnResetear", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro que desea resetear la contraseña de este Usuario?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            ResetearContra();
        }
    });
});

function ResetearContra() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "Resetear",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            tablaUsuarios.draw();
        }
    });
}


$(".body").on('click', "button#ModificarUsuario", function (ev) {
    $(".body").on('submit', "form#RegistroUsuario", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var perfil = $(this).find('select#cbmPerfiles').val().trim();
        var nombrePerfil = $(this).find('select#cbmPerfiles option:selected').text().trim();
        var punto = $(this).find('select#cbmPuntos').val().trim();
        var nombrePunto = $(this).find('select#cbmPuntos option:selected').text().trim();

        

        if (perfil == 0 || punto == 0) {
            swal("Esculapio!", "Debe seleccionar un Perfil y un Establecimiento", "error");
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
                ModificarUsuario(perfil, punto, nombrePerfil, nombrePunto);
            }
        });
    });
});

function ModificarUsuario(perfil, punto, nombrePerfil, nombrePunto) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "ModificarUsuario",
            Perfil: perfil,
            Punto: punto,
            Usuario:$("#Usuario").val(),
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaUsuarios.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#EliminarUsuario", function (ev) {
    $(".body").on('submit', "form#RegistroUsuario", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var limpiar = $(this).find('button#LimpiarUsuario');
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                EliminarUsuario();
            }
        });
    });
});

function EliminarUsuario(id, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "EliminarUsuario",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaUsuarios.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar El Usuario.!", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
var tablaUsuarios = null;
function ConstruirTabla() {

    tablaUsuarios = $('#datatableUsuarios').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Usuario.php",
            data: {
                Requerimiento: "CargarTablaUsuarioJS"
            },
            type: "POST"
        },
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
            searchPlaceholder: "🔍 Buscar Usuario..."
        }

    });
}
ConstruirTabla();

