var primeravez1 = false;
var nombrePacienteImprimir = '';
var ciImprimir = ''; 
var generoPacienteImprimir = '';
var edadPacienteImprimir = '';
var hcuPacienteImprimir = '';
var idTipoServicio=0;
var arrayProblema = new Array();
var idItemTemporal =0;
var idOrdenImprimir=0;
var idRecetaImprimir=0;


var orden_total = "";
var orden_lab = "";
var orden_rx = "";
var orden_eco = "";
var orden_tac = "";

var id=0;
$('.textarea').wysihtml5();
$('.textareaEnfermedad').wysihtml5();
$('.textareaCertificado').wysihtml5();
$('.textareaCertificado2').wysihtml5();
$('.textareaReceta').wysihtml5();
var editorObj = $(".textareaEnfermedad").data('wysihtml5');
var editorObj1 = $(".textareaCertificado").data('wysihtml5');
var editorObj2 = $(".textareaCertificado2").data('wysihtml5');
var editor = editorObj.editor;
var editor1 = editorObj1.editor;
var editor2 = editorObj2.editor;
var banderaGuardar = true;
var pacienteSeleccionado=0;
var idConsulta=0;
var idItem=0;

var tablaUltimosSignos = null;
  tablaUltimosSignos = $('#datatableUltimosSignosVitales').DataTable(
      {
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        scrollY: 100,
        scrollX: true,
        keys: true
      }
    );  



$('#modal-orden-lab').on('shown.bs.modal', function() {
    try {
        var tid = setInterval(function() {
            tablaOrdenLab.columns.adjust().draw();
            clearInterval(tid);
        }, 100);
    } catch (error) {
        console.log(error);
    }
});



function sumarDias(fecha, dias){
    var f2 = new Date($('#FechaActualEsculapio').val());
    if(dias==0){
        dias = 1;
    }
    f2.setDate(f2.getDate() + parseInt(dias));

  return f2;
}

$(document).keydown(function(tecla) {
    if (113 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#HcuPaciente').click();
    }
    if (114 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#CexternaPaciente').click();
    }
    if (115 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#PrescriPaciente').click();
    }
    if (116 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#ServicioPaciente').click();
    }
    if($('#modal-receta').is(':visible')){
        if (120 == tecla.keyCode) {
            tecla.preventDefault();
            $('button#consultasItemReceta').click();
        }
        if (121 == tecla.keyCode) {
            tecla.preventDefault();
            $('button#productoNoExiste').click();
        }
    }
    //alert(tecla.keyCode);
});

$(".body div#ListaEnfe").on('change', "input[type=checkbox]", function(ev) {
    //alert("verga");
    if ($(this).is(':checked')) {
        $(this).parent().append('<textarea class="form-control" type="text" name="">');
    } else {
        var descr = $(this).parent().find('textarea[type=text]').val();
        if(descr!=''){
            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Deschequear? Los datos se borraran.",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $(this).parent().find('textarea[type=text]').remove();
                } else {
                    $(this).prop('checked', true);
                }
            });
        }else{
            $(this).parent().find('textarea[type=text]').remove();
        }
    }
});
$(".body div#ListaEnfe2").on('change', "input[type=checkbox]", function(ev) {
    //alert("verga");
    if ($(this).is(':checked')) {
        $(this).parent().append('<textarea class="form-control" type="text" name="">');
    } else {
        var descr = $(this).parent().find('textarea[type=text]').val();
        if(descr!=''){
            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Deschequear? Los datos se borraran.",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $(this).parent().find('textarea[type=text]').remove();
                } else {
                    $(this).prop('checked', true);
                }
            });
        }else{
            $(this).parent().find('textarea[type=text]').remove();
        }
    }
});
$(".body div#ListaEnfe3").on('change', "input[type=checkbox]", function(ev) {
    //alert("verga");
    if ($(this).is(':checked')) {
        $(this).parent().append('<textarea class="form-control" type="text" name="">');
    } else {
        var descr = $(this).parent().find('textarea[type=text]').val();
        if(descr!=''){
            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Deschequear? Los datos se borraran.",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $(this).parent().find('textarea[type=text]').remove();
                } else {
                    $(this).prop('checked', true);
                }
            });
        }else{
            $(this).parent().find('textarea[type=text]').remove();
        }
    }
});
$(".body div#ListaEnfe4").on('change', "input[type=checkbox]", function(ev) {
    if ($(this).is(':checked')) {
        $(this).parent().append('<textarea class="form-control" type="text" name="">');
    } else {
        var descr = $(this).parent().find('textarea[type=text]').val();
        if(descr!=''){
            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Deschequear? Los datos se borraran.",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $(this).parent().find('textarea[type=text]').remove();
                } else {
                    $(this).prop('checked', true);
                }
            });
        }else{
            $(this).parent().find('textarea[type=text]').remove();
        }
    }
});

var tabla = $('#datatableConsultaExterna').DataTable({
    ordering: false,
    dom: '<"top"f>rt<"bottom">',
    scrollY: 120,
    scrollX: true,
    autoWidth: false,
    paginate:false,
    keys:true,   
    "columnDefs": [{
                "targets": [4,5,6,7,13,14,15],
                "visible": false,
                "searchable": false
            }]
});

