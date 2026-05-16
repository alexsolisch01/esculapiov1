
var nombrePacienteImprimir = '';
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
$('.textareaReceta').wysihtml5();
var editorObj = $(".textareaEnfermedad").data('wysihtml5');
var editorObj1 = $(".textareaCertificado").data('wysihtml5');
var editor = editorObj.editor;
var editor1 = editorObj1.editor;
var banderaGuardar = true;
var pacienteSeleccionado=0;
var idConsulta=0;
var idItem=0;


$('#modal-certificado').on('shown.bs.modal', function() {
    var fecha = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var numero = $('.body').find('input#NumeroDias').val();
    var descripcionCie = $('.body').find('ul#diagnosticoPaciente li span.text').text();
    var codigoCie = $('.body').find('ul#diagnosticoPaciente li span#cie').text();
    var nombreDoctor = $('input#nombreCompleto').val();
    editor1.setValue("<br><h4>Guayaquil, "+fecha.toLocaleDateString("es-ES", options)+"</h4><br><br>"+
        "<label>Certifico que el(la) paciente <strong>"+nombrePacienteImprimir+"</strong> de <strong>"+edadPacienteImprimir+" años</strong> de edad; ha recibido atención "+
        "médica el día "+fecha.toLocaleDateString("es-ES", options)+". Por presentar cuadro clínico compatible según el CIE-10"+
        " con: "+descripcionCie+" - "+codigoCie+" Por lo cual recomiendo "+
        "<strong>NO.</strong> "+numero+" días de reposo, salvo complicaciones.</label>"+
        "<br><br><label>Días de reposo en letras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+NumeroALetras(numero)+"</label>"+
        "<br><label>Días de reposo en número:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+numero+"</label>"+
        "<br><label>Desde:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+fecha.toLocaleDateString("es-ES", options)+"</label>"+
        "<br><label>Hasta:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+sumarDias(fecha, numero).toLocaleDateString("es-ES", options)+"</label>"+
        "<br><br><br><label>Atentamente,</label><br><br><br><label>________________________________________"+
        "</label><br><label>Dr.(a). "+nombreDoctor.toUpperCase()+"</label>");
});

$(".body").on('change', "input#NumeroDias", function(ev) {
    if($(this).val()==""){
        $(this).val("1");
    }
        var fecha = new Date();
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var numero = $('.body').find('input#NumeroDias').val();
        
        var descripcionCie = $('.body').find('ul#diagnosticoPaciente li span.text').text();
        var codigoCie = $('.body').find('ul#diagnosticoPaciente li span#cie').text();
        var nombreDoctor = $('input#nombreCompleto').val();
        editor1.setValue("<br><h4>Guayaquil, "+fecha.toLocaleDateString("es-ES", options)+"</h4><br><br>"+
        "<label>Certifico que el(la) paciente <strong>"+nombrePacienteImprimir+"</strong> de <strong>"+edadPacienteImprimir+" años</strong> de edad; ha recibido atención "+
        "médica el día "+fecha.toLocaleDateString("es-ES", options)+". Por presentar cuadro clínico compatible según el CIE-10"+
        " con: "+descripcionCie+" - "+codigoCie+" Por lo cual recomiendo "+
        "<strong>NO.</strong> "+numero+" días de reposo, salvo complicaciones.</label>"+
        "<br><br><label>Días de reposo en letras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+NumeroALetras(numero)+"</label>"+
        "<br><label>Días de reposo en número:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+numero+"</label>"+
        "<br><label>Desde:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+fecha.toLocaleDateString("es-ES", options)+"</label>"+
        "<br><label>Hasta:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+sumarDias(fecha, numero).toLocaleDateString("es-ES", options)+"</label>"+
        "<br><br><br><label>Atentamente,</label><br><br><br><label>_________________________________________"+
        "</label><br><label>Dr.(a). "+nombreDoctor.toUpperCase()+"</label>");
        
});

function sumarDias(fecha, dias){
    var f2 = new Date($('#FechaActualEsculapio').val());
    //f2.setDate(f2.getDate() + 1); 
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

//$('#HistorioRxAgenda_wrapper').prepend('<button style="margin-top:2em;" id="ImprimeAgendaRx" type="button" class="btn btn-primary"><i class="fa fa-clone"></i>Imprimir</button>');

$(".body").on('click', "li#PacienteConsultaExterna", function(ev) {
    //alert($(this).find("a").attr("imc"));
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

    var estado = $(this).find("a").attr("Estado");
    var nombre = $(this).find("a").attr("nombrePaciente");
    nombrePacienteImprimir = nombre;
    var cedula = $(this).find("a").attr("Sexo");
    generoPacienteImprimir = cedula;
    var idPaciente = $(this).find("a").attr("idPaciente");
    hcuPacienteImprimir = idPaciente;
    var edad = $(this).find("a").attr("Edad");
    edadPacienteImprimir = edad;
    var presion = $(this).find("a").attr("Presion");
    var pulso = $(this).find("a").attr("Pulso");
    var freres = $(this).find("a").attr("FreRes");
    var taxilar = $(this).find("a").attr("TAxilar");
    var peso = $(this).find("a").attr("Peso");
    var talla = $(this).find("a").attr("Talla");
    var imc = $(this).find("a").attr("Imc");
    var cefalico = $(this).find("a").attr("PCefalico");
    banderaGuardar=true;
    //$("button#GuardarProblema").prop("disabled",false);
    if(estado == 1 ){
        swal("Esculapio!", "Paciente no ha pasado por Enfermeria!", "warning");
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
        tabla.clear().draw();
        tablaPlantillaProcedimiento.clear().draw();
        return;
    }
    $("span#NombrePaci").html(nombre);
    $("span#CedulaPaci").html(cedula);
    $("span#HCU").html(idPaciente);
    $("span#EdadPaci").html(edad);
    $("span#PresionPaci").html(presion);
    $("span#PulsoPaci").html(pulso+' X Min');
    $("span#PesoPaci").html(peso+' Kg');
    $("span#TallaPaci").html(talla+' CM');
    $("span#ImcPaci").html(imc);
    $("span#TAxilar").html(taxilar+'° C');
    $("span#PCefalico").html(cefalico+' CM');
    $("span#FRPaci").html(freres+' X Min');

    if(cedula=='FEMENINO'){
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
    $('#Historico').attr("disabled",false);
});

$(".body").on('click', "button#GuardarAlergia", function(ev) {

    var idPaciente = $('.body').find('span#HCU').text();
    var idMedico =  $('.body').find('span#idMedico').text();
    var idEspecialidad = $('.body').find('span#idEspecialidad').text();
    var idProcedimiento = $('.body').find('span#idProcedimiento').text();
    var alergia = $('.body').find('#DescripcionAlergia').val();

    if(idPaciente=='------'){
        swal("Esculapio!", "Debe seleccionar un Paciente.!", "error");
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
            GuardaAlergia(idPaciente,idMedico,idEspecialidad,alergia);
        } else {

        }
    });
});


