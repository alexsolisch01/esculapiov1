var id = 0;
var tablaInventario = null;
$("body").on('click', "#nuevoRegistro", function(ev) {
    $('#Guardarbog').fadeIn(0);
    $('#Modificarbog').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#CataBode").val("0");
    $("#LineaBode").val("0");
    $("#PreseBode").val("0");
    $("#ClasiBode").val("0");
    $("#DescuentoEfectivo").val("0");
    $("#DescuentoTarjeta").val("0");
    $("#PABode1").val("0");
    $("#UM1").val("0");
    $("#PABode2").val("0");
    $("#UM2").val("0");
    $("#PABode3").val("0");
    $("#UM3").val("0");
    $("#PABode4").val("0");
    $("#UM4").val("0");
    $("#percha").val("1");
    $("#PresenBode").val("(NINGUNO)");
    $(".modalNuevo").modal();
    $('.body').find('div#DivCostoInventario').fadeOut(0);
    $('.body').find('div#DivCantidadActual').fadeOut(0);
    $('.body table#Presentacion1 tbody').find('td#presentacion2').text("DEFINIR");
    $('.selectpicker').selectpicker('refresh');
});

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
        var imagen = null; //$(this).find('input#fotoBode')[0].files[0];
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
        if (valor == '' || valor == 0) {
            valor = 1;
        }
        var utilidad1 = $('.body').find('input#costo1').val();
        var utilidad2 = $('.body').find('input#costo2').val();
        var presentacion1 = $('.body table#Presentacion1 tbody').find('td#presentacion2').html();
        var presentacion2 = $('.body table#Presentacion1 tbody').find('select#PresenBode').val();
        var cantidad2 = $('.body table#Presentacion1 tbody').find('input#cantidad2').val();

        var pvp1 = $('.body').find('input#pvp1').val();
        var pvp2 = $('.body').find('input#pvp2').val();

        if (presentacion2 == 0) {
            presentacion2 = "(NINGUNO)";
        }

        if (presentacion2 == '(NINGUNO)') {
            cantidad2 = 1;
            utilidad2 = 0;
        } else {
            if (cantidad2 == '' || cantidad2 == 0 || cantidad2 == 1) {
                swal("Esculapio!", "Verifique la cantidad ingresada en la presentacion ", "error").then((confirma) => {

                });
                return;
            }
        }
        var nivel2 = 0;
        var nivel1 = 0;
        if (pa1 == '0') {
            pa1 = '(NINGUNO)';
        }
        if (pa2 == '0') {
            pa2 = '(NINGUNO)';
        }
        if (pa3 == '0') {
            pa3 = '(NINGUNO)';
        }
        if (pa4 == '0') {
            pa4 = '(NINGUNO)';
        }
        if (um1 == '0') {
            um1 = '-';
        }
        if (um2 == '0') {
            um2 = '-';
        }
        if (um3 == '0') {
            um3 = '-';
        }
        if (um4 == '0') {
            um4 = '-';
        }
        if ($('.body input#radio1').prop('checked')) {
            var iva = 'S';
        } else {
            var iva = 'N';
        }

        var nombreBodega = $(this).find('select#CataBode option:selected').text();
        var nombreLinea = $(this).find('select#LineaBode option:selected').text();
        var nombreGalenica = $(this).find('select#PreseBode option:selected').text();
        var nombreFarmaco = $(this).find('select#ClasiBode option:selected').text();

        var descuentoefectivo = $('.body').find('#DescuentoEfectivo').val();
        var descuentotarjeta = $('.body').find('#DescuentoTarjeta').val();

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
                GuardarInventario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, nombreBodega, nombreLinea, nombreGalenica, nombreFarmaco, iva, nivel1, nivel2, utilidad1, utilidad2, cantidad2, valor, presentacion1, presentacion2, percha, pvp1, pvp2, descuentoefectivo, descuentotarjeta);
            } else {

            }
        });
    });
});

