$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#Guardar').fadeIn(0);
    $('#Modificar').fadeOut(0);
    id = 0;
    $("#Nombre").val("");
    $("#Descripcion").val("");
    $(".modalNuevo").modal();
});
var id = 0;
// evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
$(".body").on('click', "button#Guardar", function (ev) {
    $(".body").on('submit', "form#RegistroPerfil", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#Nombre').val().trim();
        var descripcion = $(this).find('textarea#Descripcion').val().trim();
        var t = $('#datatablePerfil').DataTable();
        var campos = {
            nombre
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
                GuardarPerfil(nombre, descripcion, t);
            }
        });
    });
});
// evento que se activa al dar clic en el boton Modificar de la caja de registrar nuevo perfil
$(".body").on('click', "button#Modificar", function (ev) {
    $(".body").on('submit', "form#RegistroPerfil", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatable tbody tr.selected td').eq(0).html();
        var nombre = $(this).find('input#Nombre').val().trim();
        var descripcion = $(this).find('textarea#Descripcion').val().trim();

        var t = $('#datatable').DataTable();
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
                ModificarrPerfil(nombre, descripcion, id, t);
            }
        });
    });
});
$("body").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar, Este registro se eliminara permanentemente?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarPerfil();
        }
    });
});

// funcuion para registarar en la bd un nuevo perfil
function GuardarPerfil(nombre, descripcion, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Perfil.php",
        data: {
            Requerimiento: "GuardarPerfil",
            Nombre: nombre,
            Descripcion: descripcion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaperfiles.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su perfil ya existe... su registro debe de ser unico !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
// funcuion para modificar un perfil
function ModificarrPerfil(nombre, descripcion, id, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Perfil.php",
        data: {
            Requerimiento: "ModificarPerfil",
            Nombre: nombre,
            Descripcion: descripcion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaperfiles.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su perfil ya existe... registro debe de ser unico !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
// funcuion para registarar en la bd un nuevo perfil
function EliminarPerfil() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Perfil.php",
        data: {
            Requerimiento: "EliminarPerfil",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaperfiles.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "Este perfil solo puede ser inactivado porque ya ha realizado transacciones en el sistema..!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$('.body').on('change', '.chpantalla', function (evt) {
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Perfil.php",
        data: {
            Requerimiento: "AgregarPantalla",
            Perfil: $("#cbmPerfilPantalla").val(),
            Pantalla: $(this).attr("id"),
            Accion: accion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);

    });
});

// funcion para cargar las pantallas que tiene un perfil asiganado
$(".body").on("change", "select#cbmPerfilPantalla", function (e) {
    tablapantallas.search("").draw();

    CargarPantallasPerfil();
});

function CargarPantallasPerfil() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Perfil.php",
        data: { Requerimiento: "CargarPantallas", Perfil: $("#cbmPerfilPantalla").val() },
        dataType: 'JSON',

    }).done(function (respuesta) {

        if (respuesta[0] == false) {

            swal("Sistema!", "Ocurrio un error.", "error");

            return;
        }
        var vector = $('.body').find("#datatablePantalla tbody tr");
        $('.body').find("#datatablePantalla tbody tr input").prop('checked', false);
        $.each(respuesta, function (i, value) {
            $.each(vector, function (a) {
                var idFila = $(this).find("td").eq(0).html();
                if (idFila == value[0]) {
                    $(this).find("td").find('input').prop('checked', true);
                }
            });
        });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);

    });
}

/*******************************************************************/
$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var nombre = $('.body').find('input#Nombre');
    var descripcion = $('.body').find('textarea#Descripcion');
    var fila = tablaperfiles.row($(this).parents("tr")).data();

    var campos = [nombre, descripcion];
    $('#Guardar').fadeOut(0);
    $('#Modificar').fadeIn(0);
    CargarFila(posiciones, campos, fila);
    $(".modalNuevo").modal();
});


$(".body").on('change', "#MarcarTodos", function (ev) {
    if ($(this).prop('checked')) {
        $('input.chpantalla').prop('checked', true);
    } else {
        $('input.chpantalla').prop('checked', false);
    }

});


var tablaperfiles = null;
var tablapantallas = null;
function ConstruirTabla() {
    tablaperfiles = $('#datatablePerfil').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Perfil.php",
            data: {
                Requerimiento: "CargarTablaPerfilJS"
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
            searchPlaceholder: "🔍 Buscar Perfil..."
        }

    });


    tablapantallas = $('#datatablePantalla').DataTable({
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
            searchPlaceholder: "🔍 Buscar Perfil..."
        }

    });
}

ConstruirTabla();