tabla.on('key', function(e, datatable, key, cell, originalEvent) {
         
}).on('key-focus', function(e, datatable, cell) {

     if($('#datatableConsultaExterna tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
        return;
     }
     $('#datatableConsultaExterna tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
});

var tablaAlergia = $('#datatableAlergias').DataTable({
    ordering: false,
    dom: '<"top">rt<"bottom">',
    //scrollY: 180,
    //scrollX: true,
    paginate:false
});
var tablaOrdenLab = null;
var tablaOrdenRx = null;
var tablaOrdenEco = null;
var tablaOrdenTomo = null;
var tablaOrdenReceta = null;
var tablaPlantillaProcedimiento = null;
var tablaHistoricoRx = null;

var tablaHistoricoEco = null;

var tablaHistoricoTac = null;

editor.on("load", function() {
   var $doc = $(editor.composer.doc);
        $doc.keyup(function(){
            
        });
});

$('.body table#datatableConsultaExterna tbody').on('dblclick', 'tr', function(evt) {
    if($(this).hasClass('selected')){
        return;
    }
    editor.composer.disable();  
      
    var fechaAtencion = $(this).find('td').eq(0).html();
    var idPaciente = $('.body').find('span#HCU').text();
    var idMedico =  tabla.row($(this)).data()[6];
    var idEspecialidad = tabla.row($(this)).data()[5];
    var idProcedimiento = tabla.row($(this)).data()[4];
    var nombre = tabla.row($(this)).data()[2];
    idConsulta = tabla.row($(this)).data()[7];
    idItem = tabla.row($(this)).data()[13];
    $("#nombreCompleto").val($(this).find('td').eq(1).html());
    $("span#idMedico").html(idMedico);
    $("span#idEspecialidad").html(idEspecialidad);
    $("span#idProcedimiento").html(idProcedimiento);
    $("span#NombreEspecialidad").html(nombre);
    CargarSignosPorPaciente(idPaciente,fechaAtencion,idMedico,idEspecialidad,idProcedimiento,idItem);
    CargarProblema(idPaciente,idConsulta,idItem);
    CargarDiagnostico(idConsulta,idItem);


    idTipoServicio=tabla.row($(this)).data()[15];

                if(idTipoServicio==14){
                    

                      
                      $('div.nivel1PareDiario').fadeOut(0);
                      $('div.nivel1PareDiario[name=general]').fadeIn(1);
                      $('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);
                      
                      
                      $('div.3nivelParteDiaria').fadeIn(0);
                      $('div.3nivelParteDiaria[name=interconsulta]').fadeOut(1);
                      $('div.3nivelParteDiaria[name=condicion]').fadeOut(1);
                }
                if(idTipoServicio==13){
                    

                      
                      $('div.nivel1PareDiario').fadeOut(0);
                      $('div.nivel1PareDiario[name=general]').fadeIn(1);
                      $('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);
                      
                      
                      $('div.3nivelParteDiaria').fadeIn(0);
                      $('div.3nivelParteDiaria[name=interconsulta]').fadeOut(1);
                      $('div.3nivelParteDiaria[name=condicion]').fadeOut(1);
                }
                if(idTipoServicio==1){
                     

                      
                      $('div.nivel1PareDiario').fadeIn(0);
                      $('div.nivel1PareDiario[name=general]').fadeIn(1);
                      $('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);
                      
                      
                      $('div.3nivelParteDiaria').fadeIn(0);
                      $('div.3nivelParteDiaria[name=interconsulta]').fadeIn(1);
                      $('div.3nivelParteDiaria[name=condicion]').fadeIn(1);
                }

    if(tabla.row($(this)).data()[14]==19 || idMedico!=$('a#CambiarContra').attr('IdEmpleado')){
        $("button#GuardarProblema").prop("disabled",true);

        editor.composer.disable();  
        
        $('button#PrescriPaciente').prop("disabled",true);
        $('button#ServicioPaciente').prop("disabled",true);
        $('button#parteDiaria').prop("disabled",true);
        

        //AgregarProblemaTemp(idItemTemporal,$('#DescripcionEnfermedad').val());
    }else{
        if(banderaGuardar){
            idItemTemporal = idItem;
            $("button#GuardarProblema").prop("disabled",false);   

            editor.composer.enable();  
              
              $('button#PrescriPaciente').prop("disabled",false);
              $('button#ServicioPaciente').prop("disabled",false);
              $('button#parteDiaria').prop("disabled",false);
              
        }
    }
    //$(this).find('td').focus();
    
});

function CargarSignosPorPaciente(idPaciente,fechaAtencion,idMedico,idEspecialidad,idProcedimiento,idItem) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarSignosPorPacienteFecha",
            IdPaciente: idPaciente,
            FechaAtencion: fechaAtencion,
            IdMedico: idMedico,
            IdProcedimiento: idProcedimiento,
            IdEspecialidad: idEspecialidad,
            ConsultaItem:idItem
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        console.log(respuesta)
        try{
            $("span#EdadPaci").html(respuesta[0][0]);
            $("span#PresionPaci").html(respuesta[0][1]);
            $("span#PulsoPaci").html(respuesta[0][2]+' X Min');
            $("span#PesoPaci").html(respuesta[0][4]+' Kg');
            $("span#TallaPaci").html(respuesta[0][3]+' CM');
            $("span#ImcPaci").html(respuesta[0][5]);
            $("span#TAxilar").html(respuesta[0][8]+'° C');
            $("span#PCefalico").html(respuesta[0][9]+' CM');
            $("span#FRPaci").html(respuesta[0][12]+' X Min');
            //alert(jj);       
        }catch(error){
            swal("Esculapio!", "El Paciente no tiene Signos Vitales en esta fecha!", "warning");
            $("span#EdadPaci").html('------');
            $("span#PresionPaci").html('------');
            $("span#PulsoPaci").html('------');
            $("span#PesoPaci").html('------');
            $("span#TallaPaci").html('------');
            $("span#ImcPaci").html('------');
            $("span#TAxilar").html('------');
            $("span#PCefalico").html('------');
            $("span#FRPaci").html('------');
            //$("img#alergiaPaci").attr("src","imagenes/Alergia.png");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    }); 
}

function CargarProblema(idPaciente,idConsulta,idItem) {
    //alert(idPaciente+" "+idConsulta);
    editor.setValue("");
    $('div#ProcedimientosLaboratorio').html("");
    $('div#ProcedimientosRayos').html("");
    $('div#ProcedimientosEcografia').html("");
    $('div#ProcedimientosTac').html(""); 
    $('div#FarmacoReceta').html(""); 
    banderaGuardar=true;
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProblema",
            IdPaciente: idPaciente,
            Item:idItem,
            Consulta:idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        } 
        try{
            editor.setValue(respuesta[0][1]);
            $('div#ProcedimientosLaboratorio').html(respuesta[0][2]);
            $('div#ProcedimientosRayos').html(respuesta[0][3]);
            $('div#ProcedimientosEcografia').html(respuesta[0][4]);
            $('div#ProcedimientosTac').html(respuesta[0][5]);
            $('div#FarmacoReceta').html(respuesta[0][6]);
            $('input#reporteEmelec').val(respuesta[0][7]);
            $('input#reporteEmelecLab').val(respuesta[0][8]);
            $('input#reporteEmelecRx').val(respuesta[0][9]);
            $('input#reporteEmelecEco').val(respuesta[0][10]);
            $('input#reporteEmelecTac').val(respuesta[0][11]);
            $('input#reporteEmelecReceta').val(respuesta[0][12]);
            $('input#reporteEmelecCertificado').val(respuesta[0][13]);
            editor.composer.disable();
            editor1.setValue(respuesta[0][13]);
            editor2.setValue(respuesta[0][14]);
            banderaGuardar=false;
            $("button#GuardarProblema").prop("disabled",true);            
            $('button#PrescriPaciente').prop("disabled",true);
            $('button#ServicioPaciente').prop("disabled",true);
            $('button#parteDiaria').prop("disabled",true);
        }catch(error){
            $.each(arrayProblema, function(p, itenp) {
                
                if (arrayProblema[p][0] == idItem) {
                    editor.setValue(arrayProblema[p][1]);                      
                    $('ul#diagnosticoPaciente').html(arrayProblema[p][2]);
                    $('div#planTratamientos').html(arrayProblema[p][3]);
                }
            });
            return;
        }
        //alert(respuesta[0][1]);
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
var tablaDoctoresporConsulta = '';
var tablaPlantratemientoPorConsulta = '';
var RespuestaTablaConsultaExterna = null;
function CargarConsultas(idPaciente) {
    tablaDoctoresporConsulta = '';
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarConsultasAdmin",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        tabla.clear().draw();
        RespuestaTablaConsultaExterna = respuesta;
        $.each(respuesta, function(i, value) {
            
            var lab='';
            var rx='';
            var eco='';
            var tac='';
            var rec='';

            if(value[10] == 17){
                lab='<span class="btn-sm btn-warning" id="PendienteLab" >P</span>';
            }

            if(value[11] == 17){
                rx='<span class="btn-sm btn-warning" id="PendienteRx" >P</span>';
            }

            if(value[12] == 17){
                eco='<span class="btn-sm btn-warning" id="PendienteEco" >P</span>';
            }

            if(value[13] == 17){
                tac='<span class="btn-sm btn-warning" id="PendienteTac" >P</span>';
            }

            if(value[10] >17){
                lab='<span idConsultaOrden="'+value[10]+'" class="btn-sm btn-success orlab" >OK</span>';
            }

            if(value[11] >17){
                rx='<span idConsultaOrden="'+value[11]+'" class="btn-sm btn-success orrx" >OK</span>';
            }

            if(value[12] >17){
                eco='<span idConsultaOrden="'+value[12]+'" class="btn-sm btn-success oreco" >OK</span>';
            }

            if(value[13] >17){
                tac='<span idConsultaOrden="'+value[13]+'" class="btn-sm btn-success ortomo" >OK</span>';
            }
            if(value[14] >17){
                rec='<span idConsultaOrden="'+value[16]+'" class="btn-sm btn-success orrec" >REC</span>';
            }

            var dataSet = [respuesta[i][5]
                            ,respuesta[i][3]+' '+respuesta[i][2],
                            respuesta[i][1],
                            respuesta[i][6],
                            respuesta[i][7],
                            respuesta[i][8],
                            respuesta[i][9],
                            respuesta[i][0],lab,rx,eco,tac,rec,
                            respuesta[i][16],
                            respuesta[i][17],
                            value[15]];
            tabla.row.add(dataSet);            
        });
        tabla.draw(false);
        
             
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
var filaEnfermedadesPersonales = '';
var filaEnfermedadesFamiliares = '';
var filaEnfermedadesOrganos = '';
var filaEnfermedadesFisicos = '';
function CargarEnfermedad(idPaciente){
    filaEnfermedadesPersonales = '';
    filaEnfermedadesFamiliares = '';
    filaEnfermedadesOrganos = '';
    filaEnfermedadesFisicos = '';
    $.ajax({
                method: "POST",
                url: "Ajax/Aj_Agenda.php",
                data: {
                    Requerimiento: "CargarEnfermedad",
                    IdPaciente: idPaciente
                },
                dataType: 'JSON',
    }).done(function(horarios) {
                    $.each(horarios, function(h, iten) {
                    $("ul#ListaAAP li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                            filaEnfermedadesPersonales += '<tr><td><span> <label style="font-weight: bold;">'+enfermedad+' :</label> '+horarios[h][2]+'</span></td></tr>';
                        }
                        });
                    $("ul#ListaAPF li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                            filaEnfermedadesFamiliares += '<tr><td><span> <label style="font-weight: bold;">'+enfermedad+' :</label> '+horarios[h][2]+'</span></td></tr>';
                        }
                    });
                    $("ul#ListaRevision li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                            filaEnfermedadesOrganos += '<tr><td><span> <label style="font-weight: bold;">'+enfermedad+' :</label> '+horarios[h][2]+'</span></td></tr>';
                        }
                    });
                    $("ul#ListaExamenFisico li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                            filaEnfermedadesFisicos += '<tr><td><span> <label style="font-weight: bold;">'+enfermedad+' :</label> '+horarios[h][2]+'</span></td></tr>';
                        }
                    });
                });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
var gg = 0;
function CargarAlergias(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarAlergiaPorPaciente",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        tablaAlergia.clear().draw();
        $.each(respuesta, function(i, value) {
            var dataSet = [respuesta[i][1],respuesta[i][2]+' '+respuesta[i][3],respuesta[i][4]];
            tablaAlergia.row.add(dataSet).draw(false);
        });

        var tt = tablaAlergia.rows().count();
        
        if(tt!=0){
            stopColor();
            $("img#alergiaPaci").prop("src","imagenes/Alergia1.png");
            gg = setInterval(function(){
                var img =$("img#alergiaPaci").attr("src");

                if(img=="imagenes/Alergia1.png"){
                    $("img#alergiaPaci").prop("src","imagenes/Alergia2.png");
                }else{
                    $("img#alergiaPaci").prop("src","imagenes/Alergia1.png");
                }
            },300);
        }else{
            stopColor();
            $("img#alergiaPaci").prop("src","imagenes/Alergia.png");
        };
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function stopColor() {
  clearInterval(gg);
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
function CargarGineco(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarGineco",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            if (respuesta[0] == false) {
                swal("Esculapio!", "Error!", "error");
                return;
            }
            $('.body').find('input#Gestaciones').val(respuesta[0][1]);
            $('.body').find('input#Abortos').val(respuesta[0][2]);
            $('.body').find('input#Partos').val(respuesta[0][3]);
            $('.body').find('input#Cesarea').val(respuesta[0][4]);
            $('.body').find('input#Vaginales').val(respuesta[0][5]);
            $('.body').find('input#Vivos').val(respuesta[0][6]);
            $('.body').find('input#Muertos').val(respuesta[0][7]);
            $('.body').find('input#TSangre').val(respuesta[0][8]);
            $('.body').find('input#FechaGesta').val(respuesta[0][9]);
            $('.body').find('input#FechaParto').val(respuesta[0][10]);

            if(respuesta[0][11]==1){
                $('.body').find("input#DiabetesS").parent().click();
            }
            if(respuesta[0][12]==1){
                $('.body').find("input#HipertensionS").parent().click();
            }
            if(respuesta[0][13]==1){
                $('.body').find("input#PulmonarS").parent().click();
            }
            if(respuesta[0][14]==1){
                $('.body').find("input#GemelaresS").parent().click();
            }
            if(respuesta[0][15]==1){
                $('.body').find("input#OtrosS").parent().click();
            }
            if(respuesta[0][16]==1){
                $('.body').find("input#DiabetesFS").parent().click();
            }
            if(respuesta[0][17]==1){
                $('.body').find("input#HipertensionFS").parent().click();
            }
            if(respuesta[0][18]==1){
                $('.body').find("input#PulmonarFS").parent().click();
            }
            if(respuesta[0][19]==1){
                $('.body').find("input#GemelaresFS").parent().click();
            }
            if(respuesta[0][20]==1){
                $('.body').find("input#OtrosFS").parent().click();
            }
        }catch(error){

        }
        
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarPlantillasProcedimiento(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarPlantillasLaboratorio",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        
        try{
            tablaPlantillaProcedimiento.destroy();
        }catch(error){}

        var filas = [];
        var nombreProce = "";
        var fecha ="";
        $.each(respuesta, function(i, value) {

            if(i==0){
                nombreProce=value[7];
                fecha = value[0];
            }else{
                if(nombreProce==value[7]){
                    fecha = "";
                }else{
                  nombreProce=value[7];
                  fecha = value[0];  
                }
            }

            var dataSet = [fecha,respuesta[i][1],respuesta[i][2],respuesta[i][3],respuesta[i][4],respuesta[i][5],respuesta[i][6],respuesta[i][7]];
            //tablaPlantillaProcedimiento.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaPlantillaProcedimiento = $('#datatablePruebaAgenda').DataTable({
                                            scrollX: true,
                                            scrollY: 250,
                                            autoWidth: true,
                                            ordering: false,
                                            info: false,
                                            keys: true,                                            
                                            paginate:false,
                                            "columnDefs": [{
                                                        "targets": [7],
                                                        "visible": false,
                                                        "searchable": true
                                                    },
                                                    {
                                                        "targets": [0,1,2,3,4,5,6],
                                                        "searchable": false
                                                    }
                                                ],
                                            data:filas,
                                            autoWidth:true    
                                        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarHistoricoRx(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoRx",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoRx.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoRx.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoRx = $('#HistorioRxAgenda').DataTable({
                            scrollX: true,
                            scrollY: 250,
                            autoWidth: true,    
                            info: false,
                            keys: true,    
                            paginate:false,
                            data:filas,
                            autoWidth: true
                        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}


function CargarHistoricoEco(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoEco",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoEco.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoEco.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoEco = $('#HistorioEcoAgenda').DataTable({
                                scrollX: true,
                                scrollY: 250,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}


function CargarHistoricoTac(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoTac",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoTac.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoTac.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoTac = $('#HistorioTacAgenda').DataTable({
                                scrollX: true,
                                scrollY: 250,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
function CargarEpidemiologico(idPaciente){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargarEpidemiologico",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        
        confirmaEpidemiologico = false;
        $.each(respuesta, function(i, value) {
           
           $('#Genero').val(value[0]);
           $('#Genero2').val(value[1]);
           $('#Etnia').val(value[2]);
           $('#Migrante').val(value[3]);
           $('#Migrante2').val(value[4]);
           $('#Grupo').val(value[5]);
           $('#Sector').val(value[6]);
           $('#Codigovih').val(value[7]);
           $('#Afiliacion').val(value[8]);
           $('#Instruccion').val(value[9]);
           $('#Responsable').val(value[10]);
           $('#Parentesco').val(value[11]);
           $('#Numero').val(value[12]);

           confirmaEpidemiologico = true;
        });

        $('.selectpicker').selectpicker('refresh');
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
function CargarDiagnostico(idConsulta,idItem) {
    $("#diagnosticoPaciente").empty();
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "CargarDiagnostico",            
            Consulta:idConsulta,
            Item:idItem
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        } 
        try{
            
            $.each(respuesta, function(i, value) {
                var elemento = '<li><span id="cie" class="badge bg-green">'+value[0]+'</span><span class="text">'+value[1]+'</span></li>';
                $("#diagnosticoPaciente").append(elemento);
            });
        }catch(error){
            return;
        }
        //alert(respuesta[0][1]);
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
function Limpiar(){

        $("span#NombrePaci").html('------');
        $("span#CedulaPaci").html('------');
        $("span#HCU").html('------');
        $("span#EdadPaci").html('------');
        $("span#PresionPaci").html('------');
        $("span#PulsoPaci").html('------');
        $("span#PesoPaci").html('------');
        $("span#TallaPaci").html('------');
        $("span#ImcPaci").html('------');
        $("span#TAxilar").html('------');
        $("span#PCefalico").html('------');
        $("span#FRPaci").html('------');
        stopColor();
        $("img#alergiaPaci").prop("src","imagenes/Alergia.png");        
        try{tabla.clear().draw();}catch(error){}
        try{tablaPlantillaProcedimiento.clear().draw();}catch(error){}
        editor.setValue("");

        $('div#ProcedimientosLaboratorio').html("");
        $('div#ProcedimientosRayos').html("");
        $('div#ProcedimientosEcografia').html("");
        $('div#ProcedimientosTac').html(""); 
        banderaGuardar=true;
        $("#diagnosticoPaciente").empty();
        pacienteSeleccionado=0;
        $('ul.treeview-menu').find("li").removeClass("liselec");
        
        try{tablaInventarioAgregadas.clear().draw();}catch(error){}
        
        try{tablaDetalleReceta.clear().draw();}catch(error){}
        $('input#principioF').val("");
        $('input#presentacionF').val("");
        $('input#nombreComercialF').val("");

        
        try{tablaInventario.column(4).search("").draw();}catch(error){}        
        try{tablaInventario.column(2).search("").draw();}catch(error){}
        try{tablaInventario.column(1).search("").draw();}catch(error){}
        $("#control").click();
        $("#Derivar").click();
        $("#proxima").click();

        
        try{tablaProceLabAgregados.clear().draw();}catch(error){}        
        try{tablaProceRxAgregados.clear().draw();}catch(error){}        
        try{tablaProceEcoAgregados.clear().draw();}catch(error){}        
        try{tablaProceTacAgregados.clear().draw();}catch(error){}
        $('input#codigo').val("");
        $('input#descripcion').val("");

        
        try{tablaCieParteDiaria.column(0).search("").draw();}catch(error){}        
        try{tablaCieParteDiaria.column(1).search("").draw();}catch(error){}

        
        try{tablaPlantillaProcedimiento.clear().draw();}catch(error){}        
        try{tablaHistoricoRx.clear().draw();}catch(error){}
        
        try{tablaHistoricoEco.clear().draw();}catch(error){}

        
        try{tablaHistoricoTac.clear().draw();}catch(error){}
        try{tablaAlergia.clear().draw();}catch(error){}
        
        $("ul li").removeClass("active");
        $("#EnfermedadesSeleccionadas").empty();
        idConsulta=0;
        $("button#GuardarProblema").prop("disabled",true);
        
        

}
$(".body").on('click', "h3#Limpiar", function(ev) {
   Limpiar();  
});
$(".body").on('click', "span.orlab", function(evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarLaboratorioPorConsulta(idConsulta);
    $('div#modal-orden-lab').modal();
});

$(".body").on('click', "span.orrx", function(evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenRx(idConsulta);
    $('div#modal-orden-rx').modal();
});

$(".body").on('click', "span.oreco", function(evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenEco(idConsulta);
    $('div#modal-orden-eco').modal();
});

$(".body").on('click', "span.ortomo", function(evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenTomo(idConsulta);
    $('div#modal-orden-tomo').modal();
});

$(".body").on('click', "span.orrec", function(evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenReceta(idConsulta);
    $('div#modal-orden-receta').modal();
});

$(".body").on('click', "button#ImprimirTodo", function(evt) {
    printTextArea();
});

function CargarLaboratorioPorConsulta(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarLaboratorioPorConsulta",
            IdConsulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        
        try{
            tablaOrdenLab.destroy();
        }catch(error){}

        var filas = [];
        var nombreProce = "";
        var fecha ="";
        $.each(respuesta, function(i, value) {

            if(i==0){
                nombreProce=value[7];
                fecha = value[0];
            }else{
                if(nombreProce==value[7]){
                    fecha = "";
                }else{
                  nombreProce=value[7];
                  fecha = value[0];  
                }
            }

            var dataSet = [fecha,respuesta[i][1],respuesta[i][2],respuesta[i][3],respuesta[i][4],respuesta[i][5],respuesta[i][6],respuesta[i][7]];
            //tablaPlantillaProcedimiento.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaOrdenLab = $('#datatableOrdenLab').DataTable({
                                            scrollX: true,
                                            scrollY: 480,
                                            autoWidth: true,
                                            ordering: false,
                                            info: false,
                                            keys: true,                                            
                                            paginate:false,
                                            "columnDefs": [{
                                                        "targets": [7],
                                                        "visible": false,
                                                        "searchable": true
                                                    },
                                                    {
                                                        "targets": [0,1,2,3,4,5,6],
                                                        "searchable": false
                                                    }
                                                ],
                                            data:filas,
                                            autoWidth:true    
                                        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarOrdenRx(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarOrdenRx",
            IdConsulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaOrdenRx.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoRx.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaOrdenRx = $('#datatableOrdenRx').DataTable({
                            scrollX: true,
                            scrollY: 480,
                            autoWidth: true,    
                            info: false,
                            keys: true,    
                            paginate:false,
                            data:filas,
                            autoWidth: true
                        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarOrdenEco(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarOrdenEco",
            IdConsulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaOrdenEco.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoEco.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaOrdenEco = $('#datatableOrdenEco').DataTable({
                                scrollX: true,
                                scrollY: 480,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarOrdenTomo(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarOrdenTomo",
            IdConsulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaOrdenTomo.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoTac.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaOrdenTomo = $('#datatableOrdenTomo').DataTable({
                                scrollX: true,
                                scrollY: 480,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

tablaOrdenReceta = $('#datatableOrdenReceta').DataTable({
                                scrollX: true,
                                scrollY: 250,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                ordering: false,
                                autoWidth: true,
                                searching: false,
                                "columnDefs": [{
                                    "targets": [0,6,7,8],
                                    "visible": false,
                                    "searchable": false
                                }]
                            });

$('#modal-orden-receta').on('shown.bs.modal', function() {
    try {
        var tid = setInterval(function() {
            tablaOrdenReceta.columns.adjust().draw();
            clearInterval(tid);
        }, 100);
    } catch (error) {
        console.log(error);
    }
});


function CargarOrdenReceta(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarOrdenReceta",
            IdConsulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        } 
        
        var filas = [];

        try {
            tablaOrdenReceta.clear().draw();
        } catch (error) {}
        var fecha1 = "";
        var fecha2 = "";
        $.each(respuesta, function(i, value) {
            fecha1 = respuesta[i][6];
            fecha2 = respuesta[i][7];
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2],respuesta[i][3],respuesta[i][4],respuesta[i][5],respuesta[i][6],respuesta[i][7],respuesta[i][8]];
            tablaOrdenReceta.row.add(dataSet);
            
        });
        if(fecha2 != 'NO'){
            $('.body').find('label#FechaControlReceta').text('CITA DE CONTROL: '+fecha2.substring(0, 10));
        }else{
            if(fecha1 != 'NO'){
                $('.body').find('label#FechaControlReceta').text('SU PROXIMA CITA ES: '+fecha1.substring(0, 10));
            }else{
                $('.body').find('label#FechaControlReceta').text('CITA ABIERTA');
            }
        }
        tablaOrdenReceta.draw(false);
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function printTextArea() {
    var descripcionCie = '';
    var codigoCie = '';
    var condicion = '';
    
    codigoCie = $("ul#diagnosticoPaciente li span#cie").eq(0).text();
    descripcionCie = $("ul#diagnosticoPaciente li span.text").eq(0).text();
    condicion = $("span#condicion").eq(0).text();
    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var numeroOrden = idOrdenImprimir;
    var numeroReceta =idRecetaImprimir;
    var totalLab = $('.body').find("label#precioTotal").html().replace('TOTAL: $', '');
    var totalRx = $('.body').find("label#precioTotalRx").html().replace('TOTAL: $', '');
    var totalEco = $('.body').find("label#precioTotalEco").html().replace('TOTAL: $', '');
    var totalTac = $('.body').find("label#precioTotalTac").html().replace('TOTAL: $', '');
    var totalTotal = parseFloat(parseFloat(totalLab)+parseFloat(totalRx)+parseFloat(totalEco)+parseFloat(totalTac)).toFixed(2);
    var cuerpo = '';
    var cuerpo2 = '';
    var totalReceta = 0;
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    
    var selec = '';
    var fila = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr").find("td").eq(0).html();
    if(fila!="No existen datos"){
        cuerpo += '<u><h4 style="margin-top:-1;margin-bottom:0;">ORDEN DE LABORATORIO</h4></u><h5 style="float: right; margin-top: -1em;">TOTAL ORDEN LABORATORIO: $'+totalLab+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');

            if($(this).attr('id')==-1){
                item = $(this).find('td').eq(0).find('input').val();
            }
            selec += '<li style="font-size: 12px;">'+item+'</li>';
        });
        cuerpo += selec+'</ul>';    
    }   

    fila = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr").find("td").eq(0).html();
    if(fila!="No existen datos"){
        var selec = '';
        cuerpo += '<u><h4 style="margin-top:-1;margin-bottom:0;">ORDEN DE RAYOS X</h4></u><h5 style="float: right; margin-top: -1em;">TOTAL ORDEN RAYOS X: $'+totalRx+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            if($(this).attr('id')==-1){
                item = $(this).find('td').eq(0).find('input').val();
            }
            selec += '<li style="font-size: 12px;">'+item+'</li>';
        });
        cuerpo += selec+'</ul>';
    }
    fila = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr").find("td").eq(0).html();
    if(fila!="No existen datos"){
        var selec = '';
        cuerpo += '<u><h4 style="margin-top:-1;margin-bottom:0;">ORDEN DE ECOGRAFIA</h4></u><h5 style="float: right; margin-top: -1em;">TOTAL ORDEN ECOGRAFIA : $'+totalEco+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            if($(this).attr('id')==-1){
                item = $(this).find('td').eq(0).find('input').val();
            }
            selec += '<li style="font-size: 12px;">'+item+'</li>';
        });
        cuerpo += selec+'</ul>';
    }
    fila = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr").find("td").eq(0).html();
    if(fila!="No existen datos"){
        var selec = '';
        cuerpo += '<u><h4 style="margin-top:-1;margin-bottom:0;">ORDEN DE TAC/RM</h4></u><h5 style="float: right; margin-top: -1em;">TOTAL ORDEN TAC/RM : $'+totalTac+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            if($(this).attr('id')==-1){
                item = $(this).find('td').eq(0).find('input').val();
            }
            selec += '<li style="font-size: 12px;">'+item+'</li>';
        });
        cuerpo += selec+'</ul>';
    }

    if($('.body').find("#datatableDetalleReceta tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<div><u><h4 style="margin-top:0;margin-bottom:0;">RECETA</h4></u>'
        +'<table  style="width: 100%"><thead><tr><th></th><th><u>Nombre Farmaceutico</u></th><th><u>Cantidad</u></th><th><u>Prescripcion</u></th></tr></thead><tbody>';
        var vector = $('.body').find("#datatableDetalleReceta tbody tr ");
        var selec = '';
        var count = 0;
        
        $.each(vector, function(a) {
            if($(this).find('td').html()=="No existen datos"){
                return false ;
            }
            count++; 
            var asterisco='';
            var idItem = tablaDetalleReceta.row($(this)).data()[0];
            var principio = tablaDetalleReceta.row($(this)).data()[1];//$(this).find('td').eq(0).html();
            var sugerencia = $(this).find('td').eq(0).html();
            var presentancion = $(this).find('td').eq(1).find('select').val();
            var pvp = $(this).find('td').eq(1).find('select option:selected').attr('pvp');
            if(idItem==0){
                principio ="";// $(this).find('td').eq(0).find('input').val();
                sugerencia = $(this).find('td').eq(0).find('input').val();
                presentancion = $(this).find('td').eq(1).find('input').val();
                pvp="0";
                asterisco='*';
            }
            
            
            var cantidad =  $(this).find('td').eq(2).find('input').val();
            
            totalReceta += parseFloat(pvp)*parseFloat(cantidad);
            var observaciones  = $(this).find('td').eq(3).find('select').val();
            var observaciones2  = $(this).find('td').eq(4).find('input').val();
            selec += '<tr style="margin-bottom: 0.4em;"><td style="font-size:12px;">'+asterisco+'</td><td style="font-size:12px;">'+principio+'<br><b style="font-size:10px;">('+sugerencia+')</b></td><td style="font-size:12px;">'+cantidad+' ('+NumeroALetras(cantidad)+')</td><td style="font-size:12px;">'+observaciones+' '+observaciones2+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }
    cuerpo2 += '<div style="margin-top: -1em;">';
    var confirmacita = false;
    if($('.body').find('input#proxima').is(':checked')){
        var fecha = $('.body').find('input#fechaMovi').val();
        var fecha_proxima = $('.body').find('input#fecha_proxima').val();        
        confirmacita = true;
        cuerpo2 += '<label style="font-size: 12px; margin-right: 1.5em;">SU PROXIMA CITA: '+fecha_proxima+'</label>';        
    }else{
        confirmacita = false;
    }
    if($('.body').find('input#control').is(':checked')){
        var fecha_control = $('.body').find('input#fecha_control').val();
        cuerpo2 += '<label style="font-size: 12px; margin-right: 1.5em;">CITA DE CONTROL HASTA: '+fecha_control+'</label>';
        confirmacita = true;
    }else{
        confirmacita = false;
    }
    if(!confirmacita){
        cuerpo2 += '<label style="font-size: 12px; margin-right: 1.5em;">CITA ABIERTA</label>';
    }
    var vector = $("#Especialidad").find("option:selected");
    var especialidad = "";
    $.each(vector, function(a) {
      especialidad += $(this).html()+" / ";
    });
    if(especialidad!=""){
      cuerpo2 += '<label style="font-size: 12px; margin-left: 1em;">USTED TIENE INTERCONSULTA CON: '+especialidad+'</label>';
    }
    cuerpo2 += '</div>';
    
    var cabeceraservicios = '<div style="width: 100%;overflow: hidden;height:40px;">'+
                    '<div style="width: 50%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Paciente:</b> '+nombrePacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>HCU:</b> '+hcuPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 35%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Edad:</b> '+edadPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 20%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Fecha:</b> '+fecha+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Orden:</b> '+numeroOrden+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Total $</b> '+parseFloat(totalTotal).toFixed(2)+'</label>'+
                    '</div>'+
                '</div>';

    var cabecerareceta = '<div style="width: 100%;overflow: hidden;height:40px;">'+
                    '<div style="width: 50%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Paciente:</b> '+nombrePacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>HCU:</b> '+hcuPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 35%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Edad:</b> '+edadPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 20%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Fecha:</b> '+fecha+'</label>'+
                    '</div>'+
                    '<div style="width: 50%; float: left;">'+
                        '<label style="font-weight: normal;"><b>CIE-10:</b> '+codigoCie+' - '+descripcionCie+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Orden :</b> '+numeroReceta+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Total $</b> '+parseFloat(totalReceta).toFixed(2)+'</label>'+
                    '</div>'+
                '</div>';    

    var firmas = '<div style="float: right; width:100%;margin-top:1em;"><label style="float: right; font-weight:bold; font-size: small;">________________________________________</label><br>'+
        '<label style="float: right; font-weight:bold; font-size: small;">Dr(a). '+nombreDoctor.toUpperCase()+'</label><br><label style="float: right; font-weight:bold; font-size: small;">'+NombreEspecialidad.toUpperCase()+'</label></div>';
    

    var estilos2 ='.page-header, .page-header-space {'
                      +'height: 100px;'
                    +'}'
                    +''
                    +'.page-footer, .page-footer-space {'
                      +'height: 50px;'
                    +''
                    +'}'
                    +''
                    +'.page-footer {'
                      +'position: fixed;'
                      +'bottom: 0;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page-header {'
                      +'position: fixed;'
                      +'top: -2.4em;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page {'
                      +'page-break-after: always;'
                      +'width: 100%;'
                    +'}'
                    +'ul {'
                        +'-moz-column-count: 4;'
                        +'-moz-column-gap: 20px;'
                        +'-webkit-column-count: 4;'
                        +'-webkit-column-gap: 20px;'
                        +'column-count: 4;'
                        +'column-gap: 20px;'
                    +'}'
                    +'@media print {'                       
                       +'button {display: none;}'
                       +'body {margin: 0;}'
                    +'}';

        childWindow = window.open('_blank');    
        childWindow.document.write('<html>')
        childWindow.document.write('<head>')
        childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
        childWindow.document.write('</head>')
        childWindow.document.write('<body>')

        childWindow.document.write('<div class="page-header">')        
        childWindow.document.write($('.body').find('div#cabecera').html())        
        childWindow.document.write('</div>')        

    if(totalTotal>0){      
        childWindow.document.write('<div class="page-header-space"></div>')
        childWindow.document.write('<div class="page">');   
        childWindow.document.write(cabeceraservicios+cuerpo+firmas);
        childWindow.document.write('</div>')
    }
    if($('.body').find("#datatableDetalleReceta tbody tr").find('td').html()!="No existen datos"){
        childWindow.document.write('<div class="page-header-space"></div>')
        childWindow.document.write('<div class="page">');   
        childWindow.document.write(cabecerareceta+cuerpo2+firmas); 
        childWindow.document.write('</div>') 
    }
        childWindow.document.write('</body>')
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
        childWindow.document.write('</html>')
}

function ReimprimirprintTextArea() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var numeroOrden =0;
    var numeroReceta =idRecetaImprimir;
    var totalReceta = 0;
    var cuerpo2 = '';
    var nombreDoctor = $('input#nombreCompleto').val();
    if($('.body').find("#datatableOrdenReceta tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<div><u><h4 style="margin-top:0;margin-bottom:0;">RECETA</h4></u>'
        +'<table style="width: 100%"><thead><tr><th><u>No.</u></th><th><u>Principio Activo/Nombre Farmaceutico</u></th><th><u>Cantidad</u></th><th><u>Prescripcion</u></th></tr></thead><tbody>';
        var vector = $('.body').find("#datatableOrdenReceta tbody tr ");
        var selec = '';
        var count = 0;
        var fecha1 = '';
        var fecha2 = '';
        
        $.each(vector, function(a) {
            if($(this).find('td').html()=="No existen datos"){
                return false ;
            }
            count++; 
            var asterisco='';
            var principio = $(this).find('td').eq(0).html();
            var sugerencia = $(this).find('td').eq(1).html();
            var presentancion = $(this).find('td').eq(2).html();            
            fecha1 = tablaOrdenReceta.row($(this)).data()[6];
            fecha2 = tablaOrdenReceta.row($(this)).data()[7];
            fecha = tablaOrdenReceta.row($(this)).data()[8];                        
            var cantidad =  $(this).find('td').eq(3).html();
            var observaciones  = $(this).find('td').eq(4).html();
            selec += '<tr><td style="font-size:12px;">'+count+asterisco+'</td><td style="font-size:12px;">'+principio+'<br><b style="font-size:10px;">('+sugerencia+')</b></td><td style="font-size:12px;">'+cantidad+' ('+NumeroALetras(cantidad)+')</td><td style="font-size:12px;">'+observaciones+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }
    if(fecha2 != 'NO'){
        cuerpo2 += '<div><label style="font-size: 12px;">CITA DE CONTROL: '+fecha2.substring(0, 10)+'</label></div><br>';
    }else{
        if(fecha1 != 'NO'){
            cuerpo2 += '<div><label style="font-size: 12px;">SU PROXIMA CITA ES: '+fecha1.substring(0, 10)+'</label></div><><br>';
        }else{
            cuerpo2 += '<div><label style="font-size: 12px;">CITA ABIERTA</label></div><br>';
        }
    }

    var vector = $("#Especialidad").find("option:selected");
    var especialidad = "";
    $.each(vector, function(a) {
      especialidad += $(this).html()+" / ";
    });
    if(especialidad!=""){
      cuerpo2 += '<label style="font-size: 12px; margin-left: 1em;">USTED TIENE INTERCONSULTA CON: '+especialidad+'</label>';
    }

    var cabecera = '<div style="width: 100%;overflow: hidden;height:35px;">'+
                    '<div style="width: 50%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Paciente:</b> '+nombrePacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 15%; float: left;">'+
                        '<label style="font-weight: normal;"><b>HCU:</b> '+hcuPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 35%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Edad:</b> '+edadPacienteImprimir+'</label>'+
                    '</div>'+
                    '<div style="width: 35%; float: left;">'+
                        '<label style="font-weight: normal;"><b>Fecha:</b> '+fecha.substring(0, 10)+'</label>'+
                    '</div>'+
                '</div>';

   

    var firmas = '<div style="float: right; width:100%;"><label style="float: right; font-weight:bold; font-size: small;">________________________________________</label><br>'+
        '<label style="float: right; font-weight:bold; font-size: small;">Dr(a). '+nombreDoctor.toUpperCase()+'</label></div>';
    
    var estilos2 ='.page-header, .page-header-space {'
                      +'height: 100px;'
                    +'}'
                    +''
                    +'.page-footer, .page-footer-space {'
                      +'height: 50px;'
                    +''
                    +'}'
                    +''
                    +'.page-footer {'
                      +'position: fixed;'
                      +'bottom: 0;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page-header {'
                      +'position: fixed;'
                      +'top: -2.4em;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page {'
                      +'page-break-after: always;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'@media print {'
                       +'thead {display: table-header-group;} '
                       +'tfoot {display: table-footer-group;}'
                    +'   '
                       +'button {display: none;}'
                    +'   '
                       +'body {margin: 0;}'
                    +'}';
        
    

    if($('.body').find("#datatableOrdenReceta tbody tr").find('td').html()!="No existen datos"){
        
        childWindow = window.open('_blank');
        childWindow.document.write('<html>')
        childWindow.document.write('<head>')
        childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
        childWindow.document.write('</head>')
        childWindow.document.write('<body>')
        childWindow.document.write('<div class="page-header">')
        childWindow.document.write($('.body').find('div#cabecera').html())
        childWindow.document.write('</div>')
        childWindow.document.write('<table>')
        childWindow.document.write('<thead>')
        childWindow.document.write('<tr>')
        childWindow.document.write('<td>')
        childWindow.document.write('<!--place holder for the fixed-position header-->')
        childWindow.document.write('<div class="page-header-space"></div>')
        childWindow.document.write('</td>')
        childWindow.document.write('</tr>')
        childWindow.document.write('</thead>')
        childWindow.document.write('<tbody>')
        childWindow.document.write('<tr>')
        childWindow.document.write('<td>')
        childWindow.document.write('<!--*** CONTENT GOES HERE ***-->')
        childWindow.document.write('<div class="page">'+cabecera+cuerpo2+firmas+'</div>');        
        childWindow.document.write('</td>')
        childWindow.document.write('</tr>')
        childWindow.document.write('</tbody>')
        childWindow.document.write('<tfoot>')
        childWindow.document.write('<tr>')
        childWindow.document.write('<td>')
        childWindow.document.write('<!--place holder for the fixed-position footer-->')
        childWindow.document.write('<div class="page-footer-space"></div>')
        childWindow.document.write('</td>')
        childWindow.document.write('</tr>')
        childWindow.document.write('</tfoot>')
        childWindow.document.write('</table>')
        childWindow.document.write('</body>')
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
        childWindow.document.write('</html>')
    }    
}

function ReimprimirprintTextAreaCertificado() {

    var estilos2 ='.page-header, .page-header-space {'
                      +'height: 150px;'
                    +'}'
                    +''
                    +'.page-footer, .page-footer-space {'
                      +'height: 50px;'
                    +''
                    +'}'
                    +''
                    +'.page-footer {'
                      +'position: fixed;'
                      +'bottom: 0;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page-header {'
                      +'position: fixed;'
                      +'top: -2em;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'.page {'
                      +'page-break-after: always;'
                      +'width: 100%;'
                    +'}'
                    +''
                    +'@media print {'
                       +'thead {display: table-header-group;} '
                       +'tfoot {display: table-footer-group;}'
                    +'   '
                       +'button {display: none;}'
                    +'   '
                       +'body {margin: 0;}'
                    +'}';
        

        childWindow = window.open('_blank');
        childWindow.document.write('<html>')
        childWindow.document.write('<head>')
        childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
        childWindow.document.write('</head>')
        childWindow.document.write('<body>')

        childWindow.document.write('<div class="page-header">')        
        //childWindow.document.write($('.body').find('div#cabecera').html())        
        childWindow.document.write('</div>')
        childWindow.document.write('<div class="page-header-space"></div>')

    
        childWindow.document.write('<div class="page">');   
        childWindow.document.write(editor1.getValue());
        childWindow.document.write('</div>')
    
        childWindow.document.write('</body>')
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
        childWindow.document.write('</html>')

}

var tablaHistoricoConsulta = $("#datatableHistorico").DataTable({
        "ordering": false,
        //scrollX:true,
        'paging': false,
        'lengthChange': false,
        keys:true,
            "columnDefs": [{
                "targets": [3],
                "width": "200px"
            }],
        scrollY:250,
    });

function CargarHistoricoConsultas(id){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargarHistoricoConsultas",
            Id:id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        try {
            tablaHistoricoConsulta.clear().draw();
        } catch (error) {}
        
        $.each(respuesta, function(i, value) {
            
            tablaHistoricoConsulta.row.add(value);
            
        });
        tablaHistoricoConsulta.draw(false);
        
        

     }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });   
}


$(".body").on('click', "button#ImprimeRecetaNueva", function(evt) {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelecReceta').val());
    });
    $("#modal-ride").modal();
});

$(".body").on('click', "button#ImprimeCertificado", function(evt) {
    ReimprimirprintTextAreaCertificado();
});


$(".body").on('click', "button#ImprimirTodoEmelec", function(evt) {
    $("#modal-cargando").modal();
    
});

$('#modal-cargando').on('shown.bs.modal', function(){
    $.each(RespuestaTablaConsultaExterna, function(i, value) {

            tablaDoctoresporConsulta += '<div style="width: 100%;text-align: left;margin-bottom: 5px;border: groove;">       '
                                            +'<table style="width: 100%" border="1">'
                                                +'<thead style="background: #CCFFCC;">'
                                                    +'<th>FECHA</th>'
                                                    +'<th>DOCTOR</th>'
                                                    +'<th>ESPECIALIDAD</th>'
                                                +'</thead>'
                                                +'<tbody>'
                                                    +'<tr>'
                                                        +'<td>'+value[5]+'</td>'
                                                        +'<td>'+value[3]+' '+value[2]+'</td>'
                                                        +'<td>'+value[1]+'</td>'
                                                    +'</tr>'
                                                +'</tbody>'
                                            +'</table>'
                                        +'</div>';

            tablaDoctoresporConsulta += CargarTablaSignosVitalesImprimir(value[16]);
            tablaDoctoresporConsulta += CargarTablaEvoluciones(value[16]);      
            tablaDoctoresporConsulta += CargarTablaDiagnosticos(value[16]);
            tablaDoctoresporConsulta += tablaPlantratemientoPorConsulta;                        
    });
    ImprimirHistoriaClinica();
});

function ReimprimirprintTextAreaEmelec() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelec').val());
    });
    $("#modal-ride").modal();
    
}

function ReimprimirprintTextAreaEmelecLab() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelecLab').val());
    });
    $("#modal-ride").modal(); 
    
}

function ReimprimirprintTextAreaEmelecRx() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelecRx').val());
    });
    $("#modal-ride").modal();
}

function ReimprimirprintTextAreaEmelecEco() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelecEco').val());
    });
    $("#modal-ride").modal();
}

