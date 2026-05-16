var tablaPagos = $('#datatablePagos').DataTable({ 
    ordering: false,
    dom: '<"top">rt<"bottom">',
    scrollY: 180,
    //scrollX: true,
    paginate:false
});

var monto = 0;
$("body").on('change', "#Pagos", function(ev) {
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

$("body").on('change', "#cbmProcedimientoOdont", function(ev) {
       monto = parseFloat($(this).find('option:selected').attr('pvp')); 
       $("label#PvpProce").html("$ "+parseFloat(monto).toFixed(2));
});


$("body").on('click', "button#ImprimirOdontograma", function(ev) {
       var procedimiento = $('.body').find('select#cbmProcedimientoOdont').val();
       var periodo = $('.body').find('select#cbmPeriodoOdont option:selected').text();
       var fechai = $('.body').find('input#FechaInicio').val();
       var pagos = $('.body').find('input#Pagos').val();

            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Guardar ?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    GuardarOrdenOdon(procedimiento,periodo,fechai,pagos,monto);            
                } else {
                    
                }
            });
       
       
});

function printTextArea(idOrden) {
    var hcuPacienteImprimir = $('.body').find('span#HCU').text();
    var nombrePacienteImprimir = $('.body').find('span#NombrePaci').text();
    var procedimiento = $('.body').find('select#cbmProcedimientoOdont option:selected').text();
    var periodo = $('.body').find('select#cbmPeriodoOdont option:selected').text();
    var fecha = $('.body').find('input#FechaInicio').val();
    var pagos = $('.body').find('input#Pagos').val();
    var cuerpo = '';
    var cabecera = '<div style="position: absolute; width:100%; margin-top: 2em;"><label style="font-weight:bold; font-size: small;">HISTORIA CLINICA: '+hcuPacienteImprimir+'</label><label style="font-weight:bold; font-size: small; margin-left:13em;">PACIENTE: '+nombrePacienteImprimir+'</label></div><br>';
    childWindow = window.open('','_blank');
    var cabecera2 ='<div style="width:100%;  margin-top: 2em;"><label style="font-weight:bold; font-size: small;">PROCEDIMIENTO: '+procedimiento+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 3.5em;">FECHA DE INICIO: '+fecha+'</label></div>';
    var cabecera3 ='<div style="width:100%;  "><label style="font-weight:bold; font-size: small;">PERIODO: '+periodo+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 3.5em;">NUMERO DE PAGOS: '+pagos+'</label></div>';
    // childWindow.document.open();
    if($('.body').find("#datatablePagos tbody tr").find('td').html()!="No existen datos"){
        cuerpo += '<div><u><h4>TABLA DE PAGOS</h4></u>'
        +'<table style="width: 50%"><thead><tr><th><u>NO. PAGO</u></th><th><u>MONTO</u></th><th><u>FECHA</u></th></tr></thead><tbody>';
        var vector = $('.body').find("#datatablePagos tbody tr ");
        var selec = '';
        $.each(vector, function(a) {
            if($(this).find('td').html()=="No existen datos"){
                return false ;
            }
            var numero = $(this).find('td').eq(0).html();
            var valor = $(this).find('td').eq(1).html();
            var fecha =  $(this).find('td').eq(2).find('input').val();
            selec += '<tr align="center"><td >'+numero+'</td><td>'+valor+'</td><td>'+fecha+'</td></tr>';
            
        });
        cuerpo += selec+'</tbody></table></div><br>';
    }

    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;"></div>');
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
    childWindow.document.write('</body></html>');
    
    childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
}


function GuardarOrdenOdon(procedimiento,periodo,fechai,pagos,montoFinal){

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "GuardarOrdenOdon",            
            Consulta:idConsulta,
            Paciente:idPaciente,
            Procedimiento:procedimiento,
            Periodo:periodo,
            FechaI:fechai,
            Pagos:pagos,
            Monto:montoFinal

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        } 
        if (respuesta[0] == true) {
            
            var fila = JSON.parse(respuesta[1]);
            
            var vector = $('.body').find("#datatablePagos tbody tr");
                $.each(vector, function(a) {

                    if($(this).find('td').html()=="No existen datos"){
                        return false ;
                    }
                    var pago = $(this).find('td').eq(0).html();
                    var monto = $(this).find('td').eq(1).html();
                    var fecha = $(this).find('input').val();
                    
                    GuardarOrdenOdonDetalle(fila[0][0],pago,monto,fecha);
                    
                });
            swal({
                title: "Esculapio",
                text: "Guardado Con Exito, Desea Imprimir ?",
                icon: "success",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    printTextArea(fila[0][0]);
                } else {
                    
                }
            });

        }
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarOrdenOdonDetalle(orden,pago,monto,fecha){

    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Odontograma.php",
        data: {
            Requerimiento: "GuardarOrdenOdonDetalle",            
            Orden:orden,
            Pago:pago,
            Monto:monto,
            Fecha:fecha

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        } 
        if (respuesta[0] == true) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}