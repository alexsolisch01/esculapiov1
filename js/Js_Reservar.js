var id = 0;
var noModal = true;
$(".body").on('keyup', "input.filtroPacientes", function(ev) {
    if(ev.keyCode==13){ 
        Cargar($('#cedulaFiltro').val().trim(),$('#apellidoPFiltro').val().trim(),$('#apellidoMFiltro').val().trim(),$('#nombreFiltro').val().trim());     
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
          $("#datatableFactura tbody").empty();
          try{
              var elemento ='';
              $.each(respuesta, function(i, value) {
                  elemento += ' <tr>'
                                    +'<td>'+value[0]+'</td>'
                                    +'<td>'+value[1]+'</td>'
                                    +'<td>'+value[2]+'</td>'
                                    +'<td>'+value[3]+'</td>'
                                    +'<td>'+value[4]+'</td>'
                                    +'<td>'+value[5]+'</td>'
                                    +'<td style="display:none;">'+value[6]+'</td>'
                                    +'<td><span fecha_nacimiento="'+value[8]+'">'+value[7]+'</span></td>'
                                    +'<td>'+value[10]+'</td>'
                                  +'</tr> ';
                  
              });
              $("#datatableFactura tbody").append(elemento);
          }catch(error){
              
          }          
      }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown)
      });
}

$('.body table#datatableFactura tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
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
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    $('.body').find('span#edad').html(edad);
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
$('#modal-default').on('shown.bs.modal', function() {
    noModal = false;
    $('input#apellidoPFiltro').focus();
    $('input#cedulaFiltro').val('');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');    
});

$(".body").on('click', "strong#nombreCompleto", function(evt) {
    id = $(this).attr('idPaciente');
    CargarPacientePorId();
});
$(".body").on('click', "img#clickModificar", function(evt) {
    id = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    CargarPacientePorId();
});

function CargarPacientePorId(){
    
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
           var correo = respuesta[0][9];
            if(correo.trim().length == 0){
                correo = 'fundacionsantaisabel@gmail.com';
            }
            $('.body').find('input#CedulaModificarPaciente').val(respuesta[0][1]);
            $('.body').find('input#ApellidoPModificarPaciente').val(respuesta[0][2]);
            $('.body').find('input#ApellidoMModificarPaciente').val(respuesta[0][12]);
            $('.body').find('input#NombreModificarPaciente').val(respuesta[0][3]);
            $('.body').find('input#FechaModificarPaciente').val(respuesta[0][4]);
            $('.body').find('input#DireccionModificarPaciente').val(respuesta[0][5]);
            $('.body').find('select#CantonModificarPaciente').val(respuesta[0][6]);
            $('.body').find('input#TelefonoModificarPaciente').val(respuesta[0][8]);
            $('.body').find('input#CorreoModificarPaciente').val(correo);
            if(respuesta[0][10]==" "){
                $('.body').find('select#EstadoCivilModificarPaciente').val('SOLTERO/A');
            }else{
                $('.body').find('select#EstadoCivilModificarPaciente').val(respuesta[0][10]);
            }
            $('.body').find('input#OcupacionModificarPaciente').val(respuesta[0][11]);
            var edad = calcularEdad(respuesta[0][4]);
            $('.body').find('input#EdadModificarPaciente').val(edad);
            $('.body').find('#Genero2').val(respuesta[0][13]);

            $('.selectpicker').selectpicker('refresh');
            $('button#ModificarPaciente').prop('disabled', false);
            $('button#GuardarModificarPaciente').prop('disabled', true);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });
    }
}

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
        var genero = $(this).find('#Genero2').val().trim();
        if (genero == 0 || genero ==3) {
            swal("Esculapio!", "Debe seleccionar el Genero", "error");
            return;
        }

        var limpiar = $(this).find('button#LimpiarDatosFact');
        var confirmados = false;
        $(".body div#DatosPaciente").css('visibility', 'visible');
        if(cedula != ''){
            confirmados = ExisteCedula(cedula);
        }
        if(confirmados==true){
            swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los pacientes registrados", "error");
            var cerrar = $('.body').find('button.close');
            cerrar.click();
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if(confirma) {
                GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion,genero, limpiar);                
            }else{
                limpiar.trigger('click');
            }
        });
    });
});

function GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion,genero, limpiar) {
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
            Genero: genero
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
                var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
                $('.body').find('span#edad').html(edad);
                var cerrar = $('.body').find('button.close');
                cerrar.click();
                limpiar.trigger('click');
            });
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO un error.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
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
        var genero = $(this).find('#Genero2').val().trim();
        if (genero == 0 || genero ==3) {
            swal("Esculapio!", "Debe seleccionar el Genero", "error");
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
        
        ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion,genero, limpiar);
            
        });
    });
$(".body").on('click', "button#LimpiarDatosFact", function(ev) {
    $('.body').find('select#EstadoCivilModificarPaciente').val('0');
    $('.body').find('select#CantonModificarPaciente').val('0');
    $('.body').find('#Genero2').val("0");
    $('.selectpicker').selectpicker('refresh');
    id = 0;
});

function ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion,genero, limpiar) {
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
            Genero: genero,
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
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            $('.body').find('span#edad').html(edad);
            var cerrar = $('.body').find('button.close');
            limpiar.trigger('click')
            cerrar.trigger('click')
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('change', "input#FechaModificarPaciente", function(ev) {
    var fecha = $(this).val();
    var edad = calcularEdad(fecha);
    $('.body').find('input#EdadModificarPaciente').val(edad);
});

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
    }).done(function(respuesta) {
        $.each(respuesta, function(a) {
            encontro = true;
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return encontro;
}
$(".body").on('change', "input#CedulaModificarPaciente", function(ev) {
    var cedula = $(this).val();
    var confirmados = false;
    if(cedula != ''){
        confirmados = ExisteCedula(cedula);
    }
    if(confirmados==true){
        swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los pacientes registrados", "error");        
    }
});


var tableEspe = null;
var tableMedico = null;
var tableProce = null;
var idEspecialidad = 0;
var medico = "";
var idMedico = 0;
var enterEspecialidad = false;
var idProcedimiento = 0;
var NEspecialidad = "";
function CargarTablas1(){
  

  tableEspe = $('#datatableEspecialidadConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true
        });
  $('#datatableEspecialidadConsulta_filter input').css("margin-left", "-15em");
  $('#datatableEspecialidadConsulta_filter input').css("width", "18em");

  tableEspe.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tableEspe.cell().focus(':eq(0)');
                tableProce.cell.blur();
                tableMedico.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell().focus(':eq(0)');
                tableMedico.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell.blur();
                tableMedico.cell().focus(':eq(0)');
                
            }

            if (key == 13) {
                tableEspe.cell.blur();
                enterEspecialidad = true;
                tableProce.cell().focus(':eq(0)');
            }else{
                ObtenerFilaPorPrimerletra('#datatableEspecialidadConsulta',String.fromCharCode(key));
            }
        }).on('key-focus', function(e, datatable, cell) {
            idEspecialidad = $(datatable.row(cell.index().row).data()[0]).attr("id");            
            NEspecialidad = $(datatable.row(cell.index().row).data()[0]).html();
            CargarProcedimientosFactura(idEspecialidad, tableProce);
            CargarMedicosPorEspecialidad(tableMedico)            

            if($('#datatableEspecialidadConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableEspecialidadConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        });
        
  tableProce = $('#datatableProcedimientoConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': false,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: {
                columns: [0]
            }
        });
  $('#datatableProcedimientoConsulta_filter input').css("margin-left", "-20em");
  $('#datatableProcedimientoConsulta_filter input').css("width", "30em");

  tableProce.on('key', function(e, datatable, key, cell, originalEvent) {
            
             if (112 == key && !noModal) {
                
                tableEspe.cell().focus(':eq(0)');
                tableProce.cell.blur();
                tableMedico.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell().focus(':eq(0)');
                tableMedico.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell.blur();
                tableMedico.cell().focus(':eq(0)');
                
            }

            if (key == 13 && !enterEspecialidad) {
                var idProcedimiento = datatable.row(cell.index().row).node().id
                $('#datatableProcedimientoConsulta tbody tr td').find('input#checkbox' + idProcedimiento).trigger("click");
                $('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index() + 1).find('td').eq(0).click();                
            } else {
                ObtenerFilaPorPrimerletra('#datatableProcedimientoConsulta',String.fromCharCode(key));                
            }
            enterEspecialidad = false;
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });

  tableMedico = $('#datatableDoctoresProcedimientosFact').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true
        });

  tableMedico.on('key', function(e, datatable, key, cell, originalEvent) {
            
             if (112 == key && !noModal) {
                
                tableEspe.cell().focus(':eq(0)');
                tableProce.cell.blur();
                tableMedico.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell().focus(':eq(0)');
                tableMedico.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableEspe.cell.blur();
                tableProce.cell.blur();
                tableMedico.cell().focus(':eq(0)');
                
            }

            if (key == 13 ) {
                var idMedico = datatable.row(cell.index().row).node().id;
                
                $('#datatableDoctoresProcedimientosFact tbody tr td').find("i[idmedico="+idMedico+"]").click();
            } else {                
            }
            
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableDoctoresProcedimientosFact tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableDoctoresProcedimientosFact tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });
  $('#datatableDoctoresProcedimientosFact_filter input').css("margin-left", "-20em");
  $('#datatableDoctoresProcedimientosFact_filter input').css("width", "30em");

}
CargarTablas1();

function ObtenerFilaPorPrimerletra(tabla,letra){
    var fila = $(tabla + ' td:nth-child(1):contains(' + letra + ')').filter(function() {
                if($.trim($(this).text().slice( 0, 1)) == letra){
                    
                    return $(this).index;        
                }            
    });    
    try{
        fila[0].click();
    }catch(error){} 
}
CararEspecialidades();
function CararEspecialidades() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CararEspecialidades"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tableEspe.clear();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {            
            var campos = ['<span id="'+value[0]+'" >'+value[1]+'</span>'];
            tableEspe.row.add(campos);
        });
        tableEspe.draw(false);
        //tableEspe.cell( ':eq(0)' ).focus();            
        CargarProcedimientosFactura(idEspecialidad, tableProce);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