function ReimprimirprintTextAreaEmelecTac() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html($('.body').find('input#reporteEmelecTac').val());
    });
    $("#modal-ride").modal();
}

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
    $('div#ProcedimientosLaboratorio').html("");
    $('div#ProcedimientosRayos').html("");
    $('div#ProcedimientosEcografia').html("");
    $('div#ProcedimientosTac').html(""); 
    $('div#FarmacoReceta').html(""); 
    $('ul#diagnosticoPaciente').html(""); 
     var cerrar = $('.body').find('button.close');
     $("ul#ListaAAP li").each(function(j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaAPF li").each(function(j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaRevision li").each(function(j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaExamenFisico li").each(function(j) {
        if ($(this).find('input').is(':checked')) { 
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });

    
    /**/
    var fila = $(this);

    nombrePacienteImprimir = fila.find('td').eq(2).html() + ' ' + fila.find('td').eq(3).html() + ' ' + fila.find('td').eq(4).html();
    
    //generoPacienteImprimir = sexo;
    var idPaciente = $(this).find('td').eq(0).html();
    hcuPacienteImprimir = idPaciente;
    var fecha_nacimiento = fila.find('td').eq(7).find('span').attr('fecha_nacimiento');

    var edad = calcularEdad(fecha_nacimiento);
    edadPacienteImprimir = edad;

    
    
    ciImprimir = fila.find('td').eq(1).html();
    banderaGuardar=true;
    
    
    $("span#NombrePaci").html(nombrePacienteImprimir);
    $("span#CedulaPaci").html(generoPacienteImprimir);
    
    $("span#HCU").html(idPaciente);
    $("span#EdadPaci").html(edad);
    

    if(generoPacienteImprimir=='FEMENINO'){
        $('.body li#Femenino').fadeIn();
    }else{
        $('.body li#Femenino').fadeOut();
    }
    pacienteSeleccionado=idPaciente;
    CargarConsultas(idPaciente);
    CargarEnfermedad(idPaciente);
    CargarAlergias(idPaciente);
    CargarGineco(idPaciente);
    editor.setValue("");
    editor.composer.disable(); 
    CargarPlantillasProcedimiento(idPaciente);
    CargarHistoricoRx(idPaciente);
    CargarHistoricoEco(idPaciente);
    CargarHistoricoTac(idPaciente);
    CargarEpidemiologico(idPaciente);
    CargarHistoricoConsultas(idPaciente);
    CargarUltimos3SignosVitales(idPaciente);
    
    
    $('#Historico').attr("disabled",false);
     
    cerrar.trigger('click');
});

