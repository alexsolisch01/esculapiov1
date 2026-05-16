var TablaPlanes= $('#datatablePlan').DataTable({
                keys: true,
                
               
                paginate:false,
                
                scrollY: 250,
                scrollX: true
    });


var id = 0;
/////////////////////////////////////////////////////////////////////////////
$(".body").on('click', "button#GuardarPlan", function(ev) {
    $(".body").on('submit', "form#RegistroPlanes", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#nombre').val().trim();
        var valor = $(this).find('label#TotalPlan').html().replace("$","");
        var descuento = $(this).find('input#valorDescuento').val().trim();
        var limpiar = $(this).find('button#LimpiarPlan');
        
       
        
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
                GuardarPlan(nombre,valor,descuento,limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarPlan(nombre,valor,descuento,limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "GuardarPlan",
            Nombre: nombre,
            Valor: valor,
            Descuento:descuento
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
              var fila = JSON.parse(respuesta[1]);

              var procedimiento= $('.body').find('select#procedimientos').val();
              var procedimientoEco= $('.body').find('select#procedimientosEco').val();
              var procedimientoLab= $('.body').find('select#procedimientosLab').val();
              var procedimientoRx= $('.body').find('select#procedimientosRx').val();
              var procedimientoTomo= $('.body').find('select#procedimientosTomo').val();

              try{
                for(var i=0;i<procedimiento.length;i++){

                    GuardarDetallePlanes(procedimiento[i],"id_procedimiento",fila[0][0]);
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoEco.length;i++){
                    GuardarDetallePlanes(procedimientoEco[i],"id_procedimiento_eco",fila[0][0]);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoLab.length;i++){
                    GuardarDetallePlanes(procedimientoLab[i],"id_procedimiento_laboratorio",fila[0][0]);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoRx.length;i++){
                    GuardarDetallePlanes(procedimientoRx[i],"id_procedimiento_rx",fila[0][0]);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoTomo.length;i++){
                    GuardarDetallePlanes(procedimientoTomo[i],"id_procedimiento_tomo",fila[0][0]);
                   
                  }
              }catch(error){}

            
            swal("Esculapio!", "Plan Registrado.!", "success");
            CargarTablaPlanes();
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Plan!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////GUARDAR DETALLE DEL PLAN////////////////////////////////////////////

function GuardarPlanDetalle(procedimiento){

  //var vector=$(".body").find("#datatableDetalleFactFarmacia2 tbody tr");
  //$.each(vector,function(a){

      var procedimiento= $(this).find('select#procedimientos').val();
      var procedimientoEco= $(this).find('select#procedimientosEco').val();
      var procedimientoLab= $(this).find('select#procedimientosLab').val();
      var procedimientoRx= $(this).find('select#procedimientosRx').val();
      var procedimientoTomo= $(this).find('select#procedimientosTomo').val();
      //var plan= $(this).find('selected#nombre').val().trim();
      var limpiar = $(this).find('button#LimpiarPlan');
      
      alert(procedimiento);
      
      

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Planes.php",
            data: {
                Requerimiento: "GuardarPlanDetalle",
                Procedimiento:procedimiento ,
                ProcedimientoEco:procedimientoEco,
                ProcedimientoLab:procedimientoLab,
                ProcedimientoRx:procedimientoRx,
                ProcedimientoTomo:procedimientoTomo
                
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item ", "error");
                    return;
                }
                if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Plan!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////
$(".body").on('click', "button#ModificarPlan", function(ev) {
    $(".body").on('submit', "form#RegistroPlanes", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var nombre = $(this).find('input#nombre').val().trim();
        var valor = $(this).find('label#TotalPlan').html().replace("$","");
        var descuento = $(this).find('input#valorDescuento').val().trim();
        var limpiar = $(this).find('button#LimpiarPlan');

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
                ModificaPlan(nombre,valor,descuento,limpiar,id);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaPlan(nombre,valor,descuento,limpiar,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "ModificaPlan",
            Nombre: nombre,
            Valor: valor,
            Id: id,
            Descuento:descuento
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
              var procedimiento= $('.body').find('select#procedimientos').val();
              var procedimientoEco= $('.body').find('select#procedimientosEco').val();
              var procedimientoLab= $('.body').find('select#procedimientosLab').val();
              var procedimientoRx= $('.body').find('select#procedimientosRx').val();
              var procedimientoTomo= $('.body').find('select#procedimientosTomo').val();

              try{
                for(var i=0;i<procedimiento.length;i++){

                    GuardarDetallePlanes(procedimiento[i],"id_procedimiento",id);
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoEco.length;i++){
                    GuardarDetallePlanes(procedimientoEco[i],"id_procedimiento_eco",id);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoLab.length;i++){
                    GuardarDetallePlanes(procedimientoLab[i],"id_procedimiento_laboratorio",id);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoRx.length;i++){
                    GuardarDetallePlanes(procedimientoRx[i],"id_procedimiento_rx",id);
                    
                  }
              }catch(error){}
              try{
                  for(var i=0;i<procedimientoTomo.length;i++){
                    GuardarDetallePlanes(procedimientoTomo[i],"id_procedimiento_tomo",id);
                   
                  }
              }catch(error){}

            
            swal("Esculapio!", "Plan Registrado.!", "success");
            CargarTablaPlanes();
            swal("Esculapio!", "Plan Modificado..!", "success");
            
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
$(".body").on('click', "button#EliminarPlan", function(ev) {
    $(".body").on('submit', "form#RegistroPlanes", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var limpiar = $(this).find('button#LimpiarPlan');

        var nombre = $(this).find('input#nombre').val().trim();

        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
               EliminaPlan  (id, limpiar);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function EliminaPlan(id, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "EliminaPlan",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Plan Eliminado..!", "success");
            var objeto = ["EliminaPlan", '#datatablePlan', id];
            CargarTablaPlanes();
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
$('.body table#datatablePlan tbody').on('dblclick', 'tr', function(evt) {
    id = $(this).find("td").eq(0).html();
    var posiciones = [1, 3];

    var nombre = $('.body').find('input#nombre')
    var valor = $('.body').find('input#valorDescuento');

    CargarPlanesDetalle(id,"id_procedimiento",$("select#procedimientos"));
    CargarPlanesDetalle(id,"id_procedimiento_laboratorio",$("select#procedimientosLab"));
    CargarPlanesDetalle(id,"id_procedimiento_rx",$("select#procedimientosRx"));
    CargarPlanesDetalle(id,"id_procedimiento_eco",$("select#procedimientosEco"));
    CargarPlanesDetalle(id,"id_procedimiento_tomo",$("select#procedimientosTomo"));

    var fila = $(this).parents("table").DataTable();
    fila = fila.row($(this)).data();//$(this);
    var campos = [nombre, valor];
    CargarFila(posiciones, campos, fila);
    
    $('button#GuardarPlan').prop('disabled', true);
    $('button#ModificarPlan').prop('disabled', false);
    $('button#InactivarPlan').prop('disabled', false);
    $('button#EliminarPlan').prop('disabled', false);
    $('.selectpicker').selectpicker('refresh');
    if ($(this).attr('estado') == 2) {
        $('button#InactivarPlan').attr('id', "ActivarPlan");
        $('button#ActivarPlan').removeClass("btn-warning").addClass('btn-default');
        $('button#ActivarPlan').html('<i class="fa fa-eject" aria-hidden="true"></i> Activar');
        fila.css("background-color", "");
    }
    $("html, body").animate({ scrollTop: 0 }, 400);
});
$('.body').on('click', 'button#LimpiarPlan', function(evt) {
    $('button#GuardarPlan').prop('disabled', false);
    $('button#ModificarPlan').prop('disabled', true);
    $('button#InactivarPlan').prop('disabled', true);
    $('button#EliminarPlan').prop('disabled', true);

    

    $('button#ActivarPlan').attr('id', "InactivarPlan");
    $('button#InactivarPlan').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarPlan').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////GUARDAR BANCO//////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var id = 0;
/////////////////////////////////////////////////////////////////////////////
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
            var campos = [fila[0][0], nombre, estado, fila[0][5], fila[0][4]];
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
            var campos = [fila[0][0], nombre, estado, fila[0][5], fila[0][4]];
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
    var posiciones = [1, 2];
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


      

$(".body").on('change', "select.selectpicker", function(ev) {

      CalcularTotal();
});

function CalcularTotal(){
    $('#TotalPlan').html("$ 0.0");

      var procedimiento= $('.body').find('select#procedimientos').val();
      var procedimientoEco= $('.body').find('select#procedimientosEco').val();
      var procedimientoLab= $('.body').find('select#procedimientosLab').val();
      var procedimientoRx= $('.body').find('select#procedimientosRx').val();
      var procedimientoTomo= $('.body').find('select#procedimientosTomo').val();

      var total =0;
      try{
        for(var i=0;i<procedimiento.length;i++){

            total+= parseFloat($('.body').find('select#procedimientos option[value='+procedimiento[i]+']').attr('pvp'));
          }
      }catch(error){}
      try{
          for(var i=0;i<procedimientoEco.length;i++){

            total+= parseFloat($('.body').find('select#procedimientosEco option[value='+procedimientoEco[i]+']').attr('pvp'));
          }
      }catch(error){}
      try{
          for(var i=0;i<procedimientoLab.length;i++){

            total+= parseFloat($('.body').find('select#procedimientosLab option[value='+procedimientoLab[i]+']').attr('pvp'));
          }
      }catch(error){}
      try{
          for(var i=0;i<procedimientoRx.length;i++){

            total+= parseFloat($('.body').find('select#procedimientosRx option[value='+procedimientoRx[i]+']').attr('pvp'));
          }
      }catch(error){}
      try{
          for(var i=0;i<procedimientoTomo.length;i++){

            total+= parseFloat($('.body').find('select#procedimientosTomo option[value='+procedimientoTomo[i]+']').attr('pvp'));
          }
      }catch(error){}
      $('#TotalPlan').html("$ "+total);
}

function GuardarDetallePlanes(id,tipo,plan){
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "GuardarDetallePlanes",
            Id: id,
            Tipo:tipo,
            Plan:plan
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == true) {
            
        }
        if (respuesta[0] == false) {
            
            swal("Esculapio!", "Codigo Error " + respuesta[1] + ", Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


$('.body').on('click', 'button#LimpiarPlan', function(evt) {
    $('button#GuardarPlan').prop('disabled', false);
    $('button#ModificarPlan').prop('disabled', true);
    
    $('button#EliminarPlan').prop('disabled', true);
    $('#TotalPlan').html("$ 0.0");
    $('.body').find('select#procedimientos').val("");
    $('.body').find('select#procedimientosEco').val("");
    $('.body').find('select#procedimientosLab').val("");
    $('.body').find('select#procedimientosRx').val("");
    $('.body').find('select#procedimientosTomo').val("");

    $('.selectpicker').selectpicker('refresh');
});

function CargarTablaPlanes(){
    

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "CargarTablaPlanes"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            TablaPlanes.clear();//.draw();
        }catch(error){

        }
        console.log(respuesta);
        $.each(respuesta, function(i, value) {

                //var campos = [value[0],value[1],value[2],value[3],value[4],value[5],value[6]];
                TablaPlanes.row.add(value).node().id = value[0];;

        });
        TablaPlanes.draw();
    });
    
}
CargarTablaPlanes();

function CargarPlanesDetalle(plan,tipo,combo){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Planes.php",
        data: {
            Requerimiento: "CargarPlanesDetalle",
            Tipo:tipo,
            Plan:plan
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        console.log(combo.html());
        var valores =[];
        $.each(respuesta, function(i, value) {

                valores[i]=value[0];
                $(combo).find("option[value='" + value[0] + "']").prop("selected", true);
        });
        
        $('.selectpicker').selectpicker('refresh');
        CalcularTotal();
    });

}



$(document).keydown(function(tecla) {
            
            
               //tecla.preventDefault();
            
            if ( 121 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#GuardarPlan').click();
            }

            
            if ( 122 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#ModificarPlan').click();
            }


            if ( 123 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#EliminarPlan').click();
            }
            
           // alert(tecla.keyCode);
        });