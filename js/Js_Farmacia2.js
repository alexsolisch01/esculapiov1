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
var clavesri = "";

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


var cantidadAnterior = 0;
var filaAnterior = '';
var cantidadAnteriorR = 0;
var filaAnteriorR = '';



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
        } else {
            
        }
    });

});

var ivaMovimiento=0;
var descuentoMovimiento=0;
var totalMovimiento=0;

function CalcularTotalConsulta() {

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var totalcancelar = 0;
    var subtotal = 0;
    var descuento = 0;
    var totalIva = 0;    
    var fila = $('.body').find("#datatableDetalleFactFarmacia tbody tr").find("td").eq(0).html();
    ivaMovimiento=0;
    descuentoMovimiento=0;
    totalMovimiento=0;
    
    if(fila!="No existen datos"){
        $.each(vector, function(a) {
                    
            try{
                var descuentoitem = $(this).find('td').eq(7).find('input').val();
                var st = $(this).find('td').eq(5).html();
                var valorDescuento = parseFloat(st) * (descuentoitem / 100);
                $(this).find('td').eq(7).find('input').attr('valorDescuento',valorDescuento);
                st = st - valorDescuento;
                var total = st;
                if($(this).find('td').eq(6).html()=="S"){
                    total = parseFloat(st)*1.12;
                }
                $(this).find('td').eq(8).html("$ " + total.toFixed(2));

                totalcancelar += parseFloat($(this).find('td').eq(8).html().replace('$', ''));
                subtotal += parseFloat($(this).find('td').eq(5).html());                        
                var costoFila = $(this).find('td').eq(3).find('input').attr("costo") * $(this).find('td').eq(3).find('input').val();
                
                if($(this).find('td').eq(6).html()=="S"){
                    totalIva += parseFloat($(this).find('td').eq(5).html())*0.12;
                    ivaMovimiento += (costoFila - (costoFila *(descuentoitem/100)) ) *0.12;
                    costoFila = costoFila * 1.12;
                }
                descuento += parseFloat($(this).find('td').eq(7).find('input').attr('valorDescuento'));
                if(descuentoitem >0 ){
                    descuentoMovimiento +=  costoFila * (descuentoitem/100);
                }
                totalMovimiento +=costoFila - descuentoMovimiento;

                if ($(this).find('td').eq(9).find('button').attr('atendido')==25){
                    $(this).css('background-color', '#F5ECCE');
                }
            }catch(err){}
        }); 
             
    }
    if (totalcancelar > 0) {
        cobrar = true;
    } else {
        cobrar = false;
    }
    
   
    $('span#totalCancelarIva').html('IVA : $ ' + totalIva.toFixed(2));
    $('span#totalCancelarSubtotal').html('SUBTOTAL : $ ' + subtotal.toFixed(2));

    $('span#totalDescuentoConsulta').html('TOTAL DESCUENTO : $ ' + descuento.toFixed(2));
    $('span#totalCancelarConsulta').html('TOTAL A CANCELAR : $ ' + totalcancelar.toFixed(2));
    $('span#totalItemsConsulta').html('TOTAL DE ITEMS : ' + vector.length);
    $('span#totalPagarCobrar').html('$ ' + totalcancelar.toFixed(2));
    $('strong#totalFacturaEstimado').html('$ 0.0');

    if(totalcancelar>0){
        $('button#CobrarConsultaCobrar').prop('disabled',false);
        $('button#CobrarConsulta').prop('disabled',false);
        $('button#ReimprimirFarmacia').prop('disabled',false);
    }else{
        $('button#CobrarConsultaCobrar').prop('disabled',true);
        $('button#CobrarConsulta').prop('disabled',true);
        $('button#ReimprimirFarmacia').prop('disabled',true);
    }
}
var confirmaPago = false;

var idClienteNuevo = '';

