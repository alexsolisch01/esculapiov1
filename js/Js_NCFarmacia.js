var primeravez = true;
var primeravezCliente = true;
var primeravezInventario = true;
var tabla = null;
var tablaCliente = null;
var tablaInventario = null;
var tablaDetalle = null;
var tablaAnticipo = null;
var tablaFacturas = null;
var tablaRecetas = null;
var fraccion = false;
var primeravez1 = false;

var valorRecibido=0;
var valorRecibidoCheque=0;
var valorRecibidoTarjeta=0;
var valorCredito=0;
var valorRecibidoAnticipo=0;
var valorTransferencia = 0;


$('.body table#datatableFacturaInv tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    LimpiarCobrar();
    ConsultarAnticipo(id);
    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    var fila = $(this);
    correo.text(fila.find('td').eq(5).html());
    cedula.text(fila.find('td').eq(1).html());
    apellido.text(fila.find('td').eq(2).html() + ' ' + fila.find('td').eq(3).html() + ' ' + fila.find('td').eq(4).html());
    direccion.text(fila.find('td').eq(6).html());
    telefono.text(fila.find('td').eq(7).find('span').html());
    apellido.attr("fecha", fila.find('td').eq(7).find('span').attr('fecha_nacimiento'));
    $(".body div#DatosPaciente").css('visibility', 'visible');
    cerrar.trigger('click');
});

function LlenarTablaPacienteFactura() {
     tabla = $('#datatableFacturaInv').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "LlenarTablaPacienteFactura"
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6, 7],
            "orderable": false,
        },]
    });
    tabla.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableFacturaInv tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableFacturaInv_filter input').unbind();
    $('#datatableFacturaInv_filter input').remove();
    $('#datatableFacturaInv_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#apellidoPFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#apellidoMFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#nombreFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#cedulaFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla.column(2).search($('input#apellidoPFiltro').val()).draw();
            tabla.column(3).search($('input#apellidoMFiltro').val()).draw();
            tabla.column(4).search($('input#nombreFiltro').val()).draw();
            tabla.column(1).search($('input#cedulaFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableFacturaInv tbody tr td').eq(0).click();
        }
    });
}

$('#modal-buscar-paciente').on('shown.bs.modal', function() {
    $('input#apellidoPFiltro').focus();
    if (primeravez) {
        //LlenarTablaPacienteFactura();
        primeravez = false;
    }
});

tablaDetalle = $('#datatableDetalleFactFarmacia').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': false,
            scrollY: 400,
            scrollX: true,
            'columnDefs':[{
                "targets": [10],
                "visible": false
            }]
        });

tablaAnticipo = $('#datatableAnticipoFarmacia').DataTable({ 
            ordering: false,
            dom: '<"top">rt<"bottom">',
            scrollY: 100,
            //scrollX: true,
            paginate:false
        });

$('#modal-consultas').on('shown.bs.modal', function() {
    /*$('#datatableInventario').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': true,
            scrollY: 400,
            keys: true
    });*/
    if (primeravezInventario) {
        LlenarTablaInventarioFactura();
        primeravezInventario = false;
    }
});

$(".body").on('click', "strong#nombreCompleto", function(evt) {
    id = $(this).attr('idPaciente');
    if(id==0){
        $('button#GuardarModificarPaciente').prop('disabled', false);
        $('button#ModificarPaciente').prop('disabled', true);
    }else{
        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarPacientePorId",
                Id: id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            $('.body').find('input#CedulaModificarPaciente').val(respuesta[0][1]);
            $('.body').find('input#ApellidoPModificarPaciente').val(respuesta[0][2]);
            $('.body').find('input#ApellidoMModificarPaciente').val(respuesta[0][12]);
            $('.body').find('input#NombreModificarPaciente').val(respuesta[0][3]);
            $('.body').find('input#FechaModificarPaciente').val(respuesta[0][4]);
            $('.body').find('input#DireccionModificarPaciente').val(respuesta[0][5]);
            $('.body').find('select#CantonModificarPaciente').val(respuesta[0][6]);
            $('.body').find('input#TelefonoModificarPaciente').val(respuesta[0][8]);
            $('.body').find('input#CorreoModificarPaciente').val(respuesta[0][9]);
            if(respuesta[0][10]==" "){
                $('.body').find('select#EstadoCivilModificarPaciente').val('SOLTERO/A');
            }else{
                $('.body').find('select#EstadoCivilModificarPaciente').val(respuesta[0][10]);
            }
            $('.body').find('input#OcupacionModificarPaciente').val(respuesta[0][11]);
            var edad = calcularEdad(respuesta[0][4]);
            $('.body').find('input#EdadModificarPaciente').val(edad);
            $('.selectpicker').selectpicker('refresh');
            $('button#ModificarPaciente').prop('disabled', false);
            $('button#GuardarModificarPaciente').prop('disabled', true);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
    }
});

$(".body").on('click', "button#GuardarModificarPaciente", function(ev) {
    $(".body").on('submit', "form#ModificarPacienteFact", function(evt) {
        evt.preventDefault(); 
        var canton = $(this).find('select#CantonModificarPaciente').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var estadoCivil = $(this).find('select#EstadoCivilModificarPaciente').val();
        if (estadoCivil == 0) {
            swal("Esculapio!", "Debe seleccionar Estado Civil", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaModificarPaciente').val().trim();
        var nombre = $(this).find('input#NombreModificarPaciente').val().trim();
        var apellido = $(this).find('input#ApellidoPModificarPaciente').val().trim();
        var apellidom = $(this).find('input#ApellidoMModificarPaciente').val().trim();
        var direccion = $(this).find('input#DireccionModificarPaciente').val().trim();
        var fecha = $(this).find('input#FechaModificarPaciente').val().trim();
        var telefono = $(this).find('input#TelefonoModificarPaciente').val().trim();
        var correo = $(this).find('input#CorreoModificarPaciente').val().trim();
        var ocupacion = $(this).find('input#OcupacionModificarPaciente').val().trim();
        
        var limpiar = $(this).find('button#LimpiarDatosFact');
        
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if(confirma) {
                GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar);
            }else{
                limpiar.trigger('click');
            }
        });
    });
});

$(".body").on('change', "input#FechaModificarPaciente", function(ev) {
    var fecha = $(this).val();
    var edad = calcularEdad(fecha);
    $('.body').find('input#EdadModificarPaciente').val(edad);
});

function ConsultarAnticipo(idPaciente){
    $.ajax({
          method: "POST",
          url: "Ajax/Aj_Forma_pago.php",
          data: {
              Requerimiento: "ConsultarAnticipo",
              Id: idPaciente
          },
          dataType: 'JSON',
      }).done(function(respuesta) {
        try{
            tablaAnticipo.clear().draw();
        }catch(error){}
          var confirma = false;
          $.each(respuesta, function(i, value) {
              var input = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" idAnticipo='+respuesta[i][0]+' id="ValorQuitar"  placeholder="Valor">';
              var check = '<input type="checkbox" id="CobrarTodo">';
              var campos = [parseFloat(respuesta[i][1]).toFixed(2),respuesta[i][2],input,check];
              if(respuesta[i][1]!=0){
                tablaAnticipo.row.add(campos).draw(true);
              }
              confirma = true;
          });
          if(confirma==false){
            $('.body').find('div#DivAnticipo').fadeOut(1);
          }else{
            $('.body').find('div#DivAnticipo').fadeIn(1);
          }
      }).fail(function(jqXHR, textStatus, errorThrown) {
          swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
      });
}

function GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar) {
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
            Ocupacion: ocupacion
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            swal("Esculapio!", "Paciente Guardado.!", "success").then((confirma) => {
                $('.body').find('span#cedula').text(cedula);
                $('.body').find('strong#nombreCompleto').text(apellido+' '+apellidom+' '+nombre);
                $('.body').find('strong#nombreCompleto').attr('fecha',fecha);
                $('.body').find('strong#nombreCompleto').attr('idPaciente',fila[0][0]);
                $('.body').find('span#direccion').text(direccion);
                $('.body').find('span#telefono').text(telefono);
                $('.body').find('span#email').text(correo);
                var cerrar = $('.body').find('button.close');
                cerrar.click();
                limpiar.trigger('click');
            });
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar el Empleado!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body").on('click', "button#ModificarPaciente", function(ev) {
    $(".body").on('submit', "form#ModificarPacienteFact", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var canton = $(this).find('select#CantonModificarPaciente').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var estadoCivil = $(this).find('select#EstadoCivilModificarPaciente').val();
        if (estadoCivil == 0) {
            swal("Esculapio!", "Debe seleccionar Estado Civil", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaModificarPaciente').val().trim();
        var nombre = $(this).find('input#NombreModificarPaciente').val().trim();
        var apellido = $(this).find('input#ApellidoPModificarPaciente').val().trim();
        var apellidoM = $(this).find('input#ApellidoMModificarPaciente').val().trim();
        var direccion = $(this).find('input#DireccionModificarPaciente').val().trim();
        var fecha = $(this).find('input#FechaModificarPaciente').val().trim();
        var telefono = $(this).find('input#TelefonoModificarPaciente').val().trim();
        var correo = $(this).find('input#CorreoModificarPaciente').val().trim();
        var ocupacion = $(this).find('input#OcupacionModificarPaciente').val().trim();
        var limpiar = $(this).find('button#LimpiarDatosFact');
        
        ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar);
            
        });
    });

