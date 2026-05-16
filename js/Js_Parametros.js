var tablaParametros = $('#datatableParametrosSistema').DataTable({
    scrollCollapse: true,
    paging: true,
    scrollY: "350px",
    scrollX: true,
    keys: true,
    ordering: true,
   // pageLength: 10,
    responsive: true,
    searching: true,
    info: true,
    autoWidth: false, 
    language: {
        search: "Buscar:",
        searchPlaceholder: "🔍 Buscar parametros...",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        paginate: {
                next: "→",
                previous: "←"
        }
    }
});

function CargarParametros() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Parametros.php",
        data: {
            Requerimiento: "CargarParametros"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaParametros.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            if (value[0] > 1 && value[0] < 14) {
                var valor = "";
                if (value[3] == 1) {
                    valor = "checked";
                }
                var input = '<input type="checkbox" ' + valor + ' id="' + value[0] + '" class="parametro">';
                var fila = [value[0], value[1], value[2], input, value[4], value[5]]
                tablaParametros.row.add(fila);
            }
            if (value[0] == 22) {
                var valor = "";
                if (value[3] == 1) {
                    valor = "checked";
                }
                var input = '<input type="checkbox" ' + valor + ' id="' + value[0] + '" class="parametro">';
                var fila = [value[0], value[1], value[2], input, value[4], value[5]]
                tablaParametros.row.add(fila);
            }
            if (value[0] >= 14 && value[0] < 22 || value[0] == 23 || value[0] == 24) {
                input = '<input type="text"  id="' + value[0] + '" value="' + value[3] + '" style="width: 450px;" class="parametroText form-control" >';
                var fila = [value[0], value[1], value[2], input, value[4], value[5]]
                tablaParametros.row.add(fila);
            }
        });
        tablaParametros.draw();
        ValidacionParametros();
    });

}

CargarParametros();

function ModificarParmetroValor(id, valor) {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Parametros.php",
        data: {
            Requerimiento: "ModificarParmetroValor",
            Id: id,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        CargarParametros();
    });
}

$(".body").on('change', "input.parametro", function(ev) {
    var id = $(this).attr('id');
    var valor = 0;
    if ($(this).prop('checked')) {
        valor = 1;
    }
    ModificarParmetroValor(id, valor);
});
$(".body").on('change', "input.parametroText", function(ev) {
    var id = $(this).attr('id');
    var valor = $(this).val();
    ModificarParmetroValor(id, valor);
});

function ValidacionParametros() {
    var vector = $('.body').find("#datatableParametrosSistema tbody tr");
    var idsFacturas = "";

    var fcOnline = false;
    var fcOffline = false;
    var fcofflineManual = false;
    var fcofflineAutomatica = false;
    var intervalo1 = false;
    var intervalo2 = false;
    var intervalo3 = false;
    $.each(vector, function(a) {
        var input = $(this).find('input.parametro');

        if (input.prop('checked')) {
            if (input.attr('id') == 1) {
                fcOnline = true;
            }
            if (input.attr('id') == 2) {
                fcOffline = true;
            }
            if (input.attr('id') == 3) {
                fcofflineManual = true;
            }
            if (input.attr('id') == 4) {
                fcofflineAutomatica = true;
            }

            if (input.attr('id') == 5) {
                intervalo1 = true;
            }
            if (input.attr('id') == 6) {
                intervalo2 = true;
            }
            if (input.attr('id') == 7) {
                intervalo3 = true;
            }
        }
    });

    if (fcOnline) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 2 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 3 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 4 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 5 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 6 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 7 + "]").attr('disabled', true);
    }
    if (fcOffline) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 1 + "]").attr('disabled', true);
    }
    if (fcofflineManual) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 1 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 4 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 5 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 6 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 7 + "]").attr('disabled', true);
    }
    if (fcofflineAutomatica) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 1 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 3 + "]").attr('disabled', true);
    }
    if (intervalo1) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 6 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 7 + "]").attr('disabled', true);
    }
    if (intervalo2) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 5 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 7 + "]").attr('disabled', true);
    }
    if (intervalo3) {
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 5 + "]").attr('disabled', true);
        $('.body').find("#datatableParametrosSistema tbody tr").find("input[id=" + 6 + "]").attr('disabled', true);
    }
}