$(".body").on('click', "span#PendienteLab", function(evt) {
    ReimprimirprintTextAreaEmelecLab();
});

$(".body").on('click', "span#PendienteRx", function(evt) {
    ReimprimirprintTextAreaEmelecRx();
});

$(".body").on('click', "span#PendienteEco", function(evt) {
    ReimprimirprintTextAreaEmelecEco();
});

$(".body").on('click', "span#PendienteTac", function(evt) {
    ReimprimirprintTextAreaEmelecTac();
});

var chartPresion = null;
function CargarGraficoPresion(){
  var ctx = document.getElementById('lineChart').getContext('2d');  
  chartPresion = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: [
                {
                  label               : 'SISTOLICA',
                  fill: false,
                  backgroundColor: 'rgba(60,141,188,0.9)',
                  borderColor: 'rgba(60,141,188,0.9)',
                  borderWidth: 1
                },
                {
                  label               : 'DIASTOLICA',
                  fill: false,                  
                  backgroundColor: 'rgba(255,165,0, 1)',
                  borderColor: 'rgba(255,165,0, 1)',
                  borderWidth: 1
                },
                {
                  label               : 'PULSO',
                  fill: false,                  
                  backgroundColor: 'rgba(0,255,255, 1)',
                  borderColor: 'rgba(0,255,255, 1)',
                  borderWidth: 1
                }
          ]
      },
      options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Curva de Presion Arterial'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
  });
}
CargarGraficoPresion()