$(".body").on('click', "button#LimpiarDatosFact", function(ev) {
    $('.body').find('select#EstadoCivilModificarPaciente').val('0');
    $('.body').find('select#CantonModificarPaciente').val('0');
    $('.selectpicker').selectpicker('refresh');
});

function ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaPaciente",
            Cedula: cedula,
            Apellido: apellido,
            ApellidoM: apellidoM,
            Nombre: nombre,
            Direccion: direccion,
            Fecha: fecha,
            Canton: canton,
            Telefono: telefono,
            Correo: correo,
            EstadoCivil: estadoCivil,
            Ocupacion: ocupacion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            $('.body').find('span#cedula').text(cedula);
            $('.body').find('strong#nombreCompleto').text(apellido+' '+apellidoM+' '+nombre);
            $('.body').find('strong#nombreCompleto').attr('fecha',fecha);
            $('.body').find('span#direccion').text(direccion);
            $('.body').find('span#telefono').text(telefono);
            $('.body').find('span#email').text(correo);
            var cerrar = $('.body').find('button.close');
            limpiar.trigger('click')
            cerrar.trigger('click')
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar el Paciente!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$('.body div#radioBtn').on('click', 'a#NoCon', function(evt) {
    $(".body div#DatosCliente").css('visibility', 'visible');
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    $('.body').find('span#cedulaCliente').text(cedula.text());
    var valor = $('.body').find('span#cedulaCliente').text();
    var correcta = valor.substring(0,10);
    var valores = ConsultarClientePorCedula(correcta);
    if(valores[0]==false){
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', -1);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    }else{
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', valores[1]);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    }
    var idCliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    ConsultarAnticipo(idCliente);
});
$('.body div#radioBtn').on('click', 'a#SiCon', function(evt) {
    $('.body div#radioBtn a#Si').trigger('click');
    $(".body div#DatosCliente").css('visibility', 'hidden');
    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("----------------");
    $('.body').find('span#telefonoCliente').text("----------------");
    $('.body').find('span#emailCliente').text("-----------------");
});
$('.body div#radioBtn').on('click', 'a#Si', function(evt) {
    $(".body div#DatosCliente").css('visibility', 'visible');
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    $('.body').find('span#cedulaCliente').text(cedula.text());
    $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', apellido.attr('idPaciente'));
    $('.body').find('span#direccionCliente').text(direccion.text());
    $('.body').find('span#telefonoCliente').text(telefono.text());
    $('.body').find('span#emailCliente').text(correo.text());
});

function LlenarTablaClienteFactura() {
    tablaCliente = $('#datatableClienteFacturaInv').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [100, 200, 300],
            [100, 200, 300]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "columns": [{
                "width": "10%"
            },
            null, {
                "width": "20%"
            }, {
                "width": "30%"
            }, {
                "width": "30%"
            },
            null,
            null,
            null,
        ],
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "LlenarTablaClienteFactura"
            },
            type: "POST"
        },
        scrollY: 200,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6, 7],
            "orderable": false,
        }],
    });
    tablaCliente.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            //$('#datatableClienteFactura tbody tr').eq(datatable.row( cell.index().row ).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableClienteFacturaInv_filter input').unbind();
    $('#datatableClienteFacturaInv_filter input').remove();
    $('#datatableClienteFacturaInv_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#apellidoPClienteFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaCliente.column(2).search($('input#apellidoPClienteFiltro').val()).draw();
            tablaCliente.column(3).search($('input#apellidoMClienteFiltro').val()).draw();
            tablaCliente.column(4).search($('input#nombreClienteFiltro').val()).draw();
            tablaCliente.column(1).search($('input#cedulaClienteFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableClienteFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#apellidoMClienteFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaCliente.column(2).search($('input#apellidoPClienteFiltro').val()).draw();
            tablaCliente.column(3).search($('input#apellidoMClienteFiltro').val()).draw();
            tablaCliente.column(4).search($('input#nombreClienteFiltro').val()).draw();
            tablaCliente.column(1).search($('input#cedulaClienteFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableClienteFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#nombreClienteFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaCliente.column(2).search($('input#apellidoPClienteFiltro').val()).draw();
            tablaCliente.column(3).search($('input#apellidoMClienteFiltro').val()).draw();
            tablaCliente.column(4).search($('input#nombreClienteFiltro').val()).draw();
            tablaCliente.column(1).search($('input#cedulaClienteFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableClienteFacturaInv tbody tr td').eq(0).click();
        }
    });
    $('input#cedulaClienteFiltro').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaCliente.column(2).search($('input#apellidoPClienteFiltro').val()).draw();
            tablaCliente.column(3).search($('input#apellidoMClienteFiltro').val()).draw();
            tablaCliente.column(4).search($('input#nombreClienteFiltro').val()).draw();
            tablaCliente.column(1).search($('input#cedulaClienteFiltro').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableClienteFacturaInv tbody tr td').eq(0).click();
        }
    });
}

$('#modal-datos-cliente').on('shown.bs.modal', function() {
    if (primeravezCliente) {
        LlenarTablaClienteFactura();
        primeravezCliente = false;
    }
});

$('.body table#datatableClienteFacturaInv tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', id);
    var cedula = $('.body').find('span#cedulaCliente');
    var apellido = $('.body').find('strong#nombreCompletoCliente');
    var direccion = $('.body').find('span#direccionCliente');
    var telefono = $('.body').find('span#telefonoCliente');
    var correo = $('.body').find('span#emailCliente');
    var fila = $(this);
    correo.text(fila.find('td').eq(5).html());
    cedula.text(fila.find('td').eq(1).html());
    apellido.text(fila.find('td').eq(2).html() + ' ' + fila.find('td').eq(3).html() + ' ' + fila.find('td').eq(4).html());
    direccion.text(fila.find('td').eq(6).html());
    telefono.text(fila.find('td').eq(7).html());
    $(".body div#DatosPaciente").css('visibility', 'visible');
    cerrar.trigger('click');
});

$('.body table#datatableInventario tbody').on('dblclick', 'tr', function(evt) {
    
    var id = tablaInventario.row($(this)).data()[0];
    var nombreComercial = $(this).find('td').eq(0).html();
    var presentacion1 = $(this).find('td').eq(1).html();
    var presentacion2 = tablaInventario.row($(this)).data()[11];
    var costo1 = tablaInventario.row($(this)).data()[7];
       //var descuento1 = tablaInventario.row($(this)).data()[10];
       //var descuento2 = tablaInventario.row($(this)).data()[11];
    var pvp1 = tablaInventario.row($(this)).data()[8];
    var pvp2 = tablaInventario.row($(this)).data()[9];
    var iva = tablaInventario.row($(this)).data()[10];
    var valorCaja = tablaInventario.row($(this)).data()[12];
    var nivel1 = tablaInventario.row($(this)).data()[13];
    var nivel2 = tablaInventario.row($(this)).data()[14];
    var cantidad1 = tablaInventario.row($(this)).data()[15];
    var ff = tablaInventario.row($(this)).data()[16]
    var ee = tablaInventario.row($(this)).data()[17];
    if(cantidad1==0||ff==0){
        var fracciones = parseInt(ff);
    }else if(ff!=ee){
        var fracciones = parseInt(cantidad1)*parseInt(ee)+parseInt(ff);
    }
    else{
        var fracciones = parseInt(cantidad1)*parseInt(ee);
    }
    try{tablaInventario.cell.blur();}catch(error){}
    $('.body').find('input#ElegirCantidad').val('');
    $('.body').find('h4#NombreComercialPresentacion').text(nombreComercial);
    $('.body').find('label#IdDetalle').text(id);
    $('.body').find('label#NombreComercialDetalle').text(nombreComercial);
    $('.body').find('span#PresentacionDespacho1').text(presentacion1);
    $('.body').find('span#PresentacionDespacho2').text(presentacion2);
    $('.body').find('input#PresentacionDespacho3').val(presentacion1);
    $('.body').find('input#PresentacionDespacho4').val(presentacion2);
    $('.body').find('label#Costo1Detalle').text(costo1);
    $('.body').find('label#IvaDetalle').text(iva);
    $('.body').find('label#ValorCajaDetalle').text(valorCaja);
       //$('.body').find('label#Descuento1Detalle').text(descuento1);
       //$('.body').find('label#Descuento2Detalle').text(descuento2);
    $('.body').find('label#Pvp1Detalle').text(pvp1);
    $('.body').find('label#Pvp2Detalle').text(pvp2);
    $('.body').find('label#Stock1Detalle').text(fracciones);
    $('.body').find('label#Stock2Detalle').text(cantidad1);
    $('.body').find('label#Cantidad1').text(cantidad1);
    $('.body').find('label#Fracciones').text(fracciones);

    if(nivel1==1){
        $('.body').find('div#DespachoNivel1').fadeIn(1);
    }else{
        $('.body').find('div#DespachoNivel1').fadeOut(1);
    }

    if(nivel2==1){
        $('.body').find('div#DespachoNivel2').fadeIn(1);
    }else{
        $('.body').find('div#DespachoNivel2').fadeOut(1);
    }

    $('#modal-despacho').modal();

});