function GuardaAlergia(idPaciente,idMedico,idEspecialidad,alergia) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarAlergia",
            Paciente: idPaciente,
            Medico:idMedico,
            Especialidad:idEspecialidad,
            Alergia:alergia
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        var nombre = $('span#nombresUsuario').attr('nombres');
        if (respuesta[0] == true) {
            swal("Esculapio!", "Alergia Guardada.!", "success");
            var fila = JSON.parse(respuesta[1]);
            var campos = [fila[0][6],nombre, fila[0][2]];
            var objeto = ["AlergiaGuardar", '#datatableAlergias', campos];
            send(JSON.stringify(objeto));
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
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro de examen ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar ", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
 
editor.on("load", function() {
   var $doc = $(editor.composer.doc);
        $doc.keyup(function(){
            AgregarProblemaTemp(idItemTemporal,$('#DescripcionEnfermedad').val());
        });
});

function AgregarProblemaTemp(item,problema){
    
    var ProblemaAnterior = [item,problema,$('ul#diagnosticoPaciente').html(),$('div#planTratamientos').html()];
    if(arrayProblema.length==0){        
        
        arrayProblema.push(ProblemaAnterior); 
    }else{
        var confirma = true;
        $.each(arrayProblema, function(p, itenp) {
            
            if (arrayProblema[p][0] == ProblemaAnterior[0]) {
                arrayProblema[p]= ProblemaAnterior;
                confirma = false;                        
            }
        });
        if (confirma) {                 
            arrayProblema.push(ProblemaAnterior);
        }
    }
}
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
    idConsulta = tabla.row($(this)).data()[7];
    idItem = tabla.row($(this)).data()[13];
    
    $("span#idMedico").html(idMedico);
    $("span#idEspecialidad").html(idEspecialidad);
    $("span#idProcedimiento").html(idProcedimiento);
    CargarSignosPorPaciente(idPaciente,fechaAtencion,idMedico,idEspecialidad,idProcedimiento);
    CargarProblema(idPaciente,idConsulta,idItem);
    CargarDiagnostico(idConsulta,idItem);
    $("button#ImprimirTodoEmelec").fadeIn(0);

    idTipoServicio=tabla.row($(this)).data()[15];

                if(idTipoServicio==14){
                    CargarProcedimientosParteDiario("3,4,5,6,25,32,33,38,42,65,1,2,40,41,71,72,73,74,75,76,77,78");    

                      
                      $('div.nivel1PareDiario').fadeOut(0);
                      $('div.nivel1PareDiario[name=general]').fadeIn(1);
                      $('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);
                      
                      
                      $('div.3nivelParteDiaria').fadeIn(0);
                      $('div.3nivelParteDiaria[name=interconsulta]').fadeOut(1);
                      $('div.3nivelParteDiaria[name=condicion]').fadeOut(1);
                }
                if(idTipoServicio==13){
                    CargarProcedimientosParteDiario("12,14,17,18,19,24,29,31,43,44,46,47,48,49,51,52,53,54,55,56");    

                      
                      $('div.nivel1PareDiario').fadeOut(0);
                      $('div.nivel1PareDiario[name=general]').fadeIn(1);
                      $('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);
                      
                      
                      $('div.3nivelParteDiaria').fadeIn(0);
                      $('div.3nivelParteDiaria[name=interconsulta]').fadeOut(1);
                      $('div.3nivelParteDiaria[name=condicion]').fadeOut(1);
                }
                if(idTipoServicio==1){
                    CargarProcedimientosParteDiario("7,8,9,10,11,13,15,16,20,21,22,23,27,28,30,34,35,36,37,39,57,58,59,60,61,62,67,68,69,70,79");    

                      
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
        $('button#HcuPaciente').prop("disabled",true);
        $('button#PrescriPaciente').prop("disabled",true);
        $('button#ServicioPaciente').prop("disabled",true);
        $('button#parteDiaria').prop("disabled",true);

        //AgregarProblemaTemp(idItemTemporal,$('#DescripcionEnfermedad').val());
    }else{
        if(banderaGuardar){
            idItemTemporal = idItem;
            $("button#GuardarProblema").prop("disabled",false);   

            editor.composer.enable();  
              $('button#HcuPaciente').prop("disabled",false);
              $('button#PrescriPaciente').prop("disabled",false);
              $('button#ServicioPaciente').prop("disabled",false);
              $('button#parteDiaria').prop("disabled",false);
        }
    }
    //$(this).find('td').focus();
    
});

function CargarSignosPorPaciente(idPaciente,fechaAtencion,idMedico,idEspecialidad,idProcedimiento) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarSignosPorPacienteFecha",
            IdPaciente: idPaciente,
            FechaAtencion: fechaAtencion,
            IdMedico: idMedico,
            IdProcedimiento: idProcedimiento,
            IdEspecialidad: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            editor.composer.disable();
            //$('tr.selected').click();
            banderaGuardar=false;
            $("button#GuardarProblema").prop("disabled",true);
            $('button#HcuPaciente').prop("disabled",true);
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

var sinOrden = false;

function CargarConsultas(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarConsultas",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        tabla.clear().draw();
        
        $.each(respuesta, function(i, value) {
            
            var lab='';
            var rx='';
            var eco='';
            var tac='';
            var rec='';

            if(value[10] == 17){
                lab='<span class="btn-sm btn-warning" >P</span>';
                sinOrden = true;
            }

            if(value[11] == 17){
                rx='<span class="btn-sm btn-warning" >P</span>';
                sinOrden = true;
            }

            if(value[12] == 17){
                eco='<span class="btn-sm btn-warning" >P</span>';
                sinOrden = true;
            }

            if(value[13] == 17){
                tac='<span class="btn-sm btn-warning" >P</span>';
                sinOrden = true;
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
function CargarEnfermedad(idPaciente){
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
                        }
                        });
                    $("ul#ListaAPF li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                        }
                    });
                    $("ul#ListaRevision li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                        }
                    });
                    $("ul#ListaExamenFisico li").each(function(i) {
                        var enfermedad = $(this).find('input').attr('value');
                        if (enfermedad == horarios[h][1]) {
                            $(this).find('input').prop('checked', true);
                            $(this).append('<textarea class="form-control" type="text" name="">');
                            $(this).find('textarea').val(horarios[h][2]);
                        }
                    });
                });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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

