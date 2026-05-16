var tablaInventario = null;
var id = 0;



// funcuion para registarar en la bd un nuevo perfil
function GuardarInventario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, limpiar, t, nombreBodega, nombreLinea, nombreGalenica, nombreFarmaco, iva, nivel1, nivel2, utilidad1, utilidad2, cantidad2,valor,presentacion1,presentacion2,percha,pvp1,pvp2) {
    var formData = new FormData();
    formData.append('Requerimiento', "GuardarInventario");
    formData.append('Id_Bodega', bodega);
    formData.append('Id_Linea', linea);
    formData.append('Id_Unidad', galenica);
    formData.append('Id_Farmacologia', farmaco);
    formData.append('Nombre', nombre);
    formData.append('Presentacion', presentacion);
    formData.append('Codigo_Barra', codigo);
    formData.append('Principio1', pa1);
    formData.append('Principio2', pa2);
    formData.append('Principio3', pa3);
    formData.append('Principio4', pa4);
    formData.append('Medida1', can1);
    formData.append('Medida2', can2);
    formData.append('Medida3', can3);
    formData.append('Medida4', can4);
    formData.append('Um1', um1);
    formData.append('Um2', um2);
    formData.append('Um3', um3);
    formData.append('Um4', um4);
    formData.append('Imagen', imagen);
    formData.append('Iva', iva);
    formData.append('Utilidad1', utilidad1);
    formData.append('Utilidad2', utilidad2);
    formData.append('Cantidad2', cantidad2);
    formData.append('Nivel1', nivel1);
    formData.append('Nivel2',nivel2);
    formData.append('Valor',valor);
    formData.append('Presentacion1',presentacion1);
    formData.append('Presentacion2',presentacion2);
    formData.append('Percha',percha);
    formData.append('TipoPrecio',$("input[name=radioPorcentaje]:checked").val());
    formData.append('Pvp1', pvp1);
    formData.append('Pvp2', pvp2);
    formData.append('Prescripcion', $("#txtPrescripcion").val());
    
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", " Producto Guardado.!", "success");
            
            limpiar.click();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar Producto!.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////


$(".body").on('click', "button#Guardarbog", function(ev) {
    $(".body").on('submit', "form#RegistroPadre", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var bodega = $(this).find('select#CataBode').val().trim();
        var linea = $(this).find('select#LineaBode').val().trim();
        var nombre = $(this).find('input#NombreBode').val().trim();
        var galenica = $(this).find('select#PreseBode').val().trim();
        var presentacion = $(this).find('input#PresentacionInventario').val().trim();
        var farmaco = $(this).find('select#ClasiBode').val().trim();
        var codigo = $(this).find('input#CodiBode').val().trim();
        var imagen = null;//$(this).find('input#fotoBode')[0].files[0];
        var pa1 = $(this).find('select#PABode1').val().trim();
        var pa2 = $(this).find('select#PABode2').val().trim();
        var pa3 = $(this).find('select#PABode3').val().trim();
        var pa4 = $(this).find('select#PABode4').val().trim();
        var percha = $(this).find('select#percha').val();
        var can1 = $(this).find('input#CanteBode1').val().trim();
        var can2 = $(this).find('input#CanteBode2').val().trim();
        var can3 = $(this).find('input#CanteBode3').val().trim();
        var can4 = $(this).find('input#CanteBode4').val().trim();
        var um1 = $(this).find('select#UM1').val().trim();
        var um2 = $(this).find('select#UM2').val().trim();
        var um3 = $(this).find('select#UM3').val().trim();
        var um4 = $(this).find('select#UM4').val().trim();
        var valor = $(this).find('input#ValorCaja').val().trim();
        if(valor==''||valor==0){
            valor = 1;
        }
        var utilidad1 = $('.body').find('input#costo1').val();
        var utilidad2 = $('.body').find('input#costo2').val();
        var presentacion1 = $('.body table#Presentacion1 tbody').find('td#presentacion2').html();
        var presentacion2 = $('.body table#Presentacion1 tbody').find('select#PresenBode').val();
        var cantidad2 = $('.body table#Presentacion1 tbody').find('input#cantidad2').val();

        var pvp1 = $('.body').find('input#pvp1').val();
        var pvp2 = $('.body').find('input#pvp2').val();

        if(presentacion2==0){
            presentacion2 = "(NINGUNO)";
        }
        
        if(presentacion2 == '(NINGUNO)'){
            cantidad2 = 1;
            utilidad2 = 0;
        }else{
            if(cantidad2==''||cantidad2==0||cantidad2==1){
                swal("Esculapio!", "Verifique la cantidad ingresada en la presentacion ", "error").then((confirma) => {
                    
                });
                return;
            }
        }
        var nivel2 = 0;
        var nivel1 = 0;
        if(pa1=='0'){
            pa1='(NINGUNO)';
        }
        if(pa2=='0'){
            pa2='(NINGUNO)';
        }
        if(pa3=='0'){
            pa3='(NINGUNO)';
        }
        if(pa4=='0'){
            pa4='(NINGUNO)';
        }
        if(um1=='0'){
            um1='-';
        }
        if(um2=='0'){
            um2='-';
        }
        if(um3=='0'){
            um3='-';
        }
        if(um4=='0'){
            um4='-';
        }
        if ($('.body input#radio1').prop('checked')) {
            var iva = 'S';
        }else{
            var iva = 'N';
        }
        var limpiar = $('.body').find('button#LimpiarBog');
        var nombreBodega = $(this).find('select#CataBode option:selected').text();
        var nombreLinea = $(this).find('select#LineaBode option:selected').text();
        var nombreGalenica = $(this).find('select#PreseBode option:selected').text();
        var nombreFarmaco = $(this).find('select#ClasiBode option:selected').text();
        //var ne= $(this).find('select#Establecimiento option:selected').text().trim();
        var t = $('#datatable').DataTable();
        
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarInventario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, limpiar, t, nombreBodega, nombreLinea, nombreGalenica, nombreFarmaco, iva, nivel1, nivel2, utilidad1, utilidad2,cantidad2,valor,presentacion1,presentacion2,percha,pvp1,pvp2);
            } else {
                
            }
        });
    });
});