function GuardarFacturaInventario() {

    if(idFarmaciaCargada==0){
        swal("Esculapio!", "Seleccione una factura para realizar una NOTA DE CREDITO", "error");
        return;
    }
    var puntoVenta = $('input#puntoVenta').val();
    var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var numero = $('strong#SecuenciaFacturaConsulta2').attr('secuencia');
    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    
    if(idClienteNuevo==undefined || idClienteNuevo==''){
        var cliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    }else{
        var cliente = idClienteNuevo;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarInventarioFactura2",
            Punto: puntoVenta,
            Paciente: paciente,
            Cliente: cliente,
            Numero: numero,
            Total: total,
            Iva:iva,
            Descuento:descuento,
            Farmacia:idFarmaciaCargada,
            TipoIde:$("#cbmTipoIde").val(),
            CedulaCliente:$("#cedulaCliente").html(),
            NombreCliente:$("#nombreCompletoCliente").html(),
            EmailCliente:$("#emailCliente").html(),
            TelefonoCliente:$("#telefonoCliente").html(),
            NumeroFactura:$("#SecuenciaFacturaConsulta").html().replace("FACTURA #: ",""),
            Detalle:ObtenerDetalleMovimiento()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            clavesri = respuesta[3];
            
            ActualizaSecuenciaInventario(secuencia, puntoVenta);
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            GuardarMovimiento(iva,descuento,total,numero,respuesta[1]);
            GuardarDetalleInventario(respuesta[1], respuesta[4], paciente, edad,idFarmaciaCargada); 
            
            idFarmaciaCargada=0;           
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar La Factura. " + respuesta[1], "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
         console.log(errorThrown)
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


function ObtenerDetalleSimple(){
    var productos =[];    

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var valorCaja = 0;
    
    $.each(vector, function(a) {
        
        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html().trim();
        var presentacion = $(this).find('td').eq(2).html();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var descuento = $(this).find('td').eq(7).find('input').val();
        var subtotal = $(this).find('td').eq(5).html();
        var total = $(this).find('td').eq(8).html().replace("$","");
        var iva = $(this).find('td').eq(6).html();
        valorCaja += parseFloat(tablaDetalle.row($(this)).data()[10]).toFixed(2);
        
        if(descuento==""){
            descuento = 0;
        }   
                    
        var lineaDetalle = [item,presentacion,cantidad,precio,descuento,subtotal,id,iva,nivel];
        productos[a]=lineaDetalle;
        
    });

    return productos;
}
function GuardarDetalleInventario(idConsulta, emision, hc, edad,cargada) {
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var numero = $('strong#SecuenciaFacturaConsulta2').attr('secuencia');
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
        AumentarKardex(id,cantidad,precio,numero,nivel);
        $.ajax({
           // async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "GuardarConsultaDetalle2",
                Inventario: id,
                Consulta: idConsulta,
                Presentacion: presentacion,
                Cantidad: cantidad,
                Precio: precio,
                Descuento: descuento,
                Subtotal: subtotal,
                CCargada:cargada
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Guardar el Item !" + item, "error");
            }
                    
        }).fail(function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown)
        });
    });
    $('button.close').click();
    CrearXML(numero,JSON.stringify(productos),valorCaja,idConsulta);
    swal({
        title: "Esculapio",
        text: "Nota De Credito..!, Desea Imprimir?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            //ImprimirTicKetInventario(numero,JSON.stringify(productos), valorCaja);
            printTextAreaMovimiento(numero,ObtenerDetalleSimple());
            LimpiarFarmacia();
        } else {
            LimpiarFarmacia();
        }
    });

    cobrar = false;   
}
function ObtenerDetalleMovimiento(){
    var productos =[];    

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    
    $.each(vector, function(a) {
        
        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html().trim();
        var presentacion = $(this).find('td').eq(2).html().trim();        
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var iva = $(this).find('td').eq(6).html();
        var precio=$(this).find("td").eq(3).find("input").attr("costo");    
        var subtotal=precio * cantidad;
        var descuento=$(this).find("td").eq(7).find("input").val();
        if(descuento==""){
            descuento = 0;
        }
        var total= subtotal - (subtotal*(descuento/100));        
        if(iva=="S"){
            total = total * 1.12;
        }             
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var lineaDetalle = [id,presentacion,cantidad,precio,descuento,subtotal,total,item,iva,nivel];
        productos[a]=lineaDetalle;
        
    });

    return JSON.stringify(productos);
}
function GuardarMovimiento(iva,descuento,total,numero,idNc) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarMovimiento",
            Iva: ivaMovimiento,
            Descuento: descuentoMovimiento,
            Total: totalMovimiento,
            Numero:numero,
            Tipo:"INGRESO",
            Nc:idNc,
            Detalle:ObtenerDetalleMovimiento()
           
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {           
            swal("Esculapio!", "Ocurrio un Error al guardar el movimiento de BODEGA", "error");        
            console.log(errorThrown);
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
         console.log(errorThrown)        
    });
}