$(".body").on('click', "button#GuardarAAP", function(ev) {
    var lista = "ul#ListaAAP li";
    var idPaciente = $('.body').find('span#HCU').text();
        if(idPaciente=='------'){
            swal("Esculapio!", "Debe seleccionar a un Paciente!", "error");
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
            GuardarEnfer(lista,idPaciente)
        } else {
            limpiar.trigger('click');
        }
    });
});

function GuardarEnfer(lista,idPaciente){
        $(lista).each(function(j) {
            var enfermedad = $(this).find('input').attr('value');
            var descripcion = $(this).find('textarea').val();
            EliminarEnfermedad(idPaciente,enfermedad);
            if ($(this).find('input').is(':checked')) {
                $.ajax({
                    method: "POST",
                    url: "Ajax/Aj_Agenda.php",
                    data: {
                        Requerimiento: "GuardarEnfermedad",
                        Paciente: idPaciente,
                        Enfermedad: enfermedad,
                        Descripcion: descripcion
                    },
                    dataType: 'JSON',
                }).done(function(respuesta) {
                    if (respuesta[0] == true) {
                        swal("Esculapio!", "Enfermedades Guardadas!", "success");
                    }
                    if (respuesta[0] == false) {
                        swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                });
            }
        });
}

function EliminarEnfermedad(idPaciente,enfermedad){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "EliminaEnfermedad",
            IdPaciente: idPaciente,
            Enfermedad: enfermedad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
                    
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body").on('click', "button#GuardarAPF", function(ev) {
    var lista = "ul#ListaAPF li";
    var idPaciente = $('.body').find('span#HCU').text();
        if(idPaciente=='------'){
            swal("Esculapio!", "Debe seleccionar a un Paciente!", "error");
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
            GuardarEnfer(lista,idPaciente)
        } else {
            limpiar.trigger('click');
        }
    });
});

$(".body").on('click', "button#AgregarAlInicio", function(ev) {
    var cerrar = $('#modal-partediaria').find('button.close');
    $("#diagnosticoPaciente").empty();
    var vector = $("div#Enfermedades");
    if(vector.length == 0){
        swal("Esculapio!", "Seleccione una enfermedad del CIE", "warning");
            return;
    }
     $.each(vector, function(a) {
        var elemento = '<li><span id="cie" class="badge bg-green">'+$(this).find('span#cie').text()+'</span><span class="text">'+$(this).find('div#enfe span#nombreEnfermedad').text()+'</span></li>';
        $("#diagnosticoPaciente").append(elemento);
        $('.body').find('button#Certificado').prop('disabled',false);
    });
     cerrar.click();
     AgregarProblemaTemp(idItemTemporal,$('#DescripcionEnfermedad').val());
});

$(".body").on('click', "button#GuardarRevision", function(ev) {
    var lista = "ul#ListaRevision li";
    var idPaciente = $('.body').find('span#HCU').text();
        if(idPaciente=='------'){
            swal("Esculapio!", "Debe seleccionar a un Paciente!", "error");
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
            GuardarEnfer(lista,idPaciente)
        } else {
            limpiar.trigger('click');
        }
    });
});

$(".body").on('click', "button#GuardarExamenFisico", function(ev) {
    var lista = "ul#ListaExamenFisico li";
    var idPaciente = $('.body').find('span#HCU').text();
        if(idPaciente=='------'){
            swal("Esculapio!", "Debe seleccionar a un Paciente!", "error");
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
            GuardarEnfer(lista,idPaciente)
        } else {
            limpiar.trigger('click');
        }
    });
});

