var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarAdmision').fadeIn(0);
    $('#ModificarAdmision').fadeOut(0);
    id = 0;
    $("#CedulaAdmi").val("");
    $("#ApellidoAdmi").val("");
    $("#ApellidoMAdmi").val("");
    $("#NombreAdmi").val("");
    $("#FechaAdmi").val("");
    $("#DireccionAdmi").val("");
    $("#TelefonoAdmi").val("");
    $("#CorreoAdmi").val("");
    $("#OcupacionAdmi").val("");
    $("#EdadAdmi").val("");
    $('#CantonAdmi').val("0");
    $('#EstadoCivilAdmi').val("0");
    $('#CantonAdmi').change();

    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    $('.body').find('label#Paciente').attr('idPaciente', id)
    $('.body').find('label#Paciente').text($(this).find('td').eq(3).html() + " " + $(this).find('td').eq(2).html());
    var posiciones = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];
    var cedula = $('.body').find('input#CedulaAdmi');
    var nombre = $('.body').find('input#NombreAdmi');
    var apellido = $('.body').find('input#ApellidoAdmi');
    var apellidom = $('.body').find('input#ApellidoMAdmi');
    var direccion = $('.body').find('input#DireccionAdmi');
    var fecha = $('.body').find('input#FechaAdmi');
    var canton = $('.body').find('select#CantonAdmi');
    var provincia = $('.body').find('select#ProvinciaAdmi');
    var telefono = $('.body').find('input#TelefonoAdmi');
    var correo = $('.body').find('input#CorreoAdmi');
    var estadoCivil = $('.body').find('select#EstadoCivilAdmi');
    var ocupacion = $('.body').find('input#OcupacionAdmi');
    var genero = $('body').find('select#Genero');
    var genero2 = $('body').find('select#Genero2');
    var etnia = $('body').find('select#Etnia');
    var migrante = $('body').find('select#Migrante');
    var migrante2 = $('body').find('select#Migrante2');
    var grupo = $('body').find('select#Grupo');
    var sector = $('body').find('select#Sector');
    var codigo = $('.body').find('input#Codigovih');
    var nombreres = $('.body').find('input#Responsable');
    var resparen = $('.body').find('input#Parentesco');
    var numerores = $('.body').find('input#Numero');
    var afiliacion = $('.body').find('select#Afiliacion');
    var instruccion = $('.body').find('select#Instruccion');
    var parroquia = $('.body').find('#ParroquiaAdmi');
    var sector2 = $('.body').find('#SectorAdmi');
    var fila = tabla.row($(this).parents("tr")).data();
    var edad = calcularEdad(fila[12]);
    $('.body').find('input#EdadAdmi').val(edad);
    var otros = fila[13];
    var campos = [cedula, apellido, apellidom, nombre, correo, direccion, telefono, ocupacion, canton, estadoCivil, fecha]; //, genero,genero2, etnia, migrante,migrante2, grupo, sector, codigo, afiliacion, instruccion, nombreres, resparen, numerores];
    CargarFila(posiciones, campos, fila);
    canton.change();
    genero.val($(otros).attr("genero"));
    genero2.val($(otros).attr("genero2"));
    etnia.val($(otros).attr("etnia"));
    migrante.val($(otros).attr("migrante"));
    migrante2.val($(otros).attr("migrante2"));
    grupo.val($(otros).attr("prioridad"));
    sector.val($(otros).attr("residencia"));

    parroquia.val($(otros).attr("parroquia"));
    sector2.val($(otros).attr("sector"));

    codigo.val($(otros).attr("codigo_vih"));
    afiliacion.val($(otros).attr("afeliacion"));
    instruccion.val($(otros).attr("instruccion"));
    nombreres.val($(otros).attr("nombre_responsable"));
    resparen.val($(otros).attr("parentesco"));
    numerores.val($(otros).attr("parentes_telefono"));

    $('#GuardarAdmision').fadeOut(0);
    $('#ModificarAdmision').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
});