function GuardarInventario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, nombreBodega, nombreLinea, nombreGalenica, nombreFarmaco, iva, nivel1, nivel2, utilidad1, utilidad2, cantidad2, valor, presentacion1, presentacion2, percha, pvp1, pvp2, descuentoefectivo, descuentotarjeta) {
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
    formData.append('Nivel2', nivel2);
    formData.append('Valor', valor);
    formData.append('Presentacion1', presentacion1);
    formData.append('Presentacion2', presentacion2);
    formData.append('Percha', percha);
    formData.append('TipoPrecio', $("input[name=radioPorcentaje]:checked").val());
    formData.append('Pvp1', pvp1);
    formData.append('Pvp2', pvp2);
    formData.append('Prescripcion', $("#txtPrescripcion").val());
    formData.append('DescuentoEfectivo', descuentoefectivo);
    formData.append('DescuentoTarjeta', descuentotarjeta);

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
            $(".modalNuevo").modal("hide");
            tablaInventario.draw();
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
        var imagen = null; //$(this).find('input#fotoBode')[0].files[0];
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

        if (valor == '' || valor == 0) {
            valor = 1;
        }
        var utilidad1 = $('.body').find('input#costo1').val();
        var utilidad2 = $('.body').find('input#costo2').val();
        var presentacion1 = $('.body table#Presentacion1 tbody').find('td#presentacion2').html();
        var presentacion2 = $('.body table#Presentacion1 tbody').find('select#PresenBode').val();
        var cantidad2 = $('.body table#Presentacion1 tbody').find('input#cantidad2').val();
        if (presentacion2 == '0') {
            presentacion2 == "(NINGUNO)";
        }

        if (presentacion2 == "(NINGUNO)") {
            cantidad2 = 1;
            utilidad2 = 0;
        } else {
            if (cantidad2 == '' || cantidad2 == 0 || cantidad2 == 1) {
                swal("Esculapio!", "Verifique la cantidad ingresada en la presentacion ", "error").then((confirma) => {

                });
                return;
            }
        }
        var nivel2 = 0;
        var nivel1 = 0;
        if ($('.body input#radio1').prop('checked')) {
            var iva = 'S';
        } else {
            var iva = 'N';
        }

        if (pa1 == '0') {
            pa1 = '(NINGUNO)';
        }
        if (pa2 == '0') {
            pa2 = '(NINGUNO)';
        }
        if (pa3 == '0') {
            pa3 = '(NINGUNO)';
        }
        if (pa4 == '0') {
            pa4 = '(NINGUNO)';
        }
        if (um1 == '0') {
            um1 = '-';
        }
        if (um2 == '0') {
            um2 = '-';
        }
        if (um3 == '0') {
            um3 = '-';
        }
        if (um4 == '0') {
            um4 = '-';
        }
        var descuentoefectivo = $('.body').find('#DescuentoEfectivo').val();
        var descuentotarjeta = $('.body').find('#DescuentoTarjeta').val();

        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificaInvetario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, pvp1, pvp2, utilidad1, utilidad2, iva, nivel2, nivel1, cantidad2, valor, presentacion1, presentacion2, percha, descuentoefectivo, descuentotarjeta);
            } else {

            }
        });
    });
});

function ModificaInvetario(bodega, linea, nombre, galenica, presentacion, farmaco, codigo, imagen, pa1, pa2, pa3, pa4, can1, can2, can3, can4, um1, um2, um3, um4, pvp1, pvp2, utilidad1, utilidad2, iva, nivel2, nivel1, cantidad2, valor, presentacion1, presentacion2, percha, descuentoefectivo, descuentotarjeta) {
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
    formData.append('TipoPrecio', $("input[name=radioPorcentaje]:checked").val());
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
    formData.append('DescuentoEfectivo', descuentoefectivo);
    formData.append('DescuentoTarjeta', descuentotarjeta);

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
            tablaInventario.draw();
            $(".modalNuevo").modal("hide");
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


$("body").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminaInventario(id);
        } else {

        }
    });
});

