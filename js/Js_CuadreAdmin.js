

function CargarPuntos(){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarPuntos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $("#puntoVenta").empty();
        $.each(respuesta, function(i, value) {
            $("#puntoVenta").append('<option value="'+value[0]+'">'+value[1]+'</option>');
        });
        $('.selectpicker').selectpicker('refresh');    
    });

}
CargarPuntos();

var tablaVenstasEspecialidad=null;

function LlenarTablaVentasEspecialidad(fechaDesde,fechaHasta) {
     tablaVenstasEspecialidad = $('#datatableVentasEspecialidad').DataTable({
        "processing": true,
        "serverSide": true,        
        scrollCollapse: true,
        "paging":false,
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "LlenarTablaVentasEspecialidad",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta
            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        
        "columnDefs": [{
            //"targets": [0, 1, 2, 3, 4,5,6,7,8],
            //"orderable": false,
        }]
    });
    tablaVenstasEspecialidad.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableVentasEspecialidad tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableVentasEspecialidad_filter input').unbind();
    $('#datatableVentasEspecialidad_filter input').remove();
    $('#datatableVentasEspecialidad_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    
}
LlenarTablaVentasEspecialidad($("#fechaDesdeF").val(),$("#fechaHastaF").val());

$(".body").on('click', "button#BuscarFactura", function(ev) {

    tablaVenstasEspecialidad.column(1).search($("#fechaDesdeF").val());
    tablaVenstasEspecialidad.column(2).search($("#fechaHastaF").val()).draw();
});

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
        try{
            tablaIcAnticipo.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaIcAnticipo.row.add(value);
              if(value[2]=='EFECTIVO' || value[2]=='NOTA DE CREDITO'){
                efectivoAnticipos = efectivoAnticipos+parseFloat(value[1]);
              }

        });
        tablaIcAnticipo.draw();
        
    });

}
$(".body").on('click', "button#CargarCuadre", function(ev) {

        efectivoCd=0;
        chequeCd=0;
        tarjetaCd=0;
        anticipoApCd=0;
        anticipoRCd=0;
        NcCd=0;
        CxCCd=0;
        efectivoSistema=0;
        sumaTotalCd=0;
        avanceCd=0;
        efectivoAnticipos=0;
        efectivoCxC=0;
        efectivoCajero=0;
        LimpiarEfectivos();

        var fecha = $('.body').find('input#fechaCuadreDesdeF').val();
        var punto = $('.body').find('select#puntoVenta').val();
        
        CargarAvanceAdmin(fecha,punto);
        CargarFondoAdmin(fecha,punto);        
        CargarEfectivoCajeroAdmin(fecha,punto);
        CargarFacturasChequeCajeroAdmin(fecha,punto);
        CargarFacturasTarjetaCajeroAdmin(fecha,punto);
        CargarFacturasAnticipoCajeroAdmin(fecha,punto);
        CargarFacturasCreditoCajeroAdmin(fecha,punto);
        CargarTransferenciasCajeroAdmin(fecha,punto);                
        CargarIcAnticipos(fecha,punto);   
        CargarAbonosCajero(fecha,punto);
        CargarEgresosAdmin(fecha,punto);
        CargarNotaCreditoAdmin(fecha,punto);
        CargarOtrosAdmin(fecha,punto);        
        CargarEfectivoSupervisorAdmin(fecha,punto);
        ComprobarCaja();
});

var efectivoCd=0;
var chequeCd=0;
var tarjetaCd=0;
var anticipoApCd=0;
var anticipoRCd=0;
var NcCd=0;
var CxCCd=0;
var efectivoSistema=0;
var sumaTotalCd=0;
var avanceCd=0;
var efectivoAnticipos=0;
var efectivoCxC=0;
var efectivoCajero=0;