$(".body").on('click', "button#Modificarbog", function(ev) {
    $(".body").on('submit', "form#RegistroPadre", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var bodega = $(this).find('select#CataBode').val().trim();
        var linea = $(this).find('select#LineaBode').val().trim();
        var nombre = $(this).find('input#NombreBode').val().trim();
        var galenica = $(this).find('select#PreseBode').val().trim();
        var presentacion = $(this).find('input#PresentacionInventario').val().trim();
        var farmaco = $(this).find('select#ClasiBode').val().trim();
        var codigo = $(this).find('input#CodiBode').val().trim();
        //var fecha = $(this).find('input#FechaBode').val().trim();
        //var stock = $(this).find('input#StockBode').val().trim();
        var imagen = null;//$(this).find('input#fotoBode')[0].files[0];
        var pa1 = $(this).find('select#PABode1').val().trim();
        var pa2 = $(this).find('select#PABode2').val().trim();
        var pa3 = $(this).find('select#PABode3').val().trim();
        var pa4 = $(this).find('select#PABode4').val().trim();
        var percha = $(this).find('select#percha').val();
        var can1 = $(this).find('input#CanteBode1').val().trim();
        var can2 = $(this).find('input#CanteBode2').val().trim();
        var can3 = $(this).find('input#CanteBode3').val().trim();
        var can4 = $(this).find('input#CanteBode4').val().trim();
        var um1 = $(this).find('select#UM1').val().trim();
        var um2 = $(this).find('select#UM2').val().trim();
        var um3 = $(this).find('select#UM3').val().trim();
        var um4 = $(this).find('select#UM4').val().trim();
        var pvp1 = $('.body').find('input#pvp1').val();
        var pvp2 = $('.body').find('input#pvp2').val();
        var valor = $(this).find('input#ValorCaja').val().trim();

        if(valor==''||valor==0){
            valor = 1;
        }
        var utilidad1 = $('.body').find('input#costo1').val();
        var utilidad2 = $('.body').find('input#costo2').val();
        var presentacion1 = $('.body table#Presentacion1 tbody').find('td#presentacion2').html();
        var presentacion2 = $('.body table#Presentacion1 tbody').find('select#PresenBode').val();
        var cantidad2 = $('.body table#Presentacion1 tbody').find('input#cantidad2').val();
        if(presentacion2=='0'){
            presentacion2 == "(NINGUNO)";
        }
        
        if(presentacion2 == "(NINGUNO)"){
            cantidad2 = 1;
            utilidad2 = 0;
        }else{
            if(cantidad2==''||cantidad2==0||cantidad2==1){
                swal("Esculapio!", "Verifique la cantidad ingresada en la presentacion ", "error").then((confirma) => {
                    
                });
                return;
            }
        }
        var nivel2 = 0;
        var nivel1 = 0;
        if ($('.body input#radio1').prop('checked')) {
            var iva = 'S';
        }else{
            var iva = 'N';
        }

        if(pa1=='0'){
            pa1='(NINGUNO)';
        }
        if(pa2=='0'){
            pa2='(NINGUNO)';
        }
        if(pa3=='0'){
            pa3='(NINGUNO)';
        }
        if(pa4=='0'){
            pa4='(NINGUNO)';
        }
        if(um1=='0'){
            um1='-';
        }
        if(um2=='0'){
            um2='-';
        }
        if(um3=='0'){
            um3='-';
        }
        if(um4=='0'){
            um4='-';
        }
        var t = $('#datatable').DataTable();
        var limpiar = $('.body').find('button#LimpiarBog');
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificaInvetario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, pvp1, pvp2, utilidad1, utilidad2, limpiar, t, iva, nivel2, nivel1,cantidad2,valor,presentacion1,presentacion2,percha);
            } else {
                
            }
        });
    });
});

