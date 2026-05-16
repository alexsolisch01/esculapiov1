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


function CargarNCFarmaciaFecha(){

    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarNCFarmaciaFecha",            
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
            
            
            var subtotal=parseFloat(value[1]).toFixed(4);
            var desc=parseFloat(value[2]).toFixed(4);
            var base12=parseFloat(value[3]).toFixed(4);
            var iva=parseFloat(value[4]).toFixed(4);
            var base0=subtotal-base12;
            var tventas=parseFloat(value[5]).toFixed(4);
            

            var campos = [value[0],subtotal,desc,base12,iva,base0.toFixed(4),tventas];
            tablaventasFarmacia.row.add(campos); 

            
            Tsubtotal+=parseFloat(subtotal);
            Tdesc+=parseFloat(desc);
            Tbase12+=parseFloat(base12);
            Tiva+=parseFloat(iva);
            Tbase0+=parseFloat(base0);
            Ttventas+=parseFloat(tventas);
            
                                
        });
                        
        tablaventasFarmacia.draw(false); 

        var column = tablaventasFarmacia.column(1);  
        $(column.footer()).html(Tsubtotal.toFixed(4));
        column = tablaventasFarmacia.column(2); 
        $(column.footer()).html(Tdesc.toFixed(4));
        column = tablaventasFarmacia.column(3); 
        $(column.footer()).html(Tbase12.toFixed(4));
        column = tablaventasFarmacia.column(4); 
        $(column.footer()).html(Tiva.toFixed(4));
        column = tablaventasFarmacia.column(5); 
        $(column.footer()).html(Tbase0.toFixed(4));
        column = tablaventasFarmacia.column(6); 
        $(column.footer()).html(Ttventas.toFixed(4));
        
    });


}


$(".body").on('click', "button#CagarReporteVentasFarmacia", function(ev) {
    
  CargarNCFarmaciaFecha();
});

$(".body").on('click', "button#ImprimirReporteFarmacia", function(ev) {
    
  printTextAreaVentasFarmacia();
});


function printTextAreaVentasFarmacia(){
    var cuerpo2 = '';
    var total = 0;
    if($('.body').find("#datatableVentasFarmacia tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th style="text-align: left;">Fecha</th><th style="text-align: right;">Sub Total</th><th style="text-align: right;">Desc</th><th style="text-align: right;">Base 12</th><th style="text-align: right;">Iva</th><th style="text-align: right;">Base 0</th><th style="text-align: right;">T Comp</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#datatableVentasFarmacia tbody tr");
        var selec = '';
        $.each(vector, function(a) {

            var fecha= $(this).find('td').eq(0).html();
            
            var subtotal=$(this).find('td').eq(2).html();
            var desc=$(this).find('td').eq(3).html();
            var base12=$(this).find('td').eq(4).html();
            var iva=$(this).find('td').eq(5).html();
            var base0=$(this).find('td').eq(6).html();
            var tventas=$(this).find('td').eq(7).html();
            

            
            selec += '<tr><td style="font-size:12px;">'+fecha+'</td><td style="font-size:12px;text-align: right;">'+subtotal+'</td><td style="font-size:12px; text-align: right;">'+desc+'</td><td style="font-size:12px; text-align: right;">'+base12+'</td><td style="font-size:12px; text-align: right;">'+iva+'</td><td style="font-size:12px; text-align: right;">'+base0+'</td><td style="font-size:12px; text-align: right;">'+tventas+'</td></tr>';
            
        });

        var column = tablaventasFarmacia.column(1); 
        var Tsubtotal= $(column.footer()).html();
        column = tablaventasFarmacia.column(2); 
        var Tdesc=$(column.footer()).html();
        column = tablaventasFarmacia.column(3); 
        var Tbase12=$(column.footer()).html();
        column = tablaventasFarmacia.column(4); 
        var Tiva=$(column.footer()).html();
        column = tablaventasFarmacia.column(5); 
        var Tbase0=$(column.footer()).html();
        column = tablaventasFarmacia.column(6); 
        var Ttventas=$(column.footer()).html();
             

        var filaAdicional = '<tfoot style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th ></th><th style="font-size:12px;text-align: right;">'+Tsubtotal+'</th><th style="font-size:12px;text-align: right;">'+Tdesc+'</th><th style="font-size:12px;text-align: right;">'+Tbase12+'</th><th style="font-size:12px;text-align: right;">'+Tiva+'</th><th style="font-size:12px;text-align: right;">'+Tbase0+'</th><th style="font-size:12px;text-align: right;">'+Ttventas+'</th></tr></tfoot>';
        cuerpo2 += selec+'</tbody>'+filaAdicional+'</table></div><br>';
    }
    //var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">'+nombreEstablecimiento+'</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 1em; margin-bottom: 1em;"><label style="font-weight:bold; font-size: small; text-align: center;">INFORME DE NOTAS DE CREDITO DE FARMACIA</label><br></div>';
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