function EliminaInventario(id) {
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
            tablaInventario.draw();
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

$('.body table#datatableBog').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");

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
        if (respuesta[0][21] == '' || respuesta[0][21] == null) {
            emelec = 0;
        } else {
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
        if (respuesta[0][36] != null) {
            val = respuesta[0][36];
        }
        $('.body').find('td#presentacion1 select#PresenBode').val(val);
        $('.body').find('td#presentacion2').text(respuesta[0][35]);

        $('.body').find('#txtPrescripcion').val(respuesta[0][39]);
        $('.body').find('#DescuentoEfectivo').val(respuesta[0][40]);
        $('.body').find('#DescuentoTarjeta').val(respuesta[0][41]);

        var cantidad = parseFloat(respuesta[0][23]).toFixed(2);

        if (respuesta[0][31] == 'S') {
            $('.body input#radio1').prop('checked', true);
        } else {
            $('.body input#radio2').prop('checked', true);
        }
        $('.body').find('td#presentacion2').text($('.body').find('select#PreseBode').find('option[value=' + respuesta[0][5] + ']').html());
        $('.body').find('input#costo1').val(respuesta[0][29]);
        $('.body').find('input#costo2').val(respuesta[0][30]);

        var utilidad1 = parseFloat(($('.body').find('input#costo1').val() / 100) * $('.body').find('input#FechaBode').val());
        var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val()));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
        $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva1').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + iva1);
        var suma = iva1 + pvp1;
        $('.body').find('input#pvp1').val(suma.toFixed(2));

        var utilidad1 = parseFloat(($('.body').find('input#costo1').val() / 100) * $('.body').find('input#FechaBode').val());
        var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val()));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
        $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva1').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + parseFloat($('.body').find('input#iva1').val()));
        $('.body').find('input#pvp1').val(pvp1.toFixed(2));


        if (val == '(NINGUNO)') {
            $('.body table#Presentacion2').find('tr#Nivel22 input').prop('disabled', true);
            $('.body table#Presentacion2').find('tr#Nivel22 input').val('0');
            $('.body table#Presentacion1 tbody').find('input#cantidad2').val('0');
        } else {
            var utilidad1 = parseFloat(($('.body').find('input#costo2').val() / 100) * parseFloat($('.body').find('input#FechaBode').val() * cantidad));
            var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val() * cantidad));
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val() * cantidad));
            $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva2').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val() + parseFloat($('.body').find('input#iva2').val()));
            $('.body').find('input#pvp2').val(pvp1.toFixed(2));
            $('.body table#Presentacion1 tbody').find('input#cantidad2').val(respuesta[0][23]);

        }


        var utilidad2 = parseFloat(($('.body').find('input#costo2').val() / 100) * $('.body').find('input#FechaBode').val() * parseFloat($('.body').find('input#cantidad2').val()));
        var costoutilidad2 = parseFloat(utilidad2 + parseFloat($('.body').find('input#FechaBode').val()) * parseFloat($('.body').find('input#cantidad2').val()));
        var iva2 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()) * parseFloat($('.body').find('input#cantidad2').val()));
        $('.body').find('input#utilidad2').val(utilidad2.toFixed(2));
        $('.body').find('input#costoutilidad2').val(costoutilidad2.toFixed(2));
        $('.body').find('input#iva2').val(iva2.toFixed(2));
        var pvp2 = costoutilidad2 + iva2;
        $('.body').find('input#pvp2').val(pvp2.toFixed(2));
        $('.selectpicker').selectpicker('refresh');
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        $('.body').find('div#DivValorCaja').fadeIn(1);
        //$('.body').find('div#VerTabla').fadeIn(1);
        $('.body').find('div#DivCostoInventario').fadeIn(0);
        $('.body').find('div#DivCantidadActual').fadeIn(0);
        if ($("#habilitarDescuentoPredefinido").val() == "SI") {
            respuesta[0][38] = "VALOR";
        }
        if (respuesta[0][38] == "VALOR") {
            $('.body').find('input#pvp1').val(respuesta[0][22]);
            $('.body').find('input#pvp2').val(respuesta[0][24]);
            var pvpefectivo = respuesta[0][22] - (respuesta[0][22] * ($("#DescuentoEfectivo").val() / 100));
            var pvptarjeta = respuesta[0][22] - (respuesta[0][22] * ($("#DescuentoTarjeta").val() / 100));
            var pvpefectivo2 = respuesta[0][24] - (respuesta[0][24] * ($("#DescuentoEfectivo").val() / 100));
            var pvptarjeta2 = respuesta[0][24] - (respuesta[0][24] * ($("#DescuentoTarjeta").val() / 100));
            $('.body').find('input#pvpefe1').val(parseFloat(pvpefectivo).toFixed(2));
            $('.body').find('input#pvptar1').val(parseFloat(pvptarjeta).toFixed(2));
            $('.body').find('input#pvpefe2').val(parseFloat(pvpefectivo2).toFixed(2));
            $('.body').find('input#pvptar2').val(parseFloat(pvptarjeta2).toFixed(2));
        }
        $("#ValorCaja").change();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
            //location.reload();
    });
    $('#Guardarbog').fadeOut(0);
    $('#Modificarbog').fadeIn(0);
    $(".modalNuevo").modal();


});