var chartPeso = null;
function CargarGraficoPeso(){
  var ctx = document.getElementById('lineChart2').getContext('2d');  
  chartPeso = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [],
          datasets: [
                {
                  label               : 'PESO',
                  fill: false,
                  backgroundColor: 'rgba(60,141,188,0.9)',
                  borderColor: 'rgba(60,141,188,0.9)',
                  borderWidth: 1
                },
                {
                  label               : 'TALLA',
                  fill: false,                  
                  backgroundColor: 'rgba(255,165,0, 1)',
                  borderColor: 'rgba(255,165,0, 1)',
                  borderWidth: 1
                }
          ]
      },
      options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Histograma de peso y talla'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
  });
}
CargarGraficoPeso()

function CargarUltimos3SignosVitales(Id_paciente) {
      $.ajax({
          method: "POST",
          url: "Ajax/Aj_Signos.php",
          data: {
              Requerimiento: "CargarUltimos3SignosVitales",
              Id: Id_paciente
          },
          dataType: 'JSON',
      }).done(function(respuesta) {
          if (respuesta[0] == false) {
              swal("Esculapio!", "OCURRIO UN ERROR.", "error");
              return;
          }
          var fechas =[];
          var data1 = [];
          var data2 = [];
          var data3 = [];
          var dataset = [];

          var data4 = [];
          var data5 = [];
          var dataset2 = [];
          try {
              tablaUltimosSignos.clear().draw();
          } catch (error) {} 
          $.each(respuesta, function(i, value) {
              fechas.push(value[11]);
              var dato = value[2].split("/");
              data1.push(dato[0]);
              data2.push(dato[1]);
              data3.push(value[3]);

              data4.push(value[5]);
              data5.push(value[4]);

              var campos = [respuesta[i][1],
                  respuesta[i][2],
                  respuesta[i][3],
                  respuesta[i][4],
                  respuesta[i][5],
                  respuesta[i][6],
                  respuesta[i][7],
                  respuesta[i][8],
                  respuesta[i][9],
                  respuesta[i][10],
                  respuesta[i][11],
                  respuesta[i][12],
                  respuesta[i][13],
                  respuesta[i][14],
                  respuesta[i][15],
                  respuesta[i][16],
                  respuesta[i][17]
              ];
              tablaUltimosSignos.row.add(campos).node().id = respuesta[i][0];              
          });
          dataset = [data1,data2,data3];
          dataset2 = [data4,data5];
          tablaUltimosSignos.draw(false);
          addData(chartPresion, fechas, dataset)
          addData(chartPeso, fechas, dataset2)

          
      }).fail(function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown)
      });
}

