
var totalAnticipos = 0;
var totalAbonos = 0;
var totalAvances = 0;
var totalCreditos = 0;

var totalAnticiposDevengados = 0;
var totalNc = 0;
var totalEgresos = 0;

var totalCheque = 0;
var totalVoucher = 0;
var totalTransferencias = 0;

var totalSistema = 0;
var totalCajero = 0;
var totalSupervisor = 0;

var totalVentas = 0;

var efectivoAnticipos =0;
var efectivoCxC =0;


var tablaReporte = null;
function DatatTable() {
    tablaReporte=$('#TablaReporte').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        buttons: [{
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }],
        ordering:false,
        scrollY: 250,
        scrollX: true
    });
}



$(".body").on('click', "button#CargarInforme", function(ev) {
        CargarPuntos();
});

DatatTable();
function Imprimir() {
   childWindow = window.open('','_blank');    
   childWindow.document.write('<html><head></head><body style="font-size: 10px !important;">');
   childWindow.document.write("FECHA : "+$("#FechaActualEsculapio").val());
   childWindow.document.write($('#Tabla').html());
   childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');
}

$(".body").on('click', "button#ImprimirInforme", function(ev) {
  Imprimir();
});


function CargarPuntos(){
var totalTabla=0;
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarPuntos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        totalAnticipos = 0;
        totalAbonos = 0;
        totalAvances = 0;
        totalCreditos = 0;

        totalAnticiposDevengados = 0;
        totalNc = 0;
        totalEgresos = 0;

        totalCheque = 0;
        totalVoucher = 0;
        totalTransferencias = 0;

        totalSistema = 0;
        totalCajero = 0;
        totalSupervisor = 0;

        totalVentas = 0;                
        tablaReporte.clear();

        var totalF1=0;
        var totalF2=0;
        var totalF3=0;
        var totalF4=0;
        var totalF5=0;

        $.each(respuesta, function(i, value) {
            efectivoAnticipos =0;
            efectivoCxC =0;
            var valores = CargarInformeResumido(value[0],value[2]);

            totalTabla+=parseFloat(valores[3]);
            var campos=[value[2],"$ "+valores[0],"$ "+valores[1],"$ "+valores[2],"$ "+valores[3],"$ "+valores[4]];
            tablaReporte.row.add(campos);

            totalF1 +=parseFloat(valores[0]);
            totalF2 +=parseFloat(valores[1]);
            totalF3 +=parseFloat(valores[2]);
            totalF4 +=parseFloat(valores[3]);
            totalF5 +=parseFloat(valores[4]);

        });
        tablaReporte.draw(false);   

        var column = tablaReporte.column(1); 
        $(column.footer()).html("$ "+totalF1.toFixed(2));
        column = tablaReporte.column(2); 
        $(column.footer()).html("$ "+totalF2.toFixed(2));
        column = tablaReporte.column(3); 
        $(column.footer()).html("$ "+totalF3.toFixed(2));
        column = tablaReporte.column(4); 
        $(column.footer()).html("$ "+totalF4.toFixed(2));
        column = tablaReporte.column(5); 
        $(column.footer()).html("$ "+totalF5.toFixed(2));

        $("#TotalConsultas").html("MONTO TOTAL GENERAL $ "+parseFloat(totalTabla).toFixed(2));
    
                
    });

}