function LlenarTablaInventario() {
    tablaInventario = $('#datatableBog').DataTable({
        dom: '<"top"lBf>rt<"bottom"ip>',
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [50, 400, 600, -1],
            [50, 400, 600, "Todo"]
        ],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaInvtarioMovimiento"

            },
            type: "POST"
        },
        scrollY: 500,
        scrollX: true,
        keys: true,
        buttons: [{
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
        ordering: false,
        "columnDefs": [{
            "targets": [6],
            "visible": false,
        }]
    });

    $('#datatableBog_filter input').unbind();
    $('#datatableBog_filter input').remove();
    $('#datatableBog_filter label').remove();
    $('input#nombreComercialF1').bind('keyup', function(e) {

        tablaInventario.column(3).search($('select#bodegaMoviIN').val());
        tablaInventario.column(4).search($('input#principioF1').val()).draw();
        tablaInventario.column(2).search($('input#presentacionF1').val()).draw();
        tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
        tablaInventario.column(5).search($('input#lineafabricacionF1').val()).draw();
        tablaInventario.column(6).search($('input#clasificacionF1').val()).draw();

        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableBog tbody tr td').eq(0).click();
        }
    });
    $('input#presentacionF1').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaInventario.column(3).search($('select#bodegaMoviIN').val());
        tablaInventario.column(4).search($('input#principioF1').val()).draw();
        tablaInventario.column(2).search($('input#presentacionF1').val()).draw();
        tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
        tablaInventario.column(5).search($('input#lineafabricacionF1').val()).draw();
        tablaInventario.column(6).search($('input#clasificacionF1').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableBog tbody tr td').eq(0).click();
        }
    });
    $('input#principioF1').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaInventario.column(3).search($('select#bodegaMoviIN').val());
        tablaInventario.column(4).search($('input#principioF1').val()).draw();
        tablaInventario.column(2).search($('input#presentacionF1').val()).draw();
        tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
        tablaInventario.column(5).search($('input#lineafabricacionF1').val()).draw();
        tablaInventario.column(6).search($('input#clasificacionF1').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableBog tbody tr td').eq(0).click();
        }
    });
    $('input#lineafabricacionF1').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaInventario.column(3).search($('select#bodegaMoviIN').val());
        tablaInventario.column(4).search($('input#principioF1').val()).draw();
        tablaInventario.column(2).search($('input#presentacionF1').val()).draw();
        tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
        tablaInventario.column(5).search($('input#lineafabricacionF1').val()).draw();
        tablaInventario.column(6).search($('input#clasificacionF1').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableBog tbody tr td').eq(0).click();
        }
    });
    $('input#clasificacionF1').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaInventario.column(3).search($('select#bodegaMoviIN').val());
        tablaInventario.column(4).search($('input#principioF1').val()).draw();
        tablaInventario.column(2).search($('input#presentacionF1').val()).draw();
        tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
        tablaInventario.column(5).search($('input#lineafabricacionF1').val()).draw();
        tablaInventario.column(6).search($('input#clasificacionF1').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableBog tbody tr td').eq(0).click();
        }
    });
}
LlenarTablaInventario();