function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data[0];
    chart.data.datasets[1].data = data[1];
    if(data[2]!=undefined){
        chart.data.datasets[2].data = data[2];
    }
    chart.update();
}

$('#modal-enfermeria').on('shown.bs.modal', function(){
  var table = $.fn.dataTable.fnTables(true);
             if ( table.length > 0 ) {
                  $(table).dataTable().fnAdjustColumnSizing();
                }
});
$('#modal-historico').on('shown.bs.modal', function(){
    tablaHistoricoConsulta.search("").draw();
});

function ImprimirHistoriaClinica(){

    var cabeceraHCU =   '<div style="width: 100%; float: left;text-align: center;">'
                           +'<img src="'+$("#imagenEmpresa").val()+'" style="width: 50%; height: 80px;">'
                        +'</div>'
                        +'<div style="width: 100%;font-weight: bold;text-align: center;">'
                            +$("#Empresa").val()
                        +'</div>'
                        +'<div style="width: 100%;font-weight: bold;text-align: center;">'
                            +'HISTORIA CLINICA COMPLETA'
                        +'</div>';
    
    var reporte =       '<div style="width: 100%;font-weight: bold;text-align: center;">'
                            +'CONSULTA EXTERNA - ANAMNESIS Y EXAMEN FISICO'
                        +'</div>'
                        +'<br>'
                        +'<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                            +'<table style="width: 100%" border="1">'
                                +'<thead style="background: #CCFFCC;">'
                                    +'<th>PACIENTE</th>'
                                    +'<th>SEXO</th>'
                                    +'<th>EDAD</th>'
                                    +'<th>N° HISTORIA CLINICA</th>'
                                +'</thead>'
                                +'<tbody>'
                                    +'<tr>'
                                        +'<td>'+$("#NombrePaci").html()+'</td>'
                                        +'<td>'+$("#CedulaPaci").html()+'</td>'
                                        +'<td>'+$("#EdadPaci").html()+'</td>'
                                        +'<td>'+$("#HCU").html()+'</td>'
                                    +'</tr>'
                                +'</tbody>'
                            +'</table>'
                        +'</div>'
                        +'<br>'
                        +'<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                            +'<table style="width: 100%" border="1">'
                                +'<thead style="background: #C2C2F0;">'
                                    +'<th>ANTECEDENTES PERSONALES</th>'
                                +'</thead>'
                                +'<tbody>'
                                    +filaEnfermedadesPersonales
                                +'</tbody>'
                            +'</table>'
                        +'</div>'
                        +'<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                            +'<table style="width: 100%" border="1">'
                                +'<thead style="background: #C2C2F0;">'
                                    +'<th>ANTECEDENTES FAMILIARES</th>'
                                +'</thead>'
                                +'<tbody>'
                                    +filaEnfermedadesFamiliares
                                +'</tbody>'
                            +'</table>'
                        +'</div>'
                        +'<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                            +'<table style="width: 100%" border="1">'
                                +'<thead style="background: #C2C2F0;">'
                                    +'<th>REVISION ACTUAL DE ORGANOS Y SISTEMAS</th>'
                                +'</thead>'
                                +'<tbody>'
                                    +filaEnfermedadesOrganos
                                +'</tbody>'
                            +'</table>'
                        +'</div>'
                        +'<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                            +'<table style="width: 100%" border="1">'
                                +'<thead style="background: #C2C2F0;">'
                                    +'<th>EXAMEN FISICO REGIONAL</th>'
                                +'</thead>'
                                +'<tbody>'
                                    +filaEnfermedadesFisicos
                                +'</tbody>'
                            +'</table>'
                        +'</div>                            '
                        +'<br>'
                        +'<div style="width: 100%;font-weight: bold;text-align: center;">'
                            +'CONSULTA EXTERNA - EVOLUCION Y PRESCRIPCIONES'
                        +'</div>'
                        +'<br>'
                        +tablaDoctoresporConsulta;
    $("#modal-cargando").modal("hide");
        childWindow = window.open('_blank');            
        childWindow.document.write(cabeceraHCU+reporte);
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>');                
}