function AumentarKardex(idItem,cantidad,precio,numero,nivel){
    AumentarStock(idItem,cantidad,precio,numero,nivel);
    $.ajax({
            //async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "INGRESOkardexFactura",
                Inventario: idItem,
                Cantidad: cantidad,
                Precio:precio,
                Numero: numero,
                Nivel:nivel,
                Concepto:"NCFARMACIA"
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                //swal("Esculapio!",respuesta[1], "error");
                //errores+=respuesta[1]+"\n";
            }
            //console.log(respuesta);
        }).fail(function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown)
        });
}

function AumentarStock(idItem,cantidad,precio,numero,nivel){

    $.ajax({
            //async:false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "AumentarStock",
                Inventario: idItem,
                Cantidad: cantidad,
                Precio:precio,                
                Nivel:nivel
                
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                //swal("Esculapio!",respuesta[1], "error");
                //errores+=respuesta[1]+"\n";
            }
            //console.log(respuesta);
        }).fail(function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown)
        });
}

function ActualizaSecuenciaInventario(secuencia, puntoVenta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ActualizaSecuenciaNc",
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
        $('strong#SecuenciaFacturaConsulta2').attr('secuencia', establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
        $('strong#SecuenciaFacturaConsulta2').html('NOTA DE CREDITO #: ' + establecimiento + "-" + puntoemision + "-" + zfill(secuencia, 9));
    }).fail(function(jqXHR, textStatus, errorThrown) {
         console.log(errorThrown)
    });
}



function ImprimirTicKetInventario(numero,productos,valorCaja) {
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');

    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ImprimirInventarioNC",
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
            Recibido: 0,
            Cambio: 0,
            Ahorro: 0
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        // console.log(errorThrown)
    });
}