var tablaEfectivo = $('#FacturasEfectivo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaCheque = $('#FacturasCheque').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});

var tablaVoucher = $('#FacturasVoucher').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaAnticipo = $('#FacturasAnticipo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaCredito = $('#FacturasCredito').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaIcAnticipo = $('#FacturasIcAnticipo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaTransferencias = $('#FacturasTransferencias').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaAbonos = $('#FacturasIcAbono').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaAvances = $('#HoraAvance').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaEgreso = $('#FacturasEgresos').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});
var tablaNc = $('#FacturasNC').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true 
});


function CargarAvanceAdmin(fecha,punto){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarAvanceAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        

        
        $('#numeroAvance').find('span').remove();
        var total =0;
        var hora = "";
        var contar=0;
        var totalHora=0;
        tablaAvances.clear();
        $.each(respuesta, function(i, value) {
            var fecha = new Date(value[2]);
            
            if(hora!=fecha.getHours()){
                contar++;
                totalHora=parseFloat(value[5]);
                hora = fecha.getHours();
                var elemento = '<option value='+value[0]+'>'+value[2]+'</option>';
                var fila = [value[2],totalHora];
                
                tablaAvances.row.add(fila);
                //$('#cbmAvance').append(elemento);
            }
              totalHora=totalHora+parseFloat(value[5]);
              total=total+parseFloat(value[5]);
              
        });
        tablaAvances.draw();
        $('#numeroAvance').append('<span class="btn btn-xs bg-olive">'+contar+'</span>');
        avanceCd = total;
        $("#TotalAvance").html("$ "+total.toFixed(2));

    });

}
$('.body').on('click', 'td#numeroAvance', function(evt) {

    $('#tablaAvanceS').toggle(200);
    tablaAvances.columns.adjust().draw();
});

function CargarFondoAdmin(fecha,punto){

    $.ajax({
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
              $("#FondoCaja").html(value[2]);

              $('#tablaFondo tbody tr td:contains('+value[3]+')').parent().find('input').val(value[4]);
              $('#tablaFondo tbody tr td:contains('+value[3]+')').parent().find('td').eq(2).html("$ "+value[5]);
        });
        $("#TotalFondo").html("$ "+total.toFixed(2));
        if(total>0){
            //$('button#GuardarFondo').attr('disabled',true);
            //$("#SumaTotalFondo").html(CalcularTotalFondo());
        }
    });

}

function CargarOtrosAdmin(fecha,punto){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarOtrosAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        //console.log(respuesta);
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
            var notacreditof = (isNaN(parseFloat(value[32]))) ? 0 : parseFloat(value[32]);

            var numeroChequesf = (isNaN(parseFloat(value[15]))) ? 0 : parseFloat(value[15]);
            var numeroTarjetaf = (isNaN(parseFloat(value[17]))) ? 0 : parseFloat(value[17]);
            var numeroAnticiposAf = (isNaN(parseFloat(value[19]))) ? 0 : parseFloat(value[19]);
            var numeroCuentasxCf = (isNaN(parseFloat(value[21]))) ? 0 : parseFloat(value[21]);
            var numeroTransferenciasf = (isNaN(parseFloat(value[25]))) ? 0 : parseFloat(value[25]);
            var numeroNotaf = (isNaN(parseFloat(value[33]))) ? 0 : parseFloat(value[33]);
            
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


            //$("#efectivo").html("$ "+efectivo.toFixed(2));
            $("#TotalCheque").html("$ "+cheque.toFixed(2));
            $("#TotalTarjeta").html("$ "+voucher.toFixed(2));
            $("#TotalAnticipoAplicado").html("$ "+anticipo.toFixed(2));
            $("#TotalCuentas").html("$ "+credito.toFixed(2));
            $("#TotalAnticipoRecibido").html("$ "+anticipoRecibido.toFixed(2));
            $("#TotalTransferencias").html("$ "+transferencias.toFixed(2));
            $("#TotalAbonos").html("$ "+abonos.toFixed(2));
            $("#TotalEgresos").html("$ "+egreso.toFixed(2));
            $("#totalNc").html("$ "+notacredito.toFixed(2));



            $("#numeroCheques").html('<span class="btn btn-xs bg-olive">'+numeroCheques+'</span>');
            $("#numeroTarjeta").html('<span class="btn btn-xs bg-olive">'+numeroTarjeta+'</span>');
            $("#numeroAnticiposR").html('<span class="btn btn-xs bg-olive">'+numeroAnticiposR+'</span>');
            $("#numeroAnticiposA").html('<span class="btn btn-xs bg-olive">'+numeroAnticiposA+'</span>');
            $("#numeroCuentasxC").html('<span class="btn btn-xs bg-olive">'+numeroCuentasxC+'</span>');
            $("#numeroTransferencias").html('<span class="btn btn-xs bg-olive">'+numeroTransferencias+'</span>');
            $("#numeroAbonos").html('<span class="btn btn-xs bg-olive">'+numeroAbonos+'</span>');
            $("#numeroEgresos").html('<span class="btn btn-xs bg-olive">'+numeroEgreso+'</span>');
            $("#numeroNc").html('<span class="btn btn-xs bg-olive">'+numeroNotac+'</span>');

            sumaTotalCd = (efectivo+efectivoAnticipos+efectivoCxC)+cheque+voucher+transferencias+anticipoRecibido-(avanceCd+egreso+notacredito);   
            efectivoCd = (efectivo+efectivoAnticipos+efectivoCxC)-(avanceCd+egreso+notacredito);         
            
            $("#TotalEfectivoSistema").html("$ "+efectivoCd.toFixed(2));

            console.log("efectivo "+efectivoCd.toFixed(2));
            console.log("total "+sumaTotalCd.toFixed(2));

        });
    });

}

