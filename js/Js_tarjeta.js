var id = 0;
/////////////////////////////////////////////////////////////////////////////
$(".body").on('click', "button#GuardarTarjeta", function(ev) {
    $(".body").on('submit', "form#RegistroTarjeta", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#nombre').val().trim();
        
        var limpiar = $(this).find('button#LimpiarTarjeta');
        var t = $('#datatable').DataTable();
       
        
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
                GuardarTarjeta(nombre,limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarTarjeta(nombre,limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "GuardarTarjeta",
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Registrada.!", "success");
            var fila = JSON.parse(respuesta[1]);
            var campos = [fila[0][0], nombre, fila[0][5], fila[0][4]];
            var objeto = ["GuardarTarjeta", '#datatableTarjeta', campos];
            send(JSON.stringify(objeto));
            //var objet
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Bodega!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////
$(".body").on('click', "button#ModificarTarjeta", function(ev) {
    $(".body").on('submit', "form#RegistroTarjeta", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var nombre = $(this).find('input#nombre').val().trim();
               var limpiar = $(this).find('button#LimpiarTarjeta');
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
                ModificaTarjeta(nombre,limpiar,id);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaTarjeta(nombre, limpiar,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "ModificaTarjeta",
            Nombre: nombre,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Modificada..!", "success");
            var fila = JSON.parse(respuesta[1]);
            var campos = [fila[0][0], nombre, fila[0][5], fila[0][4]];
            //alert(id);
            var objeto = ["ModificaTarjeta", "#datatableTarjeta", campos,id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "...........!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar la bodega..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

////////////////////////////////////////////////////////////////ELIMINAR///////////////////////////////////////////////////////////
$(".body").on('click', "button#EliminarTarjeta", function(ev) {
    $(".body").on('submit', "form#RegistroTarjeta", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var nombre = $(this).find('input#nombre').val().trim();

         var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        } 


        
        var limpiar = $(this).find('button#LimpiarTarjeta');
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
               EliminaTarjeta  (id, limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function EliminaTarjeta(id, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "EliminaTarjeta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Tarjeta Eliminada..!", "success");
            var objeto = ["EliminaTarjeta", '#datatableTarjeta', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Bodega se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
$('.body table#datatableTarjeta tbody').on('dblclick', 'tr', function(evt) {
    id = $(this).find("td").eq(0).html();
    var posiciones = [1];
    var nombre = $('.body').find('input#nombre')
    var fila = $(this).parents("table").DataTable();
    fila = fila.row($(this)).data();//$(this);
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('button#GuardarTarjeta').prop('disabled', true);
    $('button#ModificarTarjeta').prop('disabled', false);
    $('button#InactivarTarjeta').prop('disabled', false);
    $('button#EliminarTarjeta').prop('disabled', false);
    $('.selectpicker').selectpicker('refresh');
    if ($(this).attr('estado') == 2) {
        $('button#InactivarTarjeta').attr('id', "ActivarTarjeta");
        $('button#ActivarTarjeta').removeClass("btn-warning").addClass('btn-default');
        $('button#ActivarTarjeta').html('<i class="fa fa-eject" aria-hidden="true"></i> Activar');
        fila.css("background-color", "");
    }
    $("html, body").animate({ scrollTop: 0 }, 400);
});
$('.body').on('click', 'button#LimpiarTarjeta', function(evt) {
    $('button#GuardarTarjeta').prop('disabled', false);
    $('button#ModificarTarjeta').prop('disabled', true);
    $('button#InactivarTarjeta').prop('disabled', true);
    $('button#EliminarTarjeta').prop('disabled', true);

    

    $('button#ActivarTarjeta').attr('id', "InactivarTarjeta");
    $('button#InactivarTarjeta').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarTarjeta').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});

function InactivarBodega(id, limpiar, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "InactivarBodega",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Inactivada..!", "success");
            var objeto = ["InactivarBodega", '#datatableBodega', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "Este perfil solo puede ser inactivado porque ya ha realizado transacciones en el sistema..!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
$(".body").on('click', "button#InactivarBodega", function(ev) {
    $(".body").on('submit', "form#RegistroBodega", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#Nombre').val().trim();
        var limpiar = $(this).find('button#LimpiarBodega');
        var t = $('#datatable').DataTable();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione una bodega para Inactivar..!", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Inactivar Este Registro?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                InactivarBodega(id, limpiar, t);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function ActivarBodega(id, limpiar, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ActivarBodega",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Perfil Activado..!", "success");
            var objeto = ["ActivarBodega", '#datatableBodega', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "Este perfil solo puede ser inactivado porque ya ha realizado transacciones en el sistema..!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Activar El Perfil..!Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
$(".body").on('click', "button#ActivarBodega", function(ev) {
    $(".body").on('submit', "form#RegistroBodega", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#Nombre').val().trim();
        var limpiar = $(this).find('button#LimpiarBodega');
        var t = $('#datatable').DataTable();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione un perfil para Activar..!", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Activar Este Registro?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                ActivarBodega(id, limpiar, t);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////GUARDAR BANCO//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
var id = 0;
$(".body").on('click', "button#GuardarBanco", function(ev) {
    $(".body").on('submit', "form#RegistroBanco", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#nombre').val().trim();
        var prefijo = $(this).find('input#prefijo').val().trim();
        var limpiar = $(this).find('button#LimpiarBanco');
        var t = $('#datatable').DataTable();
       
        
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
                GuardarBanco(nombre,prefijo,limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarBanco(nombre,prefijo,limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "GuardarBanco",
            Nombre: nombre,
            Prefijo: prefijo
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Banco Registrado.!", "success");
            var fila = JSON.parse(respuesta[1]);
            var campos = [fila[0][0], nombre,prefijo, fila[0][5], fila[0][4]];
            var objeto = ["GuardarBanco", '#datatableBanco', campos];
            send(JSON.stringify(objeto));
            //var objet
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Bodega!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////
$(".body").on('click', "button#ModificarBanco", function(ev) {
    $(".body").on('submit', "form#RegistroBanco", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var nombre = $(this).find('input#nombre').val().trim();
        var prefijo = $(this).find('input#prefijo').val().trim();
        var limpiar = $(this).find('button#LimpiarBanco');
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
                ModificaBanco(nombre, prefijo,limpiar,id);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaBanco(nombre, prefijo,limpiar,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "ModificaBanco",
            Nombre: nombre,
            Prefijo: prefijo,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Banco Modificada..!", "success");
            var fila = JSON.parse(respuesta[1]);
            var campos = [fila[0][0], nombre, prefijo, fila[0][5], fila[0][4]];

            //alert(id);
            var objeto = ["ModificaBanco", "#datatableTarjeta", campos,id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "...........!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar la bodega..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

////////////////////////////////////////////////////////////////ELIMINAR///////////////////////////////////////////////////////////
$(".body").on('click', "button#EliminarBanco", function(ev) {
    $(".body").on('submit', "form#RegistroBanco", function(evt) {
 evt.preventDefault(); // evita que se envie el formulario
 var nombre = $(this).find('input#nombre').val().trim();
  var t = $('#datatable').DataTable();
        

        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        } 

        
        var limpiar = $(this).find('button#LimpiarBanco');
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                 EliminaBanco(id, limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function EliminaBanco(id, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tarjeta.php",
        data: {
            Requerimiento: "EliminaBanco",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Banco Eliminado..!", "success");
            var objeto = ["EliminaBanco", '#datatableBanco', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Bodega se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
//////////////////////////////////CARGAR EN LA TABLA CON INACTIVAR//////////////////////////////////////
$('.body table#datatableBanco tbody').on('dblclick', 'tr', function(evt) {
    id = $(this).find("td").eq(0).html();
    var posiciones = [1,2];
    var nombre = $('.body').find('input#nombre')
    var prefijo = $('.body').find('input#prefijo');
   
    var fila = $(this).parents("table").DataTable();
    fila = fila.row($(this)).data();//$(this);
    var campos = [nombre, prefijo];
    CargarFila(posiciones, campos, fila);
    $('button#GuardarBanco').prop('disabled', true);
    $('button#ModificarBanco').prop('disabled', false);
    $('button#InactivarBanco').prop('disabled', false);
    $('button#EliminarBanco').prop('disabled', false);
    $('.selectpicker').selectpicker('refresh');
    if ($(this).attr('estado') == 2) {
        $('button#InactivarBanco').attr('id', "ActivarBanco");
        $('button#ActivarBanco').removeClass("btn-warning").addClass('btn-default');
        $('button#ActivarBanco').html('<i class="fa fa-eject" aria-hidden="true"></i> Activar');
        fila.css("background-color", "");
    }
    $("html, body").animate({ scrollTop: 0 }, 400);
});
$('.body').on('click', 'button#LimpiarBanco', function(evt) {
    $('button#GuardarBanco').prop('disabled', false);
    $('button#ModificarBanco').prop('disabled', true);
    $('button#InactivarBanco').prop('disabled', true);
    $('button#EliminarBanco').prop('disabled', true);

    

    $('button#ActivarBanco').attr('id', "InactivarBanco");
    $('button#InactivarBanco').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarBanco').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});

function InactivarBodega(id, limpiar, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "InactivarBodega",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Inactivada..!", "success");
            var objeto = ["InactivarBodega", '#datatableBodega', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "Este perfil solo puede ser inactivado porque ya ha realizado transacciones en el sistema..!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
$(".body").on('click', "button#InactivarBodega", function(ev) {
    $(".body").on('submit', "form#RegistroBodega", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#Nombre').val().trim();
        var limpiar = $(this).find('button#LimpiarBodega');
        var t = $('#datatable').DataTable();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione una bodega para Inactivar..!", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Inactivar Este Registro?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                InactivarBodega(id, limpiar, t);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function ActivarBodega(id, limpiar, t) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ActivarBodega",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Perfil Activado..!", "success");
            var objeto = ["ActivarBodega", '#datatableBodega', id];
            send(JSON.stringify(objeto));
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1451) {
                swal("Esculapio!", "Este perfil solo puede ser inactivado porque ya ha realizado transacciones en el sistema..!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Activar El Perfil..!Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
$(".body").on('click', "button#ActivarBodega", function(ev) {
    $(".body").on('submit', "form#RegistroBodega", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#Nombre').val().trim();
        var limpiar = $(this).find('button#LimpiarBodega');
        var t = $('#datatable').DataTable();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione un perfil para Activar..!", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Activar Este Registro?",
            icon: "info",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                ActivarBodega(id, limpiar, t);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

////////////////////////////FUNCIONES TECLA TARJETA///////////////////////////
 $(document).keydown(function(tecla) {
            
            
        //tecla.preventDefault();
            
            if ( 121 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#GuardarTarjeta').click();
            }


            if ( 122 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#ModificarTarjeta').click();
            }


            if ( 123 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#EliminarTarjeta').click();
            }

       
            
         // alert(tecla.keyCode);
        });
////////////////////////////FUNCIONES TECLA BANCO///////////////////////////
 $(document).keydown(function(tecla) {
            
            
        //tecla.preventDefault();
            
            if ( 121 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#GuardarBanco').click();
            }


            if ( 122 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#ModificarBanco').click();
            }


            if ( 123 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#EliminarBanco').click();
            }

       
            
         // alert(tecla.keyCode);
        });