function CrearXML(numero,productos,valorCaja,idConsulta) {
    
    $.ajax({
        //async:false,        
        method: "POST",
        url: "Ajax/Aj_Xml.php",
        data: {
            Requerimiento: "CrearXMLNCFarmacia",
            Consulta: idConsulta,
            Numero: numero,
            Factura:$('#SecuenciaFacturaConsulta').html().replace("FACTURA #:","").trim(),
            FechaFactura:emisionCargada,
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
            Recibido: 0,
            Cambio: 0,
            TipoIde:$("#cbmTipoIde").val(),
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if(FcSri=="Online"){
            EnviarXmlSri(respuesta,idConsulta); 
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {       
        console.log(errorThrown);
        // console.log(errorThrown)
    });
}

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
                    Requerimiento :"autorizacionComprobanteNcFarm"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
        }
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown+ " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}




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



var primeravez1 = false;
var tabla1 = null;


function LlenarTablaFacturasConFechasFarmacia() {
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
                Requerimiento: "LlenarTablaFacturasConFechasFarmacianc"
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
            "targets": [0, 1, 2, 3, 4,5],
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
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
}

LlenarTablaFacturasConFechasFarmacia();


var idFarmaciaCargada=0;
var emisionCargada = '';
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
                idFarmaciaCargada=value[0];
                emisionCargada = value[15];
                if(value[18]>0){
                    $("#cbmTipoIde").val(value[18]);
                }else{
                    $("#cbmTipoIde").val("1");
                }
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
                $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
                $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('strong#SecuenciaFacturaConsulta').html('FACTURA #: '+value[14]);
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
            $('button#ReimprimirNc').attr("disabled",true);
            $('button#CobrarConsulta').attr("disabled",false);
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
         console.log(errorThrown)
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
        iva = value.iva;
        
        item = value.nombre;
        var costo = value.costo1;

        if(value.prst1==value[3]){            
            nivel='Dos';
            costo = costo * value.cantidad2;
        }else{
            nivel='Uno';            
        }

        cantidad = '<input disabled nivel="'+nivel+'" style="width:80px;" type="number" costo="'+costo+'" step=".01" value="'+ value[4] +'" class="form-control" id="CantidadDetalleFact" >'
        descuento = '<input disabled style="width:80px;" type="number" required step=".01"  value="'+value[7]+'" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';

        total = parseFloat(subtotal);

        
        id=value[2];
        

        var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2),parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(total).toFixed(2), boton, ""];
        tablaDetalle.row.add(campos).draw(true);
    });