function LlenarPrincipios() {
    $("select#PABode2").html($("select#PABode1").html());
    $("select#PABode3").html($("select#PABode1").html());
    $("select#PABode4").html($("select#PABode1").html());
}
$(".body").on('change', "select#bodegaMoviIN", function(ev) {
    tablaInventario.column(4).search($('input#principioF1').val());
    tablaInventario.column(2).search($('input#presentacionF1').val());
    tablaInventario.column(3).search($('select#bodegaMoviIN').val());
    tablaInventario.column(1).search($('input#nombreComercialF1').val()).draw();
});


function CargarComboPrincipio() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboPrincipio"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function(i, value) {
            var elem = ' <option value="' + value.clasificacion + '">' + value.clasificacion + '</option> ';
            $("select#PABode1").append(elem);
        });
        LlenarPrincipios();
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarComboFarmacologia() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboFarmacologia"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function(i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#ClasiBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarComboLinea() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboLinea"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function(i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#LineaBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarComboPresentacionGalenica() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboPresentacionGalenica"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function(i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#PreseBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarComboProveedores() {
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
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#proveMovi").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}
CargarComboPrincipio();
CargarComboFarmacologia();
CargarComboPresentacionGalenica();
CargarComboProveedores();


CargarComboLinea();
$('.selectpicker').selectpicker('refresh');



$('.body').on('click', 'input[nombre=chequeado]', function(evt) {
    if ($(this).prop('checked')) {
        $('.body table#Presentacion1').find('tr#Nivel1 input#cantidad1').prop('disabled', false);
        $('.body table#Presentacion1').find('tr#Nivel1 input#cantidad1').val('1');
        $('.body table#Presentacion1').find('tr#Nivel1 input#costo1').val('15');
        //$('.body table#Presentacion2').find('tr#Nivel11 input').prop('disabled',false);
        $('.body table#Presentacion1').find('tr#Nivel1 span#ModalPorcentaje').prop('disabled', false);
        var utilidad1 = parseFloat(($('.body').find('input#costo1').val() / 100) * $('.body').find('input#FechaBode').val());
        var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val()));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
        $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva1').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + parseFloat($('.body').find('input#iva1').val()));
        $('.body').find('input#pvp1').val(pvp1.toFixed(2));
    } else {
        $('.body table#Presentacion1').find('tr#Nivel1 input#cantidad1').prop('disabled', true);
        $('.body table#Presentacion1').find('tr#Nivel1 input#costo1').prop('disabled', true);
        $('.body table#Presentacion1').find('tr#Nivel1 input').val('0');
        $('.body table#Presentacion2').find('tr#Nivel11 input').prop('disabled', true);
        $('.body table#Presentacion2').find('tr#Nivel11 input').val('0');
        $('.body table#Presentacion1').find('tr#Nivel1 span#ModalPorcentaje').prop('disabled', true);
    }
});

