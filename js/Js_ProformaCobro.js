$(".body").on('change', "input[name=formaPago]", function(ev) {
    var f = $(this).val();
    $(".formaPago").fadeOut(0);
    if(f==1){
    	$("#efectivo").fadeIn(200);
    }
    if(f==2){
    	$("#cheque").fadeIn(200);
    }
    if(f==3){
    	$("#tarjeta").fadeIn(200);
    }
    if(f==4){
    	$("#credito").fadeIn(200);
    }
    if(f==6){
    	$("#combinado").fadeIn(200);
    }
});


$(".body").on('click', "i.cheque", function(ev) {
    var f = $(this).val();
    var abierta =$('i.fa-plus');
    
    if($('i.tarjeta').hasClass('fa-minus')){
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if($('i.credito').hasClass('fa-minus')){
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if($('i.anticipo').hasClass('fa-minus')){
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }
    
    if($(this).hasClass('fa-plus')){
    	$(this).removeClass('fa-plus')
    	$(this).addClass('fa-minus')
    }else{
    	if($(this).hasClass('fa-minus')){
    		$(this).removeClass('fa-minus')
    		$(this).addClass('fa-plus')
    	}	
    }
    
   	$("#ccheque").toggle(200);

});


$(".body").on('click', "i.tarjeta", function(ev) {
    if($('i.cheque').hasClass('fa-minus')){
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if($('i.credito').hasClass('fa-minus')){
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if($('i.anticipo').hasClass('fa-minus')){
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }

    var f = $(this).val();
    if($(this).hasClass('fa-plus')){
    	$(this).removeClass('fa-plus')
    	$(this).addClass('fa-minus')
    }else{
    	if($(this).hasClass('fa-minus')){
    		$(this).removeClass('fa-minus')
    		$(this).addClass('fa-plus')
    	}	
    }
    
   	$("#ctarjeta").toggle(200);

});

$(".body").on('click', "i.credito", function(ev) {
    if($('i.cheque').hasClass('fa-minus')){
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if($('i.tarjeta').hasClass('fa-minus')){
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if($('i.anticipo').hasClass('fa-minus')){
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }

    var f = $(this).val();
    if($(this).hasClass('fa-plus')){
    	$(this).removeClass('fa-plus')
    	$(this).addClass('fa-minus')
    }else{
    	if($(this).hasClass('fa-minus')){
    		$(this).removeClass('fa-minus')
    		$(this).addClass('fa-plus')
    	}	
    }
    
   	$("#ccredito").toggle(200);

});

$(".body").on('click', "i.anticipo", function(ev) {
    if($('i.cheque').hasClass('fa-minus')){
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if($('i.tarjeta').hasClass('fa-minus')){
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if($('i.credito').hasClass('fa-minus')){
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    var f = $(this).val();
    if($(this).hasClass('fa-plus')){
        $(this).removeClass('fa-plus')
        $(this).addClass('fa-minus')
    }else{
        if($(this).hasClass('fa-minus')){
            $(this).removeClass('fa-minus')
            $(this).addClass('fa-plus')
        }   
    }
    
    $("#aanticipo").toggle(200);


  
  try{
    var tid = setInterval(function(){ tablaAnticipo.columns.adjust().draw();clearInterval(tid);}, 500);
    console.log(tablaAnticipo.row(0).data())
  }catch(error){console.log(error);}

});

var totalcobrado=0;
var totalcobrado2=0;
var totalcobrado3=0;
var totalcobrado4=0;
var totalcobrado5=0;
$(".body").on('keyup', "input#ValorRecibidoConsulta", function(evt) {
    CalcularCobro($(this).val(),$('#ValorCheque').val(),$("#ValorTarjeta").val(),$("#ValorAnticipo").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

function CalcularCobro(efectivo,cheque,tarjeta,anticipo){

    valorRecibido = (isNaN(parseFloat(efectivo))) ? 0 : parseFloat(efectivo);
    valorRecibidoCheque = 0;
    valorRecibidoTarjeta = 0;
    valorRecibidoAnticipo = 0;
    valorCredito= (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());

    try{
        valorRecibidoCheque = (isNaN(parseFloat(cheque))) ? 0 : parseFloat(cheque);
    }catch(error){}
    try{
        valorRecibidoTarjeta = (isNaN(parseFloat(tarjeta))) ? 0 : parseFloat(tarjeta);
    }catch(error){}
    try{
        valorRecibidoAnticipo = (isNaN(parseFloat(anticipo))) ? 0 : parseFloat(anticipo);
    }catch(error){}

    $('span#CambioConsulta').html('$ 0.0');
    $('span#totalCobradoCobrar').html('$ 0.0');
    var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var cambio = parseFloat(valorRecibido) - totalcancelar;

    var diferencia = totalcancelar-valorRecibido;
    if (totalcancelar <= valorRecibido) {
        confirmaPago = true;
        $('span#CambioConsulta').html('$ ' + cambio.toFixed(2));
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        if(valorRecibidoCheque==0){
             $('i.cheque').parent().fadeOut(200);
        }
        if(valorRecibidoTarjeta==0){
             $('i.tarjeta').parent().fadeOut(200);
        }
        if(valorCredito==0){
             $('i.credito').parent().fadeOut(200);
        }
        if(valorRecibidoAnticipo==0){
             $('i.anticipo').parent().fadeOut(200);
        }
        
        //$('i.credito').parent().fadeOut(200);
        totalcobrado=totalcancelar;
    } else {
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        totalcobrado = parseFloat(valorRecibido);

        
             $('i.cheque').parent().fadeIn(200);
        
            $('i.credito').parent().fadeIn(200);
             $('i.tarjeta').parent().fadeIn(200);
             $('i.anticipo').parent().fadeIn(200);
        
       
        
        //$('i.credito').parent().fadeIn(200);
        confirmaPago = false;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(parseFloat(valorRecibidoCheque)<1){
        
        $("#totalCheque").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        totalcobrado=0;
        
    }else{
        $("#totalCheque").html('$ ' + parseFloat(valorRecibidoCheque).toFixed(2));

        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado2 = parseFloat(valorRecibidoCheque) + totalcobrado;
        
        var diferencia = totalcobrado2-totalcancelar;

        if (totalcancelar <= parseFloat(totalcobrado2)) {
            confirmaPago = true;
            if(valorRecibido==0){
                 $('div.efectivo').fadeOut(200);
            }
            if(valorRecibidoTarjeta==0){
                 $('i.tarjeta').parent().fadeOut(200);
            }
            if(valorCredito==0){
                 $('i.credito').parent().fadeOut(200);
            }

            $('span#CambioConsulta').html('$ ' + diferencia.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado2).toFixed(2));
            $('div.efectivo').fadeIn(200);
            
            $('i.credito').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);

            confirmaPago = false;
        }    
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(parseFloat(valorRecibidoTarjeta)<1){
        
        $("#totalTarjeta").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado2).toFixed(2));
        totalcobrado2=0;
        
    }else{
        $("#totalTarjeta").html('$ ' + parseFloat(valorRecibidoTarjeta).toFixed(2));

        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado3 = parseFloat(valorRecibidoTarjeta) + totalcobrado2;
        
        var diferenciaTarjeta = totalcobrado3-totalcancelar;

        if (totalcancelar <= parseFloat(totalcobrado3)) {
            confirmaPago = true;
            if(valorRecibido==0){
                 $('div.efectivo').fadeOut(200);
            }
            if(valorRecibidoCheque==0){
                 $('i.cheque').parent().fadeOut(200);
            }
            if(valorCredito==0){
                 $('i.credito').parent().fadeOut(200);
            }

            $('span#CambioConsulta').html('$ ' + diferenciaTarjeta.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado3).toFixed(2));
            $('div.efectivo').fadeIn(200);
            
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.credito').parent().fadeIn(200);

            confirmaPago = false;
        }    
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(parseFloat(valorCredito)<1){
        
        $("#totalCredito").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado3).toFixed(2));
        totalcobrado3=0;
        
    }else{
        $("#totalCredito").html('$ ' + parseFloat(valorCredito).toFixed(2));

        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado4 = parseFloat(valorCredito) + totalcobrado3;
        
        var diferenciaCredito = totalcobrado4-totalcancelar;

        if (totalcancelar <= parseFloat(totalcobrado4)) {
            confirmaPago = true;
            if(valorRecibido==0){
                 $('div.efectivo').fadeOut(200);
            }
            if(valorRecibidoCheque==0){
                 $('i.cheque').parent().fadeOut(200);
            }
            if(valorRecibidoTarjeta==0){
                 $('i.tarjeta').parent().fadeOut(200);
            }

            $('span#CambioConsulta').html('$ ' + diferenciaCredito.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado4).toFixed(2));
            $('div.efectivo').fadeIn(200);        
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.credito').parent().fadeIn(200);

            confirmaPago = false;
        }    
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if(parseFloat(valorRecibidoAnticipo)<1){
        
        $("#totalCredito").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado4).toFixed(2));
        totalcobrado4=0;
        
    }else{
        $("#totalCredito").html('$ ' + parseFloat(valorCredito).toFixed(2));

        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado5 = parseFloat(valorRecibidoAnticipo) + totalcobrado4;
        
        var diferenciaAnticipo = totalcobrado5-totalcancelar;

        if (totalcancelar <= parseFloat(totalcobrado5)) {
            confirmaPago = true;
            if(valorRecibido==0){
                 $('div.efectivo').fadeOut(200);
            }
            if(valorRecibidoCheque==0){
                 $('i.cheque').parent().fadeOut(200);
            }
            if(valorRecibidoTarjeta==0){
                 $('i.tarjeta').parent().fadeOut(200);
            }

            $('span#CambioConsulta').html('$ ' + diferenciaAnticipo.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado5).toFixed(2));
            $('div.efectivo').fadeIn(200);        
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.credito').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);

            confirmaPago = false;
        }    
    }
}

$(".body").on('keyup', "input#ValorCheque", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(),$('#ValorCheque').val(),$("#ValorTarjeta").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

$(".body").on('keyup', "input#ValorTarjeta", function(evt) {

    CalcularCobro($('#ValorRecibidoConsulta').val(),$('#ValorCheque').val(),$("#ValorTarjeta").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

$(".body").on('keyup', "input#montoT", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(),$('#ValorCheque').val(),$("#ValorTarjeta").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});


var tablaPagos = $('#datatablePagos').DataTable({ 
    ordering: false,
    dom: '<"top">rt<"bottom">',
    scrollY: 100,
    //scrollX: true,
    paginate:false
});


var monto = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
$("body").on('change', "#Pagos", function(ev) {
		monto = (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());
        var n = $(this).val();
        var periodo = $('#cbmPeriodoOdont').val();
        try {
                tablaPagos.clear().draw();
            } catch (error) {}
        if(n<1 || monto <1 || periodo==0){
        	return;
        }

        var now = new Date($("#FechaInicio").val());

        for(var i=1;i<=n;i++){

            if(i==1){
                now.setDate(now.getDate()+1);
            }else{
                if(periodo==1){
                    now.setDate(now.getDate()+7);
                }
                if(periodo==2){
                    now.setDate(now.getDate()+15);
                }
                if(periodo==3){
                    now.setDate(now.getDate()+30);
                }
                if(periodo==4){
                    now.setDate(now.getDate()+180);
                }
                if(periodo==4){
                    now.setDate(now.getDate()+360);
                }    
            }
            
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);

            var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

        	var t = monto/n;
        	var input = '<input type="date" class="form-control" id="FechaConsulta" name="" value="'+today+'">';
        	var campos = [i,parseFloat(t).toFixed(2),input];
	        tablaPagos.row.add(campos).node().id=today+i;
	        tablaPagos.draw();	
        }
        
});

$("body").on('keyup', "#Pagos", function(ev) {
        if(ev.keyCode==13){
        	monto = (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());
            var n = $(this).val();
            var periodo = $('#cbmPeriodoOdont').val();
            try {
                    tablaPagos.clear().draw();
                } catch (error) {}
            if(n<1 || monto <1 || periodo==0){
                return;
            }

            var now = new Date($("#FechaInicio").val());
            
            for(var i=1;i<=n;i++){

                if(i==1){
                    now.setDate(now.getDate()+1);
                }else{
                    if(periodo==1){
                        now.setDate(now.getDate()+7);
                    }
                    if(periodo==2){
                        now.setDate(now.getDate()+15);
                    }
                    if(periodo==3){
                        now.setDate(now.getDate()+30);
                    }
                    if(periodo==4){
                        now.setDate(now.getDate()+180);
                    }
                    if(periodo==4){
                        now.setDate(now.getDate()+360);
                    }    
                }
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);

                var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

                var t = monto/n;
                var input = '<input type="date" class="form-control" id="FechaConsulta" name="" value="'+today+'">';
                var campos = [i,parseFloat(t).toFixed(2),input];
                tablaPagos.row.add(campos).node().id=today+i;
                tablaPagos.draw();  
            }
        }
        
});

function GuardarPagos(idConsulta,valorRecibido,valorRecibidoCheque,valorRecibidoTarjeta,valorCredito){
    
    if(valorRecibido>0){
        GuardarPagoEfectivo(valorRecibido,idConsulta)
    }
    if(valorRecibidoCheque>0){
        GuardarPagoCheque(valorRecibidoCheque,idConsulta)
    }
    if(valorRecibidoTarjeta>0){
        GuardarPagoTarjeta(valorRecibidoTarjeta,idConsulta)
    }
    if(valorCredito>0){
        GuardarPagoCredito(valorCredito,idConsulta)
    }

}

function GuardarPagoEfectivo(valorRecibido,idConsulta){
     $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoEfectivo",
            Consulta: idConsulta,            
            Monto:valorRecibido
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
            return;
        }
        if (respuesta[0] == false) {
            
            swal("Esculapio!", "Ocurrio un error. "+respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarPagoCheque(valorRecibidoCheque,idConsulta){
     $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoCheque",
            Consulta: idConsulta,            
            Monto:valorRecibidoCheque,
            Banco:$("select#banco").val(),
            Numero:$("#NumeroCheque").val(),
            Cuenta:$("#CuentaCheque").val(),
            Fecha:$("#FechaCheque").val(),
            Referencia:$("#ReferenciaCheque").val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
            return;
        }
        if (respuesta[0] == false) {
            
            swal("Esculapio!", "Ocurrio un error. "+respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarPagoTarjeta(valorRecibidoTarjeta,idConsulta){
     $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoTarjeta",
            Consulta: idConsulta,            
            Monto:valorRecibidoTarjeta,
            Entidad:$("#EntidadTarjeta").val(),                        
            Fecha:$("#FechaTarjeta").val(),
            Numero:$("#NumeroReferencia").val(),
            Recargo:$("#RecargoTarjeta").val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
            return;
        }
        if (respuesta[0] == false) {
            
            swal("Esculapio!", "Ocurrio un error. "+respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarPagoCredito(valorCredito,idConsulta){

    var vector = $('.body').find("#datatablePagos tbody tr");
    $.each(vector, function(a) {

        var npago = $(this).find('td').eq(0).html();
        var monto = $(this).find('td').eq(1).html();
        var fpago = $(this).find('td').eq(2).find('input').val();
        $.ajax({
            method: "POST",
            url: "Ajax/Aj_Forma_pago.php",
            data: {
                Requerimiento: "GuardarPagoCredito",
                Consulta: idConsulta,            
                Monto:valorCredito,
                Periodo:$("#cbmPeriodoOdont option:selected").text().trim(),   
                Fecha:$("#FechaInicio").val(),                        
                Dividendo:$("#Pagos").val(),
                Numero:npago,
                Pago:monto,
                FechaPago:fpago
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == true) {
                
                return;
            }
            if (respuesta[0] == false) {
                
                swal("Esculapio!", "Ocurrio un error. "+respuesta[1], "error");
                return;
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });
           
    });

     
}

$(".body table#datatableAnticipo tbody").on('change', "tr td input[type=checkbox]", function(ev) {
    //alert("verga");
    if ($(this).is(':checked')) {
        var valor = $(this).parent().parent().find('td').eq(0).html();
        $('.body').find('span#totalAnticipo').text(valor);
    } else {
       alert('no')
    }
});