function CargarInformeResumido(punto,usuario){
    var campos=null;

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarInformeResumido",
            FechaI:$("#fechaDesdeI").val(),
            FechaF:$("#fechaDesdeF").val(),
            Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        
        $.each(respuesta, function(i, value) {

            var efectivo = (isNaN(parseFloat(value[0]))) ? 0 : parseFloat(value[0]);
            var cheque = (isNaN(parseFloat(value[2]))) ? 0 : parseFloat(value[2]);
            var voucher = (isNaN(parseFloat(value[4]))) ? 0 : parseFloat(value[4]);
            var anticipo = (isNaN(parseFloat(value[6]))) ? 0 : parseFloat(value[6]);
            var credito = (isNaN(parseFloat(value[8]))) ? 0 : parseFloat(value[8]);
            var anticipoRecibido = (isNaN(parseFloat(value[10]))) ? 0 : parseFloat(value[10]);
            var transferencias = (isNaN(parseFloat(value[22]))) ? 0 : parseFloat(value[22]);
            var abonos = (isNaN(parseFloat(value[26]))) ? 0 : parseFloat(value[26]);
            var egreso = (isNaN(parseFloat(value[28]))) ? 0 : parseFloat(value[28]);
            var notacredito = (isNaN(parseFloat(value[30]))) ? 0 : parseFloat(value[30]);

            var avances = (isNaN(parseFloat(value[32]))) ? 0 : parseFloat(value[32]);
            var efectivoCajero = (isNaN(parseFloat(value[33]))) ? 0 : parseFloat(value[33]);
            var efectivoSupervisor = (isNaN(parseFloat(value[36]))) ? 0 : parseFloat(value[36]);
            var descuento = (isNaN(parseFloat(value[37]))) ? 0 : parseFloat(value[37]);

            var numeroCheques = (isNaN(parseFloat(value[3]))) ? 0 : parseFloat(value[3]);
            var numeroTarjeta = (isNaN(parseFloat(value[5]))) ? 0 : parseFloat(value[5]);
            var numeroAnticiposA = (isNaN(parseFloat(value[7]))) ? 0 : parseFloat(value[7]);
            var numeroCuentasxC = (isNaN(parseFloat(value[9]))) ? 0 : parseFloat(value[9]);
            var numeroAnticiposR = (isNaN(parseFloat(value[11]))) ? 0 : parseFloat(value[11]);
            var numeroTransferencias = (isNaN(parseFloat(value[23]))) ? 0 : parseFloat(value[23]);
            var numeroAbonos = (isNaN(parseFloat(value[27]))) ? 0 : parseFloat(value[27]);
            var numeroEgreso = (isNaN(parseFloat(value[29]))) ? 0 : parseFloat(value[29]);
            var numeroNotac = (isNaN(parseFloat(value[31]))) ? 0 : parseFloat(value[31]);


            // FARMACIA
            var efectivof = (isNaN(parseFloat(value[12]))) ? 0 : parseFloat(value[12]);
            var chequef = (isNaN(parseFloat(value[14]))) ? 0 : parseFloat(value[14]);
            var voucherf = (isNaN(parseFloat(value[16]))) ? 0 : parseFloat(value[16]);
            var anticipof = (isNaN(parseFloat(value[18]))) ? 0 : parseFloat(value[18]);
            var creditof = (isNaN(parseFloat(value[20]))) ? 0 : parseFloat(value[20]);
            var transferenciasf = (isNaN(parseFloat(value[24]))) ? 0 : parseFloat(value[24]);
            var notacreditof = (isNaN(parseFloat(value[34]))) ? 0 : parseFloat(value[34]);
            var descuentof = (isNaN(parseFloat(value[39]))) ? 0 : parseFloat(value[39]);

            var numeroChequesf = (isNaN(parseFloat(value[15]))) ? 0 : parseFloat(value[15]);
            var numeroTarjetaf = (isNaN(parseFloat(value[17]))) ? 0 : parseFloat(value[17]);
            var numeroAnticiposAf = (isNaN(parseFloat(value[19]))) ? 0 : parseFloat(value[19]);
            var numeroCuentasxCf = (isNaN(parseFloat(value[21]))) ? 0 : parseFloat(value[21]);
            var numeroTransferenciasf = (isNaN(parseFloat(value[25]))) ? 0 : parseFloat(value[25]);
            var numeroNotaf = (isNaN(parseFloat(value[35]))) ? 0 : parseFloat(value[35]);
            
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // SUMA DE CONSULTA Y FARMACIA
            ///////////////////////////////////////////////////////////////////////////////////////////////////////

            var tipo = $("#cbmServico").val();
            if(tipo=="1"){
                efectivo = efectivo;
                cheque = cheque;
                voucher = voucher;
                anticipo = anticipo;
                credito = credito;
                transferencias = transferencias;
                notacredito = notacredito;
                descuento = descuento;

                numeroCheques = numeroCheques;
                numeroTarjeta = numeroTarjeta;
                numeroAnticiposA = numeroAnticiposA;
                numeroCuentasxC = numeroCuentasxC;
                numeroTransferencias = numeroTransferencias;
                numeroNotac = numeroNotac;
            }
            if(tipo=="2"){
                
                efectivo = efectivof;
                cheque = chequef;
                voucher =voucherf;
                anticipo =anticipof;
                credito = creditof;
                transferencias = transferenciasf;
                notacredito = notacreditof;
                descuento = descuentof;

                numeroCheques =numeroChequesf;
                numeroTarjeta =numeroTarjetaf;
                numeroAnticiposA = numeroAnticiposAf;
                numeroCuentasxC =  numeroCuentasxCf;
                numeroTransferencias =  numeroTransferenciasf;
                numeroNotac =  numeroNotaf;
            }
            if(tipo=="3"){
                efectivo = efectivo + efectivof;
                cheque = cheque + chequef;
                voucher = voucher + voucherf;
                anticipo = anticipo + anticipof;
                credito = credito +creditof;
                transferencias = transferencias +transferenciasf;
                notacredito = notacredito + notacreditof;
                descuento = descuento + descuentof;

                numeroCheques = numeroCheques + numeroChequesf;
                numeroTarjeta = numeroTarjeta + numeroTarjetaf;
                numeroAnticiposA = numeroAnticiposA + numeroAnticiposAf;
                numeroCuentasxC = numeroCuentasxC  + numeroCuentasxCf;
                numeroTransferencias = numeroTransferencias  + numeroTransferenciasf;
                numeroNotac = numeroNotac + numeroNotaf;    
            }

            
            
            CargarIcAnticipoCajeroAdmin($("#fechaDesdeF").val(),punto);
            CargarAbonosCajeroAdmin($("#fechaDesdeF").val(),punto);

            var efectivoSis  = efectivo;//-(0+notacredito);
            //var efectivoSis  = (efectivo+0+efectivoCxC)-(avances+egreso+notacredito);
            
            efectivoSis = (isNaN(parseFloat(efectivoSis))) ? 0 : parseFloat(efectivoSis);

            var total = (efectivo+efectivoAnticipos+efectivoCxC)+(cheque+voucher+transferencias+anticipoRecibido);
                   
            if(efectivoSis<1){
              efectivoSis=0;
            }

           

                totalAnticipos +=anticipoRecibido;
                totalAbonos += abonos;
                totalAvances += avances;
                totalCreditos += credito;

                totalAnticiposDevengados += anticipo;
                totalNc += notacredito;
                totalEgresos += egreso;

                totalCheque += cheque;
                totalVoucher += voucher;
                totalTransferencias += transferencias;

                totalSistema += efectivoSis;
                totalCajero += efectivoCajero;
                totalSupervisor += efectivoSupervisor;

                totalVentas += total;    



                var totalotros=cheque+voucher+transferencias+credito+anticipo;
                var totalfila = (efectivoSis+totalotros);
                campos=[efectivoSis.toFixed(2),totalotros.toFixed(2),descuento.toFixed(2),totalfila.toFixed(2),notacredito.toFixed(2)];                         

        });

    });

    return campos;

}


