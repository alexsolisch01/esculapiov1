
var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarIngreso').fadeIn(0);
    $('#ModificarIngreso').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#cbmCanton").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarIngreso", function (ev) {
    $(".body").on('submit', "form#FrmRegistro", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var cbmCanton = $(this).find('select#cbmCanton').val().trim();
        var nombre = $(this).find('input#nombreParroquia').val().trim();
        
        if (cbmCanton == 0) {
            swal("Esculapio!", "Debe seleccionar un Canton", "error");
            return;
        }
        
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
                Guardar(cbmCanton, nombre);
            } else {

            }
        });
    });
});

function Guardar(cbmCanton, nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Parroquia.php",
        data: {
            Requerimiento: "Guardar",
            Nombre: nombre,
            Canton: cbmCanton
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Parroquia Registrada.!", "success");
            tablaParroquias.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al guardar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#ModificarIngreso", function (ev) {
    $(".body").on('submit', "form#FrmRegistro", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        
        var cbmCanton = $(this).find('select#cbmCanton').val().trim();
        var nombre = $(this).find('input#nombreParroquia').val().trim();
        
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
                Modificar(cbmCanton, nombre, id);
            } else {

            }
        });
    });
});

function Modificar(cbmCanton, nombre,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Parroquia.php",
        data: {
            Requerimiento: "Modificar",
            Nombre: nombre,
            Canton: cbmCanton,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Parroquia Modificada..!", "success");
            tablaParroquias.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al modificar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

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
            Eliminar(id);
        }
    });
});

function Eliminar(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Parroquia.php",
        data: {
            Requerimiento: "Eliminar",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Parroquia Eliminada..!", "success");
            tablaParroquias.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al eliminar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableParroquia').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var cbmCanton = $('.body').find('select#cbmCanton')
    var nombre = $('.body').find('input#nombreParroquia');
    
    var fila = tablaParroquias.row($(this).parents("tr")).data();
    var campos = [cbmCanton, nombre];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');
    $('#GuardarIngreso').fadeOut(0);
    $('#ModificarIngreso').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaParroquias = null;
function CargarTabla() {
    tablaParroquias = $('#datatableParroquia').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Parroquia.php",
            data: {
                Requerimiento: "CargarTablaParroquiaJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false
    });
}
CargarTabla();