

$(".body").on('click', "button#CargarInforme", function(ev) {
        $("#Cajeros").empty();
        if($('#cbmFiltro').val()=="R"){
                CargarPuntos();
        }else{
          CargarPuntosDetallado();
        }
        
});

var efectivoAnticipos =0;
var efectivoCxC =0;
var fondoCaja =0;
function CargarIcAnticipos(fecha,punto){

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
              }

        });
        
        
    });

}


function CargarAbonosCajero(fecha,punto){
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

function CargarFondoAdmin(fecha,punto){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFondoAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        

        
        var total =0;
        $.each(respuesta, function(i, value) {              
              total=total+parseFloat(value[5]);              
        });
        
        fondoCaja = total;
    });

}

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
var totalFondos = 0;
var totalVentasCF = 0;
var totalDiferencias =0;
var totalADepositar=0;




function CargarInformeResumido(punto,usuario,indice){

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

            var numeroChequesf = (isNaN(parseFloat(value[15]))) ? 0 : parseFloat(value[15]);
            var numeroTarjetaf = (isNaN(parseFloat(value[17]))) ? 0 : parseFloat(value[17]);
            var numeroAnticiposAf = (isNaN(parseFloat(value[19]))) ? 0 : parseFloat(value[19]);
            var numeroCuentasxCf = (isNaN(parseFloat(value[21]))) ? 0 : parseFloat(value[21]);
            var numeroTransferenciasf = (isNaN(parseFloat(value[25]))) ? 0 : parseFloat(value[25]);
            var numeroNotaf = (isNaN(parseFloat(value[35]))) ? 0 : parseFloat(value[35]);
            
            ///////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // SUMA DE CONSULTA Y FARMACIA
            ///////////////////////////////////////////////////////////////////////////////////////////////////////

            efectivo = efectivo + efectivof;
            cheque = cheque + chequef;
            voucher = voucher + voucherf;
            anticipo = anticipo + anticipof;
            credito = credito +creditof;
            transferencias = transferencias +transferenciasf;
            notacredito = notacredito + notacreditof;

            numeroCheques = numeroCheques + numeroChequesf;
            numeroTarjeta = numeroTarjeta + numeroTarjetaf;
            numeroAnticiposA = numeroAnticiposA + numeroAnticiposAf;
            numeroCuentasxC = numeroCuentasxC  + numeroCuentasxCf;
            numeroTransferencias = numeroTransferencias  + numeroTransferenciasf;
            numeroNotac = numeroNotac + numeroNotaf;
            
            CargarIcAnticipos($("#fechaDesdeF").val(),punto);
            CargarAbonosCajero($("#fechaDesdeF").val(),punto);
            CargarFondoAdmin($("#fechaDesdeF").val(),punto);

            //var efectivoSupervisor = CargarEfectivoSupervisorAdmin(fecha,punto)

            var efectivoSis  = (efectivo+efectivoAnticipos+efectivoCxC)-(avances+egreso+notacredito);
            
            efectivoSis = (isNaN(parseFloat(efectivoSis))) ? 0 : parseFloat(efectivoSis);

            var total = (efectivo+efectivoAnticipos+efectivoCxC+credito+fondoCaja)+(cheque+voucher+transferencias+anticipoRecibido);
            var bg = "box-danger";
            if(efectivoSis==efectivoCajero){
                bg= "box-success";
            }

            var ventas = efectivo+cheque+voucher+credito+anticipo+transferencias

            $("#filasCajeros").find('tr').eq(0).find("td").eq(indice).html("$ "+fondoCaja.toFixed(2));
            $("#filasCajeros").find('tr').eq(1).find("td").eq(indice).html("$ "+ventas.toFixed(2));
            $("#filasCajeros").find('tr').eq(2).find("td").eq(indice).html("$ "+anticipoRecibido.toFixed(2));
            $("#filasCajeros").find('tr').eq(3).find("td").eq(indice).html("$ "+abonos.toFixed(2));
            $("#filasCajeros").find('tr').eq(4).find("td").eq(indice).html("$ "+avances.toFixed(2));
            $("#filasCajeros").find('tr').eq(5).find("td").eq(indice).html("$ "+credito.toFixed(2));
            $("#filasCajeros").find('tr').eq(6).find("td").eq(indice).html("$ "+anticipo.toFixed(2));
            $("#filasCajeros").find('tr').eq(7).find("td").eq(indice).html("$ "+notacredito.toFixed(2));
            $("#filasCajeros").find('tr').eq(8).find("td").eq(indice).html("$ "+egreso.toFixed(2));
            $("#filasCajeros").find('tr').eq(9).find("td").eq(indice).html("$ "+cheque.toFixed(2));
            $("#filasCajeros").find('tr').eq(10).find("td").eq(indice).html("$ "+voucher.toFixed(2));
            $("#filasCajeros").find('tr').eq(11).find("td").eq(indice).html("$ "+transferencias.toFixed(2));
            $("#filasCajeros").find('tr').eq(12).find("td").eq(indice).html("$ "+(efectivoCajero).toFixed(2));
            $("#filasCajeros").find('tr').eq(13).find("td").eq(indice).html("$ "+(efectivoSis).toFixed(2));
            if(efectivoSupervisor>0){
                $("#filasCajeros").find('tr').eq(14).find("td").eq(indice).html("$ "+(efectivoSupervisor-efectivoSis).toFixed(2));
            }else{
                $("#filasCajeros").find('tr').eq(14).find("td").eq(indice).html("$ "+(efectivoCajero-efectivoSis).toFixed(2));
            }

            
            $("#filasCajeros").find('tr').eq(15).find("td").eq(indice).html("$ "+efectivoSupervisor.toFixed(2));
            $("#filasCajeros").find('tr').eq(16).find("td").eq(indice).html("$ "+(efectivoSupervisor+avances).toFixed(2));

           
                

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
                totalFondos += fondoCaja;
                totalVentasCF +=ventas;   
                if(efectivoSupervisor>0){
                    totalDiferencias  +=(efectivoSupervisor-efectivoSis);
                }else{
                    totalDiferencias  +=(efectivoCajero-efectivoSis);
                }
                
                totalADepositar +=(efectivoSupervisor+avances);                           

        });

    });

}