$(".body").on('click', "button#GuardarTrabajo", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario
    var idPaciente = $('.body').find('label#Paciente').attr('idPaciente');
    if (idPaciente == 0) {
        swal("Esculapio!", "Debe seleccionar un Paciente", "error");
        return;
    }
    var codigo = $('form#RegistroTrabajoSocial').find('input#Codigovih').val().trim();
    var nombreres = $('form#RegistroTrabajoSocial').find('input#Responsable').val().trim();
    var resparen = $('form#RegistroTrabajoSocial').find('input#Parentesco').val().trim();
    var numerores = $('form#RegistroTrabajoSocial').find('input#Numero').val().trim();
    var afiliacion = $('form#RegistroTrabajoSocial').find('select#Afiliacion').val();
    var instruccion = $('form#RegistroTrabajoSocial').find('select#Instruccion').val();
    var nc = $('.body').find('select#CantonAdmi option:selected').text().trim();
    var npro = $('.body').find('select#ProvinciaAdmi option:selected').text().trim();
    var genero = $('.body').find('select#Genero option:selected').text().trim();
    var etnia = $('.body').find('select#Etnia option:selected').text().trim();
    var migrante = $('.body').find('select#Migrante option:selected').text().trim();
    var prioridad = $('.body').find('select#Grupo option:selected').text().trim();
    var residencia = $('.body').find('select#Sector option:selected').text().trim();
    var afiliacion1 = $('.body').find('select#Afiliacion option:selected').text().trim();
    var instruccion1 = $('.body').find('select#Instruccion option:selected').text().trim();
    var limpiar = $(this).find('button#LimpiarTrabajo');
    var t = $('#datatablePacientes').DataTable();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Modificar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion, limpiar, nc, npro, genero, etnia, migrante, prioridad, residencia, afiliacion1, instruccion1);
        } else {

        }
    });
});

function ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion, limpiar, nc, npro, genero, etnia, migrante, prioridad, residencia, afiliacion1, instruccion1) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaTrabajo",
            Codigo: codigo,
            NombreRes: nombreres,
            ResParen: resparen,
            NumeroRes: numerores,
            Afiliacion: afiliacion,
            Instruccion: instruccion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Informacion Agregada..!", "success");
            
            tabla.search("").draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#GuardarEpidemia", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario
    var idPaciente = $('.body').find('label#Paciente').attr('idPaciente');
    if (idPaciente == 0) {
        swal("Esculapio!", "Debe seleccionar un Paciente", "error");
        return;
    }
    var genero = $('form#RegistroEpidemiologicos').find('select#Genero').val().trim();
    var genero2 = $('form#RegistroEpidemiologicos').find('select#Genero2').val().trim();
    var etnia = $('form#RegistroEpidemiologicos').find('select#Etnia').val().trim();
    var migrante = $('form#RegistroEpidemiologicos').find('select#Migrante').val().trim();
    var migrante2 = $('form#RegistroEpidemiologicos').find('select#Migrante2').val().trim();
    var grupo = $('form#RegistroEpidemiologicos').find('select#Grupo').val().trim();
    var sector = $('form#RegistroEpidemiologicos').find('select#Sector').val().trim();
    var nc = $('.body').find('select#CantonAdmi option:selected').text().trim();
    var npro = $('.body').find('select#ProvinciaAdmi option:selected').text().trim();
    var genero1 = $('.body').find('select#Genero option:selected').text().trim();
    var genero3 = $('.body').find('select#Genero2 option:selected').text().trim();
    var etnia1 = $('.body').find('select#Etnia option:selected').text().trim();
    var migrante1 = $('.body').find('select#Migrante option:selected').text().trim();
    var migrante3 = $('.body').find('select#Migrante2 option:selected').text().trim();
    var prioridad = $('.body').find('select#Grupo option:selected').text().trim();
    var residencia = $('.body').find('select#Sector option:selected').text().trim();
    var afiliacion = $('.body').find('select#Afiliacion option:selected').text().trim();
    var instruccion = $('.body').find('select#Instruccion option:selected').text().trim();
    var limpiar = $(this).find('button#LimpiarEpidemia');
    var t = $('#datatablePacientes').DataTable();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Modificar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ModificarEpidemia(genero, genero2, etnia, migrante, migrante2, grupo, sector, limpiar, t, nc, npro, afiliacion, instruccion, genero1, genero3, etnia1, migrante1, migrante3, prioridad, residencia);
        } else {

        }
    });
});