function CargarEfectivoCajeroAdmin(fecha,punto){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarEfectivoCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        

        
        var total =0;
        $.each(respuesta, function(i, value) {
              
              total=total+parseFloat(value[5]);
              

              $('#TablaEfectivo tbody tr td:contains('+value[3]+')').parent().find('input').val(value[4]);

              $('#TablaEfectivo tbody tr td:contains('+value[3]+')').parent().find('td').eq(2).html("$ "+value[5]);
        });
        $("#SumaTotalEfectivo").html("$ "+total.toFixed(2));
        $("#TotalEfectivoCajero").html("$ "+total.toFixed(2));
        efectivoCajero = total;
        if(total>0){
            //$('button#GuardarFondo').attr('disabled',true);
            //$("#SumaTotalFondo").html(CalcularTotalFondo());
        }
    });

}
var totalEfectivoSupervisor = 0;
function CargarEfectivoSupervisorAdmin(fecha,punto){
    $('#TablaEfectivoSupervisor tbody tr').find('input').attr('disabled',false);
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarEfectivoSupervisorAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        

        
        var total =0;
        $.each(respuesta, function(i, value) {
              
              total=total+parseFloat(value[5]);
              

              $('#TablaEfectivoSupervisor tbody tr td:contains('+value[3]+')').parent().find('input').val(value[4]);
              $('#TablaEfectivoSupervisor tbody tr').find('input').attr('disabled',true);
              $('#TablaEfectivoSupervisor tbody tr td:contains('+value[3]+')').parent().find('td').eq(2).html("$ "+value[5]);
        });
        totalEfectivoSupervisor = total;
        $("#SumaTotalEfectivoSupervisor").html("$ "+total.toFixed(2));
        if(total>0){
            $('button#GuardarCuadreADMIN').attr('disabled',true);
            
        }else{
            $('button#GuardarCuadreADMIN').attr('disabled',false);
        }
        
        
    });

}

function CargarFacturasChequeCajeroAdmin(fecha,punto){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasChequeCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaCheque.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaCheque.row.add(value);

        });
        tablaCheque.draw();
        
    });

}

$('.body').on('click', 'td#numeroCheques', function(evt) {
    $('#TablaFacturasCheque').toggle(200);
    tablaCheque.columns.adjust().draw();
});

function CargarFacturasTarjetaCajeroAdmin(fecha,punto){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasTarjetaCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaVoucher.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaVoucher.row.add(value);

        });
        tablaVoucher.draw();
        
    });

}
$('.body').on('click', 'td#numeroTarjeta', function(evt) {

    $('#TablaFacturasTarjeta').toggle(200);
    tablaVoucher.columns.adjust().draw();
});

