
var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarIngreso').fadeIn(0);
    $('#ModificarIngreso').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#cbmParroquia").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarIngreso", function (ev) {
    $(".body").on('submit', "form#FrmRegistro", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var cbmParroquia = $(this).find('select#cbmParroquia').val().trim();
        var nombre = $(this).find('input#nombreSector').val().trim();
        
        if (cbmParroquia == 0) {
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
                Guardar(cbmParroquia, nombre);
            } else {

            }
        });
    });
});

function Guardar(cbmParroquia, nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sector.php",
        data: {
            Requerimiento: "Guardar",
            Nombre: nombre,
            Canton: cbmParroquia
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Sector Registrado.!", "success");
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
        
        var cbmParroquia = $(this).find('select#cbmParroquia').val().trim();
        var nombre = $(this).find('input#nombreSector').val().trim();
        
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
                Modificar(cbmParroquia, nombre, id);
            } else {

            }
        });
    });
});

function Modificar(cbmParroquia, nombre,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sector.php",
        data: {
            Requerimiento: "Modificar",
            Nombre: nombre,
            Canton: cbmParroquia,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Secotor Modificado..!", "success");
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
        url: "Ajax/Aj_Sector.php",
        data: {
            Requerimiento: "Eliminar",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Sector Eliminado..!", "success");
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

$('.body table#datatableSector').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var cbmParroquia = $('.body').find('select#cbmParroquia')
    var nombre = $('.body').find('input#nombreSector');
    
    var fila = tablaParroquias.row($(this).parents("tr")).data();
    var campos = [cbmParroquia, nombre];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');
    $('#GuardarIngreso').fadeOut(0);
    $('#ModificarIngreso').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaParroquias = null;
function CargarTabla() {
    tablaParroquias = $('#datatableSector').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Sector.php",
            data: {
                Requerimiento: "CargarTablaSectorJS"
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