function CargarIcAnticipoCajeroAdmin(fecha,punto){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarIcAnticipoCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        $.each(respuesta, function(i, value) {

              
              //tablaIcAnticipo.row.add(value);
              if(value[2]=='EFECTIVO' || value[2]=='NOTA DE CREDITO'){
                efectivoAnticipos = efectivoAnticipos+parseFloat(value[1]);
                console.log(value[2])
              }

        });
        
        
    });

}


function CargarAbonosCajeroAdmin(fecha,punto){
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarAbonosCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        $.each(respuesta, function(i, value) {

              if(value[2]=='EFECTIVO' || value[2]=='NOTA DE CREDITO'){
                efectivoCxC = efectivoCxC+parseFloat(value[1]);

              }

        });
        
    });

}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////REPORTE DE VENTAS CONTABILIDAD/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var tablaventasContabilidad = null;

function CargarVentasContabilidadFecha(){

    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarVentasContabilidadFecha",            
            FechaDesde:$('#fechaDesdeVF').val(),
            FechaHasta:$('#fechaHastaVF').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        var total =0;
        
        try{
            tablaventasContabilidad.clear();
            
        }catch(error){}

        $.each(respuesta, function(i, value) {
            value[2] = (isNaN(parseFloat(value[2] ))) ? 0 : parseFloat(value[2]).toFixed(2);       
            tablaventasContabilidad.row.add(value);
            if(value[2]!=null && value[0]!="NC FARMACIA" && value[0]!="NC CONSULTA"){
                total+=parseFloat(value[2]);
                console.log(value[0]+" 1");
            }else{
              if(value[2]!=null){
                total=total-parseFloat(value[2]);  
                console.log(value[0]+" 2");
              }

              
            }
                                
        });                
        tablaventasContabilidad.draw(false); 
        var column = tablaventasContabilidad.column(2); 
        $(column.footer()).html("$ "+formatoDinero(total)); 
        $("#montoTotalReporte").html("MONTO TOTAL $ "+total.toFixed(2));   
    });


}