function LlenarTablaInventarioFactura() {
     tablaInventario = $('#datatableInventario').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaInvtarioFact"
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [1, 2, 3, 8, 9, 15, 16],
            "orderable": false,
        },
        {
            "targets": [0, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17],
            "visible": false,
            "searchable": false
        }]
    });
    tablaInventario.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            try{tablaInventario.cell.blur();}catch(error){}
            $('#datatableInventario tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableInventario_filter input').unbind();
    $('#datatableInventario_filter input').remove();
    $('#datatableInventario_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#nombreComercialF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });
    $('input#presentacionF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });
    $('input#principioF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });
}

function AgregarItensLaboratorio() {
    var id = $('.body').find('label#IdDetalle').text();
    var item = $('.body').find('label#NombreComercialDetalle').text();
    var presentacion = $('.body').find("input[name=PresentacionDespacho]:checked").val();
    var iva = $('.body').find('label#IvaDetalle').text();
    var cantidad1 = parseFloat($('.body').find('label#Cantidad1').text());
    var fracciones = parseFloat($('.body').find('label#Fracciones').text());
    var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
    if(cantidad1==0){
        cantidad1 = 1;
    }
    if(fracciones==0){
        fracciones = 1;
    }
    var precio = '0.00';
    var valorCantidad = parseFloat($('.body').find('input#ElegirCantidad').val());
    var cantidad = '';
    var nivel = '';
    var canFinal = parseInt($('.body').find('input#ElegirCantidad').val());
    if($('.body').find('input#PresentacionDespacho3').is(':checked')){
        precio = parseFloat($('.body').find('label#Pvp2Detalle').text());
        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
        if(valorCantidad>cantidad1){
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de "+cantidad1, "error").then((confirma) => {
                if (confirma) {
                    /*$('.body').find('input#ElegirCantidad').val('');
                    $('.body').find('input#ElegirCantidad').focus();
                    return;*/
                } 
            });
            return;
        }
        nivel = "Uno";
    }else{
        precio = parseFloat($('.body').find('label#Pvp1Detalle').text());
        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
        if(valorCantidad>fracciones){
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de "+fracciones, "error").then((confirma) => {
                if (confirma) {
                    /*$('.body').find('input#ElegirCantidad').val('');
                    $('.body').find('input#ElegirCantidad').focus();
                    return;*/
                } 
            });
            return;
        }
        nivel = "Dos";
    }
    var subtotal = valorCantidad * precio;
    var pvp = valorCantidad *( precio - (precio * (0 / 100)));//$('.body').find('label#Pvp1Detalle').text();
    var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
    var valorCaja = $('.body').find('label#ValorCajaDetalle').text();
    if (!ExisteIten(id, item, presentacion)) {
        var campos = [id, item, presentacion, '<input nivel="'+nivel+'" style="width:80px;" type="number" required step=".01" value="'+ canFinal +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">',precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho button.close").click();
        $(".body").find("div#modal-consultas button.close").click();
        guardarTemporal(id,nivel,canFinal,puntoSecuencia);
    }else{
        var final = canFinal+parseInt(cantidadAnterior);
        tablaDetalle.row(filaAnterior).remove().draw(false);
        var campos = [id, item, presentacion, '<input nivel="'+nivel+'" style="width:80px;" type="number" required step=".01" value="'+ final +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">',precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho button.close").click();
        $(".body").find("div#modal-consultas button.close").click();
        guardarTemporal(id,nivel,final,puntoSecuencia);
    }
    CalcularTotalConsulta();
}

function AgregarItensLaboratorioR(filaR) {
    var id = $('.body').find('label#IdDetalleR').text();
    var item = $('.body').find('label#NombreComercialDetalleR').text();
    var presentacion = $('.body').find("input[name=PresentacionDespachoR]:checked").val();
    var iva = $('.body').find('label#IvaDetalleR').text();
    var precio = '0.00';
    var valorCantidad = $('.body').find('input#ElegirCantidadR').val();
    var cantidad = '';
    var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
    var cantidad1 = parseFloat($('.body').find('label#Cantidad1R').text());
    var fracciones = parseFloat($('.body').find('label#FraccionesR').text());
    var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
    if(cantidad1==0){
        cantidad1 = 1;
    }
    if(fracciones==0){
        fracciones = 1;
    }
    var canFinal = parseInt($('.body').find('input#ElegirCantidadR').val());
    if($('.body').find('input#PresentacionDespacho3R').is(':checked')){
        precio = parseFloat($('.body').find('label#Pvp2DetalleR').text());
        cantidad = '<input style="width:80px;" type="number" required step=".01" value="'+ $('.body').find('input#ElegirCantidadR').val() +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">';
        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
        if(valorCantidad>cantidad1){
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de "+cantidad1, "error").then((confirma) => {
                if (confirma) {
                    /*$('.body').find('input#ElegirCantidadR').val('');
                    $('.body').find('input#ElegirCantidadR').focus();
                    return;*/
                } 
            });
            return;
        }
    }else{
        cantidad = '<input style="width:80px;" type="number" required step=".01" value="'+ $('.body').find('input#ElegirCantidadR').val() +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">';
        precio = parseFloat($('.body').find('label#Pvp1DetalleR').text());
        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
        if(valorCantidad>fracciones){
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de "+fracciones, "error").then((confirma) => {
                if (confirma) {
                    /*$('.body').find('input#ElegirCantidadR').val('');
                    $('.body').find('input#ElegirCantidadR').focus();
                    return;*/
                } 
            });
            return;
        }

    }
    var subtotal = valorCantidad * precio;
    var pvp = valorCantidad *( precio - (precio * (0 / 100)));//$('.body').find('label#Pvp1Detalle').text();
    var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
    var valorCaja = $('.body').find('label#ValorCajaDetalleR').text();
    if (ExisteItenR(id, item, presentacion)) {
        tablaDetalle.row(filaR).remove().draw(true);
        /*var campos = [id, item, presentacion, cantidad, precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho-remplazo button.close").click();*/
        if (!ExisteIten(id, item, presentacion)) {
            var campos = [id, item, presentacion, '<input nivel="Uno" style="width:80px;" type="number" required step=".01" value="'+ canFinal +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">',precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
            tablaDetalle.row.add(campos).draw(true);
            $(".body").find("div#modal-despacho-remplazo button.close").click();
            eliminarTemporal(id,"Uno",puntoSecuencia);
            guardarTemporal(id,"Uno",canFinal,puntoSecuencia);
        }else{
            var final = canFinal+parseInt(cantidadAnterior);
            tablaDetalle.row(filaAnterior).remove().draw(false);
            var campos = [id, item, presentacion, '<input nivel="Uno" style="width:80px;" type="number" required step=".01" value="'+ final +'" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">',precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
            tablaDetalle.row.add(campos).draw(true);
            $(".body").find("div#modal-despacho-remplazo button.close").click();
            eliminarTemporal(id,"Dos",puntoSecuencia);
            guardarTemporal(id,"Dos",final,puntoSecuencia);
        }
    }else{
        tablaDetalle.row(filaR).remove().draw(true);
        var campos = [id, item, presentacion, cantidad, precio.toFixed(2),subtotal.toFixed(2),iva , descuento,"$ " + pvp.toFixed(2) , boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho-remplazo button.close").click();
        /*eliminarTemporal(id,nivel);
        guardarTemporal(id,nivel,canFinal);*/
    }
    CalcularTotalConsulta();
}
var cantidadAnterior = 0;
var filaAnterior = '';
var cantidadAnteriorR = 0;
var filaAnteriorR = '';
function ExisteIten(idIten, item, itemp) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    $.each(vector, function(a) {
        var idf = $(this).find('td').eq(0).html();
        var itemf = $(this).find('td').eq(1).html();
        var itemP = $(this).find('td').eq(2).html();
        if (idf == idIten && itemf == item && itemP == itemp) {
            cantidadAnterior = $(this).find('td').eq(3).find('input').val();
            filaAnterior = $(this);
            confirma = true;
        }
    });
    return confirma;
}

function ExisteItenR(idIten, item, itemp) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    $.each(vector, function(a) {
        var idf = $(this).find('td').eq(0).html();
        var itemf = $(this).find('td').eq(1).html();
        var itemP = $(this).find('td').eq(2).html();
        if (idf == idIten && itemf == item && itemP == itemp) {
            confirma = true;
            cantidadAnterior = $(this).find('td').eq(3).find('input').val();
            filaAnterior = $(this);
        }
    });
    return confirma;
}