function CargarFacturasAnticipoCajeroAdmin(fecha,punto){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasAnticipoCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaAnticipo.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaAnticipo.row.add(value);

        });
        tablaAnticipo.draw();
        
    });

}
$('.body').on('click', 'td#numeroAnticiposA', function(evt) {

    $('#TablaFacturasAnticipo').toggle(200);
    tablaAnticipo.columns.adjust().draw();
});

function CargarFacturasCreditoCajeroAdmin(fecha,punto){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasCreditoCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaCredito.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaCredito.row.add(value);

        });
        tablaCredito.draw();
        
    });

}

$('.body').on('click', 'td#numeroCuentasxC', function(evt) {

    $('#TablaFacturasCredito').toggle(200);
    tablaCredito.columns.adjust().draw();
});



$('.body').on('click', 'td#numeroAnticiposR', function(evt) {

    $('#TablaIcAnticipo').toggle(200);
    tablaIcAnticipo.columns.adjust().draw();
});

function CargarTransferenciasCajeroAdmin(fecha,punto){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarTransferenciasCajeroAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaTransferencias.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaTransferencias.row.add(value);

        });
        tablaTransferencias.draw();
        
    });

}

$('.body').on('click', 'td#numeroTransferencias', function(evt) {

    $('#TablaFacturasTransferencias').toggle(200);
    tablaTransferencias.columns.adjust().draw();
});

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
        try{
            tablaAbonos.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaAbonos.row.add(value);
              if(value[2]=='EFECTIVO' || value[2]=='NOTA DE CREDITO'){
                efectivoCxC = efectivoCxC+parseFloat(value[1]);                
              }

        });
        tablaAbonos.draw();
        
    });

}
$('.body').on('click', 'td#numeroAbonos', function(evt) {
    $('#TablaIcAbono').toggle(200);
    tablaAbonos.columns.adjust().draw();
});

function CargarEgresosAdmin(fecha,punto){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarEgresosAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try{
            tablaEgreso.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaEgreso.row.add(value);
              

        });
        tablaEgreso.draw();
        
    });

}

$('.body').on('click', 'td#numeroEgresos', function(evt) {

    $('#TablaEgresos').toggle(200);
    tablaEgreso.columns.adjust().draw();
});

function CargarNotaCreditoAdmin(fecha,punto){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarNotaCreditoAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        try{
            tablaNc.clear();
        }catch(error){}
        
        $.each(respuesta, function(i, value) {

              
              tablaNc.row.add(value);
              

        });
        CargarNotaCreditofAdmin(fecha,punto);
        
    });

}

function CargarNotaCreditofAdmin(fecha,punto){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarNotaCreditofAdmin",
            Fecha:fecha,Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        $.each(respuesta, function(i, value) {

              
              tablaNc.row.add(value);
              

        });
        tablaNc.draw();
        
    });

}

$('.body').on('click', 'td#numeroNc', function(evt) {

    $('#TablaNC').toggle(200);
    tablaNc.columns.adjust().draw();
});