function ModificaInvetario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, pvp1, pvp2, utilidad1, utilidad2, limpiar, t, iva, nivel2, nivel1,cantidad2,valor,presentacion1,presentacion2,percha) {
    var formData = new FormData();
    formData.append('Requerimiento', "ModificaInvetario");
    formData.append('Id', id);
    formData.append('Id_Bodega', bodega);
    formData.append('Id_Linea', linea);
    formData.append('Id_Unidad', galenica);
    formData.append('Id_Farmacologia', farmaco);
    formData.append('Nombre', nombre);
    formData.append('Presentacion', presentacion);
    formData.append('Codigo_Barra', codigo);
    formData.append('Principio1', pa1);
    formData.append('Principio2', pa2);
    formData.append('Principio3', pa3);
    formData.append('Principio4', pa4);
    formData.append('Medida1', can1);
    formData.append('Medida2', can2);
    formData.append('Medida3', can3);
    formData.append('Medida4', can4);
    formData.append('Um1', um1);
    formData.append('Um2', um2);
    formData.append('Um3', um3);
    formData.append('Um4', um4);
    //formData.append('Cantidad1', cant1);
    //formData.append('Cantidad2', cant2);
    formData.append('TipoPrecio',$("input[name=radioPorcentaje]:checked").val());
    formData.append('Pvp1', pvp1);
    formData.append('Pvp2', pvp2);
    formData.append('Utilidad1', utilidad1);
    formData.append('Utilidad2', utilidad2);
    formData.append('Iva', iva);
    formData.append('Nivel1', nivel1);
    formData.append('Nivel2', nivel2);
    formData.append('Imagen', imagen);
    formData.append('Valor', valor);
    formData.append('Cantidad2', cantidad2);
    formData.append('Presentacion1', presentacion1);
    formData.append('Presentacion2', presentacion2);
    formData.append('Percha', percha);
    formData.append('Prescripcion', $("#txtPrescripcion").val());

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "inventario Modificado..!", "success");
            limpiar.click();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar El Perfil..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
////////////////////////////////////////////////////////////////ELIMINAR///////////////////////////////////////////////////////////







$(".body").on('click', "button#Eliminarbog", function(ev) {
    $(".body").on('submit', "form#RegistroPadre", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var limpiar = $(this).find('button#LimpiarBog');
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                EliminaInventario(id, limpiar);
            } else {
                
            }
        });
    });
});