$(".body table#datatableDetalleFactFarmacia").on('keyup', "input#DescuentoDetalle", function(evt) {
    var descuento = $(this).val();
    var precio = $(this).parent().parent().find('td').eq(5).html();
    var total = precio - parseFloat(precio) * (descuento / 100);
    $(this).parent().parent().find('td').eq(8).html("$ " + total.toFixed(2));
    CalcularTotalConsulta();
});

$(".body table#datatableDetalleFactFarmacia").on('keyup', "input#CantidadDetalleFact", function(evt) {
    var cantidad = $(this).val();
    var precio = $(this).parent().parent().find('td').eq(4).html();
    var subtotal = parseFloat(precio) * cantidad;

    $(this).parent().parent().find('td').eq(5).html(parseFloat(subtotal).toFixed(2));

    var descuento = $('.body table#datatableDetalleFactFarmacia').find('input#DescuentoDetalle').val();
    var precio1 = $(this).parent().parent().find('td').eq(5).html();
    var total = precio1 - parseFloat(precio1) * (descuento / 100);
    $(this).parent().parent().find('td').eq(8).html("$ " + total.toFixed(2));
    CalcularTotalConsulta();
});


$(".body table#datatableDetalleFactFarmacia").on('click', "button#EliminarItemConsulta", function(evt) {
    var item = $(this).parent().parent().find('td').eq(1).html();
    var id = $(this).parent().parent().find('td').eq(0).html();
    var nivel = $(this).parent().parent().find('td').eq(3).find('input').attr('Nivel');
    var fila = $(this).parent().parent();
    var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaDetalle.row(fila).remove().draw(false);
            CalcularTotalConsulta();
            eliminarTemporal(id,nivel,puntoSecuencia);
        } else {
            
        }
    });

});

function CalcularTotalConsulta() {
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var totalcancelar = 0;

    var total = 0;
    var descuento = 0;

    var totalIva = 0;
    
    var fila = $('.body').find("#datatableDetalleFactFarmacia tbody tr").find("td").eq(0).html();

   
    
    if(fila=="No existen datos"){
            return;
    }
    $.each(vector, function(a) {
        
        totalcancelar += parseFloat($(this).find('td').eq(8).html().replace('$', ''));
        total += parseFloat($(this).find('td').eq(5).html());//.replace('$', ''));
        if($(this).find('td').eq(6).html()=="S"){
            totalIva += parseFloat($(this).find('td').eq(5).html())*0.12;
        }
    });

    if (totalcancelar > 0) {
        cobrar = true;
    } else {
        cobrar = false;
    }
    descuento = total-totalcancelar;   
    totalcancelar = totalcancelar+totalIva;
   
    $('span#totalCancelarIva').html('IVA : $ ' + totalIva.toFixed(2));
    $('span#totalCancelarSubtotal').html('SUBTOTAL : $ ' + total.toFixed(2));

    $('span#totalDescuentoConsulta').html('TOTAL DESCUENTO : $ ' + descuento.toFixed(2));
    $('span#totalCancelarConsulta').html('TOTAL A CANCELAR : $ ' + totalcancelar.toFixed(2));
    $('span#totalItemsConsulta').html('TOTAL DE ITEMS : ' + vector.length);
    $('span#totalPagarCobrar').html('$ ' + totalcancelar.toFixed(2));
    $('strong#totalFacturaEstimado').html('$ 0.0');

    if(totalcancelar>0){
        $('button#CobrarConsultaCobrar').prop('disabled',false);
        $('button#CobrarConsulta').prop('disabled',false);
    }else{
        $('button#CobrarConsultaCobrar').prop('disabled',true);
        $('button#CobrarConsulta').prop('disabled',true);
    }


    
}
var confirmaPago = false;
$(".body").on('keyup', "input#ValorRecibidoConsulta", function(evt) {
    
    var valorRecibido = $(this).val();
    var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$ ', ''));
    var cambio = valorRecibido - totalcancelar;
    if (totalcancelar <= valorRecibido) {
        confirmaPago = true;
        $('span#CambioConsulta').html('$ ' + cambio.toFixed(2));
    } else {
        confirmaPago = false;
    }
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

$(".body").on('keyup', "input#CodigoDeBarra", function(evt) {
    var codBarra = $(this).val();
    if (evt.keyCode == 13) {
        BuscarPorCodigoDeBarra(codBarra);
    }
});

function BuscarPorCodigoDeBarra(codBarra){
    $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "BuscarPorCodigo",
                CodBarra: codBarra
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            try{
                var cantidad1 = respuesta[0][16];
                var ff = respuesta[0][29];
                var ee = respuesta[0][17];
                if(cantidad1==0||ff==0){
                    var fracciones = parseInt(ff);
                }else if(ff!=ee){
                    var fracciones = parseInt(cantidad1)*parseInt(ee)+parseInt(ff);
                }
                else{
                    var fracciones = parseInt(cantidad1)*parseInt(ee);
                }
                $('.body').find('label#IdDetalle').text(respuesta[0][0]);
                $('.body').find('label#NombreComercialDetalle').text(respuesta[0][1]);
                $('.body').find('span#PresentacionDespacho1').text(respuesta[0][2]);
                $('.body').find('span#PresentacionDespacho2').text(respuesta[0][23]);
                $('.body').find('input#PresentacionDespacho3').val(respuesta[0][2]);
                $('.body').find('input#PresentacionDespacho4').val(respuesta[0][23]);
                $('.body').find('label#Costo1Detalle').text(respuesta[0][18]);
                $('.body').find('label#IvaDetalle').text(respuesta[0][24]);
                $('.body').find('label#Pvp1Detalle').text(respuesta[0][19]);
                $('.body').find('label#Pvp2Detalle').text(respuesta[0][20]);
                $('.body').find('label#Stock1Detalle').text(fracciones);
                $('.body').find('label#Stock2Detalle').text(cantidad1);
                $('.body').find('h4#NombreComercialPresentacion').text(respuesta[0][1]);
                $('.body').find('label#ValorCajaDetalle').text(respuesta[0][25]);
                $('.body').find('label#Cantidad1').text(respuesta[0][16]);
                $('.body').find('label#Fracciones').text(respuesta[0][29]);
                if(respuesta[0][27]==1){
                    $('.body').find('div#DespachoNivel1').fadeIn(1);
                }else{
                    $('.body').find('div#DespachoNivel1').fadeOut(1);
                }

                if(respuesta[0][28]==1){
                    $('.body').find('div#DespachoNivel2').fadeIn(1);
                }else{
                    $('.body').find('div#DespachoNivel2').fadeOut(1);
                }
                $('#modal-despacho').modal();
                $('.body').find('input#CodigoDeBarra').val('');
            }catch(error){
                swal("Esculapio!", "No existe producto con ese Codigo de Barra", "error").then((confirma) => {
                if (confirma) {
                    $('.body').find('input#CodigoDeBarra').val('');
                    $('.body').find('input#CodigoDeBarra').focus();
                    return;
                } 
            });
            }
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
}

$(".body").on('click', "button#CobrarConsultaCobrar", function(evt) {
    cerrarAlert = true;
    if (!cobrar) {
        swal("Esculapio!", "Ingrese Al menos un item para facturar..!!", "error");
        return;
    }
    if (!confirmaPago) {
        swal("Esculapio!", "Ingrese El Pago Por Favor..!!", "error");
        return;
    }
    var banco = $("select#banco").val();
    var numero = $("#NumeroCheque").val().trim();
    var cuenta = $("#CuentaCheque").val().trim();
    if(valorRecibidoCheque>0){
        if(banco==0 || banco === undefined){
            swal("Esculapio!", "Seleecione La Entidad Bancaria a la que pertenece el cheque. ", "warning");
            return;
        }

        if(numero=="" || numero === undefined){
            swal("Esculapio!", "Falta el numero de cheque. ", "warning");
            return;
        }

        if(cuenta=="" || cuenta === undefined){
            swal("Esculapio!", "Falta el numero de cuenta ", "warning");
            return;
        }
    }

    var cedula = $('.body').find('span#cedulaCliente').text();
    var correcta = cedula.substring(0,10);

    var entidad = $("#EntidadTarjeta").val().trim();
    var numerotarjeta = $("#NumeroReferencia").val().trim();
    var recargo = $("#RecargoTarjeta").val().trim();

    if(valorRecibidoTarjeta>0){
        
        if(entidad==0 || entidad === undefined){
            swal("Esculapio!", "Falta la entidad de la tarjeta. ", "warning");
            return;
        }

        if(numerotarjeta=="" || numerotarjeta === undefined){
            swal("Esculapio!", "Falta el numero de tarjeta ", "warning");
            return;
        }
        if(recargo=="" || recargo === undefined){
            swal("Esculapio!", "Falta el recargo de la tarjeta ", "warning");
            return;
        }
    }

    var periodo = $("#cbmPeriodoOdont").val();
    var dividendo =$("#Pagos").val();
    var fila1 = $('.body').find("#datatablePagos tbody tr").find('td').eq(0).html();
    if(valorCredito>0){
        
        if(periodo==0 || periodo === undefined){
            swal("Esculapio!", "Seleccione el periodo de pagos. ", "warning");
            return;
        }

        if(dividendo=="" || dividendo === undefined){
            swal("Esculapio!", "Ingrese los dividendos ", "warning");
            return;
        }
        if(fila1=="No existen datos"){
            swal("Esculapio!", "Presione enter luego de poner los dividendos para generar la tabla de pagos ", "warning");
            return;
        }
    }

    var bancoTrans = $("select#bancoTrans").val();
     var AgenciaTrans = $("input#AgenciaTrans").val();

     if(valorTransferencia>0){
        if(bancoTrans==0 || bancoTrans === undefined){
            swal("Esculapio!", "Seleecione La Entidad Bancaria en el que se hizo la transfenrencia. ", "warning");
            return;
        }

        if(AgenciaTrans=="" || AgenciaTrans === undefined){
            swal("Esculapio!", "Ingrese la Agencia. ", "warning");
            return;
        }

        
    }

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Efectuar esta Factura ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var valores = ConsultarClientePorCedula(correcta);
            if(valores[0]==false){
                var ruc = $('.body').find('span#cedulaCliente').text();
                var nombre = $('.body').find('strong#nombreCompletoCliente').text();
                var apellido = '';
                var prueba = nombre.split(" ");
                if(prueba.length == 4){
                    nombre = prueba[2] + " " + prueba[3];
                    apellido = prueba[0] + " " + prueba[1];
                }
                if(prueba.length == 3){
                    nombre = prueba[2];
                    apellido = prueba[0] + " " + prueba[1];
                }
                if(prueba.length == 2){
                    nombre = prueba[1];
                    apellido = prueba[0];
                }
                if(prueba.length > 4){
                    nombre = prueba[2] + " " + prueba[3];
                    apellido = prueba[0] + " " + prueba[1];
                }
                
                var direccion = $('.body').find('span#direccionCliente').text();
                var correo = $('.body').find('span#emailCliente').text();
                var telefono = $('.body').find('span#telefonoCliente').text();
                var id =  $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
                if(id < 0){
                    GuardarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo, 'sdfaasd');
                }
            }
            GuardarFacturaInventario();
        } else {}
    });
});

