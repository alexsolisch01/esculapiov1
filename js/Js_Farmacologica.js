var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarFarma').fadeIn(0);
    $('#ModificaFarma').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarFarma", function (ev) {
    $(".body").on('submit', "form#RegistroFarmaco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var registroBo = $(this).find('select#bodefarma').val().trim();
        var descripcion = $(this).find('input#DescripcionFarma').val().trim();
        var ne = $(this).find('select#bodefarma option:selected').text().trim();
        var campos = {
            registroBo
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
                GuardarFarmaco(registroBo, descripcion, ne);
            } else {

            }
        });
    });
});

function GuardarFarmaco(registroBo, descripcion, ne) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarFarmaco",
            Descripcion: descripcion,
            Bodega_registrada: registroBo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Farmacologia Guardada.!", "success");
            tablaFarmacologia.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su clasificacion Farmacologia ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body").on('click', "button#ModificaFarma", function (ev) {
    $(".body").on('submit', "form#RegistroFarmaco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var registroBo = $(this).find('select#bodefarma').val().trim();
        var descripcion = $(this).find('input#DescripcionFarma').val().trim();
        var ne = $(this).find('select#bodefarma option:selected').text().trim();
        var campos = {
            registroBo
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
                ModificaFarmaco(registroBo, descripcion, ne);
            } else {

            }
        });
    });
});

function ModificaFarmaco(registroBo, descripcion, ne) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaFarmaco",
            Descripcion: descripcion,
            Id: id,
            Bodega_registrada: registroBo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Farmacologia Modificada..!", "success");
            tablaFarmacologia.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de su Farmacologia ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaFarmaco(id);
        } else {

        }
    });
});

function EliminaFarmaco(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaFarmaco",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Farmaco Eliminado..!", "success");
            tablaFarmacologia.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Bodega se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableFarmaco').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var registroBo = $('.body').find('select#bodefarma');
    var descripcion = $('.body').find('input#DescripcionFarma');
    var fila = tablaFarmacologia.row($(this).parents("tr")).data();
    var campos = [registroBo, descripcion];
    CargarFila(posiciones, campos, fila);
    $('#GuardarFarma').fadeOut(0);
    $('#ModificaFarma').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
    
});

var tablaFarmacologia = null;
function CargarTabla() {
    tablaFarmacologia = $('#datatableFarmaco').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaFarmacologiaJS"
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