function EliminaInventario(id, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaInventario",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Producto Eliminado..!", "success");            
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('.body table#datatableBog tbody').on('click', 'tr', function(evt) {
    id = $(this).find('td').eq(0).html();

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "BuscarInventarioPorId",
            IdInventario: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
        $('.body').find('select#CataBode').val(respuesta[0][1]);
        $('.body').find('select#LineaBode').val(respuesta[0][4]);
        $('.body').find('input#NombreBode').val(respuesta[0][2]);
        $('.body').find('input#PresentacionInventario').val(respuesta[0][3]);
        $('.body').find('select#ClasiBode').val(respuesta[0][6]);
        $('.body').find('input#CodiBode').val(respuesta[0][7]);
        $('.body').find('select#PreseBode').val(respuesta[0][5]);
        var emelec = 0;
        if(respuesta[0][21]==''||respuesta[0][21]==null){
            emelec = 0;
        }else{
            emelec = parseFloat(respuesta[0][21]).toFixed(2);
        }
        $('.body').find('input#FechaBode').val(emelec);
        $('.body').find('input#StockBode').val(respuesta[0][20]);
        $('.body').find('input#ValorCaja').val(respuesta[0][34]);
        $('.body').find('select#PABode1').val(respuesta[0][8]);
        $('.body').find('select#PABode2').val(respuesta[0][11]);
        $('.body').find('select#PABode3').val(respuesta[0][14]);
        $('.body').find('select#PABode4').val(respuesta[0][17]);
        $('.body').find('input#CanteBode1').val(respuesta[0][9]);
        $('.body').find('input#CanteBode2').val(respuesta[0][12]);
        $('.body').find('input#CanteBode3').val(respuesta[0][15]);
        $('.body').find('input#CanteBode4').val(respuesta[0][18]);
        $('.body').find('select#UM1').val(respuesta[0][10]);
        $('.body').find('select#UM2').val(respuesta[0][13]);
        $('.body').find('select#UM3').val(respuesta[0][16]);
        $('.body').find('select#UM4').val(respuesta[0][19]);
        $('.body').find('select#percha').val(respuesta[0][37]);
        var val = "(NINGUNO)";
        if(respuesta[0][36]!=null){
            val = respuesta[0][36];
        }
        $('.body').find('td#presentacion1 select#PresenBode').val(val);
        $('.body').find('td#presentacion2').text(respuesta[0][35]);

        $('.body').find('#txtPrescripcion').val(respuesta[0][39]);
        
        var cantidad = parseFloat(respuesta[0][23]).toFixed(2);
      
        if(respuesta[0][31]=='S'){
            $('.body input#radio1').prop('checked',true);
        }else{
            $('.body input#radio2').prop('checked',true);
        }
        $('.body').find('td#presentacion2').text($('.body').find('select#PreseBode').find('option[value='+respuesta[0][5]+']').html());
        $('.body').find('input#costo1').val(respuesta[0][29]);
        $('.body').find('input#costo2').val(respuesta[0][30]);

        var utilidad1 = parseFloat(($('.body').find('input#costo1').val()/100)*$('.body').find('input#FechaBode').val());
        var costoutilidad1 = parseFloat(utilidad1+parseFloat($('.body').find('input#FechaBode').val()));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva*parseFloat($('.body').find('input#FechaBode').val()));
        $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva1').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val()+iva1);
        var suma = iva1 + pvp1;
        $('.body').find('input#pvp1').val(suma.toFixed(2));

        var utilidad1 = parseFloat(($('.body').find('input#costo1').val()/100)*$('.body').find('input#FechaBode').val());
        var costoutilidad1 = parseFloat(utilidad1+parseFloat($('.body').find('input#FechaBode').val()));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva*parseFloat($('.body').find('input#FechaBode').val()));
        $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva1').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val()+parseFloat($('.body').find('input#iva1').val()));
        $('.body').find('input#pvp1').val(pvp1.toFixed(2));


        if(val=='(NINGUNO)'){
            $('.body table#Presentacion2').find('tr#Nivel22 input').prop('disabled',true);
            $('.body table#Presentacion2').find('tr#Nivel22 input').val('0');
            $('.body table#Presentacion1 tbody').find('input#cantidad2').val('0');
        }else{
            var utilidad1 = parseFloat(($('.body').find('input#costo2').val()/100)*parseFloat($('.body').find('input#FechaBode').val()*cantidad));
            var costoutilidad1 = parseFloat(utilidad1+parseFloat($('.body').find('input#FechaBode').val()*cantidad));
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva*parseFloat($('.body').find('input#FechaBode').val()*cantidad));
            $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva2').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val()+parseFloat($('.body').find('input#iva2').val()));
            $('.body').find('input#pvp2').val(pvp1.toFixed(2));
            $('.body table#Presentacion1 tbody').find('input#cantidad2').val(respuesta[0][23]);
            
        }
       
        
        var utilidad2 = parseFloat(($('.body').find('input#costo2').val()/100)*$('.body').find('input#FechaBode').val()*parseFloat($('.body').find('input#cantidad2').val()));
        var costoutilidad2 = parseFloat(utilidad2+parseFloat($('.body').find('input#FechaBode').val())*parseFloat($('.body').find('input#cantidad2').val()));
        var iva2 = parseFloat(iva*parseFloat($('.body').find('input#FechaBode').val())*parseFloat($('.body').find('input#cantidad2').val()));
        $('.body').find('input#utilidad2').val(utilidad2.toFixed(2));
        $('.body').find('input#costoutilidad2').val(costoutilidad2.toFixed(2));
        $('.body').find('input#iva2').val(iva2.toFixed(2));
        var pvp2 = costoutilidad2+iva2;
        $('.body').find('input#pvp2').val(pvp2.toFixed(2));
        $('.selectpicker').selectpicker('refresh');
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        $('.body').find('div#DivValorCaja').fadeIn(1);
        //$('.body').find('div#VerTabla').fadeIn(1);
        $('.body').find('div#DivCostoInventario').css('visibility','visible');
        $('.body').find('div#DivCantidadActual').css('visibility','visible');

        if(respuesta[0][38]=="VALOR"){
            $('.body').find('input#pvp1').val( respuesta[0][22] );
            $('.body').find('input#pvp2').val( respuesta[0][24] );
        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
    var fila = $(this);
    $('button#Guardarbog').prop('disabled', true);
    $('button#Modificarbog').prop('disabled', false);
    $('button#Inactivarbog').prop('disabled', false);
    $('button#Eliminarbog').prop('disabled', false);
    
    
});