function ModificarEpidemia(genero, genero2, etnia, migrante, migrante2, grupo, sector, limpiar, t, nc, npro, afiliacion, instruccion, genero1, genero3, etnia1, migrante1, migrante3, prioridad, residencia) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaEpidemia",
            Genero: genero,
            Genero2: genero2,
            Etnia: etnia,
            Migrante: migrante,
            Migrante2: migrante2,
            Grupo: grupo,
            Sector: sector,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Informacion Agregada..!", "success");
            
            tabla.search("").draw();
            tabla.search("").draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#LimpiarAdmision", function (evt) {
    $('.body').find('label#Paciente').text("");
    $('.body').find('label#Paciente').attr('idPaciente', '0');
    $('button#GuardarAdmision').prop('disabled', false);
    $('button#ModificarAdmision').prop('disabled', true);
    $('button#InactivarAdmision').prop('disabled', true);
    $('button#EliminarAdmision').prop('disabled', true);
    $('button#VerTabCliente').prop('disabled', true);
    $('#EstadoCivilAdmi').val(0);
    $('#CantonAdmi').val(0);
    $('#datatableAdmisionPacientes').find('tbody tr').removeClass('selected');
    $('.selectpicker').selectpicker('refresh');
});
$(".body").on('click', "button#LimpiarTrabajo", function (evt) {
    $('.body').find('label#Paciente').text("");
    $('.body').find('label#Paciente').attr('idPaciente', '0');
    $('#datatableAdmisionPacientes').find('tbody tr').removeClass('selected');;
    $('select#Afiliacion').val("0");
    $('.selectpicker').selectpicker('refresh');
});
$(".body").on('click', "button#LimpiarEpidemia", function (evt) {
    $('.body').find('label#Paciente').text("");
    $('.body').find('label#Paciente').attr('idPaciente', '0');
    $('#datatableAdmisionPacientes').find('tbody tr').removeClass('selected');;
    $('select#Genero').val("0");
    $('select#Genero2').val("0");
    $('select#Etnia').val("0");
    $('select#Migrante').val("0");
    $('select#Migrante2').val("0");
    $('select#Grupo').val("0");
    $('select#Sector').val("0");
    $('.selectpicker').selectpicker('refresh');


});
$(".body").on('change', "#CedulaAdmi", function (ev) {
    if (ExisteCedula($(this).val())) {
        swal("Esculapio!", "Ya existe un paciente con esa cedula!", "error");
    }
});
$(".body").on('click', "button#GuardarAdmision", function (ev) {
    $(".body").on('submit', "form#RegistroAdmision", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var canton = $(this).find('select#CantonAdmi').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaAdmi').val().trim();
        var nombre = $(this).find('input#NombreAdmi').val().trim();
        var apellido = $(this).find('input#ApellidoAdmi').val().trim();
        var apellidom = $(this).find('input#ApellidoMAdmi').val().trim();
        var direccion = $(this).find('input#DireccionAdmi').val().trim();
        var fecha = $(this).find('input#FechaAdmi').val().trim();
        //var provincia = $(this).find('select#ProvinciaAdmi').val();
        var telefono = $(this).find('input#TelefonoAdmi').val().trim();
        var correo = $(this).find('input#CorreoAdmi').val().trim();
        var estadoCivil = $(this).find('select#EstadoCivilAdmi').val();
        var ocupacion = $(this).find('input#OcupacionAdmi').val().trim();
        var nc = $('.body').find('select#CantonAdmi option:selected').text().trim();
        //var npro = $('.body').find('select#ProvinciaAdmi option:selected').text().trim();
        var genero = $('.body').find('select#Genero option:selected').text().trim();
        var etnia = $('.body').find('select#Etnia option:selected').text().trim();
        var migrante = $('.body').find('select#Migrante option:selected').text().trim();
        var prioridad = $('.body').find('select#Grupo option:selected').text().trim();
        var residencia = $('.body').find('select#Sector option:selected').text().trim();
        var afiliacion = $('.body').find('select#Afiliacion option:selected').text().trim();
        var instruccion = $('.body').find('select#Instruccion option:selected').text().trim();
        var limpiar = $(this).find('button#LimpiarAdmision');
        var t = $('#datatablePacientes').DataTable();

        var parroquia = $(this).find('#ParroquiaAdmi').val()
        var sector = $(this).find('#SectorAdmi').val()

        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una PARROQUIA", "error");
            return;
        }

        if (!ValidarCedula(cedula)) {
            swal("Esculapio!", "La cedula es incorrecta..!", "error");
            return;
        }
        if (ExisteCedula(cedula)) {
            swal("Esculapio!", "Ya existe un paciente con esa cedula!", "error");
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
                GuardarPaciente(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar, t, nc, genero, etnia, migrante, prioridad, residencia, afiliacion, instruccion, parroquia, sector);
            } else {

            }
        });
    });
});

