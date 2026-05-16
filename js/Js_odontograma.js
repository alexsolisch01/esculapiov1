var primeravez1 = false;
var confirmaEpidemiologico = false;
var odontogramaActual = '';
var idTipoServicio = 13;
var idOrdenImprimir = 0;
var idRecetaImprimir = 0;
var nombrePacienteImprimir = '';
var generoPacienteImprimir = '';
var edadPacienteImprimir = '';
var hcuPacienteImprimir = '';
var odontogramaVacio = '';
var modificarOdontograma = true;
var orden_total = "";
var orden_lab = "";
var orden_rx = "";
var orden_eco = "";
var orden_tac = "";
var orden_receta = "";

$('.textareaCertificado').wysihtml5();
var editorObj1 = $(".textareaCertificado").data('wysihtml5');
var editor1 = editorObj1.editor;

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

$('#modal-certificado').on('shown.bs.modal', function () {
    var fecha = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var numero = $('.body').find('input#NumeroDias').val();
    var descripcionCie = $('.body').find('div#enfe span#nombreEnfermedad').eq(0).text();
    var codigoCie = $('.body').find('div#Enfermedades span#cie span').eq(0).text();
    var nombreDoctor = $('input#nombreCompleto').val();
    editor1.setValue("<br><h4>Guayaquil, " + fecha.toLocaleDateString("es-ES", options) + "</h4>" +
        "<label>Certifico que el(la) paciente <strong>" + nombrePacienteImprimir + "</strong> de <strong>" + edadPacienteImprimir + " años</strong> de edad; ha recibido atención " +
        "médica el día " + fecha.toLocaleDateString("es-ES", options) + ". Por presentar cuadro clínico compatible según el CIE-10" +
        " con: " + descripcionCie + " - " + codigoCie + " Por lo cual recomiendo " +
        "<strong>N°.</strong> " + numero + " días de reposo, salvo complicaciones.</label>" +
        "<br><br><label>Días de reposo en letras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + NumeroALetras(numero) + "</label>" +
        "<br><label>Días de reposo en número:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + numero + "</label>" +
        "<br><label>Desde:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + fecha.toLocaleDateString("es-ES", options) + "</label>" +
        "<br><label>Hasta:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sumarDias(fecha, numero).toLocaleDateString("es-ES", options) + "</label>" +
        "<br><br><br><label>Atentamente,</label><br><br><br><label>________________________________________" +
        "</label><br><label>Dr.(a). " + nombreDoctor.toUpperCase() + "</label>");
});

function sumarDias(fecha, dias) {
    var f2 = new Date($('#FechaActualEsculapio').val());
    if (dias == 0) {
        dias = 1;
    }
    f2.setDate(f2.getDate() + parseInt(dias));

    return f2;
}

$(".body").on('change', "input#NumeroDias", function (ev) {
    if ($(this).val() == "") {
        $(this).val("1");
    }
    var fecha = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var numero = $('.body').find('input#NumeroDias').val();

    var descripcionCie = $('.body').find('div#enfe span#nombreEnfermedad').eq(0).text();
    var codigoCie = $('.body').find('div#Enfermedades span#cie span').eq(0).text();
    var nombreDoctor = $('input#nombreCompleto').val();
    editor1.setValue("<br><h4>Guayaquil, " + fecha.toLocaleDateString("es-ES", options) + "</h4>" +
        "<label>Certifico que el(la) paciente <strong>" + nombrePacienteImprimir + "</strong> de <strong>" + edadPacienteImprimir + " años</strong> de edad; ha recibido atención " +
        "médica el día " + fecha.toLocaleDateString("es-ES", options) + ". Por presentar cuadro clínico compatible según el CIE-10" +
        " con: " + descripcionCie + " - " + codigoCie + " Por lo cual recomiendo " +
        "<strong>NO.</strong> " + numero + " días de reposo, salvo complicaciones.</label>" +
        "<br><br><label>Días de reposo en letras:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + NumeroALetras(numero) + "</label>" +
        "<br><label>Días de reposo en número:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + numero + "</label>" +
        "<br><label>Desde:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + fecha.toLocaleDateString("es-ES", options) + "</label>" +
        "<br><label>Hasta:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sumarDias(fecha, numero).toLocaleDateString("es-ES", options) + "</label>" +
        "<br><br><br><label>Atentamente,</label><br><br><br><label>_________________________________________" +
        "</label><br><label>Dr.(a). " + nombreDoctor.toUpperCase() + "</label>");

});



var gg = 0;
var fecha = new Date()
var d = fecha.getDate() - 1,
    m = fecha.getMonth(),
    y = fecha.getFullYear();
var hoyMostrar = fecha.getDate() + "-" + (m + 1) + "-" + y;

var tablaOdo = $('#datatableOdon').DataTable({
    dom: '<"top"lBf>rt<"bottom"ip>',
    lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "Todo"]
    ],
    paginate: false,
    buttons: [{
        extend: 'excelHtml5'
    }, {
        extend: 'pdfHtml5'
    }, {
        extend: 'print',
        text: 'Imprimir'
    }],
    "columnDefs": [{
        "targets": [5],
        "visible": false,
    }, {
        "targets": [4],
        "width": "2%"
    }, {
        "targets": [0],
        "width": "2%"
    }, {
        "targets": [1, 2],
        "width": "20%"
    }],
    scrollY: 250,
    scrollX: true,
    ordering: true
});

var tablaAlergia = $('#datatableAlergias').DataTable({
    ordering: false,
    dom: '<"top">rt<"bottom">',
    //scrollY: 180,
    //scrollX: true,
    paginate: false
});

function replaceAll(find, replace, str) {
    var nuevo = str.replace(new RegExp(find, 'g'), replace);
    if (replace == 4 || replace == 3) {
        nuevo = nuevo.replace(new RegExp("VESTIBULAR", 'g'), "LINGUAL");
        nuevo = nuevo.replace(new RegExp("PALATINA", 'g'), "VESTIBULAR");
    }
    if (replace == 8 || replace == 7) {
        nuevo = nuevo.replace(new RegExp("VESTIBULAR", 'g'), "LINGUAL");
        nuevo = nuevo.replace(new RegExp("PALATINA", 'g'), "VESTIBULAR");
    }
    return nuevo;
}



function createOdontogram() {
    var htmlLecheLeft = "",
        htmlLecheRight = "",
        htmlLeft = "",
        htmlRight = "",
        a = 1;
    for (var i = 9 - 1; i >= 1; i--) {
        //Dientes Definitivos Cuandrante Derecho (Superior/Inferior)
        var n = "INSISAL";
        var n1 = "OCLUSAL";
        var a1 = "VESTIBULAR";
        var a2 = "PALATINA";

        if (i >= 4) {
            n = "OCLUSAL"

        }
        if (i > 5) {
            n1 = "INSISAL"

        }

        if (a == 1) {
            a1 = "LINGUAL";
            a2 = "PALATINA";
        }
        htmlRight += '<div data-name="value" id="dienteindex' + i + '" class="diente derecho">' +
            '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + i + '</span>' +
            '<div id="tindex' + i + '" nombre="VESTIBULAR" class="cuadro click">' +
            '</div>' +
            '<div id="lindex' + i + '" nombre="DISTAL" class="cuadro izquierdo click">' +
            '</div>' +
            '<div id="bindex' + i + '" nombre="PALATINA" class="cuadro debajo click">' +
            '</div>' +
            '<div id="rindex' + i + '" nombre="MESIAL" class="cuadro derecha click click">' +
            '</div>' +
            '<div id="cindex' + i + '" nombre="' + n + '" class="centro click">' +
            '</div>' +
            '</div>';
        //Dientes Definitivos Cuandrante Izquierdo (Superior/Inferior)
        htmlLeft += '<div id="dienteindex' + a + '" class="diente izquierda">' +
            '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + a + '</span>' +
            '<div id="tindex' + a + '" nombre="VESTIBULAR" class="cuadro click">' +
            '</div>' +
            '<div id="lindex' + a + '" nombre="MESIAL" class="cuadro izquierdo click">' +
            '</div>' +
            '<div id="bindex' + a + '" nombre="PALATINA" class="cuadro debajo click">' +
            '</div>' +
            '<div id="rindex' + a + '" nombre="DISTAL" class="cuadro derecha click click">' +
            '</div>' +
            '<div id="cindex' + a + '" nombre="' + n1 + '" class="centro click">' +
            '</div>' +
            '</div>';
        if (i <= 5) {
            //Dientes Temporales Cuandrante Derecho (Superior/Inferior)
            htmlLecheRight += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche derecho">' +
                '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + i + '</span>' +
                '<div id="tlecheindex' + i + '" nombre="VESTIBULAR" class="cuadro-leche top-leche click">' +
                '</div>' +
                '<div id="llecheindex' + i + '" nombre="DISTAL" class="cuadro-leche izquierdo-leche click">' +
                '</div>' +
                '<div id="blecheindex' + i + '" nombre="PALATINA" class="cuadro-leche debajo-leche click">' +
                '</div>' +
                '<div id="rlecheindex' + i + '" nombre="MESIAL" class="cuadro-leche derecha-leche click click">' +
                '</div>' +
                '<div id="clecheindex' + i + '" nombre="' + n + '" class="centro-leche click">' +
                '</div>' +
                '</div>';
        }
        if (a < 6) {
            //Dientes Temporales Cuandrante Izquierdo (Superior/Inferior)
            htmlLecheLeft += '<div id="dienteLindex' + a + '" class="diente-leche izquierda">' +
                '<span style="margin-left: 45px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + a + '</span>' +
                '<div id="tlecheindex' + a + '" nombre="VESTIBULAR" class="cuadro-leche top-leche click">' +
                '</div>' +
                '<div id="llecheindex' + a + '" nombre="MESIAL" class="cuadro-leche izquierdo-leche click">' +
                '</div>' +
                '<div id="blecheindex' + a + '" nombre="PALATINA" class="cuadro-leche debajo-leche click">' +
                '</div>' +
                '<div id="rlecheindex' + a + '" nombre="DISTAL" class="cuadro-leche derecha-leche click click">' +
                '</div>' +
                '<div id="clecheindex' + a + '" nombre="' + n1 + '" class="centro-leche click">' +
                '</div>' +
                '</div>';
        }
        a++;
    }
    $("#tr").append(replaceAll('index', '1', htmlRight));
    $("#tl").append(replaceAll('index', '2', htmlLeft));
    $("#tlr").append(replaceAll('index', '5', htmlLecheRight));
    $("#tll").append(replaceAll('index', '6', htmlLecheLeft));


    $("#bl").append(replaceAll('index', '3', htmlLeft));
    $("#br").append(replaceAll('index', '4', htmlRight));
    $("#bll").append(replaceAll('index', '7', htmlLecheLeft));
    $("#blr").append(replaceAll('index', '8', htmlLecheRight));
}