$('.body').on('click', 'input[nombre=chequeadouno]', function(evt) {
    if ($(this).prop('checked')) {
        var cantidad = $('.body').find('input#FormaBode').val();
        $('.body table#Presentacion1').find('tr#Nivel2 input#cantidad2').prop('disabled', false);
        $('.body table#Presentacion1').find('tr#Nivel2 input#cantidad2').val(cantidad);
        $('.body table#Presentacion1').find('tr#Nivel2 input#costo2').val('10');
        //$('.body table#Presentacion2').find('tr#Nivel11 input').prop('disabled',false);
        $('.body table#Presentacion1').find('tr#Nivel2 span#ModalPorcentaje1').prop('disabled', false);
        var utilidad1 = parseFloat(($('.body').find('input#costo2').val() / 100) * parseFloat($('.body').find('input#FechaBode').val() * cantidad));
        var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val() * cantidad));
        var iva = 0;
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val() * cantidad));
        $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva2').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val() + parseFloat($('.body').find('input#iva2').val()));
        $('.body').find('input#pvp2').val(pvp1.toFixed(2));
    } else {
        $('.body table#Presentacion1').find('tr#Nivel2 input#cantidad2').prop('disabled', true);
        $('.body table#Presentacion1').find('tr#Nivel2 input#costo2').prop('disabled', true);
        $('.body table#Presentacion1').find('tr#Nivel2 input').val('0');
        $('.body table#Presentacion2').find('tr#Nivel22 input').prop('disabled', true);
        $('.body table#Presentacion2').find('tr#Nivel22 input').val('0');
        $('.body table#Presentacion1').find('tr#Nivel2 span#ModalPorcentaje1').prop('disabled', true);
    }
});

var bandera = false;

$('.body').on('click', 'span#ModalPorcentaje', function(evt) {
    bandera = true;
    var costo = parseFloat($('.body').find('input#FechaBode').val());
    var utilidad1 = parseFloat($('.body').find('input#costo1').val());
    var total = (utilidad1 / 100) * costo + costo;
    $('.body').find('input#PVPValor').val(total.toFixed(2));
    $('.body').find('input#PVPValorPorcentaje').val(utilidad1);
});

$('.body').on('click', 'span#ModalPorcentaje1', function(evt) {
    bandera = false;
    var costo = parseFloat($('.body').find('input#FechaBode').val() * $('.body').find('input#cantidad2').val());
    var utilidad1 = parseFloat($('.body').find('input#costo2').val());
    var total = (utilidad1 / 100) * costo + costo;
    $('.body').find('input#PVPValor').val(total.toFixed(2));
    $('.body').find('input#PVPValorPorcentaje').val(utilidad1);
});

$('.body').on('change', '#radioPorcentajeValor', function(evt) {
    if ($(this).prop("checked")) {
        $("#PorValor").fadeIn();
        $("#PorPorcentaje").fadeOut();
    } else {
        $("#PorValor").fadeOut();
        $("#PorPorcentaje").fadeIn();
    }
});
$('.body').on('change', '#radioPorcentajePorcentaje', function(evt) {
    if ($(this).prop("checked")) {
        $("#PorValor").fadeOut();
        $("#PorPorcentaje").fadeIn();

    } else {
        $("#PorValor").fadeIn();
        $("#PorPorcentaje").fadeOut();
    }
});