function CargarTablaSignosVitalesImprimir(idItem){
    var tablasignosvitalesimprimir = '';
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarSignosPorItem",            
            Item:idItem
        },
        dataType: 'JSON',
    }).done(function(respuesta){
        $.each(respuesta, function(i, value){
            tablasignosvitalesimprimir += '<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                                            +'<table style="width: 100%" border="1">'
                                                +'<thead style="background: #C2C2F0;">'
                                                    +'<th>SIGNOS VITALES Y ANTROPOMETRIA</th>'
                                                +'</thead>'
                                                +'<tbody>'
                                                    +'<tr>'
                                                        +'<table style="width: 100%" border="1">'
                                                            +'<thead>'
                                                                +'<th>FECHA</th>'
                                                                +'<th>PRESION</th>'
                                                                +'<th>PULSO</th>'
                                                                +'<th>PESO</th>'
                                                                +'<th>TALLA</th>'
                                                                +'<th>IMC</th>'
                                                                +'<th>TEMP. AXILAR</th>'
                                                                +'<th>F.R.</th>'
                                                            +'</thead>'
                                                            +'<tbody>'
                                                                +'<tr>'
                                                                    +'<td>'+value[0]+'</td>'
                                                                    +'<td>'+value[1]+'</td>'
                                                                    +'<td>'+value[2]+'</td>'
                                                                    +'<td>'+value[3]+'</td>'
                                                                    +'<td>'+value[4]+'</td>'
                                                                    +'<td>'+value[5]+'</td>'
                                                                    +'<td>'+value[8]+'</td>'
                                                                    +'<td>'+value[12]+'</td>'
                                                                +'</tr>'
                                                            +'</tbody>'
                                                        +'</table>'
                                                    +'</tr>               '
                                                +'</tbody>'
                                            +'</table>'
                                        +'</div>'
                                        +'<br>';
        });
    });

    return tablasignosvitalesimprimir;
}