$(".body").on('click', "button#GuardarProblema", function(ev) {
    var idPaciente = $('.body').find('span#HCU').text();
    if(idPaciente=='------'){
        swal("Esculapio!", "Debe seleccionar a un Paciente!", "error");
        return;
    }
    var problema = $('.body').find('#DescripcionEnfermedad').val();
    var diagnosticos = $('.body').find('#EnfermedadesSeleccionadas #Enfermedades');
    if(problema.trim()==""){
        
        swal("Esculapio!", "Debe Agregar La ENFERMEDAD O PROBLEMA ACTUAL!", "warning");
        return;
    }
    if(diagnosticos.length==0){
        swal("Esculapio!", "Debe Agregar Un diagnostico (Enfermedad CIE)!", "warning");
        return;
    }
    swal({
        title: "Esculapio",
        text: "Seguro De Registrar Los Cambios En La Historia Clinica Del Paciente \n Recuerde Que Una Vez Acepte Esta Informacion, Usted No Podra Realizar Niungun Cambio En La Atencion Prestada.",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarProblema(idPaciente,problema,idConsulta,idItem)
        } else {
            
        }
    });
});

function GuardarProblema(idPaciente,problema,idConsulta,idItem){
    
    var grupoLab=$('div#ProcedimientosLaboratorio').html().replace(/"/g,"'");
    var grupoRx=$('div#ProcedimientosRayos').html().replace(/"/g,"'");
    var grupoEco=$('div#ProcedimientosEcografia').html().replace(/"/g,"'");
    var grupoTomo=$('div#ProcedimientosTac').html().replace(/"/g,"'");
    var farmacoReceta=$('div#FarmacoReceta').html().replace(/"/g,"'");
    
    
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarProblema",
            Paciente: idPaciente,
            Problema: problema,
            Consulta:idConsulta,
            Item:idItem,
            Lab:grupoLab,
            Rx:grupoRx,
            Eco:grupoEco,
            Tomo:grupoTomo,
            Receta:farmacoReceta,
            OrdenTotal: generarGuardarProcedimientos()
        },
            dataType: 'JSON',
        }).done(function(respuesta) {
            //console.log(respuesta);
            if (respuesta[0] == true) {
                swal("Esculapio!", "Guardado Con Exito.!", "success");
                ActualizarEstadoItem(idItem,"id_estado",19);
                GuardarDiagnostico(idConsulta,idItem);
                GuardarReceta(idPaciente,idConsulta,idItem);
                GuardarOrden(idPaciente,idConsulta,problema,idItem);
                swal({
                    title: "Esculapio",
                    text: "Guardado Con Exito, Desea Imprimir?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                       printTextArea();
                       location.reload();
                    } else {
                        location.reload();
                    }
                });
                banderaGuardar=false;
                $("button#GuardarProblema").prop("disabled",true);
                
            }
            if (respuesta[0] == false) {
                swal("Esculapio!", "Ocurrio Un Error Al Guardar "+respuesta[1], "error");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body").on('change', "input#FechaGesta", function(ev) {
    var fecha = new Date($(this).val());
    var dias = 280; // Número de días a agregar
    fecha.setDate(fecha.getDate() + dias);
    $('.body').find("input#FechaParto").val(formatDate(fecha));
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

$(".body").on('click', "button#GuardarGineco", function(ev) {
    var idPaciente = $('.body').find('span#HCU').text();

    var gestacion = $('.body').find('input#Gestaciones').val();
    var abortos = $('.body').find('input#Abortos').val();
    var partos = $('.body').find('input#Partos').val();
    var cesarea = $('.body').find('input#Cesarea').val();
    var vaginales = $('.body').find('input#Vaginales').val();
    var vivos = $('.body').find('input#Vivos').val();
    var muertos = $('.body').find('input#Muertos').val();
    var sangre = $('.body').find('input#TSangre').val();
    var fechag = $('.body').find('input#FechaGesta').val();
    var fechap = $('.body').find('input#FechaParto').val();

    var diabetes = $('.body').find("input[name=Diabetes]:checked").val();
    var hiper = $('.body').find("input[name=Hipertension]:checked").val();
    var pulmonar = $('.body').find("input[name=Pulmonar]:checked").val();
    var gemelares = $('.body').find("input[name=Gemelares]:checked").val();
    var otros = $('.body').find("input[name=Otros]:checked").val();

    var diabetesf = $('.body').find("input[name=DiabetesF]:checked").val();
    var hiperf = $('.body').find("input[name=HipertensionF]:checked").val();
    var pulmonarf = $('.body').find("input[name=PulmonarF]:checked").val();
    var gemelaresf = $('.body').find("input[name=GemelaresF]:checked").val();
    var otrosf = $('.body').find("input[name=OtrosF]:checked").val();

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarGineco(idPaciente,gestacion,abortos,partos,cesarea,vaginales,vivos,muertos,sangre,fechag,fechap,diabetes,hiper,pulmonar,gemelares,otros,diabetesf,hiperf,pulmonarf,gemelaresf,otrosf);
        } else {

        }
    });
});

function GuardarGineco(idPaciente,gestacion,abortos,partos,cesarea,vaginales,vivos,muertos,sangre,fechag,fechap,diabetes,hiper,pulmonar,gemelares,otros,diabetesf,hiperf,pulmonarf,gemelaresf,otrosf){
    EliminarGineco(idPaciente);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarGineco",
            Paciente: idPaciente,
            Gestacion: gestacion,
            Abortos: abortos,
            Partos: partos,
            Cesarea: cesarea,
            Vaginales: vaginales,
            Vivos: vivos,
            Muertos: muertos,
            Sangre: sangre,
            FechaGestacion: fechag,
            FechaParto: fechap,
            Diabetes: diabetes,
            Hiper: hiper,
            Pulmonar: pulmonar,
            Gemelares: gemelares,
            Otros: otros,
            DiabetesF: diabetesf,
            HiperF: hiperf,
            PulmonarF: pulmonarf,
            GemelaresF: gemelaresf,
            OtrosF: otrosf
        },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == true) {
                swal("Esculapio!", "Antecedentes Guardados!", "success");
            }
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function EliminarGineco(idPaciente){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "EliminaGineco",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
                    
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
                            scrollY: 480,
                            autoWidth: true,    
                            info: false,
                            keys: true,    
                            paginate:false,
                            data:filas,
                            autoWidth: true
                        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
                                scrollY: 480,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
                                scrollY: 480,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}
var confirmaEpidemiologico = false; 

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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}