CalcularTotalConsulta();
        }).fail(function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown)
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
    CargarSecuenciaBodega();
    try {
        tablaDetalle.clear().draw();
    } catch (error) {}
    
    $("#cbmTipoIde").val("1");
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
    $('strong#SecuenciaFacturaConsulta2').html('NOTA DE CREDITO #: '+$('strong#SecuenciaFacturaConsulta2').attr('secuencia'));

    try {
        tabla.column(2).search('').draw();
        tabla.column(3).search('').draw();
        tabla.column(4).search('').draw();
        tabla.column(1).search('').draw();
        tabla1.column(1).search('').draw();
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
    $('button#ReimprimirFarmacia').fadeOut(0);
   
    $('button#CobrarConsulta').attr("disabled",false);
    $('button#AnularConsulta').attr("disabled",true);

    $('button#CobrarConsultaCobrar').prop('disabled',true);
    $(".body div#DatosPaciente").css('visibility', 'hidden');
    $("a#SiCon").click();
    $('button#ReimprimirNc').attr("disabled",true);
    $('button#CobrarConsulta').attr("disabled",false);
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
    
    if (paciente == '' || paciente == null || paciente==0) {
        swal("Esculapio!", "Seleecione una factura. ", "error");
        return;
    }

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Efectuar esta Nota De Credito ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
           GuardarFacturaInventario();
        } else {}
    });
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
           console.log(errorThrown)
      });
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




 /*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/

var tablaNotasCredito = null;

function LlenarTablaNc() {
     tablaNotasCredito = $('#datatableNotaCredito').DataTable({
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
                Requerimiento: "LlenarTablaNc"
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
            "targets": [0, 1, 2,3,4,5,6],
            "orderable": false,
        }]
    });    
}

LlenarTablaNc();


$('.body table#datatableNotaCredito tbody').on('dblclick', 'tr', function(evt) {

    if($('#nombreCompleto').attr('idPaciente')!="0"){
        swal({
            title: "Esculapio",
            text: "Seguro que desa Reemplazar lo que contiene la factura.?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {            
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                CargarNotaCredito(numero);
                cerrar.click();
            } else {
                
            }
        });
    }else{
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        CargarNotaCredito(numero);
        cerrar.click();
    }
    
    
}); 
var numeroFacturaCargada= "";
function CargarNotaCredito(numero){
    
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "CargarNotaCredito",
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
                ConsultarDetalleNotaCredito(value[0]); 
                idFarmaciaCargada=value[0];
                emisionCargada = value[15];
                numeroFacturaCargada=value[14];
                clavesri = value[17];
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
                $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
                $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('strong#SecuenciaFacturaConsulta').html('FACTURA #: '+value[14]);
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
            
            $('button#CobrarConsulta').attr("disabled",true);
            $('button#ReimprimirNc').attr("disabled",false);

        }
    });
}


function ConsultarDetalleNotaCredito(idFarmacia){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ConsultarDetalleNotaCredito",
            Farmacia:idFarmacia
        },
            dataType: 'JSON',
    }).done(function(respuesta) {
        //console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        

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
        var boton = '<button type="submit" id="EliminarItemConsultaNN" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

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
$('button#CobrarConsulta').attr("disabled",true);
            $('button#ReimprimirNc').attr("disabled",false);
        }).fail(function(jqXHR, textStatus, errorThrown) {
             console.log(errorThrown)
        });

 }

 $(".body").on('click', "button#ReimprimirNc", function(ev) {
        
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var numero = numeroFacturaCargada;
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
        
        var iva = $(this).find('td').eq(6).html();
        var lineaDetalle = [item,presentacion,cantidad,precio,descuento,subtotal,id,iva];
        productos[a]=lineaDetalle;
        
        
    });
    //ImprimirTicKetInventario(numero,JSON.stringify(productos), valorCaja);
    printTextAreaMovimiento(numero,productos);
    LimpiarFarmacia(); 
});

 function CargarSecuenciaBodega(){

    $.ajax({
                        method:"POST",
                        url:"Ajax/Aj_Movimiento.php",
                        data: {Requerimiento:"CargarSecuencia"},
                        dataType: 'JSON',

              }).done(function(respuesta) {
                    
                    $('#numeroMovimiento').html("INGRESO A BODEGA # "+respuesta[0][0]);

             });
}
CargarSecuenciaBodega();

function printTextAreaMovimiento(numero,productos) {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    if(emisionCargada!=""){
        dateTime = emisionCargada;
    }
    
    var cliente = $('strong#nombreCompletoCliente').html();
    var cedula = $('span#cedulaCliente').html();
    var direccionC = $('span#direccionCliente').html();
    var telefonoC = $('span#telefonoCliente').html();
    var correo = $('span#emailCliente').html();
    var desc = $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", "");
    var subtotal = $('span#totalCancelarSubtotal').html().replace("SUBTOTAL : $ ", "");
    
    
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    var total = parseFloat(subtotal) - parseFloat(desc) + parseFloat(iva);
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
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>NOTA DE CREDITO    : "+numero+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EMISION    : "+dateTime+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLIENTE    : "+cliente+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CED-RUC    : "+cedula+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>DIRECCION  : "+direccionC+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TELEFONO   : "+telefonoC+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CORREO     : "+correo+"</label></div>";
if(productos.length>0){
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>ITEM</label><label style='font-weight:normal; font-size: 9px;margin-left: 120px;'>PREC</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>CANT</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>DCTO(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>TOT($)</label></div>"
        +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos.length; i++) {
            var fechaLab = ""
            var nombre = productos[i][0];
            if(nombre.length>22){
                nombre = nombre.substring(0,22);
            }
            var cantidad = productos[i][2];
            if(cantidad.length>3){
                cantidad = cantidad.substring(0,3);
            }
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» "+nombre+"</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos[i][3]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+cantidad+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos[i][4]+"</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>"+productos[i][5]+"</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
//+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Sub-Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+subtotal+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>(-)Dcto</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+desc+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>IVA 12%</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+parseFloat(iva).toFixed(2)+"</label></div>  "
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+parseFloat(total).toFixed(2)+"</label></div>  "

+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Cajero</label><label style='font-weight:normal; font-size: 11px;float: right;'>"+vendedor+"</label></div>  "

+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>---------------------------------------------------------</div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLAVE DE ACCESO : "+clavesri+"</label></div>  "
    

cuerpo +="<div style='width:100%;margin-top: 30px'><label style='font-weight:normal; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}