function GuardarPaciente(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar, t, nc, genero, etnia, migrante, prioridad, residencia, afiliacion, instruccion, parroquia, sector) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "GuardaPaciente",
            Cedula: cedula,
            Apellido: apellido,
            ApellidoM: apellidom,
            Nombre: nombre,
            Direccion: direccion,
            Fecha: fecha,
            Canton: canton,
            Telefono: telefono,
            Correo: correo,
            EstadoCivil: estadoCivil,
            Ocupacion: ocupacion,
            Parroquia: parroquia,
            Sector: sector
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Paciente Guardado.!", "success");
            tabla.search("").draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "YA EXISTE UN PACIENTE CON ESTA CEDULA..!" + respuesta[1], "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error al Guardar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#ModificarAdmision", function (ev) {
    $(".body").on('submit', "form#RegistroAdmision", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var canton = $(this).find('select#CantonAdmi').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaAdmi').val().trim();
        var nombre = $(this).find('input#NombreAdmi').val().trim();
        var apellido = $(this).find('input#ApellidoAdmi').val().trim();
        var apellidom = $(this).find('input#ApellidoMAdmi').val().trim();
        var direccion = $(this).find('input#DireccionAdmi').val().trim();
        var fecha = $(this).find('input#FechaAdmi').val().trim();
        //var provincia = $(this).find('select#ProvinciaAdmi').val();
        var telefono = $(this).find('input#TelefonoAdmi').val().trim();
        var correo = $(this).find('input#CorreoAdmi').val().trim();
        var estadoCivil = $(this).find('select#EstadoCivilAdmi').val();
        var ocupacion = $(this).find('input#OcupacionAdmi').val().trim();
        var nc = $('.body').find('select#CantonAdmi option:selected').text().trim();
        //var npro = $('.body').find('select#ProvinciaAdmi option:selected').text().trim();
        var genero = $('.body').find('select#Genero option:selected').text().trim();
        var etnia = $('.body').find('select#Etnia option:selected').text().trim();
        var migrante = $('.body').find('select#Migrante option:selected').text().trim();
        var prioridad = $('.body').find('select#Grupo option:selected').text().trim();
        var residencia = $('.body').find('select#Sector option:selected').text().trim();
        var afiliacion = $('.body').find('select#Afiliacion option:selected').text().trim();
        var instruccion = $('.body').find('select#Instruccion option:selected').text().trim();
        var limpiar = $(this).find('button#LimpiarAdmision');
        var t = $('#datatableAdmisionPacientes').DataTable();

        var parroquia = $(this).find('#ParroquiaAdmi').val()
        var sector = $(this).find('#SectorAdmi').val()

        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una PARROQUIA", "error");
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
                ModificarPaciente(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar, t, nc, genero, etnia, migrante, prioridad, residencia, afiliacion, instruccion, parroquia, sector);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

$(".body").on('change', "input#FechaAdmi", function (ev) {
    var fecha = $(this).val();
    var edad = calcularEdad(fecha);
    $('.body').find('input#EdadAdmi').val(edad);
});

function calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    return edad + " años, " + meses + " meses y " + dias + " días";
}
function ModificarPaciente(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar, t, nc, genero, etnia, migrante, prioridad, residencia, afiliacion, instruccion, parroquia, sector) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaPaciente",
            Cedula: cedula,
            Apellido: apellido,
            ApellidoM: apellidom,
            Nombre: nombre,
            Direccion: direccion,
            Fecha: fecha,
            Canton: canton,
            Telefono: telefono,
            Correo: correo,
            EstadoCivil: estadoCivil,
            Ocupacion: ocupacion,
            Id: id,
            Parroquia: parroquia,
            Sector: sector
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Paciente Modificado.!", "success");
            tabla.search("").draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
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
                EliminarPaciente(id);
            }
        });
});

