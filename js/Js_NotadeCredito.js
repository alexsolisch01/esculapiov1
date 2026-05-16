var primeravez = true;
var primeravezCliente = true;
var cobrar = false;
var cerrarAlert = false;
var tabla = null;
var idConsultaAnterior =0;
var idOrden=0;
var OrdenLab=false;
var OrdenRx=false;
var OrdenEco=false;
var OrdenTac=false;
var TipoConsulta = 1;
var ClicTablaDetalle = false;
var idProcedimientoConsulta =0;
var idProcedimientoConsultaMedicas =0;
var especialidadAtributo = "";

var valorRecibido = 0;
var valorRecibidoCheque = 0;
var valorRecibidoTarjeta = 0;
var valorCredito= 0;
var medicoModificar ='';
var clavesri = "";

var tableEspe = null;
var tableMedico = null;
var tableProce = null;
var tablaAnticipo = null;
var idEspecialidad = 0;
var idGrupoExamen = 0;
var primerEnter = true;
var calendario = null;
var tableDetalle = null;
var tableGrupoExamen = null;
var tableProcedimientosAgregados = null;
var tableGrupoProcedimiento = null;
var calendario2 = null;
var primerEnterLab = true;
var noModal = true;

tableDetalle = $('#datatableDetalleFact').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,            
            'info': true,
            'autoWidth': false,
            scrollY: 300,
            scrollX: true,
            "order": [[ 9, "asc" ]],
            "columnDefs": [{
                "targets": [0, 1, 2, 3, 4, 5, 6, 7,8],
                "orderable": false,
            },
            {
                "targets": [9],
                "visible": false,
            } ]
        });



var medico = "";
var idMedico = 0;


$(".body table#datatableDetalleFact").on('change', "input#DescuentoConsulta", function(evt) {

    var descuento = $(this).val();
    var maximo  = $("#puntoDescuento").val();

    if(parseFloat(descuento)>parseFloat(maximo)){
        $(this).val("0.0");
        
        swal("Esculapio!", "El descuento maximo que puede dar es de "+maximo, "warning");
        descuento = 0;
    }
    var precio = $(this).parent().parent().find('td').eq(5).html();
    var subtotal = precio - parseFloat(precio) * (descuento / 100);
    $(this).parent().parent().find('td').eq(7).html("$ " + subtotal.toFixed(2));
    CalcularTotalConsulta();
});
$(".body table#datatableDetalleFact").on('click', "button#EliminarItemConsulta", function(evt) {
    var item = $(this).parent().parent().find('td').eq(1).html();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tableDetalle.row(fila).remove().draw(false);
            CalcularTotalConsulta();
        } else {}
    });
});

function CalcularTotalConsulta() {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var totalcancelar = 0;
    var total = 0;
    var descuento = 0;

    $.each(vector, function(a) {
        try{
            totalcancelar += parseFloat($(this).find('td').eq(7).html().replace('$', ''));
            total += parseFloat($(this).find('td').eq(5).html().replace('$', ''));
        }catch(error){}
    });
    if (totalcancelar > 0) {
        cobrar = true;
    } else {
        cobrar = false;
    }
    descuento = total-totalcancelar;
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

$(".body").on('click', "button#CobrarConsultaCobrar", function(evt) {
    cerrarAlert = true;

    if (ConsultaCargada<1) {
        swal("Esculapio!", "Seleccione la factura para realizar una nota de credito!!", "warning");
        return;
    }


    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar La Nota De Credito ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarNotaCreditoConsulta();
        } else {}
    });
});