$('.body').on('click', 'button#CambiarPorcenjate', function(evt) {

    if ($('.body').find('input#FechaBode').val() == "") {
        $('.body').find('input#FechaBode').val("0");
    }
    if (bandera == true) {
        if ($('.body').find('input#radioPorcentajeValor').prop('checked')) {
            var costo = parseFloat($('.body').find('input#FechaBode').val());
            var valorIngresado = parseFloat($('.body').find('input#PVPValor').val());
            if (costo > valorIngresado) {
                swal("Esculapio!", "El valor ingresado no debe ser menor al costo", "error");
                return;
            }
            var nuevaCantidad = parseFloat($('.body').find('input#PVPValor').val() - $('.body').find('input#FechaBode').val());
            var nuevoPorcentaje = (nuevaCantidad / costo) * 100;
            $('.body').find('input#costo1').val(nuevoPorcentaje.toFixed(2));
            var utilidad1 = nuevaCantidad; //nparseFloat(($('.body').find('input#costo1').val()/100)*$('.body').find('input#FechaBode').val());
            var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val()));
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
            $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva1').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + parseFloat($('.body').find('input#iva1').val()));
            $('.body').find('input#pvp1').val(pvp1.toFixed(2));
        }
        if ($('.body').find('input#radioPorcentajePorcentaje').prop('checked')) {
            var nuevoPorcentaje = $('.body').find('input#PVPValorPorcentaje').val();
            $('.body').find('input#costo1').val(nuevoPorcentaje);
            var utilidad1 = parseFloat(($('.body').find('input#costo1').val() / 100) * $('.body').find('input#FechaBode').val());
            var costoutilidad1 = parseFloat(utilidad1 + parseFloat($('.body').find('input#FechaBode').val()));
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
            $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva1').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + parseFloat($('.body').find('input#iva1').val()));
            $('.body').find('input#pvp1').val(pvp1.toFixed(2));
        }
    } else {
        if ($('.body').find('input#radioPorcentajeValor').prop('checked')) {
            var costo = parseFloat($('.body').find('input#FechaBode').val() * $('.body').find('input#cantidad2').val());
            var valorIngresado = parseFloat($('.body').find('input#PVPValor').val());
            var nuevaCantidad = parseFloat($('.body').find('input#PVPValor').val() - costo);
            if (costo > valorIngresado) {
                swal("Esculapio!", "El valor ingresado no debe ser menor al costo", "error");
                return;
            }
            var nuevoPorcentaje = (nuevaCantidad / costo) * 100;
            $('.body').find('input#costo2').val(nuevoPorcentaje.toFixed(2));
            var utilidad1 = nuevaCantidad; //nparseFloat(($('.body').find('input#costo1').val()/100)*$('.body').find('input#FechaBode').val());
            var costoutilidad1 = parseFloat(utilidad1 + costo);
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva * costo);
            $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva1').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val() + parseFloat($('.body').find('input#iva2').val()));
            $('.body').find('input#pvp2').val(pvp1.toFixed(2));
        }
        if ($('.body').find('input#radioPorcentajePorcentaje').prop('checked')) {
            var nuevoPorcentaje = $('.body').find('input#PVPValorPorcentaje').val();
            $('.body').find('input#costo2').val(nuevoPorcentaje);
            var nuevaCantidad = parseFloat($('.body').find('input#FechaBode').val() * $('.body').find('input#cantidad2').val());
            var utilidad1 = parseFloat(($('.body').find('input#costo2').val() / 100) * nuevaCantidad);
            var costoutilidad1 = parseFloat(utilidad1 + nuevaCantidad);
            var iva = 0;
            if ($('.body input#radio1').prop('checked')) {
                iva = 0.12;
            }
            var iva1 = parseFloat(iva * parseFloat($('.body').find('input#FechaBode').val()));
            $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
            $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
            $('.body').find('input#iva2').val(iva1.toFixed(2));
            var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val() + parseFloat($('.body').find('input#iva2').val()));
            $('.body').find('input#pvp2').val(pvp1.toFixed(2));
        }
    }

});

$('#modal-porcentaje').on('hidden.bs.modal', function() {
    $(".modalNuevo").css("overflow-y", "auto");
});