function CargarProcedimientosFactura(idEspecialidad, tableProce) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarProcedimientos",
            Id: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableProce.clear();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][1],
                respuesta[i][2], '<div class="checkbox checkbox-info checkbox-circle">' + '<input idProcedimiento="' + respuesta[i][0] + '" class="checkProceFact" id="checkbox' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkbox' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ];
            tableProce.row.add(campos).node().id = respuesta[i][0];
            
        });
        tableProce.draw(false);

        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
function CargarMedicosPorEspecialidad(tableMedico) {
    
    
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarMedicosPorEspecialidad",            
            IdEspecialidad: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        try {
        
            tableMedico.clear().draw();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][1] + " " + respuesta[i][2];
            var campos = ['<img src="' + respuesta[i][3] + '" style="width:100px;height:100px;">',
                respuesta[i][2]+" "+respuesta[i][1],
                
                "<span style='margin-top:0.5em;' class='btn-sm btn-default col-md-12' >T. TUNOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][6]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][7]+"</span>",
                
                 '<i medico="' + medico + '" id="' + respuesta[i][4] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendario"' + 'data-toggle="modal" data-target="#modal-horario"></i>'
            ];
            tableMedico.row.add(campos).node().id = respuesta[i][0];
            
        });        
        tableMedico.column(1).search("").draw();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarMedicoProcedimientosFactura(idsProcedimientos, tableMedico) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarProcedimientosMedicosFact",
            Id: idsProcedimientos,
            IdEspecialidad: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
        
            tableMedico.clear();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][1] + " " + respuesta[i][2];
            var campos = ['<img src="' + respuesta[i][3] + '" style="width:100px;height:100px;">',
                respuesta[i][2]+" "+respuesta[i][1],
                
                "<span style='margin-top:0.5em;' class='btn-sm btn-default col-md-12' >T. TUNOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][6]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][7]+"</span>",
                
                 '<i medico="' + medico + '" id="' + respuesta[i][4] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendario"' + 'data-toggle="modal" data-target="#modal-horario"></i>'
            ];
            tableMedico.row.add(campos).node().id = respuesta[i][0];
            
        });        
        tableMedico.column(1).search("").draw();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(document).keydown(function(tecla) {
  if (121 == tecla.keyCode || tecla.keyCode== 112 || tecla.keyCode== 113 || tecla.keyCode== 114 || tecla.keyCode== 115
      || tecla.keyCode== 116 || tecla.keyCode== 117 || tecla.keyCode== 118 || tecla.keyCode== 119) {
      tecla.preventDefault();
  }
  
  if (112 == tecla.keyCode && noModal) {
      tecla.preventDefault();
      $('a#BuscarPaciente').click();
  }
});