function CargarPuntos(){

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
        totalFondos =0;
        totalVentasCF=0;

        totalDiferencias =0;
        totalADepositar=0;

        var elemento = ' <table id="tablaCajerosResumido" style="font-size:12px; width:100%;border-collapse: collapse;border: 1px solid black;"  class="tablaCajerosResumido">'
                                +'<thead>'
                                  +'<tr id="columnasCajeros">'
                                    +'<th></th>'
                                    
                                  +'</tr>'
                                +'</thead>'
                                +'<tbody id="filasCajeros">'
                                  
                                +'</tbody>'
                                
                              +'</table>';
        $("#Cajeros").append(elemento);                      

        $("#columnasCajeros").empty();
        $("#columnasCajeros").append("<th style='border: 1px solid black;'></th>");
        

        var totalcajeros =0;
        CargarFilas(Object.keys(respuesta).length+1);
        $.each(respuesta, function(i, value) {
            efectivoAnticipos =0;
            efectivoCxC =0;
            fondoCaja =0;
            $("#columnasCajeros").append("<th style='text-align:center;border: 1px solid black;' id= "+value[0]+">"+value[2]+"</th>");
            CargarInformeResumido(value[0],value[2],parseFloat(i)+1);
            
            totalcajeros++;
        });
        $("#columnasCajeros").append("<th style='text-align:center;border: 1px solid black;'>TOTAL</th>");
        
        SumarColumnasResumido(Object.keys(respuesta).length+1);                
    });

}

function CargarFilas(total){
  $("#filasCajeros").empty();

  var filasSecundarias ="";
  var filasSecundariasBold="";
  for (var i = 0; i < total; i++) {
    filasSecundarias +='<td style="text-align:center;border: 1px solid black;">$ 0.00</td>';
    filasSecundariasBold +='<td style="text-align:center;border: 1px solid black;font-weight: bold;">$ 0.00</td>';
  }
  var filasPadre = ' <tr><td style="border: 1px solid black;">FONDO DE CAJA</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">VENTAS TOTALES</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">ANTICIPOS RECIBIDOS</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">LIQ. CUENTAS X COBRAR</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">AVANCES</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">CUENTAS X COBRAR</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">ANTICIPOS DEVENGADOS</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">NOTAS DE CREDITO</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">EGRESOS DE CAJA</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">CHEQUE</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">TARJETA DE CREDITO</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">TRANSFERENCIAS</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">EFECTIVO AL CIERRE</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">CUADRE DEL SISTEMA</td>'+filasSecundarias+'</tr>'
                    +'<tr><td style="border: 1px solid black;">DIFERENCIA</td>'+filasSecundarias+'</tr> '
                    +'<tr><td style="border: 1px solid black;">CUADRE DEL SUPERVISOR</td>'+filasSecundarias+'</tr> '
                    +'<tr><td style="border: 1px solid black;font-weight: bold;">RECAUDADO DEL DIA</td>'+filasSecundariasBold+'</tr>';

  $("#filasCajeros").append(filasPadre);
}