var arrayPuente = [];
$(document).ready(function () {
    createOdontogram();
    odontogramaVacio = $("#odontograma").html();
    $("body").on('click', ".click", function (event) {
        if (!modificarOdontograma) {
            return;
        }
        var control = $("#controls").children().find('.active').attr('id');

        var cuadro = $(this).find("input[name=cuadro]:hidden").val();

        switch (control) {
            case "fractura":
                if ($(this).hasClass("click-blue")) {
                    $(this).removeClass('click-blue');
                    $(this).addClass('click-red');

                    var id = $(this).attr("id");

                    var diente = $(this).parent().children('span').html();
                    var nombre = $(this).attr("nombre");
                    // AggFactura(diente,nombre,id,"CARIES");
                } else {
                    if ($(this).hasClass("click-red")) {
                        $(this).removeClass('click-red');
                        var diente = $(this).parent().children('span').html();
                        var nombre = $(this).attr("nombre");
                        // Modificar(diente,"CARIES",nombre);
                    } else {
                        $(this).addClass('click-red');


                        var id = $(this).attr("id");

                        var diente = $(this).parent().children('span').html()
                        var nombre = $(this).attr("nombre");
                        // AggFactura(diente,nombre,id,"CARIES");


                    }
                }
                break;
            case "restauracion":
                console.log($(this))
                if ($(this).hasClass("click-red")) {
                    $(this).removeClass('click-red');
                    $(this).addClass('click-blue');

                    var id = $(this).attr("id");

                    var diente = $(this).parent().children('span').html()
                    var nombre = $(this).attr("nombre");
                    AggFactura(diente, nombre, id, "OBTURADO");
                } else {
                    if ($(this).hasClass("click-blue")) {
                        $(this).removeClass('click-blue');
                        var diente = $(this).parent().children('span').html();
                        var nombre = $(this).attr("nombre");
                        Modificar(diente, "OBTURADO", nombre);
                    } else {
                        $(this).addClass('click-blue');

                        var id = $(this).attr("id");

                        var diente = $(this).parent().children('span').html()
                        var nombre = $(this).attr("nombre");
                        AggFactura(diente, nombre, id, "OBTURADO");

                    }
                }
                break;
            case "extraccion":
                var dientePosition = $(this).position();

                $(this).parent().append('<i style="color:blue;" class="extraccion fa fa-times-circle fa-3x fa-fw"></i>');
                $(this).parent().children("i").css({
                    "position": "absolute",
                    "z-index": "1",
                    "top": "24%",
                    "margin-left": "0.7em"
                });
                var id = $(this).attr("id");

                var diente = $(this).parent().children('span').html();
                var nombre = $(this).attr("nombre");
                AggFactura(diente, "", id, "EXTRACION_REALIZADA");

                break;
            case "extraer":
                var dientePosition = $(this).position();

                $(this).parent().append('<i style="color:red;" class="extraer fa fa-times fa-3x fa-fw"></i>');
                $(this).parent().children("i").css({
                    "position": "absolute",
                    "z-index": "1",
                    "top": "24%",
                    "margin-left": "0.7em"
                });
                var id = $(this).attr("id");
                var diente = $(this).parent().children('span').html();
                var nombre = $(this).attr("nombre");
                //AggFactura(diente,nombre,id,"EXTRACION_INDICADA");

                break;
            case "protesis_f":


                var dientePosition = $(this).offset(), leftPX;
                console.log($(this)[0].offsetLeft)
                var noDiente = $(this).parent().children().first().text();
                var cuadrante = $(this).parent().parent().attr('id');
                var left = 0,
                    width = 90;


                if ($(this).parent().hasClass("diente-leche")) {
                    return;
                }

                if ($(this).parent().children('.cuadro').hasClass("borderPunte")) {
                    $(this).parent().children('.cuadro').removeClass('borderPunte');
                    $(this).parent().children('.cuadro').css('border-color', '#7F7F7F');
                    $(this).parent().children('#puente').remove();
                    var diente = $(this).parent().children('span').html();
                    BorrarProtesis(diente, "PROTESIS_FIJA");
                } else {
                    $(this).parent().children('.cuadro').css('border-color', 'red');
                    $(this).parent().children('.cuadro').addClass('borderPunte');

                    var datos = [$(this).parent(), $(this).parent().children('span').html()];
                    arrayPuente.push(datos);

                    var id = $(this).attr("id");
                    var diente = $(this).parent().children('span').html();
                    var nombre = $(this).attr("nombre");


                    if ($(this).parent().hasClass("derecho")) {

                        if (arrayPuente.length == 2) {
                            var diferencia = arrayPuente[0][1] - arrayPuente[1][1]

                            if (diferencia < 0) {
                                diferencia = diferencia * -1;
                                diferencia = diferencia * 50;
                                arrayPuente[1][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-radius:60px;border-style: dotted;border-color:blue;" id="puente"></div>');
                                arrayPuente[1][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            } else {
                                diferencia = diferencia * 50;
                                arrayPuente[0][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-radius:60px;border-style: dotted;border-color:blue;" id="puente"></div>');
                                arrayPuente[0][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            }
                            AggFactura(arrayPuente[0][1] + "-" + arrayPuente[1][1], "", id, "PROTESIS_FIJA");
                            arrayPuente = [];
                        }

                    } else {
                        if (arrayPuente.length == 2) {
                            var diferencia = arrayPuente[0][1] - arrayPuente[1][1]

                            if (diferencia < 0) {
                                diferencia = diferencia * -1;
                                diferencia = diferencia * 50;
                                arrayPuente[0][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-radius:60px;border-style: dotted;border-color:blue;" id="puente"></div>');
                                arrayPuente[0][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            } else {
                                diferencia = diferencia * 50;
                                arrayPuente[1][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-radius:60px;border-style: dotted;border-color:blue;" id="puente"></div>');
                                arrayPuente[1][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            }
                            AggFactura(arrayPuente[0][1] + "-" + arrayPuente[1][1], "", id, "PROTESIS_FIJA");
                            arrayPuente = [];
                        }
                    }


                }



                break;

            case "protesis_r":


                var dientePosition = $(this).offset(), leftPX;
                console.log($(this)[0].offsetLeft)
                var noDiente = $(this).parent().children().first().text();
                var cuadrante = $(this).parent().parent().attr('id');
                var left = 0,
                    width = 90;


                if ($(this).parent().hasClass("diente-leche")) {
                    return;
                }

                if ($(this).parent().children('.cuadro').hasClass("borderPunte")) {
                    $(this).parent().children('.cuadro').removeClass('borderPunte');
                    $(this).parent().children('.cuadro').css('border-color', '#7F7F7F');
                    $(this).parent().children('#puente').remove();
                    var diente = $(this).parent().children('span').html();
                    BorrarProtesis(diente, "PROTESIS_REMOVIBLE");
                } else {
                    $(this).parent().children('.cuadro').css('border-color', 'red');
                    $(this).parent().children('.cuadro').addClass('borderPunte');

                    var datos = [$(this).parent(), $(this).parent().children('span').html()];
                    arrayPuente.push(datos);

                    var id = $(this).attr("id");
                    var diente = $(this).parent().children('span').html();
                    var nombre = $(this).attr("nombre");

                    if ($(this).parent().hasClass("derecho")) {

                        if (arrayPuente.length == 2) {
                            var diferencia = arrayPuente[0][1] - arrayPuente[1][1]

                            if (diferencia < 0) {
                                diferencia = diferencia * -1;
                                diferencia = diferencia * 50;
                                arrayPuente[1][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-style: dashed;border-color:blue;" id="puente"></div>');
                                arrayPuente[1][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            } else {
                                diferencia = diferencia * 50;
                                arrayPuente[0][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-style: dashed;border-color:blue;" id="puente"></div>');
                                arrayPuente[0][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            }
                            AggFactura(arrayPuente[0][1] + "-" + arrayPuente[1][1], "", id, "PROTESIS_REMOVIBLE");
                            arrayPuente = [];
                        }

                    } else {
                        if (arrayPuente.length == 2) {
                            var diferencia = arrayPuente[0][1] - arrayPuente[1][1]

                            if (diferencia < 0) {
                                diferencia = diferencia * -1;
                                diferencia = diferencia * 50;
                                arrayPuente[0][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-style: dashed;border-color:blue;" id="puente"></div>');
                                arrayPuente[0][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            } else {
                                diferencia = diferencia * 50;
                                arrayPuente[1][0].append('<div style="z-index: 1; height: 15px; width:' + diferencia + 'px; border-style: dashed;border-color:blue;" id="puente"></div>');
                                arrayPuente[1][0].children("#puente").css({
                                    "position": "absolute",
                                    "margin-top": "-2em",
                                    "margin-left": "3.7em"
                                });
                            }
                            AggFactura(arrayPuente[0][1] + "-" + arrayPuente[1][1], "", id, "PROTESIS_REMOVIBLE");
                            arrayPuente = [];
                        }
                    }


                }



                break;

            case "corona":
                var dientePosition = $(this).position();

                $(this).parent().append('<i style="color:skyblue;" class="corona glyphicon glyphicon-modal-window fa-3x fa-fw"></i>');
                $(this).parent().children("i").css({
                    "position": "absolute",
                    "z-index": "1",
                    "top": "24%",
                    "margin-left": "0.7em"
                });
                var id = $(this).attr("id");
                var diente = $(this).parent().children('span').html();
                var nombre = $(this).attr("nombre");
                AggFactura(diente, nombre, id, "CORONA");

                break;

            case "endodoncia":

                $(this).parent().append('<i style="color:skyblue;" class="endodoncia glyphicon glyphicon-triangle-top fa-3x fa-fw"></i>');
                $(this).parent().children("i").css({
                    "position": "absolute",
                    "z-index": "1",
                    "top": "24%",
                    "margin-left": "0.7em"
                });
                var id = $(this).attr("id");
                var diente = $(this).parent().children('span').html();
                var nombre = $(this).attr("nombre");
                AggFactura(diente, nombre, id, "ENDODONCIA");

                break;
            default:
                console.log("borrar case");
        }
        return false;
    });
    return false;
});

$("body").on('click', "i.extraccion", function (ev) {

    var diente = $(this).parent().children('span').html();
    Borrar(hoyMostrar + "EXTRACION_REALIZADA");
    $(this).remove();
});
$("body").on('click', "i.extraer", function (ev) {
    var diente = $(this).parent().children('span').html();
    Borrar(hoyMostrar + "EXTRACION_INDICADA");
    $(this).remove();
});
$("body").on('click', "i.corona", function (ev) {
    var diente = $(this).parent().children('span').html();
    Borrar(hoyMostrar + "CORONA");
    $(this).remove();
});
$("body").on('click', "i.endodoncia", function (ev) {
    var diente = $(this).parent().children('span').html();
    Borrar(hoyMostrar + "ENDODONCIA");
    $(this).remove();
});



///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var medico = $('#nombresUsuario').text();//attr("nombres");
function AggFactura(diente, cara, id, procedimiento) {

    var fecha = new Date()
    var d = fecha.getDate() - 1,
        m = fecha.getMonth(),
        y = fecha.getFullYear();
    var hoyMostrar = fecha.getDate() + "-" + (m + 1) + "-" + y;

    var caja = '<input type="text" value="" name="" class="form-control" style="width:550px">';

    if (!Existe(id, diente, procedimiento, hoyMostrar, cara, caja)) {
        var campos = [hoyMostrar, procedimiento, diente + cara.substring(0, 1) + " - ", caja, medico, 1];

        tablaOdo.row.add(campos).node().id = hoyMostrar + procedimiento;
        tablaOdo.draw();
    }


}

function Existe(id, diente, proce, hoyMostrar, cara, caja) {

    var confirma = false;
    var vector = $('.body').find("#datatableOdon tbody tr");
    $.each(vector, function (a) {
        var dief = "";
        dief = $(this).find('td').eq(2).html();

        var procf = $(this).find('td').eq(1).html();
        var fechaf = $(this).find('td').eq(0).html();
        if (procf == proce && fechaf == hoyMostrar) {
            Borrar(hoyMostrar + proce);
            confirma = true;
            cara = cara.substring(0, 1) + " - " + dief;
            var campos = [hoyMostrar, proce, diente + cara, caja, medico, 1];

            tablaOdo.row.add(campos).node().id = hoyMostrar + proce;
            tablaOdo.draw();
        }
    });
    return confirma;
}

function Modificar(diente, procedimiento, cara) {

    var caja = '<input type="text" name="" value="" class="form-control" style="width:550px">';
    var fecha = new Date()
    var d = fecha.getDate() - 1,
        m = fecha.getMonth(),
        y = fecha.getFullYear();
    var hoyMostrar = fecha.getDate() + "-" + (m + 1) + "-" + y;

    var confirma = false;
    var vector = $('.body').find("#datatableOdon tbody tr");
    $.each(vector, function (a) {
        var dief = "";
        dief = $(this).find('td').eq(2).html();

        var procf = $(this).find('td').eq(1).html();
        var fechaf = $(this).find('td').eq(0).html();
        if (procf == procedimiento && fechaf == hoyMostrar) {

            Borrar(hoyMostrar + procedimiento);
            confirma = true;
            var borra = diente + cara.substring(0, 1) + " - ";

            cara = dief.replace(borra, "");

            if (cara.trim() != "") {
                var campos = [hoyMostrar, procedimiento, cara, caja, medico, 1];

                tablaOdo.row.add(campos).node().id = hoyMostrar + procedimiento;
                tablaOdo.draw();
            }

        }
    });
    return confirma;
}

function Borrar(id) {

    tablaOdo.row("#" + id).remove().draw();
}

function BorrarProtesis(id, proce) {

    var vector = $('.body').find("#datatableOdon tbody tr");
    $.each(vector, function (a) {

        var idf = 0;
        idf = $(this).find('td').eq(2).html();
        var procf = $(this).find('td').eq(1).html();

        if (idf.indexOf(id) >= 0 && procf == proce) {

            tablaOdo.row($(this)).remove().draw();
            return;
        }
    });

}

var idPaciente = 0;
var idConsulta = 0;

function CargarGineco(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarGineco",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        try {
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

            if (respuesta[0][11] == 1) {
                $('.body').find("input#DiabetesS").parent().click();
            }
            if (respuesta[0][12] == 1) {
                $('.body').find("input#HipertensionS").parent().click();
            }
            if (respuesta[0][13] == 1) {
                $('.body').find("input#PulmonarS").parent().click();
            }
            if (respuesta[0][14] == 1) {
                $('.body').find("input#GemelaresS").parent().click();
            }
            if (respuesta[0][15] == 1) {
                $('.body').find("input#OtrosS").parent().click();
            }
            if (respuesta[0][16] == 1) {
                $('.body').find("input#DiabetesFS").parent().click();
            }
            if (respuesta[0][17] == 1) {
                $('.body').find("input#HipertensionFS").parent().click();
            }
            if (respuesta[0][18] == 1) {
                $('.body').find("input#PulmonarFS").parent().click();
            }
            if (respuesta[0][19] == 1) {
                $('.body').find("input#GemelaresFS").parent().click();
            }
            if (respuesta[0][20] == 1) {
                $('.body').find("input#OtrosFS").parent().click();
            }
        } catch (error) {

        }


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarEnfermedades(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarEnfermedad",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (horarios) {
        $.each(horarios, function (h, iten) {
            $("ul#ListaAAP li").each(function (i) {
                var enfermedad = $(this).find('input').attr('value');
                if (enfermedad == horarios[h][1]) {
                    $(this).find('input').prop('checked', true);
                    $(this).append('<textarea class="form-control" type="text" name="">');
                    $(this).find('textarea').val(horarios[h][2]);
                }
            });
            $("ul#ListaAPF li").each(function (i) {
                var enfermedad = $(this).find('input').attr('value');
                if (enfermedad == horarios[h][1]) {
                    $(this).find('input').prop('checked', true);
                    $(this).append('<textarea class="form-control" type="text" name="">');
                    $(this).find('textarea').val(horarios[h][2]);
                }
            });
            $("ul#ListaRevision li").each(function (i) {
                var enfermedad = $(this).find('input').attr('value');
                if (enfermedad == horarios[h][1]) {
                    $(this).find('input').prop('checked', true);
                    $(this).append('<textarea class="form-control" type="text" name="">');
                    $(this).find('textarea').val(horarios[h][2]);
                }
            });
            $("ul#ListaExamenFisico li").each(function (i) {
                var enfermedad = $(this).find('input').attr('value');
                if (enfermedad == horarios[h][1]) {
                    $(this).find('input').prop('checked', true);
                    $(this).append('<textarea class="form-control" type="text" name="">');
                    $(this).find('textarea').val(horarios[h][2]);
                }
            });
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var tablaCliente = null;
function CargarHistoricoConsultas2() {
    //alert("asdad");
    tablaCliente = $('#datatableHistoricoOdon').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": true,
        "paginate": false,
        lengthMenu: [
            [20, 60, 100],
            [20, 60, 100]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarHistoricoConsultas2"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
            "orderable": false,
        },
        {
            "targets": [0],
            "visible": false,
        },
        {
            "className": "text-center",
            "targets": [1]
        }]
    });
}
$(".body").on('change', "#FechaAgenda", function (ev) {
    tablaCliente.column(1).search($(this).val()).draw();
});
/////////////////////////////////////////////////
/////////////PARA LA LISTA DE ATENTIDOS//////////
/////////////////////////////////////////////////
$(".body").on('click', "li#PacienteConsultaExterna", function (ev) {

    $("ul#ListaAAP li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaAPF li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaRevision li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaExamenFisico li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });

    $('ul.treeview-menu').find("li").removeClass("liselec");
    $(this).addClass("liselec");
    var estado = $(this).find("a").attr("Estado");
    var nombre = $(this).find("a").attr("nombrePaciente");
    idPaciente = $(this).find("a").attr("idPaciente");
    idConsulta = $(this).find("a").attr("idConsulta");
    var edad = $(this).find("a").attr("Edad");
    var presion = $(this).find("a").attr("Presion");
    var pulso = $(this).find("a").attr("Pulso");
    var freres = $(this).find("a").attr("FreRes");
    var taxilar = $(this).find("a").attr("TAxilar");
    var peso = $(this).find("a").attr("Peso");
    var talla = $(this).find("a").attr("Talla");
    var imc = $(this).find("a").attr("Imc");
    var cefalico = $(this).find("a").attr("PCefalico");
    var cedula = $(this).find("a").attr("Sexo");

    nombrePacienteImprimir = nombre;
    generoPacienteImprimir = cedula;
    edadPacienteImprimir = edad;
    hcuPacienteImprimir = idPaciente;
    //editor.setValue("");
    //editor.composer.disable();
    if (estado == 1) {
        tabla.clear().draw();
        swal("Esculapio!", "Paciente no ha pasado por Enfermeria!", "warning");
        $("#paciOdon").html("ODONTOGRAMA");
        idPaciente = 0;
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
        $("img#alergiaPaci").prop("src", "imagenes/Alergia.png");
        return;
    }
    $("span#NombrePaci").html(nombre);
    $("span#CedulaPaci").html(cedula);
    $("span#HCU").html(idPaciente);
    $("span#EdadPaci").html(edad);
    $("span#PresionPaci").html(presion);
    $("span#PulsoPaci").html(pulso + ' X Min');
    $("span#PesoPaci").html(peso + ' Kg');
    $("span#TallaPaci").html(talla + ' CM');
    $("span#ImcPaci").html(imc);
    $("span#TAxilar").html(taxilar + '° C');
    $("span#PCefalico").html(cefalico + ' CM');
    $("span#FRPaci").html(freres + ' X Min');

    if (cedula == 'FEMENINO') {
        $('.body li#Femenino').fadeIn();
    } else {
        $('.body li#Femenino').fadeOut();
    }

    $("#odontograma").fadeIn(0);
    $("#odontogramaConsulta").fadeOut(0);
    CargarGineco(idPaciente);
    CargarOdontogramaDetalle();
    CargarEnfermedades(idPaciente);
    CargarEpidemiologico(idPaciente);
    CargarItemsConsulta(idConsulta);
    CargarSignosPorPaciente(idConsulta);
    CargarDiagnosticos();
    CargarAlergias(idPaciente);
    CargarProcedimientos();
    CargarFechasConsultas();
    CargarPlantillasProcedimiento(idPaciente);
    CargarHistoricoRx(idPaciente);
    CargarHistoricoEco(idPaciente);
    CargarHistoricoTac(idPaciente);



    //pacienteSeleccionado=idPaciente;
    CargarHistoricoConsultas(idPaciente);
    CargarUltimos3SignosVitales(idPaciente);
    $('#Historico').attr("disabled", false);
    CargarConsultas(idPaciente);


    // CargarOdontograma($('#FechaConsulta').val());
    $('#SignosPaciente').attr('disabled', false);
    $('#FechaConsulta').attr('disabled', false);
    $("#paciOdon").html($(this).find("a").attr("nombrePaciente") + " " + edad);
    $("#HcuPaciente").attr('disabled', false);
    $("#Diagnosticos").attr('disabled', false);
    $("#Procedimientos").attr('disabled', false);
    $("#Ordenes").attr('disabled', false);
    $("#ParteDiario").parent().fadeIn(0);
    $("#GuardarOdontograma").parent().fadeIn(0);
    $("#OrdenOdontologia").fadeIn(0);
    $("#PrescriPaciente").parent().fadeIn(0);
    $("#ServicioPaciente").parent().fadeIn(0);

    // CargarOdontograma(idConsulta);
    CargarUltimoOdontograma();
    $("#ParteDiario").parent().fadeOut(0);
    $("#GuardarOdontograma").parent().fadeOut(0);
    $("#OrdenOdontologia").fadeOut(0);
    $("#PrescriPaciente").parent().fadeOut(0);
    $("#ServicioPaciente").parent().fadeOut(0);
    modificarOdontograma = false;
});
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//$(".body").on('click', "li#PacienteConsultaExterna", function(ev) {
$('.body table#datatableHistoricoOdon tbody').on('dblclick', 'tr', function (evt) {
    var cerrar = $('.body').find('button.close');
    modificarOdontograma = true;
    $("ul#ListaAAP li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaAPF li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaRevision li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });
    $("ul#ListaExamenFisico li").each(function (j) {
        if ($(this).find('input').is(':checked')) {
            $(this).parent().find('textarea[type=text]').remove();
            $(this).find('input').prop('checked', false);
        }
    });


    /*var pendientes = $(this).parent().parent().attr('id');

    if(pendientes == 'agendaPendientes'){
        $('button#ImprimirTodoEmelec').fadeOut(0);
        $('button#ImprimirTodo').fadeIn(0);
    }else{
        $('button#ImprimirTodoEmelec').fadeIn(0);
        $('button#ImprimirTodo').fadeOut(0);
    }*/


    var datos = $(tablaCliente.row($(this)).data()[0]);

    /*$('ul.treeview-menu').find("li").removeClass("liselec");
    $(this).addClass("liselec");*/
    var estado = datos.attr("Estado");
    var nombre = datos.attr("nombrePaciente");
    idPaciente = datos.attr("idPaciente");
    idConsulta = datos.attr("idConsulta");
    var edad = datos.attr("Edad");
    var presion = datos.attr("Presion");
    var pulso = datos.attr("Pulso");
    var freres = datos.attr("FreRes");
    var taxilar = datos.attr("TAxilar");
    var peso = datos.attr("Peso");
    var talla = datos.attr("Talla");
    var imc = datos.attr("Imc");
    var cefalico = datos.attr("PCefalico");
    var cedula = datos.attr("Sexo");
    banderaGuardar = true;

    nombrePacienteImprimir = nombre;
    generoPacienteImprimir = cedula;
    edadPacienteImprimir = edad;
    hcuPacienteImprimir = idPaciente;
    ciImprimir = datos.attr("cedulapaciente");
    //editor.setValue("");
    //editor.composer.disable();    
    if (estado == 1 || estado == 7) {
        swal("Esculapio!", "Paciente no ha pasado por Enfermeria!", "warning");
        $("#paciOdon").html("ODONTOGRAMA");
        idPaciente = 0;
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
        $("img#alergiaPaci").prop("src", "imagenes/Alergia.png");
        tabla.clear().draw();
    } else {
        $("span#NombrePaci").html(nombre);
        $("span#CedulaPaci").html(cedula);
        $("span#HCU").html(idPaciente);
        $("span#EdadPaci").html(edad);
        $("span#PresionPaci").html(presion);
        $("span#PulsoPaci").html(pulso + ' X Min');
        $("span#PesoPaci").html(peso + ' Kg');
        $("span#TallaPaci").html(talla + ' CM');
        $("span#ImcPaci").html(imc);
        $("span#TAxilar").html(taxilar + '° C');
        $("span#PCefalico").html(cefalico + ' CM');
        $("span#FRPaci").html(freres + ' X Min');

        if (cedula == 'FEMENINO') {
            $('.body li#Femenino').fadeIn();
        } else {
            $('.body li#Femenino').fadeOut();
        }

        $("#odontograma").fadeIn(0);
        $("#odontogramaConsulta").fadeOut(0);
        CargarGineco(idPaciente);
        CargarOdontogramaDetalle();
        CargarEnfermedades(idPaciente);
        CargarEpidemiologico(idPaciente);
        CargarItemsConsulta(idConsulta);
        CargarSignosPorPaciente(idConsulta);
        CargarDiagnosticos();
        CargarAlergias(idPaciente);
        CargarProcedimientos();
        CargarFechasConsultas();
        CargarPlantillasProcedimiento(idPaciente);
        CargarHistoricoRx(idPaciente);
        CargarHistoricoEco(idPaciente);
        CargarHistoricoTac(idPaciente);

        //editor.composer.enable();

        //pacienteSeleccionado=idPaciente;
        CargarHistoricoConsultas(idPaciente);
        CargarUltimos3SignosVitales(idPaciente);
        CargarConsultas(idPaciente);

        var estado = datos.attr("Estado");

        // CargarOdontograma($('#FechaConsulta').val());
        $('#SignosPaciente').attr('disabled', false);
        $('#FechaConsulta').attr('disabled', false);
        $("#paciOdon").html(datos.attr("nombrePaciente") + " " + edad);
        $("#HcuPaciente").attr('disabled', false);
        $("#Diagnosticos").attr('disabled', false);
        $("#Procedimientos").attr('disabled', false);
        $("#Ordenes").attr('disabled', false);

        $("#ParteDiario").parent().fadeIn(0);
        $("#GuardarOdontograma").parent().fadeIn(0);
        $("#OrdenOdontologia").fadeIn(0);
        $("#PrescriPaciente").parent().fadeIn(0);
        $("#ServicioPaciente").parent().fadeIn(0);

        //  CargarOdontograma(idConsulta);

        $('#Historico').attr("disabled", false);

        cerrar.trigger('click');
        CargarUltimoOdontograma();
    }



});

function CargarSignosPorPaciente(idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarSignosPorPaciente",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            $("span#EdadPaci").html(respuesta[0][0]);
            $("span#PresionPaci").html(respuesta[0][1]);
            $("span#PulsoPaci").html(respuesta[0][2] + ' X Min');
            $("span#PesoPaci").html(respuesta[0][4] + ' Kg');
            $("span#TallaPaci").html(respuesta[0][3] + ' CM');
            $("span#ImcPaci").html(respuesta[0][5]);
            $("span#TAxilar").html(respuesta[0][8] + '° C');
            $("span#PCefalico").html(respuesta[0][9] + ' CM');
            $("span#FRPaci").html(respuesta[0][12] + ' X Min');
            //alert(jj);       
        } catch (error) {
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
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarAlergias(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarAlergiaPorPaciente",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        tablaAlergia.clear().draw();
        $.each(respuesta, function (i, value) {
            var dataSet = [respuesta[i][1], respuesta[i][2] + ' ' + respuesta[i][3], respuesta[i][4]];
            tablaAlergia.row.add(dataSet).draw(false);
        });

        var tt = tablaAlergia.rows().count();

        if (tt != 0) {
            stopColor();
            $("img#alergiaPaci").prop("src", "imagenes/Alergia1.png");
            gg = setInterval(function () {
                var img = $("img#alergiaPaci").attr("src");

                if (img == "imagenes/Alergia1.png") {
                    $("img#alergiaPaci").prop("src", "imagenes/Alergia2.png");
                } else {
                    $("img#alergiaPaci").prop("src", "imagenes/Alergia1.png");
                }
            }, 300);
        } else {
            stopColor();
            $("img#alergiaPaci").prop("src", "imagenes/Alergia.png");
        };

    }).fail(function (jqXHR, textStatus, errorThrown) {
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




$(".body").on('click', "#GuardarOdontograma", function (evt) {

    var vector = $('.body').find("#EnfermedadesSeleccionadas div#Enfermedades");
    if (vector.length < 1) {
        swal("Esculapio!", "Seleccione al menos un diagnostico (CIE)", "warning");
        return;
    }

    /*swal({
        title: "Esculapio",
        text: "Seguro De Registrar Los Cambios En La Historia Clinica Del Paciente \n Recuerde Que Una Vez Acepte Esta Informacion, Usted No Podra Realizar Niungun Cambio En La Atencion Prestada.",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarOdontograma($('#odontograma').html().replace(/"/g,"'"),idPaciente,idConsulta);                    
        } else {
            
        }
    });*/
    $(".modalGuardar").modal();

});
$(".body").on('click', "button#GConsulta", function (ev) {
    $('#modal-cargando').modal();
});
$('#modal-cargando').on('shown.bs.modal', function () {
    GuardarOdontograma($('#odontograma').html().replace(/"/g, "'"), idPaciente, idConsulta);
});
function ActualizarItems() {
    var vector = $('.body').find("#ItemsConsulta p");
    $.each(vector, function (a) {
        if (a == 0) {
            GuardarReceta(idPaciente, idConsulta, $(this).attr('id'));
            GuardarOrden(idPaciente, idConsulta, "", $(this).attr('id'));
        }
        ActualizarEstadoItem($(this).attr('id'), "id_estado", 19);
        GuardarDiagnostico(idConsulta, $(this).attr('id'));
    });
}
function GuardarOdontograma(odontograma, idPaciente, idConsulta) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "GuardarOdontograma",
            Paciente: idPaciente,
            Consulta: idConsulta,
            Odontograma: odontograma
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            GuardarProcedimientos();
            ActualizarItems();

            var vector = $('.body').find("#datatableOdon tbody tr");
            $.each(vector, function (a) {
                if ($(this).find('td').html() == "No existen datos") {
                    return false;
                }
                var procedimiento = $(this).find('td').eq(1).html();
                var diente = $(this).find('td').eq(2).html();
                var observacion = $(this).find('input').val();
                if (!$(this).find('input').hasClass("cargado")) {
                    GuardarOdontogramaDetalle(fila[0][0], procedimiento, diente, observacion);
                }
            });
            $('#modal-cargando').modal('hide');
            swal({
                title: "Esculapio",
                text: "Guardado Con Exito, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    printTextArea1();
                    location.reload();
                } else {
                    location.reload();
                }
            });

            return;
        }
        if (respuesta[0] == false) {

            swal("Esculapio!", "No Se Pudo Guardar ", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        $('#modal-cargando').modal('hide');
    });
}

function GuardarOdontogramaDetalle(idOdontograma, procedimiento, diente, observacion) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "GuardarOdontogramaDetalle",
            Odontograma: idOdontograma,
            Procedimiento: procedimiento,
            Diente: diente,
            Observacion: observacion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {

            swal("Esculapio!", "No Se Pudo Guardar ", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}


CargarProcedimientosParteDiario("12,14,17,18,19,24,29,31,43,44,46,47,48,49,51,52,53,54,55,56,81,82,83,84,85,86,87,88");
$('div.nivel1PareDiario').fadeOut(0);
$('div.nivel1PareDiario[name=general]').fadeIn(1);
$('div.nivel1PareDiario[name=morbilidad]').fadeIn(1);


$('div.3nivelParteDiaria').fadeIn(0);
$('div.3nivelParteDiaria[name=interconsulta]').fadeOut(1);
$('div.3nivelParteDiaria[name=condicion]').fadeOut(1);
function CargarProcedimientosParteDiario(ids) {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProcedimientosParteDiario",
            Ids: ids
        },
        dataType: 'JSON',
    }).done(function (respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function (i, value) {
            var elem = ' <option value="' + value[1] + '">' + value[1] + '</option> ';
            $("select#cbmProcedimiento").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('#modal-partediaria').on('shown.bs.modal', function () {
    tablaCieParteDiaria.column(0).search("").draw();
    $('input#descripcion').focus();
});

$(".body table#datatableCiePateDiaria tbody").on('dblclick', "tr", function (evt) {
    codigo = $(this).find('td').eq(0).html();
    enfermedad = $(this).find('td').eq(1).html();

    if (confirmaEpidemiologico) {
        $('#modal-epidemiologico').modal();
    } else {
        $('#modal-diagnostico').modal();
    }
});



function CargarEpidemiologico(idPaciente) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargarEpidemiologico",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }

        confirmaEpidemiologico = false;
        $.each(respuesta, function (i, value) {

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

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body div#EnfermedadesSeleccionadas").on('dblclick', "div#Enfermedades", function (evt) {

    $(this).fadeOut(500, function () {
        $(this).remove();
    });
});

function AgregarEnfermedad(enfermedad, elem) {
    var vector = $("div#Enfermedades").find('#enfe');
    var confirma = true;
    $.each(vector, function (a) {
        var enfe = $(this).html();
        if (enfermedad == enfe) {
            confirma = false;
        }
    });
    if (confirma) {
        $("#EnfermedadesSeleccionadas").append(elem);
    }

}

$(".body").on('click', "button#AgregarDiagnostico", function (evt) {

    var tipo = $('#cbmDiagnostico').val();
    var procedimiento = $('#cbmProcedimiento').val();
    var actividad = $('#cbmActividad').val();
    var interconsulta = $('#cbmInterconsulta').val();

    var revision = "";
    var descripcionDG = "";
    if (procedimiento == 0) {
        swal("Esculapio!", "SELECCIONE UN PROCEDIMIENTO", "warning");
        return;
    }
    if (actividad == 0) {
        swal("Esculapio!", "SELECCIONE CUANTAS ACTIVIDADES REALIZO", "warning");
        return;
    }

    if ($("#modal-diagnostico form.diagnosticos input:checked").val() == "PREVENCION-GENERAL" || $("#modal-diagnostico form.diagnosticos input:checked").val() == "MORBILIDAD") {
        revision = $("#modal-diagnostico div#frmPVG input:checked").val();
        descripcionDG = "";
    }


    if ($("#modal-diagnostico form.diagnosticos input:checked").val() != "PREVENCION-GENERAL" && $("#modal-diagnostico form.diagnosticos input:checked").val() != "MORBILIDAD") {
        revision = $("#modal-diagnostico div#frmEF input:checked").val();
        descripcionDG = '<span id="descripcion" class="col-md-12 badge bg-yellow">' + $("#modal-diagnostico div#frmEF select#cbmEF").val() + '</span> ';
        if ($("#modal-diagnostico div#frmEF select#cbmEF").val() == 0) {
            swal("Esculapio!", "SELECCIONE LA DESCRIPCION DEL DIAGNOSTICO", "warning");
            return;
        }

    }

    $('.body').find('button#Certificado').prop('disabled', false);
    elementoEnfermedad = ' <div id="Enfermedades" class="direct-chat-msg"> '
        + '<span id="cie" class="badge bg-green">' + codigo + '</span>  '
        + '<div id="enfe" style="margin-top: -2em;" class="direct-chat-text col-md-11">'
        + '<span id="nombreEnfermedad" class="col-md-5">'
        + enfermedad
        + '</span>'
        + '<span class="col-md-7 pull-right">'
        + '<span id="tipo" class="col-md-12 badge bg-green">' + $("#modal-diagnostico form.diagnosticos input:checked").val() + '</span>  '
        + '<span id="tiempo" class="col-md-12 badge bg-blue">' + revision + '</span> '
        + descripcionDG

        + '<span id="procedimiento" style="margin-top:3px;" class="col-md-12 badge bg-yellow">' + procedimiento + '</span>  '
        + '<span id="actividad" style="margin-top:3px;" class="col-md-12 badge bg-green">' + actividad + '</span>  '

        + '</span>'
        + '</div>'
        + '</div> ';
    AgregarEnfermedad(enfermedad, elementoEnfermedad);
    $('#CerrarDiagnostico').click();
});

$(".body").on('change', "input[name='radio']", function (evt) {


    if ($(this).prop('checked')) {
        $('#tituloDiagnostico').html("DIAGNOSTICO POR " + $(this).val());

        if ($(this).val() == "MORBILIDAD") {

            $('#frmEF').fadeOut(500, function () {
                $('#frmPVG').fadeIn(500);
            });
            return;
        }
        if ($(this).val() == "PREVENCION-GENERAL") {

            $('#frmEF').fadeOut(500, function () {
                $('#frmPVG').fadeIn(500);
            });


        } else {
            $('#frmPVG').fadeOut(500, function () {
                $('#frmEF').fadeIn(500);
            });


        }
        if ($(this).val() == "PREVENCION-EDAD FERTIL") {

            $('select#cbmEF').find('option[tipo="frmEF"]').css("display", "block");
            $('select#cbmEF').find('option[tipo="frmPF"]').css("display", "none");
            $('select#cbmEF').find('option[tipo="frmDOC"]').css("display", "none");



        }

        if ($(this).val() == "PLANIFICACION FAMILIAR") {

            $('select#cbmEF').find('option[tipo="frmEF"]').css("display", "none");
            $('select#cbmEF').find('option[tipo="frmPF"]').css("display", "block");
            $('select#cbmEF').find('option[tipo="frmDOC"]').css("display", "none");


        }
        if ($(this).val() == "DETECCION OPORTUNA DEL CANCER") {

            $('select#cbmEF').find('option[tipo="frmEF"]').css("display", "none");
            $('select#cbmEF').find('option[tipo="frmPF"]').css("display", "none");
            $('select#cbmEF').find('option[tipo="frmDOC"]').css("display", "block");



        }

        $('.selectpicker').selectpicker('refresh');
    }
});


$(".body").on('click', "button#GuardarEpidemia", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario
    if (idPaciente == 0) {
        swal("Esculapio!", "Debe seleccionar un Paciente", "error");
        return;
    }
    var genero = $('#estadistico').find('select#Genero').val().trim();
    var genero2 = $('#estadistico').find('select#Genero2').val().trim();
    var etnia = $('#estadistico').find('select#Etnia').val().trim();
    var migrante = $('#estadistico').find('select#Migrante').val().trim();
    var migrante2 = $('#estadistico').find('select#Migrante2').val().trim();
    var grupo = $('#estadistico').find('select#Grupo').val().trim();
    var sector = $('#estadistico').find('select#Sector').val().trim();

    var codigo = $('#trabajoSocial').find('input#Codigovih').val().trim();
    var nombreres = $('#trabajoSocial').find('input#Responsable').val().trim();
    var resparen = $('#trabajoSocial').find('input#Parentesco').val().trim();
    var numerores = $('#trabajoSocial').find('input#Numero').val().trim();
    var afiliacion = $('#trabajoSocial').find('select#Afiliacion').val();
    var instruccion = $('#trabajoSocial').find('select#Instruccion').val();

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Modificar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ModificarEpidemia(genero, genero2, etnia, migrante, migrante2, grupo, sector, idPaciente);
            ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion, idPaciente);

        } else {

        }
    });
});

function ModificarEpidemia(genero, genero2, etnia, migrante, migrante2, grupo, sector, id) {
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
            ActualizarEstadoPaciente(id);
            $('#modal-epidemiologico button.btn-outline').click();

            confirmaEpidemiologico = false;
            swal("Informacion Agregada..")
                .then((value) => {
                    $('#modal-diagnostico').modal();
                });
        }

        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}



function ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion, idPaciente) {
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
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
        confirmaEpidemiologico = false;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ActualizarEstadoPaciente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ActualizarEstadoPaciente",
            Estado: 16,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function GuardarDiagnostico(idConsulta, idItem) {

    var vector = $('.body').find("#EnfermedadesSeleccionadas div#Enfermedades");
    $.each(vector, function (a) {

        var tipo = $(this).find('span#tipo').html();
        var tiempo = $(this).find('span#tiempo').html();
        var procedimiento = $(this).find('span#procedimiento').html();
        var actividades = $(this).find('span#actividad').html();
        var interconsulta = 0;
        var condicion = 0;
        var descripcion = $(this).find('span#descripcion').html();
        var idCie = $(this).find('span#cie').find("span").eq(0).attr("id");

        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDiagnostico",
                Consulta: idConsulta,
                Item: idItem,
                Tipo: tipo,
                Tiempo: tiempo,
                Procedimiento: procedimiento,
                Actividades: actividades,
                Interconsulta: interconsulta,
                Condicion: condicion,
                Descripcion: descripcion,
                Cie: idCie
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Parte Diaria", "error");
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });

}

function CargarItemsConsulta(idConsulta) {
    $("#ItemsConsulta").empty();
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarItemsConsulta",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {
            $("#ItemsConsulta").append('<label>PROCEDIMIENTOS</label>');

            $.each(respuesta, function (i, value) {
                var elemento = '<p class="text-aqua" id="' + value[0] + '">' + value[1] + '</p>';
                $("#ItemsConsulta").append(elemento);
            });
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ActualizarEstadoItem(idItem, tipo, estado) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "ActualizarEstadoItem",
            Item: idItem,
            Tipo: tipo,
            Estado: estado
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            //console.log(respuesta[1]);
            return;
        }

        //alert(idConsulta);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}


$(".body").on('change', "select#FechaConsulta", function (evt) {



    if ($(this).val() == "0") {
        $("#odontograma").fadeIn(0);
        $("#odontogramaConsulta").fadeOut(0);
        $("#ParteDiario").parent().fadeIn(0);
        $("#GuardarOdontograma").parent().fadeIn(0);
        $("#OrdenOdontologia").fadeIn(0);
        $("#PrescriPaciente").parent().fadeIn(0);
        $("#ServicioPaciente").parent().fadeIn(0);



        return;
    }


    CargarOdontograma($(this).val());


});

$('#modal-historico-odon').on('shown.bs.modal', function () {
    //CargarHistoricoConsultas2();
    if (!primeravez1) {
        CargarHistoricoConsultas2();
        // $("a.sidebar-toggle").click();
        primeravez1 = true;
    }
    tablaCliente.search('').draw();
});

function CargarOdontograma(consulta) {
    $("#odontograma").fadeIn(0);
    $("#odontogramaConsulta").fadeOut(0);
    $("#ParteDiario").parent().fadeIn(0);
    $("#GuardarOdontograma").parent().fadeIn(0);
    $("#OrdenOdontologia").fadeIn(0);
    $("#PrescriPaciente").parent().fadeIn(0);
    $("#ServicioPaciente").parent().fadeIn(0);

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "CargarOdontograma",
            Consulta: consulta,
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {


            $.each(respuesta, function (i, value) {
                $("#odontograma").fadeOut(0);
                $("#odontogramaConsulta").fadeIn(0);
                $("#odontogramaConsulta").html(value[0]);

                $("#ParteDiario").parent().fadeOut(0);
                $("#GuardarOdontograma").parent().fadeOut(0);
                $("#OrdenOdontologia").fadeOut(0);
                $("#PrescriPaciente").parent().fadeOut(0);
                $("#ServicioPaciente").parent().fadeOut(0);
            });
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarUltimoOdontograma() {
    $("#odontograma").fadeIn(0);
    $("#odontogramaConsulta").fadeOut(0);
    $("#odontograma").html(odontogramaVacio);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "CargarUltimoOdontograma",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {


            $.each(respuesta, function (i, value) {
                $("#odontograma").html(value[0]);
            });

            var vector = $('#bl').find(".diente");

            $.each(vector, function (a) {

                $(this).find("div").eq(0).attr("nombre", "LINGUAL");
                $(this).find("div.debajo").attr("nombre", "VESTIBULAR");
            });

            vector = $('#br').find(".diente");

            $.each(vector, function (a) {
                $(this).find("div").eq(0).attr("nombre", "LINGUAL");
                $(this).find("div.debajo").attr("nombre", "VESTIBULAR");
            });

            vector = $('#bll').find(".diente-leche");

            $.each(vector, function (a) {
                $(this).find("div.top-leche").attr("nombre", "LINGUAL");
                $(this).find("div.debajo-leche").attr("nombre", "VESTIBULAR");
            });

            vector = $('#blr').find(".diente-leche");

            $.each(vector, function (a) {
                $(this).find("div.top-leche").attr("nombre", "LINGUAL");
                $(this).find("div.debajo-leche").attr("nombre", "VESTIBULAR");
            });


        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarOdontogramaDetalle() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "CargarOdontogramaDetalle",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {
            try {
                tablaOdo.clear().draw();
            } catch (error) { }

            $.each(respuesta, function (i, value) {
                var caja = '<input type="text" disabled value="' + value[3] + '" name="" class="form-control cargado" style="width:550px">';

                var campos = [value[0], value[1], value[2], caja, value[4], 2];

                tablaOdo.row.add(campos).node().id = value[0] + value[1];

            });
            tablaOdo.draw();
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarDiagnosticos() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "CargarDiagnosticos",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {

            $("#diagnosticosPaciente").empty();
            $.each(respuesta, function (i, value) {
                var elemento = '<li><span id="cie" class="badge bg-green">' + value[0] + '</span><span class="text">' + value[1] + '</span></li>';
                $("#diagnosticosPaciente").append(elemento);
            });
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarProcedimientos() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "CargarProcedimientos",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {

            $("#procedimientosPaciente").empty();
            $.each(respuesta, function (i, value) {
                //var caja ='<input type="text" disabled name="" value="'+value[2]+'" class="form-control" style="max-width:550px;margin-top:3px; height: 100px; text-align: justify; vertical-align: text-top;">';
                var caja = '<textarea rows="5" class="form-control" disabled >' + value[2] + '</textarea>';
                var elemento = '<li><span id="' + value[0] + '" class="badge bg-green">' + value[1] + '</span><label class="badge bg-blue pull-right">' + value[3] + '</label>' + caja + '</li>';
                $("#procedimientosPaciente").prepend(elemento);
                /*$("#ParteDiario").parent().fadeOut(0);
                $("#GuardarOdontograma").parent().fadeOut(0);
                $("#OrdenOdontologia").fadeOut(0);
                $("#PrescriPaciente").parent().fadeOut(0);
                $("#ServicioPaciente").parent().fadeOut(0);
                modificarOdontograma=false;*/
            });
            CargarItemsConsultaConCaja();
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarItemsConsultaConCaja() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarItemsConsulta",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {


            $.each(respuesta, function (i, value) {
                var caja = '<textarea type="text"  name="" class="form-control" style="max-width:550px;margin-top:3px;  height: 100px; text-align: justify; vertical-align: text-top; resize: none;"></textarea>';
                var elemento = '<li class="guardar"><span id="' + value[0] + '" class="badge bg-green">' + value[1] + '</span>' + caja + '</li>';
                $("#procedimientosPaciente").prepend(elemento);
            });
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function GuardarProcedimientos() {

    var vector = $('.body').find("#procedimientosPaciente li.guardar");
    $.each(vector, function (a) {

        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarProblema",
                Paciente: idPaciente,
                Problema: $(this).find('textarea').val().trim(),
                Consulta: idConsulta,
                Item: $(this).find('span').attr("id"),
                Lab: "",
                Rx: "",
                Eco: "",
                Tomo: "",
                Receta: ""
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar", "error");
            } else {
                try {
                    var fila = JSON.parse(respuesta[1]);
                    ActualizarOrdenTotal(fila[0][0], generarGuardarOrdenTotal(), generarGuardarProcedimientosLab(), generarGuardarProcedimientosRx(), generarGuardarProcedimientosEco(), generarGuardarProcedimientosTac(), generarGuardarReceta());
                } catch (errorrr) {
                    console.log(errorrr)
                }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });

}

function CargarFechasConsultas() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarFechasConsultas",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {
            $("#FechaConsulta").empty();
            var elemento = '<option value="0">Hoy..</option>';
            //$("#FechaConsulta").append(elemento);
            $.each(respuesta, function (i, value) {
                var elemento = '<option value="' + value[0] + '">' + value[1] + '</option>';
                $("#FechaConsulta").append(elemento);
            });
        } catch (error) {
            return;
        }
        //alert(respuesta[0][1]);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('change', "input#control", function (ev) {

    if ($(this).prop("checked")) {

        $("input#fecha_control").fadeIn(50);
    } else {
        $("input#fecha_control").fadeOut(50);
    }

});
$(".body").on('change', "input#fecha_control", function (ev) {
    var fecha = new Date($(this).val());
    var fechaActual = new Date();

    var dias = fecha.getDate() - fechaActual.getDate();
    if (dias > 6) {

        swal("Esculapio!", "La Fecha no debe ser mayor a 7 dias", "error");
        $("#control").click();
    }
    if (dias < -1) {
        swal("Esculapio!", "Escoja una fecha a partir de hoy", "error");
        $("#control").click();
    }

});

function GuardarReceta(idPaciente, idConsulta, idItem) {

    var fila = $('.body').find("#datatableDetalleReceta tbody tr").find("td").eq(0).html();
    if (fila == "No existen datos") {
        return;
    }

    var proxima = 0;
    if ($("#proxima").prop("checked")) {
        proxima = 1;
    } else { proxima = 0 }
    var control = 0;
    if ($("#control").prop("checked")) {
        control = 1;
    } else { control = 0 }


    var fecha_control = $("#fecha_control").val();
    var fecha_proxima = $("#fecha_proxima").val();
    var vector = $("#Especialidad").find("option:selected");
    var especialidad = "";
    $.each(vector, function (a) {
        especialidad += $(this).html() + " / ";
    });

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarReceta",
            Paciente: idPaciente,
            Consulta: idConsulta,
            Proxima: proxima,
            Item: idItem,
            Control: control,
            FechaC: fecha_control,
            FechaP: fecha_proxima,
            Especialidad: especialidad
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            idRecetaImprimir = fila[0][0];
            GuardarDetalleReceta(fila[0][0], idConsulta, idItem);
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar La Receta", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}



function GuardarDetalleReceta(idReceta, idConsulta, idItemConsulta) {

    var vector = $('.body').find("#datatableDetalleReceta tbody tr ");
    $.each(vector, function (a) {

        if ($(this).find('td').html() == "No existen datos") {
            return false;
        }

        var idItem = tablaDetalleReceta.row($(this)).data()[0];
        var presentancion;
        var pvp;
        var cantidad;
        var observaciones;
        var observaciones2;
        var prescripcion = '';
        var sugerencia = '';
        if (idItem == 0) {
            prescripcion = $(this).find('td').eq(0).find('input').val();
            sugerencia = $(this).find('td').eq(1).find('input').val();
            presentancion = $(this).find('td').eq(2).find('input').val();
            pvp = "";
            cantidad = $(this).find('td').eq(3).find('input').val();
            observaciones = $(this).find('td').eq(4).find('select').val();
            observaciones2 = $(this).find('td').eq(5).find('input').val();
        } else {
            presentancion = $(this).find('td').eq(2).find('select').val();
            pvp = $(this).find('td').eq(2).find('select option:selected').attr('pvp');
            cantidad = $(this).find('td').eq(3).find('input').val();
            observaciones = $(this).find('td').eq(4).find('select').val();
            observaciones2 = $(this).find('td').eq(5).find('input').val();
        }


        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleReceta",
                Receta: idReceta,
                Item: idItem,
                Presentacion: presentancion,
                Cantidad: cantidad,
                Observaciones: observaciones,
                Observaciones2: observaciones2,
                Prescripcion: prescripcion,
                Sugerencia: sugerencia
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Los Item Receta", "error");
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });

    ActualizarEstadoItem(idItemConsulta, "id_estado_receta", 18);

}


/*
***************************************************************************************************************************
*/

function GuardarOrden(idPaciente, idConsulta, problema, idItem) {
    var totalLab = $('.body').find("label#precioTotal").html().replace('TOTAL: $', '');
    var totalRx = $('.body').find("label#precioTotalRx").html().replace('TOTAL: $', '');
    var totalEco = $('.body').find("label#precioTotalEco").html().replace('TOTAL: $', '');
    var totalTac = $('.body').find("label#precioTotalTac").html().replace('TOTAL: $', '');
    var totalTotal = parseFloat(parseFloat(totalLab) + parseFloat(totalRx) + parseFloat(totalEco) + parseFloat(totalTac)).toFixed(2);
    if (totalTotal <= 0) {
        return;
    }
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "GuardarOrden",
            Paciente: idPaciente,
            Consulta: idConsulta,
            Item: idItem,
            Motivo: problema
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            idOrdenImprimir = fila[0][0];
            GuardarDetalleOrden(fila[0][0], idConsulta, idItem);
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar La Orden", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}


function GuardarDetalleOrden(idOrden, idConsulta, idItemConsulta) {

    /*************************  LABORATORIO     **************************************************************/
    /*************************  LABORATORIO     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
    $.each(vector, function (a) {

        if ($(this).find('td').html() == "No existen datos") {
            return false;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();


        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Laboratorio: idItem,
                Precio: precio
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Los Item de Laboratorio", "error");
                return;
            }
            ActualizarEstadoItem(idItemConsulta, "id_estado_orden_lab", 17);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });


    /*************************  RX     **************************************************************/
    /*************************  RX     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
    $.each(vector, function (a) {

        if ($(this).find('td').html() == "No existen datos") {
            return false;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();


        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Rx: idItem,
                Precio: precio
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Los Item de RX", "error");
                return;
            }
            ActualizarEstadoItem(idItemConsulta, "id_estado_orden_rx", 17);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });

    /*************************  ECO     **************************************************************/
    /*************************  ECO     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
    $.each(vector, function (a) {

        if ($(this).find('td').html() == "No existen datos") {
            return false;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();


        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Eco: idItem,
                Precio: precio
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Los Item de ECOGRAFIA", "error");
                return;
            }
            ActualizarEstadoItem(idItemConsulta, "id_estado_orden_eco", 17);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });

    /*************************  TOMO     **************************************************************/
    /*************************  TOMO     **************************************************************/

    var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
    $.each(vector, function (a) {

        if ($(this).find('td').html() == "No existen datos") {
            return false;
        }
        var idItem = $(this).attr("id");
        var precio = $(this).find('td').eq(1).html();


        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Agenda.php",
            data: {
                Requerimiento: "GuardarDetalleOrden",
                Orden: idOrden,
                Tac: idItem,
                Precio: precio
            },
            dataType: 'JSON',
        }).done(function (respuesta) {

            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar Los Item de TOMOGRAFIA", "error");
                return;
            }
            //alert(idConsulta);
            ActualizarEstadoItem(idItemConsulta, "id_estado_orden_tomo", 17);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    });
    // Limpiar();

}

function printTextArea1() {
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");

    var reporteexa = generarGuardarOrdenTotal();
    var reportereceta = generarGuardarReceta();

    if (reporteexa != "") {
        $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    }
    if (reportereceta != "") {
        $("#modal-ride #Ride").append('<iframe id="r2" width="100%" height="650"></iframe>');
    }

    var $iframe = $('#r1');
    var $iframe2 = $('#r2');
    
    $iframe.ready(function () {
        if (reporteexa != "") {
            $iframe.contents().find("body").html(reporteexa);
        }
        if (reportereceta != "") {
            $iframe2.contents().find("body").html(reportereceta);
        }
    });
    $("#modal-ride").modal();
}

$(".body").on('click', "button#ImprimirTodo", function (evt) {
    printTextArea1();
});

var tablaHistoricoConsulta = $("#datatableHistorico").DataTable({
    "ordering": false,
    scrollX: true,
    scrollY: 250,
});


function CargarHistoricoConsultas(id) {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "CargarHistoricoConsultas",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        try {
            tablaHistoricoConsulta.clear().draw();
        } catch (error) { }

        $.each(respuesta, function (i, value) {

            tablaHistoricoConsulta.row.add(value);

        });
        tablaHistoricoConsulta.draw(false);



    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}


$(".body").on('click', "button#ImprimeCertificado", function (evt) {
    ReimprimirprintTextAreaCertificado();
});

function ReimprimirprintTextAreaCertificado() {

    var estilos2 = '.page-header, .page-header-space {'
        + 'height: 150px;'
        + '}'
        + ''
        + '.page-footer, .page-footer-space {'
        + 'height: 50px;'
        + ''
        + '}'
        + ''
        + '.page-footer {'
        + 'position: fixed;'
        + 'bottom: 0;'
        + 'width: 100%;'
        + '}'
        + ''
        + '.page-header {'
        + 'position: fixed;'
        + 'top: -2em;'
        + 'width: 100%;'
        + '}'
        + ''
        + '.page {'
        + 'page-break-after: always;'
        + 'width: 100%;'
        + '}'
        + ''
        + '@media print {'
        + 'thead {display: table-header-group;} '
        + 'tfoot {display: table-footer-group;}'
        + '   '
        + 'button {display: none;}'
        + '   '
        + 'body {margin: 0;}'
        + '}';


    childWindow = window.open('', '_blank');
    childWindow.document.write('<html>')
    childWindow.document.write('<head>')
    childWindow.document.write('<style type="text/css">' + estilos2 + '</style>')
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

var chartPresion = null;
function CargarGraficoPresion() {
    var ctx = document.getElementById('lineChart').getContext('2d');
    chartPresion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'SISTOLICA',
                    fill: false,
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.9)',
                    borderWidth: 1
                },
                {
                    label: 'DIASTOLICA',
                    fill: false,
                    backgroundColor: 'rgba(255,165,0, 1)',
                    borderColor: 'rgba(255,165,0, 1)',
                    borderWidth: 1
                },
                {
                    label: 'PULSO',
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
function CargarGraficoPeso() {
    var ctx = document.getElementById('lineChart2').getContext('2d');
    chartPeso = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'PESO',
                    fill: false,
                    backgroundColor: 'rgba(60,141,188,0.9)',
                    borderColor: 'rgba(60,141,188,0.9)',
                    borderWidth: 1
                },
                {
                    label: 'TALLA',
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var fechas = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var dataset = [];

        var data4 = [];
        var data5 = [];
        var dataset2 = [];
        try {
            tablaUltimosSignos.clear().draw();
        } catch (error) { }
        $.each(respuesta, function (i, value) {
            fechas.push(value[11]);
            var dato = value[2].split("/");
            data1.push(dato[0]);
            data2.push(dato[1]);
            data3.push(value[3]);

            data4.push(value[4]);
            data5.push(value[5]);

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
        dataset = [data1, data2, data3];
        dataset2 = [data4, data5];
        tablaUltimosSignos.draw(false);
        addData(chartPresion, fechas, dataset)
        addData(chartPeso, fechas, dataset2)


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets[0].data = data[0];
    chart.data.datasets[1].data = data[1];
    if (data[2] != undefined) {
        chart.data.datasets[2].data = data[2];
    }
    chart.update();
}

$('#modal-enfermeria').on('shown.bs.modal', function () {
    var table = $.fn.dataTable.fnTables(true);
    if (table.length > 0) {
        $(table).dataTable().fnAdjustColumnSizing();
    }
});
$('#modal-diagnostico').on('shown.bs.modal', function () {
    $("#cbmEF").val(0);
    $("#cbmProcedimiento").val(0);
    $("#cbmInterconsulta").val(0);
    $("#cbmDiagnostico").val(0);
    $("#RdPrim").click();
    $("#rdPreG").click();
    $('.selectpicker').selectpicker('refresh');
});

$(".body").on('click', "li#app", function (evt) {
    $("#GuardarAAP").fadeIn(0);
    $("#GuardarAPF").fadeOut(0);
    $("#GuardarRevision").fadeOut(0);
    $("#GuardarExamenFisico").fadeOut(0);
    $("#GuardarGineco").fadeOut(0);
});

$(".body").on('click', "li#apf", function (evt) {
    $("#GuardarAAP").fadeOut(0);
    $("#GuardarAPF").fadeIn(0);
    $("#GuardarRevision").fadeOut(0);
    $("#GuardarExamenFisico").fadeOut(0);
    $("#GuardarGineco").fadeOut(0);
});

$(".body").on('click', "li#rev", function (evt) {
    $("#GuardarAAP").fadeOut(0);
    $("#GuardarAPF").fadeOut(0);
    $("#GuardarRevision").fadeIn(0);
    $("#GuardarExamenFisico").fadeOut(0);
    $("#GuardarGineco").fadeOut(0);
});

$(".body").on('click', "li#exa", function (evt) {
    $("#GuardarAAP").fadeOut(0);
    $("#GuardarAPF").fadeOut(0);
    $("#GuardarRevision").fadeOut(0);
    $("#GuardarExamenFisico").fadeIn(0);
    $("#GuardarGineco").fadeOut(0);
});

$(".body").on('click', "li#Femenino", function (evt) {
    $("#GuardarAAP").fadeOut(0);
    $("#GuardarAPF").fadeOut(0);
    $("#GuardarRevision").fadeOut(0);
    $("#GuardarExamenFisico").fadeOut(0);
    $("#GuardarGineco").fadeIn(0);
});

$('#modal-historico').on('shown.bs.modal', function () {
    tablaHistoricoConsulta.search("").draw();
});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

function generarGuardarOrdenTotal() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var numeroOrden = idOrdenImprimir;
    var reporte = "";
    var totalLab = $('.body').find("label#precioTotal").html().replace('TOTAL: $', '');
    var totalRx = $('.body').find("label#precioTotalRx").html().replace('TOTAL: $', '');
    var totalEco = $('.body').find("label#precioTotalEco").html().replace('TOTAL: $', '');
    var totalTac = $('.body').find("label#precioTotalTac").html().replace('TOTAL: $', '');
    var totalTotal = parseFloat(parseFloat(totalLab) + parseFloat(totalRx) + parseFloat(totalEco) + parseFloat(totalTac)).toFixed(2);
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();

    var filalab = '';
    var filarx = '';
    var filaeco = '';
    var filatac = '';
    var fila = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filalab += '<li>' + item + '</li>';
        });
    }
    fila = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {

        var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filarx += '<li>' + item + '</li>';
        });
    }
    fila = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filaeco += '<li>' + item + '</li>';
        });
    }
    fila = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filatac += '<li>' + item + '</li>';
        });
    }

    var reporteservicios = '<div style="width: 100%;display: inline-block;">';
    if (filalab != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE LABORATORIO</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL LABORATORIO: $' + totalLab + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filalab
            + '</ul>'
            + '</div>';
    }
    if (filarx != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE RAYOS X</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL RAYOS X: $' + totalRx + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filarx
            + '</ul>'
            + '</div>';
    }
    if (filaeco != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE ECOGRAFIA</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL ECOGRAFIA: $' + totalEco + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filaeco
            + '</ul>'
            + '</div>';
    }
    if (filatac != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE TAC/RM</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL TAC/RM: $' + totalTac + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filatac
            + '</ul>'
            + '</div>';
    }
    reporteservicios += '</div> ';

    var estilos2 = 'ul {'
        + '-moz-column-count: 4;'
        + '-webkit-column-count: 4;'
        + 'column-count: 4;'
        + 'width: 100%;'
        + '}'
        + 'li {'
        + 'font-size:12px;'
        + 'width: 100%;'
        + '}';
    var gurdado = CargarReporteDiseno(3);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');
        estilos = estilos + "<style type='text/css'>"+estilos2+"</style>";

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroOrden);
        contenido = contenido.replace("{precio}", formatoDinero(totalTotal));

        contenido = contenido.replace("{cuerpoorden}", reporteservicios);
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }
    return reporte;
}
function generarGuardarProcedimientosLab() {
    var fecha = $('.body').find('input#fechaMovi').val()
    var numeroOrden = idOrdenImprimir;
    var totalLab = $('.body').find("label#precioTotal").html().replace('TOTAL: $', '');
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    var reporte = "";
    var filalab = '';
    var fila = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filalab += '<li>' + item + '</li>';
        });
    }

    var reporteservicios = '<div style="width: 100%;display: inline-block;">';
    if (filalab != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE LABORATORIO</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL LABORATORIO: $' + totalLab + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filalab
            + '</ul>'
            + '</div>';
    }
    reporteservicios += '</div> ';

    var estilos2 = 'ul {'
        + '-moz-column-count: 4;'
        + '-webkit-column-count: 4;'
        + 'column-count: 4;'
        + 'width: 100%;'
        + '}'
        + 'li {'
        + 'font-size:12px;'
        + 'width: 100%;'
        + '}';
    var gurdado = CargarReporteDiseno(3);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');
        estilos = estilos + "<style type='text/css'>"+estilos2+"</style>";

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroOrden);
        contenido = contenido.replace("{precio}", formatoDinero(totalLab));

        contenido = contenido.replace("{cuerpoorden}", reporteservicios);
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }
    return reporte;
}

function generarGuardarProcedimientosRx() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var numeroOrden = idOrdenImprimir;
    var totalRx = $('.body').find("label#precioTotalRx").html().replace('TOTAL: $', '');
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    var filarx = "";
    var reporte = "";
    var fila = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filarx += '<li>' + item + '</li>';
        });
    } else {
        return "";
    }
    var reporteservicios = "";
    if (filarx != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE RAYOS X</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL RAYOS X: $' + totalRx + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filarx
            + '</ul>'
            + '</div>';
    }
    reporteservicios += '</div> ';

    var estilos2 = 'ul {'
        + '-moz-column-count: 4;'
        + '-webkit-column-count: 4;'
        + 'column-count: 4;'
        + 'width: 100%;'
        + '}'
        + 'li {'
        + 'font-size:12px;'
        + 'width: 100%;'
        + '}';
    var gurdado = CargarReporteDiseno(3);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');
        estilos = estilos + "<style type='text/css'>"+estilos2+"</style>";

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroOrden);
        contenido = contenido.replace("{precio}", formatoDinero(totalRx));

        contenido = contenido.replace("{cuerpoorden}", reporteservicios);
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }
    return reporte;
}