/*
***************************************************************************************************************************
*/
$(".body").on('change', "input#control", function(ev) {
   
    if($(this).prop("checked")){
        
        $("input#fecha_control").fadeIn(50);
    }else{
        $("input#fecha_control").fadeOut(50);
    }
    
});
$(".body").on('change', "input#fecha_control", function(ev) {
    var fecha = new Date($(this).val());
    var fechaActual = new Date();

    var dias =fecha.getDate()-fechaActual.getDate();
    if(dias>6){
        
        swal("Esculapio!", "La Fecha no debe ser mayor a 7 dias", "error");
        $("#control").click();
    }
    if(dias<-1){        
        swal("Esculapio!", "Escoja una fecha a partir de hoy", "error");
        $("#control").click();
    }
    
});

function GuardarReceta(idPaciente,idConsulta,idItem){

    var fila = $('.body').find("#datatableDetalleReceta tbody tr").find("td").eq(0).html();
    if(fila=="No existen datos"){
            return;
    }

    var proxima=0;
    if($("#proxima").prop("checked")){
        proxima=1;
    }else{proxima=0}
    var control=0;
    if($("#control").prop("checked")){
        control=1;
    }else{control=0}

    var derivada=0;
    if($("#Derivar").prop("checked")){
        derivada=1;
    }else{derivada=0}
    var fecha_control = $("#fecha_control").val();
    var fecha_proxima = $("#fecha_proxima").val();
    var especialidad = $("#Especialidad").val();
    
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarReceta",
            Paciente: idPaciente,
            Consulta:idConsulta,
            Proxima:proxima,
            Item:idItem,
            Control:control,
            Derivada:derivada,
            FechaC:fecha_control,
            FechaP:fecha_proxima,
            Especialidad:especialidad
        },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == true) {
                var fila = JSON.parse(respuesta[1]);
                idRecetaImprimir = fila[0][0];
                GuardarDetalleReceta(fila[0][0],idConsulta,idItem);
            }
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar La Receta", "error");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}



function GuardarDetalleReceta(idReceta,idConsulta,idItemConsulta){

    var vector = $('.body').find("#datatableDetalleReceta tbody tr ");
    $.each(vector, function(a) {

        if($(this).find('td').html()=="No existen datos"){
            return false ;
        }

        var idItem = tablaDetalleReceta.row($(this)).data()[0];
        var presentancion;
        var pvp;
        var cantidad;
        var observaciones;
        var observaciones2;
        var prescripcion='';
        var sugerencia='';
        if(idItem==0){
            prescripcion = $(this).find('td').eq(0).find('input').val();
            sugerencia = $(this).find('td').eq(1).find('input').val();
            presentancion = $(this).find('td').eq(2).find('input').val();
            pvp ="";
            cantidad =  $(this).find('td').eq(3).find('input').val();
            observaciones  = $(this).find('td').eq(4).find('select').val();
            observaciones2  = $(this).find('td').eq(5).find('input').val();
        }else{
            presentancion = $(this).find('td').eq(2).find('select').val();
            pvp = $(this).find('td').eq(2).find('select option:selected').attr('pvp');
            cantidad =  $(this).find('td').eq(3).find('input').val();
            observaciones  = $(this).find('td').eq(4).find('select').val();
            observaciones2  = $(this).find('td').eq(5).find('input').val();    
        }
        
        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleReceta",
                Receta: idReceta,
                Item:idItem,
                Presentacion:presentancion,
                Cantidad: cantidad,
                Observaciones:observaciones,
                Observaciones2:observaciones2,
                Prescripcion:prescripcion,
                Sugerencia:sugerencia
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item Receta", "error");
                }
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    });
    
    ActualizarEstadoItem(idItemConsulta,"id_estado_receta",18);    

}


/*
***************************************************************************************************************************
*/

function GuardarOrden(idPaciente,idConsulta,problema,idItem){
    var seleccionados = $('.body ul').find("li.active");
    if(seleccionados.length==0){
        return;
    }
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarOrden",
            Paciente: idPaciente,
            Consulta:idConsulta,
            Item:idItem,
            Motivo:problema
        },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == true) {
                var fila = JSON.parse(respuesta[1]);
                idOrdenImprimir = fila[0][0];
                GuardarDetalleOrden(fila[0][0],idConsulta,idItem);
            }
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar La Orden", "error");
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