function SumarColumnasResumido(indice){
  
  $("#filasCajeros").find('tr').eq(0).find("td").eq(indice).html("$ "+totalFondos.toFixed(2));
  $("#filasCajeros").find('tr').eq(1).find("td").eq(indice).html("$ "+totalVentasCF.toFixed(2));
  $("#filasCajeros").find('tr').eq(2).find("td").eq(indice).html("$ "+totalAnticipos.toFixed(2));
  $("#filasCajeros").find('tr').eq(3).find("td").eq(indice).html("$ "+totalAbonos.toFixed(2));
  $("#filasCajeros").find('tr').eq(4).find("td").eq(indice).html("$ "+totalAvances.toFixed(2));
  $("#filasCajeros").find('tr').eq(5).find("td").eq(indice).html("$ "+totalCreditos.toFixed(2));
  $("#filasCajeros").find('tr').eq(6).find("td").eq(indice).html("$ "+totalAnticiposDevengados.toFixed(2));
  $("#filasCajeros").find('tr').eq(7).find("td").eq(indice).html("$ "+totalNc.toFixed(2));
  $("#filasCajeros").find('tr').eq(8).find("td").eq(indice).html("$ "+totalEgresos.toFixed(2));
  $("#filasCajeros").find('tr').eq(9).find("td").eq(indice).html("$ "+totalCheque.toFixed(2));
  $("#filasCajeros").find('tr').eq(10).find("td").eq(indice).html("$ "+totalVoucher.toFixed(2));
  $("#filasCajeros").find('tr').eq(11).find("td").eq(indice).html("$ "+totalTransferencias.toFixed(2));
  $("#filasCajeros").find('tr').eq(12).find("td").eq(indice).html("$ "+totalCajero.toFixed(2));
  $("#filasCajeros").find('tr').eq(13).find("td").eq(indice).html("$ "+totalSistema.toFixed(2));
  $("#filasCajeros").find('tr').eq(14).find("td").eq(indice).html("$ "+totalDiferencias.toFixed(2));
  $("#filasCajeros").find('tr').eq(15).find("td").eq(indice).html("$ "+totalSupervisor.toFixed(2));
  $("#filasCajeros").find('tr').eq(16).find("td").eq(indice).html("$ "+totalADepositar.toFixed(2));
 // SumarFooter(indice);
}

function SumarFooter(indice) {
    var vector = $('.body').find("#tablaCajerosResumido tbody tr");    
    for (var i = 1; i <= indice; i++) {
        var t=0;
        $.each(vector, function(a) {
            var tr=$(this);            
            t += parseFloat($(tr).find('td').eq(i).html().replace("$",""));                        
            $("#footerCajeros").find('th').eq(i).html("$ "+parseFloat(t).toFixed(2));
        });                    
    }

}

function CargarPuntosDetallado(){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarPuntos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {                
        $.each(respuesta, function(i, value) {
            
            CargarInformeDetallado(value[0],value[2]);

        });
    });

}