$(".body").on('change', ".checkProceFact", function(ev) {
    idProcedimiento = $(this).attr("idProcedimiento");
    var vector = $('.body').find("#datatableProcedimientoConsulta tbody tr");
    var idsProcedimientos = "";
    var precioTotal = 0;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceFact');
        var precio = $(this).find('td').eq(1).html();
        if (input.prop('checked')) {
            idsProcedimientos += input.attr('idProcedimiento') + ","
            precioTotal += parseFloat(precio);
        }
    });
    
    if (idsProcedimientos != "") {        
        CargarMedicoProcedimientosFactura(idsProcedimientos, tableMedico);
    }else{
        try {        
            tableMedico.clear().draw();
        } catch (error) {}
    }
});

$(".body").on('click', ".verCalendario", function(ev) {
    var idPaciente = $('strong#nombreCompleto').attr('idPaciente');
     if(idPaciente=="0" || idPaciente==""){
        swal("Esculapio", "Seleccione un paciente.", "warning");
        return;
     }
     if(idProcedimiento=="0" || idProcedimiento==""){
        swal("Esculapio", "Seleccione un procedimiento.", "warning");
        return;
     }
    $("#modal-horarios").modal();
    idMedico = $(this).attr('idMedico');
    tablaTurnos.column(0).search(idEspecialidad)
    tablaTurnos.column(1).search(idMedico)
    tablaTurnos.column(2).search($('#FechaReservacion').val()).draw();
});

var tablaTurnos;
function CargarTabla(){
  tablaTurnos = $('#TablaHorarios').DataTable({
        "processing": true,
        "serverSide": true,
        'paging': false,
        'lengthChange': false,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Reserva.php",
            data: {
                Requerimiento: "CargarTablaJS",

            },
            type: "POST"
        },
        scrollY: 400
    });

  }
  CargarTabla();

$(".body").on('click', "input.reservarturno", function(ev){  
    ev.preventDefault();  // evita que se envie el formulario
      
     var hora = $(this).parents("tr").find('td').eq(1).html(); 
     var fechareserva = $('.body').find('input#FechaReservacion').val().trim()+" "+hora+":00";     
     var especialidad = idEspecialidad;
     var empleado = idMedico;
     var idPaciente = $('strong#nombreCompleto').attr('idPaciente');
     if(idPaciente=="0" || idPaciente==""){
        swal("Esculapio", "Seleccione un paciente.", "warning");
        return;
     }
     if(idProcedimiento=="0" || idProcedimiento==""){
        swal("Esculapio", "Seleccione un procedimiento.", "warning");
        return;
     }
    swal({
        title: "Esculapio",
        text: "Seguro Desea Reservar la Cita el dia "+$(this).parents("tr").find('td').eq(0).html()+" a las "+$(this).parents("tr").find('td').eq(1).html(),
        icon: "info",
        buttons: true,
            dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ReservarCita(fechareserva,idPaciente,especialidad,empleado,idProcedimiento,$("#cbmConsultorio option:selected").html());
        }else{
            
      } 
  });
 });


function ReservarCita(fechareserva,id_paciente,especialidad,empleado,procedimiento,consultorio){
    var formData = new FormData();
    formData.append('Requerimiento',"Reservar");
   
    
    formData.append('FechaReserva',fechareserva);
    formData.append('Paciente',id_paciente);
    formData.append('Especialidad',especialidad);
    formData.append('Empleado',empleado);
    formData.append('Procedimiento',procedimiento);
    formData.append('Consultorio',consultorio);
    formData.append('Email',$("span#email").html());
    formData.append('NEspecialidad',NEspecialidad);
    formData.append('NPaciente',$("#nombreCompleto").html());

  $.ajax({
        method:"POST",
        url:"Ajax/Aj_Reserva.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function(respuesta) {
      console.log(respuesta);
        if(respuesta[0]==true){
            swal("Esculapio","Reserva realizada con exito", "success");  
            Limpiar();            
            return;
        }
        if(respuesta[0]==false){
            swal("Esculapio", "Ocurrio un error al guardar.", "error");
            return;
        }
  }).fail( function(jqXHR, textStatus, errorThrown ) {
        console.log(errorThrown)
    });
}