$(".body").on('click', "button#AgregarProductos", function(evt) {
    AgregarItensLaboratorio();
});

function guardarTemporal(idInventario,nivel,cantidad,puntoSecuencia){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarTemporal",
            Inventario: idInventario,
            Nivel: nivel,
            Cantidad: cantidad,
            PuntoEmision: puntoSecuencia
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "ffff..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function eliminarTemporal(idInventario,nivel,puntoSecuencia){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminarTemporal",
            Inventario: idInventario,
            Nivel: nivel,
            PuntoEmision: puntoSecuencia
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
    }).fail(function(jqXHR, textStatus, errorThrown) {
        //swal("Esculapio!", "ffff..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body").on('click', "button#AgregarProductosR", function(evt) {
    AgregarItensLaboratorioR(filaR);
});

$('#modal-cobrar').on('shown.bs.modal', function() {
    $('input#ValorRecibidoConsulta').focus();
});

$('#modal-despacho').on('shown.bs.modal', function() {
    try{tablaDetalle.cell.blur();}catch(error){}
    try{$('input#CodigoDeBarra').blur();}catch(error){}
    $('input#ElegirCantidad').focus();
});

$('#modal-despacho-remplazo').on('shown.bs.modal', function() {
    tablaDetalle.cell.blur();
    $('input#ElegirCantidadR').focus();
});

$(".body").on('keyup', "input#ElegirCantidad", function(ev) {
    
      if(ev.keyCode==13){
        if($(this).val()<1){
          swal("Esculapio!", "Ingrese La Cantidad", "warning");
          return;
        }else{
          $('button#AgregarProductos').click();
        }
      }
      

  });

$(".body").on('keyup', "input#ElegirCantidadR", function(ev) {
    
      if(ev.keyCode==13){
        if($(this).val()<1){
          swal("Esculapio!", "Ingrese La Cantidad", "warning");
          return;
        }else{
          $('button#AgregarProductosR').click();
        }
      }
  });

var idClienteNuevo = '';

