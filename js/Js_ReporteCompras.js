var nombreEstablecimiento = $('.body').find('label#nombreEsta').attr('nombreEstablecimiento');

function CargarComboProveedores(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboProveedores"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        
        $.each(respuesta, function(i, value) {
            var elem = ' <option value="'+value.id+'">'+value.descripcion+'</option> ';
            $("select#proveMovi").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');
     });   
}

CargarComboProveedores();

var tablaAnalisis = null;


tablaAnalisis  = $('#datatableReporteCompras').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': false,
            scrollY: 350,
            scrollX: true,
            order: [[ 0, "desc" ]],
            "columnDefs": [
            {
                "targets": [],
                "visible": false,
            },
            {
                "targets": [3,4,5],
                "className": "text-right"
            } ]
        });

function CargarDatos(fechaDesde, fechaHasta, proveedor) {
    console.log(fechaDesde)
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ReporteCompra.php",
        data: {
            Requerimiento: "CargarInventario",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta,
            Proveedor: proveedor
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAnalisis.clear().draw();
        } catch (error) {}
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        } 

        var totalF1=0;
        var totalF2=0;
        var totalF3=0;
        
        var tipo = $('.body').find('select#tipoDatos').val();
        $.each(respuesta, function(i, value) {
            var dataSet = ['<label class="font-weight-bold text-center">PRODUCTO</label>','<label class="font-weight-bold">'+respuesta[i][1]+'</label>','<label class="font-weight-bold">'+respuesta[i][2]+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][3]).toFixed(2)+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][4]).toFixed(2)+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][5]).toFixed(2)+'</label>'];
            tablaAnalisis.row.add(dataSet);
            totalF1 +=parseFloat(respuesta[i][3]);
            totalF2 +=parseFloat(respuesta[i][4]);
            totalF3 +=parseFloat(respuesta[i][5]);
            if(tipo == 1){
                $.ajax({
                    async: false,
                    method: "POST",
                    url: "Ajax/Aj_ReporteCompra.php",
                    data: {
                        Requerimiento: "CargarInventarioDetallado",
                        FechaDesde: fechaDesde,
                        FechaHasta: fechaHasta,
                        Proveedor: proveedor,
                        Inventario: respuesta[i][0],
                    },
                    dataType: 'JSON',
                }).done(function(respuesta) {
                    $.each(respuesta, function(j, value) {
                        var dataSet = ['<span>'+respuesta[j][0].substring(0, 10)+'</span>','<span>'+respuesta[j][1]+'</span>','<span>'+respuesta[j][2]+'</span>','<span>'+parseFloat(respuesta[j][3]).toFixed(2)+'</span>','<span>'+parseFloat(respuesta[j][4]).toFixed(2)+'</span>',"<span></span>"];
                        tablaAnalisis.row.add(dataSet);
                    }); 
                });
            }
        });
        tablaAnalisis.draw(false);
        
        var column = tablaAnalisis.column(3); 
        $(column.footer()).html(totalF1.toFixed(2));
        column = tablaAnalisis.column(4); 
        $(column.footer()).html("$ "+totalF2.toFixed(2));
        column = tablaAnalisis.column(5);
        $(column.footer()).html(totalF3.toFixed(2));
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function CargarDatosInventario(fechaDesde, fechaHasta, inventario) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ReporteCompra.php",
        data: {
            Requerimiento: "CargarInventarioProveedor",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta,
            Inventario: inventario
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAnalisis.clear().draw();
        } catch (error) {}
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        } 

        var totalF1=0;
        var totalF2=0;
        var totalF3=0;
        
        var tipo = $('.body').find('select#tipoDatos').val();
        $.each(respuesta, function(i, value) {
            var dataSet = ['<label class="font-weight-bold text-center">PRODUCTO</label>','<label class="font-weight-bold">'+respuesta[i][1]+'</label>','<label class="font-weight-bold">'+respuesta[i][2]+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][3]).toFixed(2)+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][4]).toFixed(2)+'</label>','<label class="font-weight-bold">'+parseFloat(respuesta[i][5]).toFixed(2)+'</label>'];
            tablaAnalisis.row.add(dataSet);
            totalF1 +=parseFloat(respuesta[i][3]);
            totalF2 +=parseFloat(respuesta[i][4]);
            totalF3 +=parseFloat(respuesta[i][5]);
            if(tipo == 1){
                $.ajax({
                    async: false,
                    method: "POST",
                    url: "Ajax/Aj_ReporteCompra.php",
                    data: {
                        Requerimiento: "CargarInventarioDetalladoProveedor",
                        FechaDesde: fechaDesde,
                        FechaHasta: fechaHasta,
                        Proveedor: respuesta[i][0],
                        Inventario: inventario,
                    },
                    dataType: 'JSON',
                }).done(function(respuesta) {
                    $.each(respuesta, function(j, value) {
                        var dataSet = ['<span>'+respuesta[j][0].substring(0, 10)+'</span>','<span>'+respuesta[j][1]+'</span>','<span>'+respuesta[j][2]+'</span>','<span>'+parseFloat(respuesta[j][3]).toFixed(2)+'</span>','<span>'+parseFloat(respuesta[j][4]).toFixed(2)+'</span>',"<span></span>"];
                        tablaAnalisis.row.add(dataSet);
                    }); 
                });
            }
        });
        tablaAnalisis.draw(false);
        
        var column = tablaAnalisis.column(3); 
        $(column.footer()).html(totalF1.toFixed(2));
        column = tablaAnalisis.column(4); 
        $(column.footer()).html("$ "+totalF2.toFixed(2));
        column = tablaAnalisis.column(5);
        $(column.footer()).html(totalF3.toFixed(2));
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body").on('click', "button#CagarReporteCompras", function(ev) {
    var fechaDesde = $("#fechaDesde").val();
    var fechaHasta = $("#fechaHasta").val();
    var proveedor = $("#proveMovi").val();
    var inventario = $("#proveInve").val();
    if(proveedor==0 && inventario==0){
        swal("Esculapio","Seleccione un proveedor o un inventario para continuar","error");
    }
    if(proveedor!=0){
        CargarDatos(fechaDesde,fechaHasta,proveedor);
    }

    if(inventario!=0){
        CargarDatosInventario(fechaDesde,fechaHasta,inventario);
    }   
});