function GuardarNotaCreditoConsulta() {
    var puntoVenta = $('input#puntoVenta').val();
    var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var cliente = $('strong#nombreCompletoCliente').attr('idCliente');
    var numero = $('strong#SecuenciaFacturaConsulta').attr('secuencia');
    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    var referente = $("#cbmMedicoReferente").val();

    var Observacion = $('textarea#textObs').val();

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ConsultaNC.php",
        data: {
            Requerimiento: "GuardarConsulta",
            Punto: puntoVenta,
            Paciente: paciente,
            Cliente: cliente,
            Numero: numero,
            Total: total,
            Descuento:descuento,
            Referente:referente,
            OBS:Observacion,
            Consulta: ConsultaCargada,
            TipoIde:$("#cbmTipoIde").val(),

            CedulaCliente:$("#cedulaCliente").html(),
            NombreCliente:$("#nombreCompletoCliente").html(),
            EmailCliente:$("#emailCliente").html(),
            TelefonoCliente:$("#telefonoCliente").html(),
            NumeroFactura:$("#SecuenciaFacturaConsulta").html().replace("FACTURA #: ","")
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == true) {
            clavesri = respuesta[3];
            ActualizaSecuenciaConsulta(secuencia, puntoVenta);
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            GuardarDetalleConsulta(respuesta[1], respuesta[4], respuesta[2], paciente, edad,ConsultaCargada);
            //GuardarPagos(fila[0][0],valorRecibido,valorRecibidoCheque,valorRecibidoTarjeta,valorCredito,valorRecibidoAnticipo);
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

function GuardarDetalleConsulta(idConsulta, emision, numero, hc, edad,ConsultaCargada) {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var productos =[];
    var productos_lab =[];
    var productos_rx =[];
    var productos_eco =[];
    var productos_tac =[];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        var iddetalle = $(this).find('td').eq(8).find('button').attr("idconsultaitem");
        if(descuento===undefined){
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();

        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        if(procedimiento!=undefined){
            var lineaDetalle = [item,turno,fecha,precio,descuento,subtotal,especialidad,medico,procedimiento];
            productos[ac]=lineaDetalle;
            ac++;
        }
        if(laboratorio!=undefined){
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab,fecha,precio,descuento,subtotal,laboratorio];
            productos_lab[b]=lineaDetalleLab;
            b++;
        }
        if(procedimientorx!=undefined){
            var itemRx = $(this).find('td').eq(1).html();                    
            var lineaDetalleRx = [itemRx,fecha,precio,descuento,subtotal,procedimientorx];
            productos_rx[c]=lineaDetalleRx;
            c++;
        }
        if(procedimientoeco!=undefined){
            var itemEco = $(this).find('td').eq(1).html();  
            var lineaDetalleEco = [itemEco,fecha,precio,descuento,subtotal,procedimientoeco];
            productos_eco[d]=lineaDetalleEco;
            d++;
        }
        if(procedimientotac!=undefined){
            var itemTac = $(this).find('td').eq(1).html();  
            var lineaDetalleTac = [itemTac,fecha,precio,descuento,subtotal,procedimientotac];
            productos_tac[e]=lineaDetalleTac;
            e++;
        }
        //alert(item+"-"+procedimiento+"-"+laboratorio+"-"+empleado+"-"+fecha+"-"+precio+"-"+descuento+"-"+subtotal+"-"+turno);
        $.ajax({
           // async:false,
            method: "POST",
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "GuardarConsultaDetalle",
                Consulta: idConsulta,
                Procedimiento: procedimiento,
                Laboratorio: laboratorio,
                Rx: procedimientorx,
                Eco: procedimientoeco,
                Tac: procedimientotac,
                Empleado: empleado,
                Fecha: fecha,
                Precio: precio,
                Descuento: descuento,
                Subtotal: subtotal,
                Turno: turno,
                CCargada:ConsultaCargada,
                IdDetalle:iddetalle
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar el Item !" + item, "error");
            }else{
                
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
    });
    $('button.close').click();
    
     var objeto = ["CargarNuevaConsulta",idConsulta];

    // send(JSON.stringify(objeto));
    CrearXMLNC(idConsulta, numero, hc, edad,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
    swal({
        title: "Esculapio",
        text: "Nota De Credito Guardada, Desea Imprimir",
        icon: "success",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {            
            //ImprimirTicKetConsulta(idConsulta, numero, hc, edad,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
            printTextAreaMovimiento(numero,productos,productos_lab,productos_rx,productos_eco,productos_tac,"impre");
            LimpiarConsulta();
        } else {
            LimpiarConsulta();
        }
    });
    
    
    cobrar = false;
    
    
    
}

function ActualizarEstadoConsulta(idConsulta,tipo,estado){
    $.ajax({
            method: "POST",
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "ActualizarEstadoConsultaOrden",
                Consulta: idConsulta,
                Tipo:tipo,
                Estado:estado
            },
                dataType: 'JSON',
    });
}


function LimpiarConsulta() {
    try{
        //tabla.destroy();
    }catch(error){}
    try {
        tableDetalle.clear().draw();
    } catch (error) {}
    try {
        tableMedico.clear().draw();
    } catch (error) {}
    try {
        tableProce.clear().draw();
    } catch (error) {}
    try {
      //  tableGrupoProcedimiento.clear().draw();
    } catch (error) {}
    try {
        tableProcedimientosAgregados.clear().draw();
    } catch (error) {}
    $("#cbmTipoIde").val("1");
    $("#laboratorioFactura").removeClass("parpadea");
    $("#rxfacutura").removeClass("parpadea");
    $("#ecoFactura").removeClass("parpadea");
    $("#tamoFactura").removeClass("parpadea");

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
    $('strong#SecuenciaFacturaConsulta').html('FACTURA #: '+$('strong#SecuenciaFacturaConsulta').attr('secuencia'));

    $('.cbmMedicoReferente').fadeOut(0);

    $("#datatableEspecialidadConsulta").fadeIn(0);
    $("#datatableProcedimientoConsulta").fadeIn(0);

    $("#datatableGrupoExamenConsulta").fadeIn(0);
    $("#datatableProcedimientoLaboratorioConsulta").fadeIn(0);

    $("#datatableGrupoRxConsulta").fadeIn(0);
    $("#datatableProcedimientoRxConsulta").fadeIn(0);

    $("#datatableGrupoEcoConsulta").fadeIn(0);
    $("#datatableProcedimientoEcoConsulta").fadeIn(0);

    $("#datatableGrupoTacConsulta").fadeIn(0);
    $("#datatableProcedimientoTacConsulta").fadeIn(0);

    OrdenLab=false;
    OrdenRx=false;
    OrdenEco=false;
    OrdenTac=false;
    ClicTablaDetalle=false;
    idConsultaAnterior=0;
    idOrden=0;

    valorRecibido=0;
    valorRecibidoCheque=0;
    valorRecibidoTarjeta=0;
    valorCredito=0;
    valorRecibidoAnticipo=0;

    totalcobrado=0;
    totalcobrado2=0;
    totalcobrado3=0;
    totalcobrado4=0;
    totalcobrado5=0;
    ConsultaCargada = 0;
    medicoModificar="";
    $('i.cheque').parent().fadeIn(200);
    $('i.tarjeta').parent().fadeIn(200);
    $('i.credito').parent().fadeIn(200);
    $('div.efectivo').fadeIn(200);
    $('button#CobrarConsulta').fadeIn(0);
    $('button#ReimprimirConsulta').fadeOut(0);
    $('button#ModificarFact').fadeOut(0);
    try {
        //tabla.column(2).search('').draw();
        //tabla.column(3).search('').draw();
        //tabla.column(4).search('').draw();
        //tabla.column(1).search('').draw();
    } catch (error) {console.log(error);}
    $("#CargarTodosGrupoProcedimientos").click();
    $('input.checkGrupoProceFact').prop('checked',false);
    $('input.checkProceFact').prop('checked',false);
    $('input.checkProceRxFact').prop('checked',false);
    $('input.checkProceEcoFact').prop('checked',false);
    $('input.checkProceTacFact').prop('checked',false);

    $('button#CobrarConsulta').attr("disabled",false);
    $('button#AnularConsulta').attr("disabled",true);

    $('button#CobrarConsultaCobrar').prop('disabled',true);
    $('button#CobrarConsulta').prop('disabled',true);

    $("#cbmMedicoReferente").val("");
    $('.selectpicker').selectpicker('refresh');

    $('button#CobrarConsultaCobrar').fadeIn(0);
    $('button#ReimprimirNc').fadeOut(0);

    try {
        tableProcedimientosAgregados.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologosEco.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologosTac.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologos.clear().draw();
    } catch (error) {}

    $(".body div#DatosPaciente").css('visibility', 'hidden');
    $("a#SiCon").click();

}

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

function ActualizaSecuenciaConsulta(secuencia, puntoVenta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ConsultaNC.php",
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
        $('strong#SecuenciaFacturaConsulta').attr('secuencia', establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
        $('strong#SecuenciaFacturaConsulta').html('NOTA DE CREDITO #: ' + establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));


        $('strong#SecuenciaFacturaConsulta2').attr('secuencia', establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
        $('strong#SecuenciaFacturaConsulta2').html('FACTURA #: ' + establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
        
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


function ImprimirTicKetConsulta(idConsulta, numero, hc, edad,productos,productos_lab,productos_rx,productos_eco,productos_tac) {
    
    $.ajax({        
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ImprimirNotaCredito",
            Consulta: idConsulta,
            Numero: numero,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            HC: hc,
            Edad: edad,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item:$('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos:productos,
            ProductosLab:productos_lab,
            ProductosRx:productos_rx,
            ProductosEco:productos_eco,
            ProductosTac:productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: 0,
            Cambio: 0
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {/*EnviarXmlSri(respuesta,idConsulta);*/LimpiarConsulta();}).fail(function(jqXHR, textStatus, errorThrown) {
        LimpiarConsulta();
        //console.log(errorThrown);
        //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CrearXMLNC(idConsulta, numero, hc, edad,productos,productos_lab,productos_rx,productos_eco,productos_tac) {
    
    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_Xml.php",
        data: {
            Requerimiento: "CrearXMLNC",
            Consulta: idConsulta,
            Numero: numero,
            Factura:$('#SecuenciaFacturaConsulta').html().replace("FACTURA #:","").trim(),
            FechaFactura:emisionCargada,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            TipoIde:$("#cbmTipoIde").val(),
            HC: hc,
            Edad: edad,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item:$('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos:productos,
            ProductosLab:productos_lab,
            ProductosRx:productos_rx,
            ProductosEco:productos_eco,
            ProductosTac:productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: 0,
            Cambio: 0
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if(FcSri=="Online"){
            console.log("Enviando Online");
            EnviarXmlSri(respuesta,idConsulta); 
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {       
        console.log(errorThrown);
        //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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

var id = "";

function ValidarSiPuedeFacturar(){
    if($('input#puntoVenta').val()==1){
        $('button#CobrarConsultaCobrar').prop('disabled',true);
        $('button#CobrarConsulta').prop('disabled',true);
    }
}

$(".body").on('click', "div#limpiarFact", function(evt) {

    swal({
        title: "Esculapio",
        text: "Seguro que desa Limpiar..?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {            
            LimpiarConsulta();
        } else {
            
        }
    });

    
});




function EnviarXmlSri(xml1,idConsulta) {
    


    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Binario: xml1.binario,    
            Consulta:idConsulta,        
            Requerimiento :"ValidarComprobante"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
        if(respuesta[0].RespuestaRecepcionComprobante.estado=='RECIBIDA'){
            
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {                    
                    Clave:xml1.clave,
                    Consulta:idConsulta,
                    Requerimiento :"autorizacionComprobanteNcConsulta"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                
            });
        }
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////BOTON BUSCAR FACTURA/////////////////////////////////////////
  $(document).keydown(function(tecla) {
            
            
              // tecla.preventDefault();
            
            if ( 120 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#BuscarFact').click();
            }
            
            // alert(tecla.keyCode);
        });
function diaSemana(dia,mes,anio){
    var dias=["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
    return dias[dt.getUTCDay()];    
};
function printTextAreaMovimiento(numero,productos,productos_lab,productos_rx,productos_eco,productos_tac,impre) {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var cliente = $('strong#nombreCompletoCliente').html();
    var cedula = $('span#cedulaCliente').html();
    var direccionC = $('span#direccionCliente').html();
    var telefonoC = $('span#telefonoCliente').html();
    var correo = $('span#emailCliente').html();
    var desc = $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", "");
    var subtotal = $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", "");
    var recibido =  $('input#ValorRecibidoConsulta').val();
    
    var total = parseFloat(subtotal) - parseFloat(desc);
    var vendedor = $('span#Vendedor').html().replace('USUARIO : ','');
    var paciente = $('strong#nombreCompleto').html();
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    var estilo = "<style type='text/css'>body {font-family: monospace;}</style>";
    var cuerpo = "<html>"
+"<head>"
+estilo
+"</head>"
+"<body>"
+"<div style='width:100%; margin-top: 0.8em;'><center><label style='font-weight:bold;'>"+$("#razonEmpresa").val()+"</label></center></div>"
+"<br>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C "+$("#rucEmpresa").val()+"</div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>"+$("#dirEmpresa").val()+"</div>"

+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11x;'>Telf : "+$("#telEmpresa").val()+"</div>"

+"<div style='margin-top: 20px'>"

+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>NOTA DE CREDITO    : "+numero+"</label></div>";

if(impre=="impre"){
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EMISION    : "+dateTime+"</label></div>";
}else{
    dateTime = emisionCargada;
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EMISION    : "+emisionCargada+"</label></div>";
}

cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLIENTE    : "+cliente+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CED-RUC    : "+cedula+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>DIRECCION  : "+direccionC+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TELEFONO   : "+telefonoC+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CORREO     : "+correo+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>"
//+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Sub-Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+subtotal+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>(-)Dcto</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+desc+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>IVA 12%</label><label style='font-weight:normal; font-size: 11px;float: right;'>0.00</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+parseFloat(total).toFixed(2)+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Cajero</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+vendedor+"</label></div>  ";


cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLAVE DE ACCESO : "+clavesri+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</div>";

    if(productos.length>0){
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+paciente+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : "+edad+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Nota de Credito : "+numero+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : "+dateTime+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CONSULTA EXTERNA</label></div>";
        for (var i = 0; i < productos.length; i++) {
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>"+productos[i][0]+"</label><label style='font-weight:normal; font-size: 11px; float: right;'>"+productos[i][5]+"</label></div>";
            var dia = diaSemana(productos[i][2].substring(8, 10),productos[i][2].substring(5, 7),productos[i][2].substring(0, 4));
            cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+productos[i][6]+"</label><label style='font-weight:bold; font-size: 12px; float: right;'>TURNO: "+productos[i][1]+"</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>"+productos[i][7]+"</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: "+dia+", "+productos[i][2].substring(8, 10)+"/"+productos[i][2].substring(5, 7)+"/"+productos[i][2].substring(0, 4)+"</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    cuerpo += "<br>";
    if(productos_lab.length>0){
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+paciente+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : "+edad+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Nota de Credito : "+numero+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : "+dateTime+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>LABORATORIO</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>"
        for (var i = 0; i < productos_lab.length; i++) {
            var fechaLab = "";
            var nombre = productos_lab[i][0];
            if(nombre.length>22){
                nombre = nombre.substring(0,22);
            }
            if(fechaLab != productos_lab[i][1]){
                var dia = diaSemana(productos_lab[i][1].substring(8, 10),productos_lab[i][1].substring(5, 7),productos_lab[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: "+dia+", "+productos_lab[i][1].substring(8, 10)+"/"+productos_lab[i][1].substring(5, 7)+"/"+productos_lab[i][1].substring(0, 4)+"</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» "+nombre+"</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_lab[i][2]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_lab[i][3]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_lab[i][4]+"</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    cuerpo += "<br>";
    if(productos_rx.length>0){
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+paciente+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : "+edad+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Nota de Credito : "+numero+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : "+dateTime+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>RAYOS X</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_rx.length; i++) {
            var fechaLab = "";
            var nombre = productos_rx[i][0];
            if(nombre.length>22){
                nombre = nombre.substring(0,22);
            }
            if(fechaLab != productos_rx[i][1]){
                var dia = diaSemana(productos_rx[i][1].substring(8, 10),productos_rx[i][1].substring(5, 7),productos_rx[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: "+dia+", "+productos_rx[i][1].substring(8, 10)+"/"+productos_rx[i][1].substring(5, 7)+"/"+productos_rx[i][1].substring(0, 4)+"</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» "+nombre+"</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_rx[i][2]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_rx[i][3]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_rx[i][4]+"</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    cuerpo += "<br>";
    if(productos_eco.length>0){
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+paciente+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : "+edad+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Nota de Credito : "+numero+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : "+dateTime+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>ECOGRAFIA</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_eco.length; i++) {
            var fechaLab = "";
            var nombre = productos_eco[i][0];
            if(nombre.length>22){
                nombre = nombre.substring(0,22);
            }
            if(fechaLab != productos_eco[i][1]){
                var dia = diaSemana(productos_eco[i][1].substring(8, 10),productos_eco[i][1].substring(5, 7),productos_eco[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: "+dia+", "+productos_eco[i][1].substring(8, 10)+"/"+productos_eco[i][1].substring(5, 7)+"/"+productos_eco[i][1].substring(0, 4)+"</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» "+nombre+"</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_eco[i][2]+"</span></div><div style='width: 10%; display: inline-block;text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_eco[i][3]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_eco[i][4]+"</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    cuerpo += "<br>";
    if(productos_tac.length>0){
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>"+paciente+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : "+edad+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Nota de Credito : "+numero+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : "+dateTime+"</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TAC/RM</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_tac.length; i++) {
            var fechaLab = "";
            var nombre = productos_tac[i][0];
            if(nombre.length>22){
                nombre = nombre.substring(0,22);
            }
            if(fechaLab != productos_tac[i][1]){
                var dia = diaSemana(productos_tac[i][1].substring(8, 10),productos_tac[i][1].substring(5, 7),productos_tac[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: "+dia+", "+productos_tac[i][1].substring(8, 10)+"/"+productos_tac[i][1].substring(5, 7)+"/"+productos_tac[i][1].substring(0, 4)+"</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» "+nombre+"</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_tac[i][2]+"</span></div><div style='width: 10%; display: inline-block;text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_tac[i][3]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos_tac[i][4]+"</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }

cuerpo +="<div style='width:100%;margin-top: 1px'><label style='font-weight:normal; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}