function GuardarFacturaInventario() {
    var puntoVenta = $('input#puntoVenta').val();
    var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var numero = $('strong#SecuenciaFacturaConsulta').attr('secuencia');
    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    if (paciente == '' || paciente == null) {
        swal("Esculapio!", "Seleecione un Paciente. ", "error");
        return;
    }
    if(idClienteNuevo==undefined || idClienteNuevo==''){
        var cliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    }else{
        var cliente = idClienteNuevo;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarInventarioFactura",
            Punto: puntoVenta,
            Paciente: paciente,
            Cliente: cliente,
            Numero: numero,
            Total: total,
            Iva:iva,
            Descuento:descuento
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            ActualizaSecuenciaInventario(secuencia, puntoVenta);
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            GuardarDetalleInventario(fila[0][0], fila[0][5], fila[0][2], edad);
            GuardarPagosFarmacia(fila[0][0],valorRecibido,valorRecibidoCheque,valorRecibidoTarjeta,valorCredito,valorRecibidoAnticipo,valorTransferencia);
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar La Factura. " + respuesta[1], "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

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

/*function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    if(m<=0){
        return edad+" Años";
    }else{
        return edad+" Años "+m+" Meses";    
    }
    
}*/

function destruirTablaTemporal(id,nivel,puntoSecuencia){
    $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "DestruirTemporal",
                Inventario: id,
                Nivel: nivel,
                PuntoEmision: puntoSecuencia
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar el Item !" + item, "error");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
}

function GuardarDetalleInventario(idConsulta, emision, hc, edad) {
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var numero = $('strong#SecuenciaFacturaConsulta').attr('secuencia');
    var productos =[];
    var valorCaja = 0;

    $.each(vector, function(a) {
        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html();
        var presentacion = $(this).find('td').eq(2).html();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var descuento = $(this).find('td').eq(7).find('input').val();
        var subtotal = $(this).find('td').eq(8).html().replace('$', '');
        valorCaja += parseFloat(tablaDetalle.row($('tr')).data()[10]).toFixed(2);
        var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        var iva = $(this).find('td').eq(6).html();
        var lineaDetalle = [item,presentacion,cantidad,precio,descuento,subtotal,id,iva];
        productos[a]=lineaDetalle;
        //alert(item+"-"+procedimiento+"-"+laboratorio+"-"+empleado+"-"+fecha+"-"+precio+"-"+descuento+"-"+subtotal+"-"+turno);
        destruirTablaTemporal(id,nivel,puntoSecuencia);
        $.ajax({
           // async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "GuardarConsultaDetalle",
                Inventario: id,
                Consulta: idConsulta,
                Presentacion: presentacion,
                Cantidad: cantidad,
                Precio: precio,
                Descuento: descuento,
                Subtotal: subtotal
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar el Item !" + item, "error");
            }
            DisminuirKardex(id,cantidad,precio,numero);
            /*if(nivel=='Uno'){
                DisminuirStockFarmacia(id,cantidad);
            }else{
                DisminuirStockFarmaciaFraccion(id,cantidad);
            }*/
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
    });
    $('button.close').click();
    CrearXML(numero,JSON.stringify(productos),valorCaja,idConsulta);
    swal({
        title: "Esculapio",
        text: "Factura Guardada..!, Desea Imprimir?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ImprimirTicKetInventario(numero,JSON.stringify(productos), valorCaja);
            LimpiarFarmacia();
        } else {
            LimpiarFarmacia();
        }
    });

    cobrar = false;   
}

function DisminuirStockFarmacia(idItem,cantidad){

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "DisminuirStockFarmacia",
                Inventario: idItem,
                Cantidad: cantidad
                
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                //swal("Esculapio!",respuesta[1], "error");
                var errores =respuesta[1]+"\n";
            }
            //console.log(respuesta);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

}

function DisminuirKardex(idItem,cantidad,precio,numero){

    $.ajax({
            //async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "EgresoKardex",
                Inventario: idItem,
                Cantidad: cantidad,
                Precio:precio,
                Numero: numero
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                //swal("Esculapio!",respuesta[1], "error");
                //errores+=respuesta[1]+"\n";
            }
            //console.log(respuesta);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
}

function DisminuirStockFarmaciaFraccion(idItem,cantidad){

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "DisminuirStockFarmaciaFraccion",
                Inventario: idItem,
                Cantidad: cantidad
                
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                //swal("Esculapio!",respuesta[1], "error");
                var errores =respuesta[1]+"\n";
            }
            //console.log(respuesta);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

}

function ActualizaSecuenciaInventario(secuencia, puntoVenta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ActualizaSecuencia",
            Secuencia: secuencia,
            Id: puntoVenta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Actualizar la secuencia !", "error");
            return;
        }
        var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
        $('input#secuenciaPunto').val(secuencia);
        var establecimiento = $('input#establecimiento').val();
        var puntoemision = $('input#puntoEmision').val();
        $('strong#SecuenciaFacturaConsulta').attr('secuencia', establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 7));
        $('strong#SecuenciaFacturaConsulta').html('FACTURA #: ' + establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 7));
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}



function ImprimirTicKetInventario(numero,productos,valorCaja) {
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');

    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ImprimirInventario",
            //Consulta: idConsulta,
            Numero: numero,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item:$('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Iva:iva,
            Productos:productos,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", ""),
            Ahorro: parseFloat(valorCaja-$('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", "")).toFixed(2)
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CrearXML(numero,productos,valorCaja,idConsulta) {
    
    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_Xml.php",
        data: {
            Requerimiento: "CrearXMLFarmacia",
            Consulta: idConsulta,
            Numero: numero,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item:$('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarSubtotal').html().replace("SUBTOTAL : $ ", ""),
            Productos:productos,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", ""),
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {/*EnviarXmlSri(respuesta,idConsulta);*/ console.log(respuesta); }).fail(function(jqXHR, textStatus, errorThrown) {       
        console.log(errorThrown);
        //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


$(".body").on('click', "button#AgregarCliente", function(ev) {
    ev.preventDefault()
    var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    if (idPaciente == 0) {
        swal("Esculapio!", "Debe seleccionar un Paciente", "error");
        return;
    }
    var ruc = $('.body').find('input#cedulaCliente').val().trim();
    var nombre = $('.body').find('input#nombreCliente').val().trim();
    var apellido = $('.body').find('input#apellidoCliente').val().trim();
    var direccion = $('.body').find('input#direccionCliente').val().trim();
    var correo = $('.body').find('input#emailCliente').val().trim();
    var telefono = $('.body').find('input#telefonoCliente').val().trim();
    swal({
            title: "Esculapio",
            text: "Seguro Que Desea Agregar a este Cliente?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                 GuardarClientePaciente(idPaciente, ruc, nombre, apellido, direccion, telefono, correo);
                 var cerrar = $('.body').find('button.close');
                cerrar.trigger('click');
            } else {
                
            }
        });
   
});

function GuardarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo, cobrar) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "GuardaClientePaciente",
            Ruc: ruc,
            Apellido: apellido,
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            if(cobrar == 'prueba'){
                var cedula1 = $('.body').find('span#cedulaCliente');
                var apellido1 = $('.body').find('strong#nombreCompletoCliente');
                var direccion1 = $('.body').find('span#direccionCliente');
                var telefono1 = $('.body').find('span#telefonoCliente');
                var correo1 = $('.body').find('span#emailCliente');
                var fila = JSON.parse(respuesta[1]);
                cedula1.html(ruc);
                apellido1.html(apellido + ' ' + nombre);
                apellido1.attr('idCliente', fila[0][0]);
                direccion1.html(direccion);
                telefono1.html(telefono);
                correo1.html(correo);
                
                return;
            }else{
                var fila = JSON.parse(respuesta[1]);
                idClienteNuevo = fila[0][0];
                return;
            }
            
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardgggar el Empleado!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$('#modal-consultas').on('shown.bs.modal', function() {
    tablaInventario.column(1).search('').draw();
    $('input#nombreComercialF').focus();
});

$(document).ready(function() {
    if (parametroURL('pagina') == 'farmacia') {
        $(document).keydown(function(tecla) {
            if (121 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#CobrarConsulta').click();
            }
            if (112 == tecla.keyCode) {
                tecla.preventDefault();
                $('a#BuscarPaciente').click();
            }
            if (113 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#consultasFactura').click();
            }
            //alert(tecla.keyCode);
        });
    }
});

var filaR = '';

/*$('.body table#datatableDetalleFactFarmacia tbody').on('dblclick', 'tr', function(evt) {
    var id = $(this).find('td').eq(0).html();
    var cantidad = $(this).find('td').eq(3).find('input').val();
    $('.body').find('input#ElegirCantidadR').val(cantidad);
    filaR = $(this);
    BuscarPorId(id);
    $('button#CobrarConsulta').attr("disabled",false);
});*/

function BuscarPorId(id){
    $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "BuscarPorId",
                Id: id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            try{
                var cantidad1 = respuesta[0][16];
                var ff = respuesta[0][29];
                var ee = respuesta[0][17];
                if(cantidad1==0||ff==0){
                    var fracciones = parseInt(ff);
                }else if(ff!=ee){
                    var fracciones = parseInt(cantidad1)*parseInt(ee)+parseInt(ff);
                }
                else{
                    var fracciones = parseInt(cantidad1)*parseInt(ee);
                }
                $('.body').find('label#IdDetalleR').text(respuesta[0][0]);
                $('.body').find('label#NombreComercialDetalleR').text(respuesta[0][1]);
                $('.body').find('span#PresentacionDespacho1R').text(respuesta[0][2]);
                $('.body').find('span#PresentacionDespacho2R').text(respuesta[0][23]);
                $('.body').find('input#PresentacionDespacho3R').val(respuesta[0][2]);
                $('.body').find('input#PresentacionDespacho4R').val(respuesta[0][23]);
                $('.body').find('label#Costo1DetalleR').text(respuesta[0][18]);
                $('.body').find('label#IvaDetalleR').text(respuesta[0][24]);
                $('.body').find('label#Pvp1DetalleR').text(respuesta[0][19]);
                $('.body').find('label#Pvp2DetalleR').text(respuesta[0][20]);
                $('.body').find('label#Stock1DetalleR').text(fracciones);
                $('.body').find('label#Stock2DetalleR').text(cantidad1);
                $('.body').find('h4#NombreComercialPresentacionR').text(respuesta[0][1]);
                $('.body').find('label#ValorCajaDetalleR').text(respuesta[0][25]);
                $('.body').find('label#Cantidad1R').text(cantidad1);
                $('.body').find('label#FraccionesR').text(fracciones);
                if(respuesta[0][27]==1){
                    $('.body').find('div#DespachoRemplazoNivel1').fadeIn(1);
                }else{
                    $('.body').find('div#DespachoRemplazoNivel1').fadeOut(1);
                }

                if(respuesta[0][28]==1){
                    $('.body').find('div#DespachoRemplazoNivel2').fadeIn(1);
                }else{
                    $('.body').find('div#DespachoRemplazoNivel2').fadeOut(1);
                }
                $('#modal-despacho-remplazo').modal();
            }catch(error){
                swal("Esculapio!", "No existe producto con ese Codigo de Barra", "error").then((confirma) => {
                if (confirma) {
                    return;
                } 
            });
        }    
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
}

var primeravez1 = false;
var tabla1 = null;

$('#modal-consulta-factura-farmacia').on('shown.bs.modal', function() {
    if (!primeravez1) {
        LlenarTablaFacturasFarmacia();
        primeravez1 = true;
    }
});

function LlenarTablaFacturasFarmacia() {
     tabla1 = $('#datatableConsultaFacturaFarmacia').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaFacturasFarmacia"
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }]
    });
    tabla1.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFacturaFarmacia tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFacturaFarmacia_filter input').unbind();
    $('#datatableConsultaFacturaFarmacia_filter input').remove();
    $('#datatableConsultaFacturaFarmacia_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
}

function LlenarTablaFacturasConFechasFarmacia(fechaDesde,fechaHasta) {
     tabla1 = $('#datatableConsultaFacturaFarmacia').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasFarmacia",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }]
    });
    tabla1.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFacturaFarmacia tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFacturaFarmacia_filter input').unbind();
    $('#datatableConsultaFacturaFarmacia_filter input').remove();
    $('#datatableConsultaFacturaFarmacia_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
}

$(".body").on('click', "button#BuscarFacturaFarmacia", function(ev) {
    try{
        tabla1.destroy();
    }catch(error){}
    var fechaDesde = $('input#fechaDesdeF').val();
    var fechaHasta = $('input#fechaHastaF').val();;
    LlenarTablaFacturasConFechasFarmacia(fechaDesde,fechaHasta);
});


$(".body").on('change', "input#CantidadDetalleFact", function(ev) {
    var id = $(this).parent().parent().find('td').eq(0).html();
    var nivel = $(this).attr('nivel');
    var stock = 0;
    var cantidad = parseInt($(this).val());
    var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
    $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "BuscarPorIdStock",
                Id: id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }    
            if(nivel=='Uno'){
                stock = parseInt(respuesta[0][0]);
            }else{
                stock = parseInt(respuesta[0][0])*parseInt(respuesta[0][1])+parseInt(respuesta[0][2]);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
    if(cantidad>stock){
        swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de "+stock, "error").then((confirma) => {
            if (confirma) {
                $(this).val('');
                $(this).focus();
                eliminarTemporal(id,nivel,puntoSecuencia);
                return;
            } 
        });
    }else{
        eliminarTemporal(id,nivel,puntoSecuencia);
        guardarTemporal(id,nivel,cantidad,puntoSecuencia);
    }
});