function DatatTableVentasContabilidad() {
    tablaventasContabilidad=$('#datatableVentas').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        buttons: [/*{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        },*/ {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }/*, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }*/],
        ordering:false,
        scrollY: 250,
        scrollX: true
    });
}
DatatTableVentasContabilidad();

$(".body").on('click', "button#CargarReporteContable", function(ev) {
    
  CargarVentasContabilidadFecha();
});

$(".body").on('click', "button#ImprimirInformeImprimir", function(ev) {
    
  printTextAreaVentas();
});

$(".body").on('click', "button#ImprimirInformeImprimirCuadre", function(ev) {
    
  printTextAreaCuadre();
});

function printTextAreaVentas(){
    var cuerpo2 = '';
    if($('.body').find("#TablaReporte tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;">'
                        +'<thead>'
                            +'<tr style="border: 1px solid black;">'
                                +'<th style="border: 1px solid black; width: 20%;">CAJERO</th>'
                                    +'<th style="border: 1px solid black; width: 20%;">VALOR EFECTIVO</th>'
                                    +'<th style="border: 1px solid black; width: 20%;">VALOR CREDITO</th>'
                                    +'<th style="border: 1px solid black; width: 20%;">TOTALES</th>'
                                    +'<th style="border: 1px solid black; width: 20%;">NOTAS DE CREDITO</th>'
                            +'</tr>'
                        +'</thead>'
                        +'<tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#TablaReporte tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var cajero = $(this).find('td').eq(0).html();
            var efectivo = $(this).find('td').eq(1).html();
            var credito = $(this).find('td').eq(2).html();            
            var ncredito =  $(this).find('td').eq(3).html();
            var totales =  $(this).find('td').eq(4).html();

            selec += '<tr>'
                        +'<td style="font-size:12px;">'+cajero+'</td>'
                        +'<td style="font-size:12px; text-align: right;">'+efectivo+'</td>'
                        +'<td style="font-size:12px; text-align: right;">'+credito+'</td>'
                        +'<td style="font-size:12px; text-align: right;">'+ncredito+'</td>'
                        +'<td style="font-size:12px; text-align: right;">'+totales+'</td>'
                    +'</tr>';
            
        });

        cuerpo2 += selec+'</tbody><tfoot>'+$("#footer").html()+'</tfoot></table>';
    }
    
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 0.2em;"><label style="font-weight:bold; font-size: small; text-align: center;">REPORTE DE VENTAS POR CAJERO <span style="float:right;" >Del '+$("#fechaDesdeI").val()+' Hasta '+$("#fechaDesdeF").val()+'</span> </label><br></div>';
    var firmas = '<div style="width:100%; margin-top: 1em;"><label style="font-weight:bold; font-size: small;">'+$('.body').find('label#TotalConsultas').html()+'</label></div>';
    
    
   if($('.body').find("#TablaReporte tbody tr").find('td').html()!="No existen datos"){

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
                      +'top: 0em;'
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

        var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> ';             

        $("#tituloReporte").html("REPORTE DE VENTAS POR CAJERO");
        $("#reporteFechaLocal").html("Fecha "+$('#fechaDesdeI').val()+" - "+$('#fechaDesdeF').val());                    
        childWindow = window.open('','_blank');    
        childWindow.document.write('<html>')
        childWindow.document.write('<head>')
        childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
        childWindow.document.write('</head>')
        childWindow.document.write('<body>')

        childWindow.document.write('<div class="page-header">')        
        childWindow.document.write($('.body').find('div#cabeceraLocal').html())        
        childWindow.document.write('</div>')
        childWindow.document.write('<div class="page-header-space"></div>')

    
        childWindow.document.write('<div class="page">');   
        childWindow.document.write(cuerpo2+firmas+piereporte);
        childWindow.document.write('</div>')
    
        childWindow.document.write('</body>')
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
        childWindow.document.write('</html>')
     
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}


function printTextAreaCuadre(){
    var cuerpo2 = '';
    if($('.body').find("#datatableVentas tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead><tr style="border: 1px solid black; width: 100%;"><th style="border: 1px solid black; width: 50%;">GRUPO</th><th style="border: 1px solid black; width: 25%;">NUMERO DE FACTURAS</th><th style="border: 1px solid black; width: 25%;">TOTAL VENTAS</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#datatableVentas tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var grupo = $(this).find('td').eq(0).html();
            var facturas = $(this).find('td').eq(1).html();
            var ventas = $(this).find('td').eq(2).html();
            ventas = (isNaN(parseFloat(ventas))) ? 0 : parseFloat(ventas); 
            selec += '<tr><td style="font-size:12px;">'+grupo+'</td><td style="font-size:12px; text-align: center;">'+facturas+'</td><td style="font-size:12px; text-align: right;">'+parseFloat(ventas).toFixed(2)+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table>';
    }
    //var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">'+nombreEstablecimiento+'</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 0.2em;"><label style="font-weight:bold; font-size: small; text-align: center;">CUADRE DE CAJA ADMINISTRADOR</label><br></div>';
    var firmas = '<div style="float: right; width:100%; margin-top: 1em;"><label style="float: right; font-weight:bold; font-size: small;">'+$('.body').find('label#montoTotalReporte').html()+'</label><br>';
    
    
   if($('.body').find("#datatableVentas tbody tr").find('td').html()!="No existen datos"){
     
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
                      +'top: 0em;'
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

        $("#tituloReporte").html("REPORTE DE VENTAS POR ESPECIALIDAD");
        $("#reporteFechaLocal").html("Fecha "+$('#fechaDesdeVF').val()+" - "+$('#fechaHastaVF').val());                    
        childWindow = window.open('','_blank');    
        childWindow.document.write('<html>')
        childWindow.document.write('<head>')
        childWindow.document.write('<style type="text/css">'+estilos2+'</style>')
        childWindow.document.write('</head>')
        childWindow.document.write('<body>')

        childWindow.document.write('<div class="page-header">')        
        childWindow.document.write($('.body').find('div#cabeceraLocal').html())        
        childWindow.document.write('</div>')
        childWindow.document.write('<div class="page-header-space"></div>')

    
        childWindow.document.write('<div class="page">');   
        childWindow.document.write(cuerpo2+firmas);
        childWindow.document.write('</div>')
    
        childWindow.document.write('</body>')
        childWindow.document.write('<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>')
        childWindow.document.write('</html>')

    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////REPORTE DE VENTAS DE FARMACIA////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tablaventasFarmacia= null;
function DatatTableVentasFarmacia() {
    tablaventasFarmacia=$('#datatableVentasFarmacia').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        buttons: [ {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }],
        ordering:false,
        scrollY: 250,
        scrollX: true
    });
}
DatatTableVentasFarmacia();

function CargarCosto(fecha) {
  var totalCosto=0;
    $.ajax({       
        async:false, 
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarCosto",            
            Fecha:fecha
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        totalCosto=respuesta[0][0];

        if(totalCosto==null){
          totalCosto=0;
        }
    });
    return totalCosto;
}

function CargarVentasFarmaciaFecha(){

    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarVentasFarmaciaFecha",            
            FechaDesde:$('#fechaDesdeVIF').val(),
            FechaHasta:$('#fechaHastaVFF').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        
        var total =0;
        
        try{
            tablaventasFarmacia.clear();
            
        }catch(error){}

        var Tcosto=0;
        var Tsubtotal=0;
        var Tdesc=0;
        var Tbase12=0;
        var Tiva=0;
        var Tbase0=0;
        var Ttventas=0;
        var Tutilidad=0;

        $.each(respuesta, function(i, value) {
            
            var costo=parseFloat(CargarCosto(value[0])).toFixed(4);
            var subtotal=parseFloat(value[1]).toFixed(4);
            var desc=parseFloat(value[2]).toFixed(4);
            var base12=parseFloat(value[3]).toFixed(4);
            var iva=parseFloat(value[4]).toFixed(4);
            var base0=subtotal-base12;
            var tventas=parseFloat(value[5]).toFixed(4);
            var utilidad=parseFloat(subtotal-costo).toFixed(4);

            var campos = [value[0],costo,subtotal,desc,base12,iva,base0.toFixed(4),tventas,utilidad];
            tablaventasFarmacia.row.add(campos); 

            Tcosto+=parseFloat(costo);
            Tsubtotal+=parseFloat(subtotal);
            Tdesc+=parseFloat(desc);
            Tbase12+=parseFloat(base12);
            Tiva+=parseFloat(iva);
            Tbase0+=parseFloat(base0);
            Ttventas+=parseFloat(tventas);
            Tutilidad+=parseFloat(utilidad);                               
                                
        });
                        
        tablaventasFarmacia.draw(false); 

        var column = tablaventasFarmacia.column(1); 
        $(column.footer()).html(Tcosto.toFixed(4));
        column = tablaventasFarmacia.column(2); 
        $(column.footer()).html(Tsubtotal.toFixed(4));
        column = tablaventasFarmacia.column(3); 
        $(column.footer()).html(Tdesc.toFixed(4));
        column = tablaventasFarmacia.column(4); 
        $(column.footer()).html(Tbase12.toFixed(4));
        column = tablaventasFarmacia.column(5); 
        $(column.footer()).html(Tiva.toFixed(4));
        column = tablaventasFarmacia.column(6); 
        $(column.footer()).html(Tbase0.toFixed(4));
        column = tablaventasFarmacia.column(7); 
        $(column.footer()).html(Ttventas.toFixed(4));
        column = tablaventasFarmacia.column(8); 
        $(column.footer()).html(Tutilidad.toFixed(4));        
    });


}