function ComprobarCaja(){
    $('#CapaCuadre').empty();
    var mensaje = '';
    var diferencia = 0;
    var mensajesupervisor = '';
    var diferenciasupervisor = 0;
    
    
    if(efectivoCd>efectivoCajero){
        diferencia = efectivoCd- efectivoCajero;
        mensaje = "FALTANTE $ "+diferencia.toFixed(2);
    }
    if(efectivoCd<efectivoCajero){
        diferencia = efectivoCajero- efectivoCd;
        mensaje = "SOBRANTE $ "+diferencia.toFixed(2);
    }

    if(efectivoCd>totalEfectivoSupervisor){
        diferenciasupervisor = efectivoCd- totalEfectivoSupervisor;
        mensajesupervisor = "FALTANTE $ "+diferenciasupervisor.toFixed(2);
    }
    if(efectivoCd<totalEfectivoSupervisor){
        diferenciasupervisor = totalEfectivoSupervisor- efectivoCd;
        mensajesupervisor = "SOBRANTE $ "+diferenciasupervisor.toFixed(2);
    }

    if(efectivoCd == efectivoCajero || diferencia.toFixed(2)==0){
        var elemento = ' <div class="col-md-3">'
                        +'<div class="info-box bg-green">'
                          +'<span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span>'

                          +'<div class="info-box-content">'
                            +'<span class="info-box-text">CAJERO</span>'
                            +'<span class="info-box-number">$ '+sumaTotalCd.toFixed(2)+'</span>'

                            
                                +'<span class="progress-description">'
                                  +'CUADRADA'
                                +'</span>'
                         +' </div>'
                        +'</div>'
                      +'</div> ';

        $('#CapaCuadre').append(elemento);                      
    }else{

        var elemento = ' <div class="col-md-3">'
                        +'<div class="info-box bg-red">'
                          +'<span class="info-box-icon"><i class="fa fa-thumbs-o-down"></i></span>'

                          +'<div class="info-box-content">'
                            +'<span class="info-box-text">CAJERO</span>'
                            +'<span class="info-box-number"> '+mensaje+'</span>'                            
                                +'<span class="progress-description">'
                                  +'DESCUADRADA'
                                +'</span>'
                         +' </div>'
                        +'</div>'
                      +'</div> ';    

        $('#CapaCuadre').append(elemento); 
    }

    if(efectivoCd == totalEfectivoSupervisor || diferenciasupervisor.toFixed(2)==0){
        var elemento = ' <div class="col-md-3">'
                        +'<div class="info-box bg-green">'
                          +'<span class="info-box-icon"><i class="fa fa-thumbs-o-up"></i></span>'

                          +'<div class="info-box-content">'
                            +'<span class="info-box-text">SUPERVISOR</span>'
                            +'<span class="info-box-number">$ '+sumaTotalCd.toFixed(2)+'</span>'

                            
                                +'<span class="progress-description">'
                                  +'CUADRADA'
                                +'</span>'
                         +' </div>'
                        +'</div>'
                      +'</div> ';

        $('#CapaCuadre').append(elemento);                      
    }else{

        var elemento = ' <div class="col-md-3">'
                        +'<div class="info-box bg-red">'
                          +'<span class="info-box-icon"><i class="fa fa-thumbs-o-down"></i></span>'

                          +'<div class="info-box-content">'
                            +'<span class="info-box-text">SUPERVISOR</span>'
                            +'<span class="info-box-number"> '+mensajesupervisor+'</span>'                            
                                +'<span class="progress-description">'
                                  +'DESCUADRADA'
                                +'</span>'
                         +' </div>'
                        +'</div>'
                      +'</div> ';    

        $('#CapaCuadre').append(elemento); 
    }
}

$('.body').on('click', 'td#EFECTIVOCajERO', function(evt) {

    $("#CuadreCajaAdmin").fadeOut(0);
    $("#DesgloceCajero").fadeIn(0);
});

$('.body').on('click', 'span#VolverDesgloce', function(evt) {

    $("#CuadreCajaAdmin").fadeIn(0);
    $("#DesgloceCajero").fadeOut(0);
});

$('.body').on('change', 'input.cantidadDenominacion', function(evt) {
    
    var cantidad=$(this).val();

    if(parseFloat(cantidad)<0 || isNaN(parseFloat(cantidad))){
        cantidad=0;
        $(this).val(0);
    }
    var denominacion = $(this).parent().parent().find('td').eq(0).html();    
    var total = parseFloat(denominacion)*parseFloat(cantidad);
    $(this).parent().parent().find('td').eq(2).html('$ '+total.toFixed(2));

  
    $("#SumaTotalEfectivoSupervisor").html("$ "+CalcularTotalEfectivo());
});

function CalcularTotalEfectivo(){
    var vector = $('.body').find("#TablaEfectivoSupervisor tbody tr");
    var total =0;
    
    $.each(vector, function(a) {
        var valor = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$","")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$",""));
        total =total+valor;
        
    });
    return total.toFixed(2);
}