function CargarFacturaConsultaFarmacia(numero){
    
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "CargarFacturaConsultaFarmacia",
            Numero:numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
                 confirma = false;
                 try{tablaDetalle.clear().draw();}catch(error){}
                ConsultarDetalleConsultaFarmacia(value[0]);             
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
                $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
                $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));

                if(value[10]==1){
                        $('.body').find('span#cedulaCliente').text("9999999999");
                        $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
                        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
                        $('.body').find('span#direccionCliente').text("----------------");
                        $('.body').find('span#telefonoCliente').text("----------------");
                        $('.body').find('span#emailCliente').text("-----------------");
                }
                if(value[10]>1){

                    CargarClientePorIdConsulta(value[10]);  
                            
                }
                if(value[11]=="S"){
                    $(".body div#DatosPaciente").css('visibility', 'visible');
                    $("a#NoCon").click();
                }
        });

        if(confirma){
                //LimpiarConsulta();
                swal("Esculapio!", "No Existe La Factura.", "warning");
        }else{
            $('button#CobrarConsulta').fadeOut(0);
            $('button#ReimprimirFarmacia').fadeIn(0);
        }
    });
}
 


function CargarClientePorIdConsulta(id){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargarClientePorIdConsulta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }  
        $('.body').find('span#cedulaCliente').text(respuesta[0][1]);
        $('.body').find('strong#nombreCompletoCliente').text(respuesta[0][2]+" "+respuesta[0][3]);
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente',respuesta[0][0] );
        $('.body').find('span#direccionCliente').text(respuesta[0][4]);
        $('.body').find('span#telefonoCliente').text(respuesta[0][5]);
        $('.body').find('span#emailCliente').text(respuesta[0][6]);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function ConsultarDetalleConsultaFarmacia(idFarmacia){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ConsultarDetalleConsultaFarmacia",
            Farmacia:idFarmacia
        },
            dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        console.log(respuesta)

    $.each(respuesta, function(i, value) {

        var id = '';
        var item = '';
        var presentacion = '';
        var cantidad = 0;
        var precio = 0;
        var subtotal = 0;
        var iva = 0;
        var descuento = 0;
        var total = 0;
        var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

        presentacion = value[3]
        cantidad = value[4];
        precio = value[5];
        subtotal = value[6];
        iva = value[8];
        
        item = value[9];

        if(value[10]==value[3]){            
            nivel='Uno';
        }else{
            nivel='Dos';            
        }

        cantidad = '<input disabled nivel="'+nivel+'" style="width:80px;" type="number" required step=".01" value="'+ value[4] +'" class="form-control" id="CantidadDetalleFact" >'
        descuento = '<input disabled style="width:80px;" type="number" required step=".01" value="'+value[7]+'" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';

        total = parseFloat(subtotal);

        
        id=value[2];
        

        var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2),parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(total).toFixed(2), boton, ""];
        tablaDetalle.row.add(campos).draw(true);
    });

CalcularTotalConsulta();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }


$('.body table#datatableConsultaFacturaFarmacia tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    var numero = $(this).find('td').eq(0).html();
    CargarFacturaConsultaFarmacia(numero);
    cerrar.click();
    //$(this).find('td').focus();
});

$(".body").on('click', "div#limpiarFactFarmacia", function(evt) {

    swal({
        title: "Esculapio",
        text: "Seguro que desa Limpiar..?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {            
            LimpiarFarmacia();
        }
    });
});

function Limpiar() {
    try {
        tablaDetalle.clear().draw();
    } catch (error) {}

    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("------");
    $('.body').find('span#telefonoCliente').text("------");
    $('.body').find('span#emailCliente').text("------");
    $('.body').find('span#cedula').text("------");
    $('.body').find('strong#nombreCompleto').text("------");
    $('.body').find('strong#nombreCompleto').attr('idCliente', '');
    $('.body').find('span#direccion').text("------");
    $('.body').find('span#telefono').text("------");
    $('.body').find('span#email').text("------");
    $('.body').find('span#totalItemsConsulta').text("TOTAL DE ITEMS : 0");
    $('.body').find('span#totalCancelarConsulta').text("TOTAL A CANCELAR : $ 00.00");
    $('input#ValorRecibidoConsulta').val('');
    $('.body').find('span#totalPagarCobrar').text("$ 00.00");
    $('.body').find('span#CambioConsulta').text("$ 00.00");
    $('.body').find('strong#nombreCompleto').attr('idPaciente', '');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');
    $('input#cedulaFiltro').val('');
    $('input#CodigoDeBarra').val('');
    $('.body').find('div#DatosPaciente').fadeOut(1);
    $('.body').find('div#DatosCliente').fadeOut(1);


}