function EliminarPaciente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "EliminaPaciente",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "Paciente Eliminado..!", "success");
            tabla.search("").draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

var tabla = null;
function LlenarTablaPaciente() {
    tabla = $('#datatableAdmisionPacientes').DataTable({
        "processing": true,
        "serverSide": true,
        "bAutoWidth ": true,
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "LlenarTablaPaciente"
            },
            type: "POST"
        },
        scrollY: 350,
        keys: true,
        scrollX: true,
        ordering:false,
        "columnDefs": [
        {
            "targets": [9, 10, 11, 12, 13],
            "visible": false,
        }]
    });

    $('#datatableAdmisionPacientes_filter input').unbind();
    $('#datatableAdmisionPacientes_filter input').remove();
    $('#datatableAdmisionPacientes_filter label').remove();

    $('input#apellidoPFiltro').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAdmisionPacientes_filter tbody tr td').eq(0).click();
        }
    });
    $('input#apellidoMFiltro').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAdmisionPacientes_filter tbody tr td').eq(0).click();
        }
    });
    $('input#nombreFiltro').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAdmisionPacientes_filter tbody tr td').eq(0).click();
        }
    });
    $('input#cedulaFiltro').bind('keyup', function (e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAdmisionPacientes_filter tbody tr td').eq(0).click();
        }
    });
}
LlenarTablaPaciente();

function ExisteCedula(cedula) {
    var encontro = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ExisteCedula",
            Cedula: cedula
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
        url: "Ajax/Aj_Paciente.php",
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

$(".body").on('change', "#CantonAdmi", function (ev) {
    CargarParroquias($(this).val());
    CargarSectores($(this).val());
});

function CargarParroquias(id) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado2",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta != false) {
            $('#ParroquiaAdmi').empty();
            $.each(respuesta, function (i, value) {
                var elem = '<option value=' + respuesta[i][0] + '>' + respuesta[i][1] + '</option>';
                $('#ParroquiaAdmi').append(elem);
            });
        }
        $('.selectpicker').selectpicker('refresh');
    });
}
function CargarSectores(id) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado3",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta != false) {
            $('#SectorAdmi').empty();
            $.each(respuesta, function (i, value) {
                var elem = '<option value="' + respuesta[i][1] + '">' + respuesta[i][1] + '</option>';
                $('#SectorAdmi').append(elem);
            });
        }
        $('.selectpicker').selectpicker('refresh');
    });
}