$(".body").on('click', "button#CagarReporteVentasFarmacia", function(ev) {
    
  CargarVentasFarmaciaFecha();
});

$(".body").on('click', "button#ImprimirReporteFarmacia", function(ev) {
    
  printTextAreaVentasFarmacia();
});


function printTextAreaVentasFarmacia(){
    var cuerpo2 = '';
    var total = 0;
    if($('.body').find("#datatableVentasFarmacia tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th style="text-align: left;">Fecha</th><th style="text-align: right;">Costo</th><th style="text-align: right;">Sub Total</th><th style="text-align: right;">Desc</th><th style="text-align: right;">Base 12</th><th style="text-align: right;">Iva</th><th style="text-align: right;">Base 0</th><th style="text-align: right;">T Comp</th><th style="text-align: right;" >Utilidad</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#datatableVentasFarmacia tbody tr");
        var selec = '';
        $.each(vector, function(a) {

            var fecha= $(this).find('td').eq(0).html();
            var costo=$(this).find('td').eq(1).html();
            var subtotal=$(this).find('td').eq(2).html();
            var desc=$(this).find('td').eq(3).html();
            var base12=$(this).find('td').eq(4).html();
            var iva=$(this).find('td').eq(5).html();
            var base0=$(this).find('td').eq(6).html();
            var tventas=$(this).find('td').eq(7).html();
            var utilidad=$(this).find('td').eq(8).html();

            
            selec += '<tr><td style="font-size:12px;">'+fecha+'</td><td style="font-size:12px;text-align: right;">'+costo+'</td><td style="font-size:12px;text-align: right;">'+subtotal+'</td><td style="font-size:12px; text-align: right;">'+desc+'</td><td style="font-size:12px; text-align: right;">'+base12+'</td><td style="font-size:12px; text-align: right;">'+iva+'</td><td style="font-size:12px; text-align: right;">'+base0+'</td><td style="font-size:12px; text-align: right;">'+tventas+'</td><td style="font-size:12px; text-align: right;">'+utilidad+'</td></tr>';
            
        });

        var column = tablaventasFarmacia.column(1); 
        var Tcosto= $(column.footer()).html();
        column = tablaventasFarmacia.column(2); 
        var Tsubtotal= $(column.footer()).html();
        column = tablaventasFarmacia.column(3); 
        var Tdesc=$(column.footer()).html();
        column = tablaventasFarmacia.column(4); 
        var Tbase12=$(column.footer()).html();
        column = tablaventasFarmacia.column(5); 
        var Tiva=$(column.footer()).html();
        column = tablaventasFarmacia.column(6); 
        var Tbase0=$(column.footer()).html();
        column = tablaventasFarmacia.column(7); 
        var Ttventas=$(column.footer()).html();
        column = tablaventasFarmacia.column(8); 
        var Tutilidad= $(column.footer()).html();        

        var filaAdicional = '<tfoot style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th ></th><th style="font-size:12px;text-align: right;">'+Tcosto+'</th><th style="font-size:12px;text-align: right;">'+Tsubtotal+'</th><th style="font-size:12px;text-align: right;">'+Tdesc+'</th><th style="font-size:12px;text-align: right;">'+Tbase12+'</th><th style="font-size:12px;text-align: right;">'+Tiva+'</th><th style="font-size:12px;text-align: right;">'+Tbase0+'</th><th style="font-size:12px;text-align: right;">'+Ttventas+'</th><th style="font-size:12px;text-align: right;">'+Tutilidad+'</th></tr></tfoot>';
        cuerpo2 += selec+'</tbody>'+filaAdicional+'</table></div><br>';
    }
    //var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">'+nombreEstablecimiento+'</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 1em; margin-bottom: 1em;"><label style="font-weight:bold; font-size: small; text-align: center;">INFORME DE VENTAS DE FARMACIA</label><br></div>';
    var empresa = '<div style="width:100%; text-align: center; margin-top: 0.2em; margin-bottom: 0.2em;"><label style="font-weight:bold; font-size: small; text-align: center;">FUNDACION SANTA ISABEL MADRE DEL PRECURSOR</label><br></div>';
    var firmas = '<div style="float: right; width:100%; margin-top: 0em;"><label style="float: right; font-weight:bold; font-size: small;">$ '+total.toFixed(2)+'</label><br>';
    /*var cabecera2 ='<div style="width:100%; margin-top: 2em;"><label style="font-weight:bold;">Edad: '+edadPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Fecha Emision: '+fecha.substring(0, 10)+'</label></div>';
    var cabecera3 ='<div style="width:100%;"><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: '+numeroOrden+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: '+hora+'</label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: '+21+'</label></div>';
    var cabecera4 ='<div style="width:100%;"><label style="font-weight:bold;">Historia Clinica: '+hcuPacienteImprimir+'</label></div>';
    var firmas = '<div style="float: right; width:100%; margin-top: 3em;"><label style="float: right; font-weight:bold; font-size: small;">________________________________________</label><br>'+
        '<label style="float: right; font-weight:bold; font-size: small;">Dr(a). '+nombreDoctor.toUpperCase()+'</label></div>';
    /*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    
    var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> '; 

   if($('.body').find("#datatableVentasFarmacia tbody tr").find('td').html()!="No existen datos"){
     childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:-1.2em;"></div>');
        //childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        /*childWindow.document.write('<div style="width:100%; text-align: center;">');
        childWindow.document.write($('.body').find('div#LogoImagen').html());
        childWindow.document.write('</div>');*/
        childWindow.document.write(empresa);
        childWindow.document.write(comprobante);
        //childWindow.document.write(cabecera);
        /*childWindow.document.write(cabecera2);
        childWindow.document.write(cabecera4);*/
        childWindow.document.write(cuerpo2+piereporte);
        //childWindow.document.write(firmas);
        //childWindow.document.write(firmas);
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}