function LimpiarFarmacia() {
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");

    $.each(vector, function(a) {
        var id = $(this).find('td').eq(0).html();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();
        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        eliminarTemporal(id,nivel,puntoSecuencia);
    });
    
    try{
        //tabla.destroy();
    }catch(error){}
    try {
        tablaDetalle.clear().draw();
    } catch (error) {}
    
    LimpiarCobrar();
    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("----------------");
    $('.body').find('span#telefonoCliente').text("----------------");
    $('.body').find('span#emailCliente').text("-----------------");
    $('.body').find('span#cedula').text("-------------");
    $('.body').find('strong#nombreCompleto').text("----------");
    $('.body').find('strong#nombreCompleto').attr('idCliente', '');
    $('.body').find('span#direccion').text("----------------");
    $('.body').find('span#telefono').text("----------------");
    $('.body').find('span#email').text("-----------------");
    $('.body').find('span#totalItemsConsulta').text("TOTAL DE ITEMS : 0");
    $('.body').find('span#totalCancelarConsulta').text("TOTAL A CANCELAR : $ 00.00");
    $('input#ValorRecibidoConsulta').val('');
    $('.body').find('span#totalPagarCobrar').text("$ 00.00");
    $('.body').find('span#CambioConsulta').text("$ 00.00");
    $('.body').find('strong#nombreCompleto').attr('idPaciente', '');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');
    $('input#cedulaFiltro').val('');
    $('input#CodigoDeBarra').val('');
    $('strong#SecuenciaFacturaConsulta').html('FACTURA #: '+$('strong#SecuenciaFacturaConsulta').attr('secuencia'));

    try {
        tabla.column(2).search('').draw();
        tabla.column(3).search('').draw();
        tabla.column(4).search('').draw();
        tabla.column(1).search('').draw();
    } catch (error) {}

    valorRecibido=0;
    valorRecibidoCheque=0;
    valorRecibidoTarjeta=0;
    valorCredito=0;
    valorRecibidoAnticipo=0;
    valorTransferencia=0;

    totalcobrado=0;
    totalcobrado2=0;
    totalcobrado3=0;
    totalcobrado4=0;
    totalcobrado5=0;
    totalcobrado6=0;
    ConsultaCargada = 0;
    medicoModificar="";
    $('i.cheque').parent().fadeIn(200);
    $('i.tarjeta').parent().fadeIn(200);
    $('i.credito').parent().fadeIn(200);
    $('i.transfenrencia').parent().fadeIn(200);
    $('div.efectivo').fadeIn(200);
    $('button#CobrarConsulta').fadeIn(0);
    $('button#ReimprimirConsulta').fadeOut(0);
    $('button#ModificarFact').fadeOut(0);

   
    $('button#CobrarConsulta').attr("disabled",false);
    $('button#AnularConsulta').attr("disabled",true);

    $('button#CobrarConsultaCobrar').prop('disabled',true);
    $(".body div#DatosPaciente").css('visibility', 'hidden');
    $("a#SiCon").click();
}



$(".body").on('keyup', "input.filtroPacientesInv", function(ev) {
    if(ev.keyCode==13){
        Cargar($('#cedulaFiltro').val().trim(),$('#apellidoPFiltro').val().trim(),$('#apellidoMFiltro').val().trim(),$('#nombreFiltro').val().trim());    
    }
    

});

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

$(".body").on('click', "button#CobrarConsulta", function(evt) {
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    if(parseFloat($('#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $ ',''))>199){
        if($('strong#nombreCompletoCliente').attr('idCliente')=='1'){
            swal("Esculapio!", "Factura mayor a partir de $200. No puede ser CONSUMIDOR FINAL \n Ingresar datos del cliente. ", "error");
            return;
        }
        
    }
    if (paciente == '' || paciente == null || paciente==0) {
        swal("Esculapio!", "Seleecione un Paciente. ", "error");
        return;
    }

    var cedula = $('.body').find('span#cedulaCliente').text();
    validacion(cedula);

    if($('strong#nombreCompletoCliente').attr('idCliente')=='1' && $('strong#nombreCompletoCliente').html()=="CONSUMIDOR FINAL"){
        $('span#totalCredito').parent().fadeOut(0);
    }else{
        $('span#totalCredito').parent().fadeIn(0);
    }
});

function Cargar(cedula,apellido1,apellido2,nombres){

      $.ajax({
          method: "POST",
          url: "Ajax/Aj_Paciente.php",
          data: {
              Requerimiento: "Cargar",            
              Cedula:cedula,
              ApellidoP:apellido1,
              ApellidoM:apellido2,
              Nombres:nombres
          },
          dataType: 'JSON',
      }).done(function(respuesta) {
          if (respuesta[0] == false) {
              swal("Esculapio!", "Error Problema!", "error");
              return;
          } 
          $("#datatableFacturaInv tbody").empty();
          try{
              
              $.each(respuesta, function(i, value) {
                  var elemento = ' <tr>'
                                    +'<td>'+value[0]+'</td>'
                                    +'<td>'+value[1]+'</td>'
                                    +'<td>'+value[2]+'</td>'
                                    +'<td>'+value[3]+'</td>'
                                    +'<td>'+value[4]+'</td>'
                                    +'<td>'+value[5]+'</td>'
                                    +'<td style="display:none;">'+value[6]+'</td>'
                                    +'<td><span fecha_nacimiento="'+value[8]+'">'+value[7]+'</span></td>'
                                  +'</tr> ';
                  $("#datatableFacturaInv tbody").append(elemento);
              });
          }catch(error){
              
          }
          //alert(respuesta[0][1]);
          
      }).fail(function(jqXHR, textStatus, errorThrown) {
          swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
      });
    }

function ConsultarClientePorCedula(cedula){
    var valores = [];
    var bandera = false;
    valores[0] = bandera;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ConsultarClientePorCedula",            
            Cedula: cedula
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar La Factura. ","error");
            // location.reload();
            return;
        }

        $.each(respuesta, function(i, value) {
            bandera = true
            valores[0] = bandera;
            valores[1] = respuesta[i][0];
        });
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
    return valores;
}

function validacion(cedula){
    var correcta = cedula.substring(0,10);
    if(ValidarCedula(correcta)==true || correcta == '9999999999'){
        $('div#modal-cobrar').modal();
    }else{
        swal("Esculapio!", "La cédula del cliente no es correcta, modifique la cédula por favor", "error").then((confirma) => {
            $('.body div#radioBtn a#Si').trigger('click');
            $(".body div#DatosCliente").css('visibility', 'hidden');
            $('.body').find('span#cedulaCliente').text("9999999999");
            $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
            $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
            $('.body').find('span#direccionCliente').text("----------------");
            $('.body').find('span#telefonoCliente').text("----------------");
            $('.body').find('span#emailCliente').text("-----------------");
        });
    }
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
$('#modal-consulta-receta').on('shown.bs.modal', function() {
    if (!primeravez1) {
        CargarReceta();
        primeravez1 = true;
    }
    $('#BuscarRec').click();
});

function CargarReceta() {
    
    tablaRecetas = $('#datatableConsultaReceta').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarReceta",
                FechaDesde: $("#fechaDesdeFReceta").val(),
                FechaHasta: $("#fechaHastaFReceta").val(),
            },
            type: "POST"
        },
        scrollY: 400,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2,3],
            "orderable": false,
        }]
    });
    tablaRecetas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaReceta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaReceta_filter input').unbind();
    $('#datatableConsultaReceta_filter input').remove();
    $('#datatableConsultaReceta_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroFReceta').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();
            
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteFReceta').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();
            
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });
    $('input#clienteFReceta').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();
            
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });    
}


$(".body").on('click', "button#BuscarRec", function(ev) {
    try{
        tablaRecetas.destroy();
    }catch(error){}
    
    CargarReceta();
});


$('.body table#datatableConsultaReceta tbody').on('dblclick', 'tr', function(evt) {
    
    var cerrar = $('.body').find('button.close');
    var numero = $(this).find('td').eq(0).html();
    CargarRecetaPorid(numero);
    cerrar.click();
});

function CargarRecetaPorid(numero){
    
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "CargarRecetaPorid",
            Numero:numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
                 confirma = false;
                 try{tablaDetalle.clear().draw();}catch(error){}
                ConsultarDetalleReceta(value[0]);    

                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);

        });

        if(confirma){
                
                swal("Esculapio!", "No Existe La Receta.", "warning");
        }
    });
}

function ConsultarDetalleReceta(idFarmacia){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ConsultarDetalleReceta",
            Farmacia:idFarmacia
        },
            dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        console.log(respuesta)

    $.each(respuesta, function(i, value) {

        var id = '';
        var item = '';
        var presentacion = '';
        var cantidad = 0;
        var precio = 0;
        var subtotal = 0;
        var iva = 0;
        var descuento = 0;
        var total = 0;
        var nivel="";

        var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

        presentacion = value[3]
        
        precio = value[5];
        
        iva = value[9];
        descuento = value[7];
        item = value[10];

        if(value[11]==value[3]){
            precio = value[13];
            nivel='Uno';
        }else{
            nivel='Dos';
            precio = value[12];
        }
        
        cantidad = '<input  nivel="'+nivel+'" style="width:80px;" type="number" required step=".01" value="'+ value[4] +'" class="form-control" id="CantidadDetalleFact" >'

        subtotal = precio * value[4];

        var descuento = '<input  style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';

        id=value[2];
        

        var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2),parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(subtotal).toFixed(2), boton, ""];
        tablaDetalle.row.add(campos).draw(true);
    });
CalcularTotalConsulta();

        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }


