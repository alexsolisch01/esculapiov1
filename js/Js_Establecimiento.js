var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarEsta').fadeIn(0);
    $('#ModificarEsta').fadeOut(0);
    id = 0;
    $("#NombreComercialEsta").val("");
    $("#CodigoEstablecimiento").val("");
    $("#ActividadCome").val("");
    $("#AreaSalud").val("");
    $("#DireccionEm").val("");
    $("#TelefonoEm").val("");
    $("#CorreoEm").val("");
    $("#ProvinciaEsta").val("0");
    $("#CantonEsta").val("0");
    $("#ParroquiaEsta").val("0");
    $("#Licenciamiento").val("0");
    $("#TipoEstablecimiento").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});
var tablaEstablecimiento = null;

function ConstruirTabla() {
    tablaEstablecimiento = $('#datatableEstablecimientos').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Empresa.php",
            data: {
                Requerimiento: "CargarTablaEstablecimientoJS"
            },
            type: "POST"
        },
        /*scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false*/
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        keys: true, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,
        language: {
            search: "Buscar:",
            searchPlaceholder: "🔍 Buscar establecimiento...",
            lengthMenu: "Mostrar _MENU_ registros",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            paginate: {
                    next: "→",
                    previous: "←"
            }
        }
    });
}
ConstruirTabla();

$(".body").on('click', "button#GuardarEsta", function (ev) {
    $(".body").on('submit', "form#RegistroEstablecimientoEmpresa", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_empresa = 2;
        var nombre = $(this).find('input#NombreComercialEsta').val().trim();
        var codigo = $(this).find('input#CodigoEstablecimiento').val().trim();
        var actividad = $(this).find('input#ActividadCome').val().trim();
        var provincia = $(this).find('select#ProvinciaEsta').val().trim();
        var canton = $(this).find('select#CantonEsta').val().trim();
        var parroquia = $(this).find('select#ParroquiaEsta').val().trim();
        var area = $(this).find('input#AreaSalud').val().trim();
        var licenciamiento = $(this).find('select#Licenciamiento').val().trim();
        var direccion = $(this).find('input#DireccionEm').val().trim();
        var telefono = $(this).find('input#TelefonoEm').val().trim();
        var correo = $(this).find('input#CorreoEm').val().trim();
        var tipoEsta = $(this).find('select#TipoEstablecimiento').val().trim();
        if (id_empresa == 0) {
            swal("Esculapio!", "Debe seleccionar una Empresa ", "error");
            return;
        }
        if (provincia == 0) {
            swal("Esculapio!", "Debe seleccionar una Provincia ", "error");
            return;
        }
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar un Canton ", "error");
            return;
        }
        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una Parroquia ", "error");
            return;
        }
        if (licenciamiento == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Licenciamiento ", "error");
            return;
        }
        if (tipoEsta == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Establecimiento ", "error");
            return;
        }
        var ne = $('.body').find('select#NombreEmpresaEsta option:selected').text().trim();
        var npr = $('.body').find('select#ParroquiaEsta option:selected').text().trim();
        var nl = $('.body').find('select#Licenciamiento option:selected').text().trim();
        var nope = $('.body').find('select#Personeria option:selected').text().trim();
        var nte = $('.body').find('select#TipoEstablecimiento option:selected').text().trim();
        var npro = $('.body').find('select#ProvinciaEsta option:selected').text().trim();
        var limpiar = $(this).find('button#LimpiarEsta');
        var t = $('#datatable').DataTable();
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarEsta(id_empresa, nombre, actividad, provincia, canton, parroquia, area, licenciamiento, direccion, telefono, correo, tipoEsta, limpiar, t, ne, npr, nl, nte, npro, codigo);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarEsta(id_empresa, nombre, actividad, provincia, canton, parroquia, area, licenciamiento, direccion, telefono, correo, tipoEsta, limpiar, t, ne, npr, nl, nte, npro, codigo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empresa.php",
        data: {
            Requerimiento: "GuardaEsta",
            IdEmpresa: id_empresa,
            NombreComer: nombre,
            ActividadCome: actividad,
            ParroquiaEsta: parroquia,
            AreaSalud: area,
            Licenciamiento: licenciamiento,
            DireccionEm: direccion,
            TelefonoEmpre: telefono,
            CorreoEm: correo,
            TipoEsta: tipoEsta,
            Codigo: codigo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaEstablecimiento.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre del Establecimiento ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Establecimiento!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
$(".body").on('change', "select#ProvinciaEsta", function (ev) {
    $('#CantonEsta option').remove();
    var elem = '<option value=0>Seleccionar..</option>';
    $('#CantonEsta').append(elem);
    $('#ParroquiaEsta option').remove();
    var elem = '<option value=0>Seleccionar..</option>';
    $('#ParroquiaEsta').append(elem);
    var id = $(this).val();
    CargarComboAnidadoEsta(id);
});

function CargarComboAnidadoEsta(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta != false) {
            $.each(respuesta, function (i, value) {
                var elem = '<option value=' + respuesta[i][0] + '>' + respuesta[i][1] + '</option>';
                $('#CantonEsta').append(elem);
            });
            if (idcanton>0) {
                $('#CantonEsta').val(idcanton);
                $('#CantonEsta').change();
                idcanton = 0;
            }
        }
    });
}
$(".body").on('change', "select#CantonEsta", function (ev) {
    $('#ParroquiaEsta option').remove();
    var elem = '<option value=0>Seleccionar..</option>';
    $('#ParroquiaEsta').append(elem);
    var id = $(this).val();
    CargarComboAnidadoEsta2(id);
});

function CargarComboAnidadoEsta2(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado2",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta != false) {
            $.each(respuesta, function (i, value) {
                var elem = '<option value=' + respuesta[i][0] + '>' + respuesta[i][1] + '</option>';
                $('#ParroquiaEsta').append(elem);
            });
            if (idparroquia > 0) {
                $('#ParroquiaEsta').val(idparroquia);
                $('#ParroquiaEsta').change();
                idparroquia = 0;
            }
        }
    });
}
var idprovincia = 0;
var idcanton = 0;
var idparroquia = 0;
$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 5, 6, 7, 8, 9, 10];
    //var id_empresa =$('.body').find('select#NombreEmpresaEsta');
    var nombre = $('.body').find('input#NombreComercialEsta');
    var actividad = $('.body').find('input#ActividadCome');

    var area = $('.body').find('input#AreaSalud');
    var licenciamiento = $('.body').find('select#Licenciamiento');
    var personeria = $('.body').find('select#Personeria');
    var direccion = $('.body').find('input#DireccionEm');
    var telefono = $('.body').find('input#TelefonoEm');
    var correo = $('.body').find('input#CorreoEm');
    var tipoEsta = $('.body').find('select#TipoEstablecimiento');
    var codigo = $('.body').find('input#CodigoEstablecimiento');

    var fila = tablaEstablecimiento.row($(this).parents("tr")).data();

    var campos = [codigo, nombre, actividad, area, licenciamiento, tipoEsta, direccion, telefono, correo];
    CargarFila(posiciones, campos, fila);
    tipoEsta.val(fila[13]);
    licenciamiento.val(fila[14]);
    idprovincia = fila[15];
    idcanton = fila[16];
    idparroquia = fila[17];
    $("#ProvinciaEsta").val(idprovincia);
    $("#ProvinciaEsta").change();
    $('#GuardarEsta').fadeOut(0);
    $('#ModificarEsta').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
});


$(".body").on('click', "button#ModificarEsta", function (ev) {
    $(".body").on('submit', "form#RegistroEstablecimientoEmpresa", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_empresa = 1;
        var nombre = $(this).find('input#NombreComercialEsta').val().trim();
        var actividad = $(this).find('input#ActividadCome').val().trim();
        var provincia = $(this).find('select#ProvinciaEsta').val().trim();
        var canton = $(this).find('select#CantonEsta').val().trim();
        var parroquia = $(this).find('select#ParroquiaEsta').val().trim();
        var area = $(this).find('input#AreaSalud').val().trim();
        var licenciamiento = $(this).find('select#Licenciamiento').val().trim();
        var direccion = $(this).find('input#DireccionEm').val().trim();
        var telefono = $(this).find('input#TelefonoEm').val().trim();
        var correo = $(this).find('input#CorreoEm').val().trim();
        var tipoEsta = $(this).find('select#TipoEstablecimiento').val().trim();
        var codigo = $(this).find('input#CodigoEstablecimiento').val().trim();
        if (id_empresa == 0) {
            swal("Esculapio!", "Debe seleccionar una Empresa ", "error");
            return;
        }
        if (provincia == 0) {
            swal("Esculapio!", "Debe seleccionar una Provincia ", "error");
            return;
        }
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar un Canton ", "error");
            return;
        }
        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una Parroquia ", "error");
            return;
        }
        if (licenciamiento == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Licenciamiento ", "error");
            return;
        }
        if (tipoEsta == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Establecimiento ", "error");
            return;
        }
        //var ne = $('.body').find('select#NombreEmpresaEsta option:selected').text().trim();
        var npr = $('.body').find('select#ParroquiaEsta option:selected').text().trim();
        var nl = $('.body').find('select#Licenciamiento option:selected').text().trim();
        var nope = $('.body').find('select#Personeria option:selected').text().trim();
        var nte = $('.body').find('select#TipoEstablecimiento option:selected').text().trim();
        var npro = $('.body').find('select#ProvinciaEsta option:selected').text().trim();
        var limpiar = $(this).find('button#LimpiarEsta');
        var t = $('#datatable').DataTable();
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarEsta(id_empresa, nombre, actividad, provincia, canton, parroquia, area, licenciamiento, direccion, telefono, correo, tipoEsta, limpiar, t, npr, nl, nte, npro, codigo);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarEsta(id_empresa, nombre, actividad, provincia, canton, parroquia, area, licenciamiento, direccion, telefono, correo, tipoEsta, limpiar, t, npr, nl, nte, npro, codigo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empresa.php",
        data: {
            Requerimiento: "ModificaEsta",
            IdEmpresa: id_empresa,
            NombreComer: nombre,
            ActividadCome: actividad,
            ParroquiaEsta: parroquia,
            AreaSalud: area,
            Licenciamiento: licenciamiento,
            DireccionEm: direccion,
            TelefonoEmpre: telefono,
            CorreoEm: correo,
            TipoEsta: tipoEsta,
            Codigo: codigo,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaEstablecimiento.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre del Establecimiento ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Establecimiento..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminarEsta();
        }
    });

});

function EliminarEsta() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empresa.php",
        data: {
            Requerimiento: "EliminaEsta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaEstablecimiento.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al eliminar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}