function CargarInformeDetallado(punto,usuario){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarInformeDetallado",
            Fecha:$("#fechaDesdeF").val(),
            Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
        console.log(respuesta);
        var filas = '';
        var numero ="";

        $.each(respuesta, function(i, value) {
            console.log(respuesta);
            if(numero==value[1]){

              var monto =0;
              if(value[9]=="EFECTIVO"){
                monto = parseFloat(value[10]);
              }
              if(value[9]=="CHEQUE"){
                monto = parseFloat(value[14]);
              }
              if(value[9]=="TARJETA"){
                monto = parseFloat(value[19]);
              }
              if(value[9]=="CREDITO"){
                monto = parseFloat(value[27]);
              }
              if(value[9]=="TRANSFERENCIA"){
                monto = parseFloat(value[38]);
              }
              if(value[9]=="ANTICIPO"){
                monto = parseFloat(value[30]);
              }

              if(value[1].indexOf("NC") == -1 && value[1].indexOf("IC") == -1 && value[1].indexOf("EC") == -1){
                  filas += '<tr>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td>'+value[9]+'</td>'
                        +'<td>'+monto.toFixed(2)+'</td>'
                      +'</tr>';
              }

              if(value[1].indexOf("IC") != -1 || value[1].indexOf("EC") != -1 ){

                  filas += '<tr>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td>'+value[5]+'</td>'
                        +'<td>'+parseFloat(value[4]).toFixed(2)+'</td>'
                      +'</tr>';
              }
              
            }else{
              filas += '<tr>'
                        +'<td>'+value[0]+'</td>'
                        +'<td>'+value[1]+'</td>'
                        +'<td>'+value[2]+'</td>'
                        +'<td>'+value[3]+'</td>'
                        +'<td>'+parseFloat(value[4]).toFixed(2)+'</td>'
                      +'</tr>';
              numero=value[1];
              var monto =0;
              if(value[9]=="EFECTIVO"){
                monto = parseFloat(value[10]);
              }
              if(value[9]=="CHEQUE"){
                monto = parseFloat(value[14]);
              }
              if(value[9]=="TARJETA"){
                monto = parseFloat(value[19]);
              }
              if(value[9]=="CREDITO"){
                monto = parseFloat(value[27]);
              }
              if(value[9]=="TRANSFERENCIA"){
                monto = parseFloat(value[38]);
              }
              if(value[9]=="ANTICIPO"){
                monto = parseFloat(value[30]);
              }
              if(value[1].indexOf("NC") == -1 && value[1].indexOf("IC") == -1 && value[1].indexOf("EC") == -1){
                  filas += '<tr>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td>'+value[9]+'</td>'
                        +'<td>'+monto.toFixed(2)+'</td>'
                      +'</tr>';
              }
              if(value[1].indexOf("IC") != -1 || value[1].indexOf("EC") != -1){

                  filas += '<tr>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td></td>'
                        +'<td>'+value[5]+'</td>'
                        +'<td>'+parseFloat(value[4]).toFixed(2)+'</td>'
                      +'</tr>';
              }                  
            }    
            
                    
        });

        var elemento = ' <div class="col-md-12">'
                                +'<div class="box box-primary ">'
                                  +'<div class="box-header with-border">'
                                    +'<h3 class="box-title">'+usuario+'</h3>'
                                 +' </div>'
                                  +'<div class="box-body">'
                                    +'<table width="100%" id="" style="font-size: 12px !important;" border="1">'
                                      +'<thead>'
                                        +'<tr style="font-size: 10px !important;margin:0.5em;">'
                                          +'<th>FECHA</th>'
                                          +'<th>FACTURA</th>'
                                          +'<th>CLIENTE</th>'
                                          +'<th>DESCUENTO</th> '
                                          +'<th>TOTAL</th>  '                                          
                                        +'</tr>'
                                      +'</thead>'
                                      +'<tbody class="pointer tablaPerfil">'
                                        +filas
                                      +'</tbody>'
                                    +'</table>'
                                  +'</div>'
                               +' </div>'
                              +'</div>';
      if(filas!=""){
        $("#Cajeros").append(elemento);
      }                              
                                      
    }); 
}


function Imprimir() {

    var estilos2 ='.page-header, .page-header-space {'
  +'height: 120px;'
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
  +'top: 0mm;'
  +'width: 100%;'
+'}'
+''
+'.page {'
  +'page-break-after: always;'
  +'width: 130%;'
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


    $('.body').find('label#tituloReporte').html('REPORTE DE CAJA RESUMIDO');
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
    //childWindow.document.write('<div class="page">'+cuerpo2+'</div>');
    childWindow.document.write('<div class="page">'+$('#Cajeros').html()+piereporte+'</div>');
    childWindow.document.write('</div>')
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

$(".body").on('click', "button#ImprimirInforme", function(ev) {

  Imprimir();
});