function GuardarDetalleOrden(idOrden,idConsulta,idItemConsulta){

/*************************  LABORATORIO     **************************************************************/
/*************************  LABORATORIO     **************************************************************/
    
    var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
    $.each(vector, function(a) {

        if($(this).find('td').html()=="No existen datos"){
            return false ;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();

        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Laboratorio:idItem,
                Precio:precio
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item de Laboratorio", "error");
                    return;
                }
                ActualizarEstadoItem(idItemConsulta,"id_estado_orden_lab",17);
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    });


/*************************  RX     **************************************************************/
/*************************  RX     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
    $.each(vector, function(a) {

        if($(this).find('td').html()=="No existen datos"){
            return false ;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();

        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Rx:idItem,
                Precio:precio
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item de RX", "error");
                    return;
                }
                ActualizarEstadoItem(idItemConsulta,"id_estado_orden_rx",17);
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    });

/*************************  ECO     **************************************************************/
/*************************  ECO     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
    $.each(vector, function(a) {

        if($(this).find('td').html()=="No existen datos"){
            return false ;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();

        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Eco:idItem,
                Precio:precio
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item de ECOGRAFIA", "error");
                    return;
                }
                ActualizarEstadoItem(idItemConsulta,"id_estado_orden_eco",17);
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    });        
    
/*************************  TOMO     **************************************************************/
/*************************  TOMO     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
    $.each(vector, function(a) {

        if($(this).find('td').html()=="No existen datos"){
            return false ;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();

        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Tac:idItem,
                Precio:precio
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Los Item de TOMOGRAFIA", "error");
                    return;
                }
                //alert(idConsulta);
                ActualizarEstadoItem(idItemConsulta,"id_estado_orden_tomo",17);
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    });
   // Limpiar();

}


/*
***************************************************************************************************************************
*/

function ActualizarEstadoItem(idItem,tipo,estado){
    
    $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "ActualizarEstadoItem",
                Item: idItem,
                Tipo:tipo,
                Estado:estado
            },
                dataType: 'JSON',
    }).done(function(respuesta) {
                console.log(respuesta);
                if (respuesta[0] == false) {
                    //console.log(respuesta[1]);
                    return;
                }

                //alert(idConsulta);
    }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function ActualizarEstadoConsulta(idItem,tipo,estado){
    $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "ActualizarEstadoOP",
                Item: idItem,
                Tipo:tipo,
                Estado:estado
            },
                dataType: 'JSON',
    }).done(function(respuesta) {
                console.log(respuesta);
                if (respuesta[0] == false) {
                    //console.log(respuesta[1]);
                    return;
                }
                //alert(idConsulta);
    }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarDiagnostico(idConsulta,idItem){

    var vector = $('.body').find("#EnfermedadesSeleccionadas div#Enfermedades");
    $.each(vector, function(a) {

        var tipo =$(this).find('span#tipo').html();
        var tiempo =$(this).find('span#tiempo').html();
        var procedimiento = $(this).find('span#procedimiento').html();
        var actividades  =$(this).find('span#actividad').html();
        var interconsulta  =$(this).find('span#interconsulta').html();
        var condicion  = $(this).find('span#condicion').html();
        var descripcion  =$(this).find('span#descripcion').html();
        var idCie =$(this).find('span#cie').find("span").eq(0).attr("id");
        
        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDiagnostico",
                Consulta: idConsulta,
                Item:idItem,
                Tipo:tipo,
                Tiempo:tiempo,
                Procedimiento: procedimiento,
                Actividades:actividades,
                Interconsulta:interconsulta,
                Condicion:condicion,
                Descripcion:descripcion,
                Cie:idCie
            },
                dataType: 'JSON',
        }).done(function(respuesta) {
                
                if (respuesta[0] == false) {
                    swal("Esculapio!", "No Se Pudo Guardar Parte Diaria", "error");
                }
        }).fail(function(jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        $('button#ImprimirTodoEmelec').fadeOut(0);

        
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
        $('.body').find('button#Certificado').prop('disabled',true);

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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

tablaOrdenReceta = $('#datatableOrdenReceta').DataTable({
                                scrollX: true,
                                scrollY: 480,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
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
        
        $.each(respuesta, function(i, value) {
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2],respuesta[i][3],respuesta[i][4],respuesta[i][5],respuesta[i][6],respuesta[i][7],respuesta[i][8]];
            tablaOrdenReceta.row.add(dataSet);
            
        });
        tablaOrdenReceta.draw(false);
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function validad2(N,buscar){
  var vector = $(buscar).find('span');
  var confirma = false;
  $.each(vector, function(a) {
        var nombre = $(this).html();
        if(N==nombre){
            confirma = true;
          //alert(nombre);
        }
 });
  if(confirma == false){
    return "<li>"+N+"</li>";
  }
}

function printTextArea() {
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
    var seleccionados = $('.body ul.procelab').find("li.active");
    if(seleccionados.length>0){
        var selec = '';
        var select = '';
        cuerpo += '<div><u><h4>ORDEN DE LABORATORIO</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN LABORATORIO: $'+totalLab+'</h5>'
        +'<ul id="listaLab">';
        var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados1 = $('.body ul.procerx').find("li.active");
    if(seleccionados1.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE RAYOS X</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN RAYOS X: $'+totalRx+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados2 = $('.body ul.proceeco').find("li.active");
    if(seleccionados2.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE ECOGRAFIA</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN ECOGRAFIA : $'+totalEco+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados3 = $('.body ul.procetac').find("li.active");
    if(seleccionados3.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE TAC/RM</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN TAC/RM : $'+totalTac+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }

    if($('.body').find("#datatableDetalleReceta tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<div><u><h4>RECETA</h4></u>'
        +'<table  style="width: 100%"><thead><tr><th><u>No.</u></th><th><u>Principio Activo/Nombre Farmaceutico</u></th><th><u>Cantidad</u></th><th><u>Prescripcion</u></th></tr></thead><tbody>';
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
            var principio = $(this).find('td').eq(0).html();
            var sugerencia = $(this).find('td').eq(1).html();
            var presentancion = $(this).find('td').eq(2).find('select').val();
            var pvp = $(this).find('td').eq(2).find('select option:selected').attr('pvp');
            if(idItem==0){
                principio = $(this).find('td').eq(0).find('input').val();
                sugerencia = $(this).find('td').eq(1).find('input').val();
                presentancion = $(this).find('td').eq(2).find('input').val();
                pvp="";
                asterisco='*';
            }
            
            
            var cantidad =  $(this).find('td').eq(3).find('input').val();
            
            totalReceta += parseFloat(pvp)*parseFloat(cantidad);
            var observaciones  = $(this).find('td').eq(4).find('select').val();
            var observaciones2  = $(this).find('td').eq(5).find('input').val();
            selec += '<tr><td>'+count+asterisco+'</td><td>'+principio+'<br><b style="font-size: small;">('+sugerencia+')</b></td><td>'+cantidad+' ('+NumeroALetras(cantidad)+')</td><td>'+observaciones+' '+observaciones2+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }

    if($('.body').find('input#proxima').is(':checked')){
        var fecha = $('.body').find('input#fechaMovi').val();
        var fecha_proxima = $('.body').find('input#fecha_proxima').val();
        if(fecha_proxima==fecha){
            cuerpo2 += '<div><label>CITA ABIERTA</label></div><br>';
        }else{
            cuerpo2 += '<div><label>PROXIMA CITA: '+fecha_proxima+'</label></div><><br>';
        }
    }
    if($('.body').find('input#control').is(':checked')){
        var fecha_control = $('.body').find('input#fecha_control').val();
        cuerpo2 += '<div><label>CITA DE CONTROL: '+fecha_control+'</label></div><br>';
    }
    if($('.body').find('input#Derivar').is(':checked')){
        var derivar = $('.body').find('select#Especialidad option:selected').text();
        cuerpo2 += '<div><label>DRIVAR A LA ESPECIALIDAD: '+derivar+'</label></div>';
    }
    
    var cabecera = '<div style="position: absolute; width:100%; margin-top: 2em;"><label style="font-weight:bold;">Paciente: '+nombrePacienteImprimir+'</label></div><br>';
    var cabecera2 ='<div style="width:100%;  margin-top: 2em;"><label style="font-weight:bold;">Edad: '+edadPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Fecha Emision: '+fecha+'</label></div>';
    var cabecera3 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroOrden+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+totalTotal+'</label></div>';
    var cabecera4 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroReceta+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+totalReceta.toFixed(2)+'</label></div>';
    /*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;"></div>');
    if(seleccionados3.length>0||seleccionados2.length>0||seleccionados1.length>0||seleccionados.length>0){
        childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="width:100%">');
        childWindow.document.write($('.body').find('div#LogoImagen').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="width:100%; margin-top: -4em; margin-left: -3em;">');
        childWindow.document.write($('.body').find('div#LogoImagen2').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="margin-top: -3.4em; margin-left: 50em;">');
        childWindow.document.write($('.body').find('div#LogoImagen3').html());
        childWindow.document.write('</div>');
        childWindow.document.write(cabecera);
        childWindow.document.write(cabecera2);
        childWindow.document.write(cabecera3);
        childWindow.document.write(cuerpo);
        childWindow.document.write('</div>');
    }
    if($('.body').find("#datatableDetalleReceta tbody tr").find('td').html()!="No existen datos"){
        //childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write('<div style="width:100%">');
        childWindow.document.write($('.body').find('div#LogoImagen').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="width:100%; margin-top: -4em; margin-left: -3em;">');
        childWindow.document.write($('.body').find('div#LogoImagen2').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="margin-top: -3.4em; margin-left: 50em;">');
        childWindow.document.write($('.body').find('div#LogoImagen3').html());
        childWindow.document.write('</div>');
        childWindow.document.write(cabecera);
        childWindow.document.write(cabecera2);
        childWindow.document.write(cabecera4);
        childWindow.document.write(cuerpo2);
        childWindow.document.write('</div>');
    }
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
}

function ReimprimirprintTextArea() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var numeroOrden =0;
    var numeroReceta =idRecetaImprimir;
    var totalReceta = 0;
    var cuerpo2 = '';
    if($('.body').find("#datatableOrdenReceta tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<div><u><h4>RECETA</h4></u>'
        +'<table  style="width: 100%"><thead><tr><th><u>No.</u></th><th><u>Principio Activo/Nombre Farmaceutico</u></th><th><u>Cantidad</u></th><th><u>Prescripcion</u></th></tr></thead><tbody>';
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
            //var pvp = $(this).find('td').eq(2).find('select option:selected').attr('pvp');
            fecha1 = tablaOrdenReceta.row($(this)).data()[6];
            fecha2 = tablaOrdenReceta.row($(this)).data()[7];
            fecha = tablaOrdenReceta.row($(this)).data()[8];
            
            
            var cantidad =  $(this).find('td').eq(3).html();
            
            //totalReceta += parseFloat(pvp)*parseFloat(cantidad);
            var observaciones  = $(this).find('td').eq(4).html();
            selec += '<tr><td>'+count+asterisco+'</td><td>'+principio+'<br><b style="font-size: small;">('+sugerencia+')</b></td><td>'+cantidad+' ('+NumeroALetras(cantidad)+')</td><td>'+observaciones+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }

    if(fecha1 != 'NO'){
        cuerpo2 += '<div><label>PROXIMA CITA: '+fecha1.substring(0, 10)+'</label></div><><br>';
    }else{
        cuerpo2 += '<div><label>CITA ABIERTA</label></div><br>';
    }
    if(fecha2 != 'NO'){
        cuerpo2 += '<div><label>CITA DE CONTROL: '+fecha2.substring(0, 10)+'</label></div><br>';
    }
    
    var cabecera = '<div style="position: absolute; width:100%; margin-top: 2em;"><label style="font-weight:bold;">Paciente: '+nombrePacienteImprimir+'</label></div><br>';
    var cabecera2 ='<div style="width:100%;  margin-top: 2em;"><label style="font-weight:bold;">Edad: '+edadPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Fecha Emision: '+fecha.substring(0, 10)+'</label></div>';
    var cabecera3 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroOrden+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+21+'</label></div>';
    var cabecera4 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label></div>';
    /*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;"></div>');
    if($('.body').find("#datatableOrdenReceta tbody tr").find('td').html()!="No existen datos"){
        //childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write('<div style="width:100%">');
        childWindow.document.write($('.body').find('div#LogoImagen').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="width:100%; margin-top: -4em; margin-left: -3em;">');
        childWindow.document.write($('.body').find('div#LogoImagen2').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="margin-top: -3.4em; margin-left: 50em;">');
        childWindow.document.write($('.body').find('div#LogoImagen3').html());
        childWindow.document.write('</div>');
        childWindow.document.write(cabecera);
        childWindow.document.write(cabecera2);
        childWindow.document.write(cabecera4);
        childWindow.document.write(cuerpo2);
        childWindow.document.write('</div>');
    }
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
}

function ReimprimirprintTextAreaCertificado() {/*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;"></div>');
        //childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write('<div style="width:100%">');
        childWindow.document.write($('.body').find('div#LogoImagen').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="width:100%; margin-top: -4em; margin-left: -3em;">');
        childWindow.document.write($('.body').find('div#LogoImagen2').html());
        childWindow.document.write('</div>');
        childWindow.document.write('<div style="margin-top: -3.4em; margin-left: 50em;">');
        childWindow.document.write($('.body').find('div#LogoImagen3').html());
        childWindow.document.write('</div>');
        childWindow.document.write(editor1.getValue());
        childWindow.document.write('</div>');
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
}

function CargarProcedimientosParteDiario(ids){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProcedimientosParteDiario",
            Ids:ids
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value[1]+'">'+value[1]+'</option> ';
            $("select#cbmProcedimiento").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');
        

     }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown, "error");
    });   
}

var tablaHistoricoConsulta = $("#datatableHistorico").DataTable();

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
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown, "error");
    });   
}


$(".body").on('click', "button#ImprimeRecetaNueva", function(evt) {
    ReimprimirprintTextArea();
});

$(".body").on('click', "button#ImprimeCertificado", function(evt) {
    ReimprimirprintTextAreaCertificado();
});

function generarGuardarProcedimientos() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var numeroOrden = idOrdenImprimir;
    var numeroReceta =idRecetaImprimir;
    var totalLab = $('.body').find("label#precioTotal").html().replace('TOTAL: $', '');
    var totalRx = $('.body').find("label#precioTotalRx").html().replace('TOTAL: $', '');
    var totalEco = $('.body').find("label#precioTotalEco").html().replace('TOTAL: $', '');
    var totalTac = $('.body').find("label#precioTotalTac").html().replace('TOTAL: $', '');
    var totalTotal = parseFloat(parseFloat(totalLab)+parseFloat(totalRx)+parseFloat(totalEco)+parseFloat(totalTac)).toFixed(2);
    var totalReceta = 0;
    var cuerpo = '';
    var seleccionados = $('.body ul.procelab').find("li.active");
    if(seleccionados.length>0){
        var selec = '';
        var select = '';
        cuerpo += '<div><u><h4>ORDEN DE LABORATORIO</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN LABORATORIO: $'+totalLab+'</h5>'
        +'<ul id="listaLab">';
        var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados1 = $('.body ul.procerx').find("li.active");
    if(seleccionados1.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE RAYOS X</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN RAYOS X: $'+totalRx+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados2 = $('.body ul.proceeco').find("li.active");
    if(seleccionados2.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE ECOGRAFIA</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN ECOGRAFIA : $'+totalEco+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    var seleccionados3 = $('.body ul.procetac').find("li.active");
    if(seleccionados3.length>0){
        var selec = '';
        cuerpo += '<div><u><h4>ORDEN DE TAC/RM</h4></u><h5 style="posisition: fixed; float: right;">TOTAL ORDEN TAC/RM : $'+totalTac+'</h5>'
        +'<ul>';
        var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
        $.each(vector, function(a) {
            var grupo = $(this).find('td span').attr('grupo');
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">','');
            selec += '<li>'+item+'</li>';
        });
        cuerpo += selec+'</ul></div>';
    }
    
    var cabecera = '<div style="position: absolute; width:100%; margin-top: 2em;"><label style="font-weight:bold;">Paciente: '+nombrePacienteImprimir+'</label></div><br>';
    var cabecera2 ='<div style="width:100%;  margin-top: 2em;"><label style="font-weight:bold;">Edad: '+edadPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Fecha Emision: '+fecha+'</label></div>';
    var cabecera3 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroOrden+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+totalTotal+'</label></div>';
    var cabecera4 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroReceta+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+totalReceta.toFixed(2)+'</label></div>';
    
    
    
       // childWindow.document.open();
    orden_total += "<html><head></head><body>";
    //childWindow.document.write($('#DatosPaciente').html());
    orden_total += "<div style='margin-top:20px;'></div>";
    if(seleccionados3.length>0||seleccionados2.length>0||seleccionados1.length>0||seleccionados.length>0){
        orden_total += "<div style='height:100%'>";
        orden_total += "<div style='width:100%'>";
        orden_total += $('.body').find('div#LogoImagen').html().replace(/"/g,"'");
        orden_total += "</div>";
        orden_total += "<div style='width:100%; margin-top: -4em; margin-left: -3em;'>";
        orden_total += $('.body').find('div#LogoImagen2').html().replace(/"/g,"'");
        orden_total += "</div>";
        orden_total += "<div style='margin-top: -3.4em; margin-left: 50em;'>";
        orden_total += $('.body').find('div#LogoImagen3').html().replace(/"/g,"'");
        orden_total += "</div>";
        orden_total += cabecera.replace(/"/g,"'");;
        orden_total += cabecera2.replace(/"/g,"'");;
        orden_total += cabecera3.replace(/"/g,"'");;
        orden_total += cuerpo.replace(/"/g,"'");;
        orden_total += "</div>";
    }
    //childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    return orden_total;
}

$(".body").on('click', "button#ImprimirTodoEmelec", function(evt) {
    ReimprimirprintTextAreaEmelec();
});

function ReimprimirprintTextAreaEmelec() {/*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    
    childWindow.document.write($('.body').find('input#reporteEmelec').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
}