function GuardarEfectivoCuadreDiarioSupervisor(denominacion,cantidad,total){

            $.ajax({
                async:false,
                method: "POST",
                url: "Ajax/Aj_Caja.php",
                data: {                    
                    
                    Requerimiento :"GuardarEfectivoCuadreDiarioSupervisor",
                    Denominacion:denominacion,
                    Cantidad:cantidad,
                    Fecha:$("#fechaCuadreDesdeF").val(),
                    Total:total,
                    Punto:$('.body').find('select#puntoVenta').val()
                },
                dataType: "JSON",

            }).done(function(respuesta) {                
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });

}

function ActualizarEfectivoCuadreDiario(denominacion,cantidad,total){

            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Caja.php",
                data: {                    
                    
                    Requerimiento :"ActualizarEfectivoCuadreDiario",
                    Denominacion:denominacion,
                    Cantidad:cantidad,
                    Total:total,                    
                    Fecha:$('.body').find('input#fechaCuadreDesdeF').val(),
                    Punto:$('.body').find('select#puntoVenta').val()
                },
                dataType: "JSON",

            }).done(function(respuesta) {                
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });

}

$('.body').on('click', 'button#GuardarCuadreADMIN', function(evt) {

    var totalEfectivoSupervisor = CalcularTotalEfectivo();

        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                
                        var vector = $('.body').find("#TablaEfectivoSupervisor tbody tr");
                        //EliminarEfectivoCajero();
                        $.each(vector, function(a) {
                            var total = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$","")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$",""));

                            var cantidad=$(this).find('td').eq(1).find('input').val();
                            if(total>0){
                                GuardarEfectivoCuadreDiarioSupervisor($(this).find('td').eq(0).html(),cantidad,total);
                                //ActualizarEfectivoCuadreDiario($(this).find('td').eq(0).html(),cantidad,total);
                            }
                            
                        });
                        var diferencia = 0;
                        if(efectivoCajero<totalEfectivoSupervisor){
                            diferencia = totalEfectivoSupervisor-efectivoCajero;
                            swal("Esculapio!", "EFECTIVO DESCUADRADO, TIENE UN FALTANTE DE $"+diferencia+"\nEl Efectivo que deberia tener es $ "+totalEfectivoSupervisor, "info");    
                        }
                        if(efectivoCajero>totalEfectivoSupervisor){
                            diferencia = efectivoCajero-totalEfectivoSupervisor;
                            swal("Esculapio!", "EFECTIVO DESCUADRADO, TIENE UN SOBRANTE DE $"+diferencia+"\nEl Efectivo que deberia tener es $ "+totalEfectivoSupervisor, "info");    
                        }
                        if(parseFloat(diferencia).toFixed(2)==0){
                            diferencia = efectivoCajero-totalEfectivoSupervisor;
                            swal("Esculapio!", "EFECTIVO CUADRADO", "success");    
                        }
                        $('#CargarCuadre').click();
                
            }
        });
});


function EliminarEfectivoCajero(){

            $.ajax({
                async:false,
                method: "POST",
                url: "Ajax/Aj_Caja.php",
                data: {                    
                    
                    Requerimiento :"EliminarEfectivoCajero",                    
                    Fecha:$('.body').find('input#fechaCuadreDesdeF').val(),
                    Punto:$('.body').find('select#puntoVenta').val()
                },
                dataType: "JSON",

            }).done(function(respuesta) {                
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            });

}

function LimpiarEfectivos(){
   $('input.cantidadDenominacion').val(0);
   
   $("#SumaTotalEfectivo").html("$ 0.0");

   var vector = $('.body').find("#TablaEfectivo tbody tr");

    $.each(vector, function(a) {
        $(this).find('td').eq(2).html("$ 0.0");
        
    });

    $("#SumaTotalEfectivoSupervisor").html("$ 0.0");

    var vector = $('.body').find("#TablaEfectivoSupervisor tbody tr");

    $.each(vector, function(a) {
        $(this).find('td').eq(2).html("$ 0.0");
        
    });

}