function CargarTablaEvoluciones(idItem){
    var tablaevolucionesImprimir = '';
    tablaPlantratemientoPorConsulta = '';
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProblemaPorItem",            
            Item:idItem
        },
        dataType: 'JSON',
    }).done(function(respuesta){
        $.each(respuesta, function(i, value){
            tablaevolucionesImprimir += '<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                                            +'<table style="width: 100%" border="1">'
                                                +'<thead style="background: #C2C2F0;">'
                                                    +'<th>ENFERMEDAD O PROBLEMA ACTUAL</th>'
                                                +'</thead>'
                                                +'<tbody>'
                                                    +'<tr>'
                                                        +'<td>'
                                                            +value[0]
                                                        +'</td>'
                                                    +'</tr>'
                                                +'</tbody>'
                                            +'</table>'
                                        +'</div>'
                                        +'<br>';

            tablaPlantratemientoPorConsulta += '<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                                                +'<table style="width: 100%" border="1">'
                                                    +'<thead style="background: #C2C2F0;">'
                                                        +'<th>PLANES DE TRATAMIENTO</th>'
                                                    +'</thead>'
                                                    +'<tbody>'
                                                        +'<tr><td>'
                                                            +value[1].replace(/'/g,'"').replace(/h5/g,"label")
                                                        +'</td></tr>'
                                                        +'<tr><td>'
                                                            +value[2].replace(/'/g,'"').replace(/h5/g,"label")
                                                        +'</td></tr>'
                                                        +'<tr><td>'
                                                            +value[3].replace(/'/g,'"').replace(/h5/g,"label")
                                                        +'</td></tr>'
                                                        +'<tr><td>'
                                                            +value[4].replace(/'/g,'"').replace(/h5/g,"label")
                                                        +'</td></tr>'
                                                        +'<tr><td>'
                                                            +value[5].replace(/'/g,'"').replace(/h5/g,"label")
                                                        +'</td></tr>'
                                                    +'</tbody>'
                                                +'</table>'
                                            +'</div>';       
                                                            
        });
    });

    return tablaevolucionesImprimir;
}

function CargarTablaDiagnosticos(idItem){

    var tabladiagnosticosImprimir = '<div style="width: 100%;text-align: left;margin-bottom: 5px;">'
                                            +'<table style="width: 100%" border="1">'
                                                +'<thead style="background: #C2C2F0;">'
                                                    +'<th>DIAGNOSTICO</th>'
                                                    +'<th>CIE</th>'
                                                    +'<th>TIPO DE DIAGNOSTICO</th>'
                                                +'</thead>'
                                                +'<tbody>';
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarDiagnosticoPorItem",            
            Item:idItem
        },
        dataType: 'JSON',
    }).done(function(respuesta){
        $.each(respuesta, function(i, value){
            tabladiagnosticosImprimir +=    '<tr>'
                                                +'<td>'+value[0]+'</td>'
                                                +'<td>'+value[1]+'</td>'
                                                +'<td>'+value[2]+'</td>'
                                            +'</tr>';
                                                
        });

        tabladiagnosticosImprimir +='</tbody>'
                                    +'</table>'
                                    +'</div>'
                                    +'<br>'; 
    });

    return tabladiagnosticosImprimir;
}

$('.body').on('click', '#EliminarAtencion', function(evt) {  
    if(idItem==0){
        swal("Sistema!", "Seleccione la consulta que desea eliminar.", "warning");
        return;
    }
    swal({
            title: "Sistema",
            text: "Seguro Que Desea Eliminar la Atencion Seleccionada ?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                EliminarAtencion()
            }else{
                
            } 
        });                   
}); 

function EliminarAtencion(){
            $.ajax({
                    method:"POST",
                    url:"Ajax/Aj_Consulta.php",
                    data: {Requerimiento:"EliminarAtencion",Item:idItem,Consulta:idConsulta},
                    dataType: 'JSON',
            }).done(function(respuesta) {                    
                if(respuesta[0]==true){
                    swal("Sistema!", "Eliminada con exito.!", "success");                                
                }
                if(respuesta[0]==false){
                    swal("Sistema!", "Ocurrio un error al eliminar.", "error");
                }
            }).fail( function(jqXHR, textStatus, errorThrown ) {
                    console.log(errorThrown);                    
            });
}