$(".body").on('click', "button#ImprimirReporteCompra", function(ev) {
    printTextAreaVentasFarmacia();    
});



function printTextAreaVentasFarmacia(){
    var cuerpo2 = '';
    var total = 0;
    if($('.body').find("#datatableReporteCompras tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th style="text-align: left;">FECHA</th><th>PRODUCTO</th><th>PRESENTACION</th><th style="text-align: right;">CANT. COMPRADA</th><th style="text-align: right;">COSTO</th><th style="text-align: right;">CANT. ACTUAL</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#datatableReporteCompras tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var fecha= $(this).find('td').eq(0).html();
            var producto=$(this).find('td').eq(1).html();
            var presentacion=$(this).find('td').eq(2).html();
            var cantc=$(this).find('td').eq(3).html();
            var costo=$(this).find('td').eq(4).html();
            var canta=$(this).find('td').eq(5).html();

            if(fecha.includes('label')){
                selec += '<tr style="font-weight: bold;"><td style="font-size:12px;">'+fecha+'</td><td style="font-size:12px;">'+producto+'</td><td style="font-size:12px;">'+presentacion+'</td><td style="font-size:12px; text-align: right;">'+cantc+'</td><td style="font-size:12px; text-align: right;">'+costo+'</td><td style="font-size:12px; text-align: right;">'+canta+'</td></tr>';
            }else{
                selec += '<tr><td style="font-size:12px;">'+fecha+'</td><td style="font-size:12px;">'+producto+'</td><td style="font-size:12px;">'+presentacion+'</td><td style="font-size:12px; text-align: right;">'+cantc+'</td><td style="font-size:12px; text-align: right;">'+costo+'</td><td style="font-size:12px; text-align: right;">'+canta+'</td></tr>';
            }
        });

        var column = tablaAnalisis.column(3); 
        var TCanC= $(column.footer()).html();
        column = tablaAnalisis.column(4); 
        var TCosto= $(column.footer()).html();
        column = tablaAnalisis.column(5); 
        var TCanA=$(column.footer()).html();       

        var filaAdicional = '<tfoot style="border-top: 1px solid black; border-bottom: 1px solid black;"><tr><th ></th><th style="font-size:12px;text-align: right;"></th><th style="font-size:12px;text-align: right;"></th><th style="font-size:12px;text-align: right;">'+TCanC+'</th><th style="font-size:12px;text-align: right;">'+TCosto+'</th><th style="font-size:12px;text-align: right;">'+TCanA+'</th></tr></tfoot>';
        cuerpo2 += selec+'</tbody>'+filaAdicional+'</table></div><br>';
    }
    //var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">'+nombreEstablecimiento+'</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black; margin-top: 1em; margin-bottom: 1em;"><label style="font-weight:bold; font-size: small; text-align: center;">REPORTE DE COMPRAS</label><br></div>';
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
    
   if($('.body').find("#datatableReporteCompras tbody tr").find('td').html()!="No existen datos"){
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
        childWindow.document.write(cuerpo2);
        //childWindow.document.write(firmas);
        //childWindow.document.write(firmas);
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}

$('.body').on('change', 'select#proveMovi', function(evt) {
    var valor = $(this).val();
    if(valor!=0){
        $('.body').find('select#proveInve').selectpicker('val','0');
    }
});

$('.body').on('change', 'select#proveInve', function(evt) {
    var valor = $(this).val();
    if(valor!=0){
        $('.body').find('select#proveMovi').selectpicker('val','0');
    }
});