$('.body').on('change', 'select#PresenBode', function(evt) {
    var seleccion = $('.body table#Presentacion1 tbody').find('tr#Nivel1 td#presentacion2').html();
    var texto = $(this).find('option:selected').text();
    if (seleccion == texto) {
        swal("Esculapio!", "Esta presentacion esta repetida, por favor seleecione una diferente", "error").then((confirma) => {
            $(this).val('(NINGUNO)');
        });
    }
});
$('.body').on('change', 'select#PreseBode', function(evt) {
    var texto = $(this).find('option:selected').text();
    if (texto == "Seleccionar..") {
        texto = 'DEFINIR';
    } else {
        texto = texto;
    }
    $('.body table#Presentacion1 tbody').find('td#presentacion2').text(texto);
    $('.body').find('label#PresentacionComercialNombre').text(texto);
});
$('.body').on('change', '#radio1,#radio2', function(evt) {
    $("#ValorCaja").change();
});
$('.body').on('change', '#ValorCaja', function(evt) {

    var valorcaja = $(this).val();
    if ($('.body input#radio1').prop('checked')) {
        valorcaja = valorcaja / 1.12;
    }
    if ($('.body').find('input#cantidad2').val() == "" || $('.body').find('input#cantidad2').val() == "0") {
        $('.body').find('input#cantidad2').val("1");
    }
    var costo = parseFloat($('.body').find('input#FechaBode').val() * $('.body').find('input#cantidad2').val());
    var valorIngresado = parseFloat(valorcaja);

    var nuevaCantidad = parseFloat(valorIngresado - costo);
    var nuevoPorcentaje = (nuevaCantidad / costo) * 100;
    var iva = 0;
    var utilidad1 = nuevaCantidad;
    var costoutilidad1 = parseFloat(utilidad1 + parseFloat(costo));
    if ($('.body').find('input#cantidad2').val() > 1) {
        $('.body').find('input#costo2').val(nuevoPorcentaje.toFixed(2));
        if ($('.body input#radio1').prop('checked')) {
            iva = 0.12;
        }
        var iva1 = parseFloat(iva * parseFloat(valorIngresado));
        $('.body').find('input#utilidad2').val(utilidad1.toFixed(2));
        $('.body').find('input#costoutilidad2').val(costoutilidad1.toFixed(2));
        $('.body').find('input#iva2').val(iva1.toFixed(2));
        var pvp1 = parseFloat($('.body').find('input#costoutilidad2').val() + parseFloat($('.body').find('input#iva2').val()));
        $('.body').find('input#pvp2').val(pvp1.toFixed(2));

        var pvpefectivo = pvp1 - (pvp1 * ($("#DescuentoEfectivo").val() / 100));
        var pvptarjeta = pvp1 - (pvp1 * ($("#DescuentoTarjeta").val() / 100));
        $('.body').find('input#pvpefe2').val(parseFloat(pvpefectivo).toFixed(2));
        $('.body').find('input#pvptar2').val(parseFloat(pvptarjeta).toFixed(2));
    } else {
        $('.body').find('input#pvp2').val("0");
        $('.body').find('input#pvpefe2').val("0");
        $('.body').find('input#pvptar2').val("0");
    }

    ///////////////////////////////////////FRACCIONES

    costo = parseFloat($('.body').find('input#FechaBode').val());
    valorIngresado = parseFloat(valorcaja) / $('.body').find('input#cantidad2').val();
    nuevaCantidad = parseFloat(valorIngresado - costo);

    nuevoPorcentaje = (nuevaCantidad / costo) * 100;
    $('.body').find('input#costo1').val(nuevoPorcentaje.toFixed(2));
    utilidad1 = nuevaCantidad;
    costoutilidad1 = parseFloat(utilidad1 + costo);
    iva = 0;
    if ($('.body input#radio1').prop('checked')) {
        iva = 0.12;
    }
    iva1 = parseFloat(iva * valorIngresado);
    $('.body').find('input#utilidad1').val(utilidad1.toFixed(2));
    $('.body').find('input#costoutilidad1').val(costoutilidad1.toFixed(2));
    $('.body').find('input#iva1').val(iva1.toFixed(2));
    pvp1 = parseFloat($('.body').find('input#costoutilidad1').val() + parseFloat($('.body').find('input#iva1').val()));
    $('.body').find('input#pvp1').val(pvp1.toFixed(2));

    var pvpefectivo2 = pvp1 - (pvp1 * ($("#DescuentoEfectivo").val() / 100));
    var pvptarjeta2 = pvp1 - (pvp1 * ($("#DescuentoTarjeta").val() / 100));
    $('.body').find('input#pvpefe1').val(parseFloat(pvpefectivo2).toFixed(2));
    $('.body').find('input#pvptar1').val(parseFloat(pvptarjeta2).toFixed(2));
});