function generarGuardarProcedimientosEco() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var numeroOrden = idOrdenImprimir;
    var totalEco = $('.body').find("label#precioTotalEco").html().replace('TOTAL: $', '');
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    var filaeco = "";
    var reporte = "";
    var fila = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filaeco += '<li>' + item + '</li>';
        });
    } else {
        return "";
    }

    var reporteservicios = '<div style="width: 100%;display: inline-block;">';
    if (filaeco != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE ECOGRAFIA</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL ECOGRAFIA: $' + totalEco + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filaeco
            + '</ul>'
            + '</div>';
    }
    reporteservicios += '</div> ';
    var estilos2 = 'ul {'
        + '-moz-column-count: 4;'
        + '-webkit-column-count: 4;'
        + 'column-count: 4;'
        + 'width: 100%;'
        + '}'
        + 'li {'
        + 'font-size:12px;'
        + 'width: 100%;'
        + '}';
    var gurdado = CargarReporteDiseno(3);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');
        estilos = estilos + "<style type='text/css'>"+estilos2+"</style>";

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroOrden);
        contenido = contenido.replace("{precio}", formatoDinero(totalEco));

        contenido = contenido.replace("{cuerpoorden}", reporteservicios);
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }

    return reporte;
}

function generarGuardarProcedimientosTac() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var numeroOrden = idOrdenImprimir;
    var totalTac = $('.body').find("label#precioTotalTac").html().replace('TOTAL: $', '');
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    var filatac = "";
    var reporte = "";
    var fila = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr").find("td").eq(0).html();
    if (fila != "No existen datos") {
        var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
        $.each(vector, function (a) {
            var item = $(this).find('td').eq(0).html().replace('<input type="checkbox" class="hidden">', '');
            if ($(this).attr('id') == -1) {
                item = $(this).find('td').eq(0).find('input').val();
            }
            filatac += '<li>' + item + '</li>';
        });
    } else {
        return "";
    }
    var reporteservicios = '<div style="width: 100%;display: inline-block;">';
    if (filatac != "") {
        reporteservicios += '<div style="display: inline-block;width: 100%;">'
            + '<u style="display: inline-block;"><h4>ORDEN DE TAC/RM</h4></u>'
            + '<h5 style="float: right;display: inline-block;margin-bottom:-1em;">TOTAL TAC/RM: $' + totalTac + '</h5>'
            + '<ul style="margin: -1em;padding-bottom:1em; ">'
            + filatac
            + '</ul>'
            + '</div>';
    }
    reporteservicios += '</div> ';
    var estilos2 = 'ul {'
        + '-moz-column-count: 4;'
        + '-webkit-column-count: 4;'
        + 'column-count: 4;'
        + 'width: 100%;'
        + '}'
        + 'li {'
        + 'font-size:12px;'
        + 'width: 100%;'
        + '}';
    var gurdado = CargarReporteDiseno(3);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');
        estilos = estilos + "<style type='text/css'>"+estilos2+"</style>";

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroOrden);
        contenido = contenido.replace("{precio}", formatoDinero(totalTac));

        contenido = contenido.replace("{cuerpoorden}", reporteservicios);
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }

    return reporte;
}
function generarGuardarReceta() {
    var fecha = $('.body').find('input#fechaMovi').val();
    var numeroReceta = idRecetaImprimir;
    var totalReceta = 0;
    var descripcionCie = $("ul#diagnosticoPaciente li span.text").eq(0).text();
    var codigoCie = $("ul#diagnosticoPaciente li span#cie").eq(0).text();
    var nombreDoctor = $('input#nombreCompleto').val();
    var NombreEspecialidad = $("span#NombreEspecialidad").html();
    var reporte = "";
    var proximacita = "CITA ABIERTA";

    if ($('.body').find('input#proxima').is(':checked')) {
        proximacita = $('.body').find('input#fecha_proxima').val();
    }
    if ($('.body').find('input#control').is(':checked')) {
        proximacita = "Control " + $('.body').find('input#fecha_control').val();
    }

    var vector = $("#Especialidad").find("option:selected");
    var especialidad = "";
    $.each(vector, function (a) {
        especialidad += $(this).html() + " / ";
    });

    var gurdado = CargarReporteDiseno(2);

    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());

        contenido = contenido.replace("{paciente}", nombrePacienteImprimir);
        contenido = contenido.replace("{edad}", edadPacienteImprimir);
        contenido = contenido.replace("{fecha}", fecha);
        contenido = contenido.replace("{hcu}", hcuPacienteImprimir);
        contenido = contenido.replace("{orden}", numeroReceta);

        contenido = contenido.replace("{codigodiagnostico}", codigoCie);
        contenido = contenido.replace("{diagnostico}", descripcionCie);


        contenido = contenido.replace("{proximacita}", proximacita);
        contenido = contenido.replace("{interconsulta}", especialidad.slice(0, -2));
        contenido = contenido.replace("{nombredoctor}", nombreDoctor.toUpperCase());
        contenido = contenido.replace("{ceduladoctor}",  $("#cedulaUsuario").val() );
        contenido = contenido.replace("{especialidad}", NombreEspecialidad.toUpperCase());

        var primerafila = $(contenido).find("#tablaresultado").find("tr").eq(1);

        var filas = "";
        var count = 0;
        var vector = $('.body').find("#datatableDetalleReceta tbody tr ");
        $.each(vector, function (a) {
            if ($(this).find('td').html() == "No existen datos") {
                return "";
            }

            count++;
            var asterisco = '';
            var idItem = tablaDetalleReceta.row($(this)).data()[0];
            var principio = tablaDetalleReceta.row($(this)).data()[1];
            var sugerencia = $(this).find('td').eq(0).html();
            var presentancion = $(this).find('td').eq(1).find('select').val();
            var pvp = $(this).find('td').eq(1).find('select option:selected').attr('pvp');
            if (idItem == 0) {
                principio = "";
                sugerencia = $(this).find('td').eq(0).find('input').val();
                presentancion = $(this).find('td').eq(1).find('input').val();
                pvp = "0";
                asterisco = '*';
            }
            var cantidad = $(this).find('td').eq(2).find('input').val();
            var iva = $(this).find('td').eq(1).find('select').attr('iva');
            if (iva == "S") {
                totalReceta += (parseFloat(pvp) * parseFloat(cantidad)) * 1.12;
            } else {
                totalReceta += parseFloat(pvp) * parseFloat(cantidad);
            }
            var observaciones = $(this).find('td').eq(3).find('select').val();
            var observaciones2 = $(this).find('td').eq(4).find('input').val();

            var agregar = "<tr>" + primerafila.html().replace("{contador}", count + asterisco);
            agregar = agregar.replace("{producto}", '<span>' + sugerencia + '</span> <span style="font-weight: bold;display: block;">' + principio + '</span>');
            agregar = agregar.replace("{cantidad}", cantidad + ' (' + (cantidad != "" ? NumeroALetras(cantidad)+")" : ""));
            agregar = agregar.replace("{prescripcion}", observaciones + ' ' + observaciones2) + "</tr>";
            filas += agregar;

        });
        contenido = contenido.replace("{precio}", formatoDinero(totalReceta));
        contenido = $(contenido).html().replace($(contenido).find("#tablaresultado").find("tbody").html(), filas);
        if (filas == "") { return ""; }
        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }

    return reporte;
}

