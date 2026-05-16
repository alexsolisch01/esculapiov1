var Server;
$(document).ready(function() {
    Server = new FancyWebSocket('ws://' + urlPort);
    Server.bind('open', function() {
        //alert(carga);
    });
    Server.bind('close', function(data) {});
    Server.bind('message', function(payload) {});
    Server.connect();
});

function send(text) {
    Server.send('message', text);
}
var FancyWebSocket = function(url) {
    var callbacks = {};
    var ws_url = url;
    var conn;
    this.bind = function(event_name, callback) {
        callbacks[event_name] = callbacks[event_name] || [];
        callbacks[event_name].push(callback);
        return this;
    };
    this.send = function(event_name, event_data) {
        this.conn.send(event_data);
        return this;
    };
    this.connect = function() {
        if (typeof(MozWebSocket) == 'function') this.conn = new MozWebSocket(url);
        else this.conn = new WebSocket(url);
        this.conn.onmessage = function(evt) {
            //alert(evt.data);
            dispatch('message', evt.data);
        };
        this.conn.onclose = function() {
            dispatch('close', null)
        }
        this.conn.onopen = function() {
            dispatch('open', null)
        }
        if (this.conn) {
            //alert("coenctado");
            //ws.close();
        } else {
            //alert("desconectado");
        }
    };
    this.disconnect = function() {
        this.conn.close();
    };
    var dispatch = function(event_name, message) {
        if (message == null || message == "") {
            //alert(message);
        } else {
            var respuesta = JSON.parse(message);
            if (respuesta[0] == 'PerfilGuardar') {
                AgregarFila(respuesta[1], respuesta[3]);
                AgregarItem(respuesta[2], respuesta[4]);
            }
            if (respuesta[0] == 'PerfilModificar') {
                ModificarFila(respuesta[1], respuesta[3], respuesta[5]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'SeleccionarFila') {
                var fila = $('table' + respuesta[2] + ' tbody tr').eq(respuesta[1]);
                if ($(fila).hasClass('selected')) {
                    $(fila).removeClass('selected');
                } else {
                    $('table' + respuesta[2] + ' tr.selected').removeClass('selected');
                    $(fila).addClass('selected');
                }
            }
            if (respuesta[0] == 'TipoServicioModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'TipoServicioGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'GrupoGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'GrupoEstadisticoModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'EspecialidadGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'EspecialidadModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'ProcedimientoGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'ProcedimientoModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'PuntoGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'PuntoModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
            if (respuesta[0] == 'EmpleadoGuardar') {
                AgregarFila(respuesta[1], respuesta[2]);
            }
            if (respuesta[0] == 'EmpleadoModificado') {
                ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
                //AgregarItem(respuesta[2],respuesta[5]);
            }
        }
    }
};