function Limpiar() {    
    $('button.close').click();    
    try {
        tableMedico.clear().draw();
    } catch (error) {}
    try {
        tableProce.clear().draw();
    } catch (error) {}    
    $('.body').find('span#cedula').text("-------------");
    $('.body').find('span#edad').text("-------------");
    $('.body').find('strong#nombreCompleto').text("----------");    
    $('.body').find('span#direccion').text("----------------");
    $('.body').find('span#telefono').text("----------------");
    $('.body').find('span#email').text("-----------------");    
    $('.body').find('strong#nombreCompleto').attr('idPaciente', '0');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');
    $('input#cedulaFiltro').val('');
    $('.body').find('button#LimpiarDatosFact').click();
    noModal=true;
    idEspecialidad = 0;
    medico = "";
    idMedico = 0;
    enterEspecialidad = false;
    idProcedimiento = 0;
    $("#FechaReservacion").val($("#FechaActualEsculapio").val());
    tablaTurnos.search("").draw();
}

$(".body").on('click', "#limpiarFact", function(ev){
    Limpiar();
});

var tablaReservaciones = null;
var filaReserva = null;

function ConstruirTablasReserva() {
    tablaReservaciones = $('#datatableReservaciones').DataTable({
        "processing": true,
        "serverSide": true,
        "ordering": false,
        "ajax": {
            url: "Ajax/Aj_Reserva.php",
            data: {
                Requerimiento: "CargarTablaReservasReservaJS"
            },
            type: "POST",            
        },
        keys:true,
        scrollY: 300
    });
}
ConstruirTablasReserva();

$('#modal-reservaciones').on('shown.bs.modal', function() {
    noModal = false;    
    tablaReservaciones.search('').draw();    
});

$(".body").on('change', "input#fechaDesdeRe", function(ev){
    tablaReservaciones.column(1).search($('#fechaDesdeRe').val());
    tablaReservaciones.column(2).search($('#fechaHastaRe').val()).draw();
});
$(".body").on('change', "input#fechaHastaRe", function(ev){
    tablaReservaciones.column(1).search($('#fechaDesdeRe').val());
    tablaReservaciones.column(2).search($('#fechaHastaRe').val()).draw();
});
$(".body").on('click', ".EliminarReserva", function(ev){
    swal({
        title: "Esculapio",
        text: "Seguro que Desea ELIMINAR la RESERVACION",
        icon: "info",
        buttons: true,
            dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            EliminarReserva($(this).attr("idReserva"));
        }else{
            
      } 
  });

});

function EliminarReserva(idReserva) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Reserva.php",
        data: {
            Requerimiento: "EliminarReserva",
            Reserva: idReserva
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        tablaReservaciones.search('').draw(); 
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        if (respuesta[0] == true) {
            swal("Esculapio!", "RESERVACION ELIMINADA CON EXITO.", "success");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}



$(".body").on('click', ".ConfirmarReserva", function(ev){
    if($(this).prop("checked")){
        ConfirmarReserva($(this).attr("id"),"S");
    }else{
        ConfirmarReserva($(this).attr("id"),"N");
    }    
});

function ConfirmarReserva(idReserva,confirma) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Reserva.php",
        data: {
            Requerimiento: "ConfirmarReserva",
            Reserva: idReserva,
            Confirmada:confirma
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', ".CancelarReserva", function(ev){
    swal({
        title: "Esculapio",
        text: "Seguro que Desea CANCELAR la RESERVACION",
        icon: "info",
        buttons: true,
            dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            CancelarReserva($(this).attr("idReserva"));
        }else{
            
      } 
  });

});

function CancelarReserva(idReserva) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Reserva.php",
        data: {
            Requerimiento: "CancelarReserva",
            Reserva: idReserva
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        tablaReservaciones.search('').draw(); 
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        if (respuesta[0] == true) {
            swal("Esculapio!", "RESERVACION CANCELADA CON EXITO.", "success");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}