function ActualizarOrdenTotal(idItem, ordenTotal, ordenLab, ordenRx, ordenEco, ordenTac, ordenReceta) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "ActualizarOrdenTotal",
            Id: idItem,
            OrdenTotal: ordenTotal.replace(/"/g, "'"),
            OrdenLab: ordenLab.replace(/"/g, "'"),
            OrdenRx: ordenRx.replace(/"/g, "'"),
            OrdenEco: ordenEco.replace(/"/g, "'"),
            OrdenTac: ordenTac.replace(/"/g, "'"),
            OrdenReceta: ordenReceta.replace(/"/g, "'")
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            //console.log(respuesta[1]);
            return;
        }

        //alert(idConsulta);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //console.log(errorThrown)
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////

var tabla = $('#datatableConsultaExterna').DataTable({
    ordering: false,
    dom: '<"top"f>rt<"bottom">',
    scrollY: 120,
    scrollX: true,
    autoWidth: false,
    paginate: false,
    keys: true,

    "columnDefs": [{
        "targets": [2, 3, 4, 5, 6, 7, 13, 14, 15],
        "visible": false,
        "searchable": false
    }]
});

tabla.on('key', function (e, datatable, key, cell, originalEvent) {

}).on('key-focus', function (e, datatable, cell) {

    if ($('#datatableConsultaExterna tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')) {
        return;
    }
    $('#datatableConsultaExterna tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
});

function CargarConsultas(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarConsultas",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        tabla.clear().draw();

        $.each(respuesta, function (i, value) {

            var lab = '';
            var rx = '';
            var eco = '';
            var tac = '';
            var rec = '';

            if (value[10] == 17) {
                lab = '<span class="btn-sm btn-warning" id="PendienteLab" >P</span>';
            }

            if (value[11] == 17) {
                rx = '<span class="btn-sm btn-warning" id="PendienteRx" >P</span>';
            }

            if (value[12] == 17) {
                eco = '<span class="btn-sm btn-warning" id="PendienteEco" >P</span>';
            }

            if (value[13] == 17) {
                tac = '<span class="btn-sm btn-warning" id="PendienteTac" >P</span>';
            }

            if (value[10] > 17) {
                lab = '<span idConsultaOrden="' + value[10] + '" class="btn-sm btn-success orlab" >OK</span>';
            }

            if (value[11] > 17) {
                rx = '<span idConsultaOrden="' + value[11] + '" class="btn-sm btn-success orrx" >OK</span>';
            }

            if (value[12] > 17) {
                eco = '<span idConsultaOrden="' + value[12] + '" class="btn-sm btn-success oreco" >OK</span>';
            }

            if (value[13] > 17) {
                tac = '<span idConsultaOrden="' + value[13] + '" class="btn-sm btn-success ortomo" >OK</span>';
            }
            if (value[14] > 17) {
                rec = '<span idConsultaOrden="' + value[16] + '" class="btn-sm btn-success orrec" >REC</span>';
            }

            var dataSet = [respuesta[i][5]
                , respuesta[i][3] + ' ' + respuesta[i][2],
            respuesta[i][1],
            respuesta[i][6],
            respuesta[i][7],
            respuesta[i][8],
            respuesta[i][9],
            respuesta[i][0], lab, rx, eco, tac, rec,
            respuesta[i][16],
            respuesta[i][17],
            value[15]];
            tabla.row.add(dataSet);
        });
        tabla.draw(false);


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$('.body table#datatableConsultaExterna tbody').on('dblclick', 'tr', function (evt) {
    if ($(this).hasClass('selected')) {
        return;
    }

    var idConsulta = tabla.row($(this)).data()[7];
    var idItem = tabla.row($(this)).data()[13];

    CargarProblema(idPaciente, idConsulta, idItem);
});

function CargarProblema(idPaciente, idConsulta, idItem) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarProblema",
            IdPaciente: idPaciente,
            Item: idItem,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        try {
            $('input#reporteEmelec').val(respuesta[0][7]);
            $('input#reporteEmelecLab').val(respuesta[0][8]);
            $('input#reporteEmelecRx').val(respuesta[0][9]);
            $('input#reporteEmelecEco').val(respuesta[0][10]);
            $('input#reporteEmelecTac').val(respuesta[0][11]);
            $('input#reporteEmelecReceta').val(respuesta[0][12]);
        } catch (error) {
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

var tablaOrdenLab = null;
var tablaOrdenRx = null;
var tablaOrdenEco = null;
var tablaOrdenTomo = null;
var tablaOrdenReceta = null;

$(".body").on('click', "span.orlab", function (evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarLaboratorioPorConsulta(idConsulta);
    $('div#modal-orden-lab').modal();
});

$(".body").on('click', "span.orrx", function (evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenRx(idConsulta);
    $('div#modal-orden-rx').modal();
});

$(".body").on('click', "span.oreco", function (evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenEco(idConsulta);
    $('div#modal-orden-eco').modal();
});

$(".body").on('click', "span.ortomo", function (evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenTomo(idConsulta);
    $('div#modal-orden-tomo').modal();
});

$(".body").on('click', "span.orrec", function (evt) {
    var idConsulta = $(this).attr('idConsultaOrden');
    CargarOrdenReceta(idConsulta);
    $('div#modal-orden-receta').modal();
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }

        try {
            tablaOrdenLab.destroy();
        } catch (error) { }

        var filas = [];
        var nombreProce = "";
        var fecha = "";
        $.each(respuesta, function (i, value) {

            if (i == 0) {
                nombreProce = value[7];
                fecha = value[0];
            } else {
                if (nombreProce == value[7]) {
                    fecha = "";
                } else {
                    nombreProce = value[7];
                    fecha = value[0];
                }
            }

            var dataSet = [fecha, respuesta[i][1], respuesta[i][2], respuesta[i][3], respuesta[i][4], respuesta[i][5], respuesta[i][6], respuesta[i][7]];
            //tablaPlantillaProcedimiento.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaOrdenLab = $('#datatableOrdenLab').DataTable({
            scrollX: true,
            scrollY: 480,
            autoWidth: true,
            ordering: false,
            info: false,
            keys: true,
            paginate: false,
            "columnDefs": [{
                "targets": [7],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [0, 1, 2, 3, 4, 5, 6],
                "searchable": false
            }
            ],
            data: filas,
            autoWidth: true
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            tablaOrdenRx.destroy();
        } catch (error) { }
        var filas = [];
        $.each(respuesta, function (i, value) {
            var boton = '<button plantilla="' + respuesta[i][1] + '" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2]];
            //tablaHistoricoRx.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaOrdenRx = $('#datatableOrdenRx').DataTable({
            scrollX: true,
            scrollY: 480,
            autoWidth: true,
            info: false,
            keys: true,
            paginate: false,
            data: filas,
            autoWidth: true
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            tablaOrdenEco.destroy();
        } catch (error) { }
        var filas = [];
        $.each(respuesta, function (i, value) {
            var boton = '<button plantilla="' + respuesta[i][1] + '" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2]];
            //tablaHistoricoEco.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaOrdenEco = $('#datatableOrdenEco').DataTable({
            scrollX: true,
            scrollY: 480,
            autoWidth: true,
            info: false,
            keys: true,
            paginate: false,
            data: filas,
            autoWidth: true
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            tablaOrdenTomo.destroy();
        } catch (error) { }
        var filas = [];
        $.each(respuesta, function (i, value) {
            var boton = '<button plantilla="' + respuesta[i][1] + '" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2]];
            //tablaHistoricoTac.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaOrdenTomo = $('#datatableOrdenTomo').DataTable({
            scrollX: true,
            scrollY: 480,
            autoWidth: true,
            info: false,
            keys: true,
            paginate: false,
            data: filas,
            autoWidth: true
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
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
    paginate: false,
    ordering: false,
    autoWidth: true,
    searching: false,
    "columnDefs": [{
        "targets": [0, 6, 7, 8],
        "visible": false,
        "searchable": false
    }]
});

$('#modal-orden-receta').on('shown.bs.modal', function () {
    try {
        var tid = setInterval(function () {
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
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }

        var filas = [];

        try {
            tablaOrdenReceta.clear().draw();
        } catch (error) { }
        var fecha1 = "";
        var fecha2 = "";
        $.each(respuesta, function (i, value) {
            fecha1 = respuesta[i][6];
            fecha2 = respuesta[i][7];
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2], respuesta[i][3], respuesta[i][4], respuesta[i][5], respuesta[i][6], respuesta[i][7], respuesta[i][8]];
            tablaOrdenReceta.row.add(dataSet);

        });
        if (fecha2 != 'NO') {
            $('.body').find('label#FechaControlReceta').text('CITA DE CONTROL: ' + fecha2.substring(0, 10));
        } else {
            if (fecha1 != 'NO') {
                $('.body').find('label#FechaControlReceta').text('SU PROXIMA CITA ES: ' + fecha1.substring(0, 10));
            } else {
                $('.body').find('label#FechaControlReceta').text('CITA ABIERTA');
            }
        }
        tablaOrdenReceta.draw(false);



    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body").on('click', "button#ImprimeRecetaNueva", function (evt) {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelecReceta').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
});

function ReimprimirprintTextAreaEmelec() {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelec').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

function ReimprimirprintTextAreaEmelecLab() {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelecLab').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

function ReimprimirprintTextAreaEmelecRx() {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelecRx').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

function ReimprimirprintTextAreaEmelecEco() {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelecEco').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

function ReimprimirprintTextAreaEmelecTac() {
    childWindow = window.open('', '_blank');
    childWindow.document.write($('.body').find('input#reporteEmelecTac').val());
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

$(".body").on('click', "span#PendienteLab", function (evt) {
    ReimprimirprintTextAreaEmelecLab();
});

$(".body").on('click', "span#PendienteRx", function (evt) {
    ReimprimirprintTextAreaEmelecRx();
});

$(".body").on('click', "span#PendienteEco", function (evt) {
    ReimprimirprintTextAreaEmelecEco();
});

$(".body").on('click', "span#PendienteTac", function (evt) {
    ReimprimirprintTextAreaEmelecTac();
});

$('#modal-ordenes').on('shown.bs.modal', function () {
    try {
        var tid = setInterval(function () {
            tabla.columns.adjust().draw();
            clearInterval(tid);
        }, 100);
    } catch (error) {
        console.log(error);
    }
});

/*$('.textareaEnfermedad').wysihtml5();
var editorObj = $(".textareaEnfermedad").data('wysihtml5');
var editor = editorObj.editor;
editor.setValue("");
editor.composer.disable(); */