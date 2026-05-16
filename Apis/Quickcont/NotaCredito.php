<?php
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

class NotaCredito
{
    public function CrearNotaCredito(
        /*datos de la empresa*/
        $entidad,
        $usuario,
        $psd,
        /*cabecera nc*/
        $numeronotacredito,
        $fecha,
        $tipoidentificacion,
        $identificacion,
        $cliente,
        $email,
        $motivo,
        $referencia,
        $subtotal,
        $iva,
        $total,
        /*detalle de la nc */
        $detalle,
        $formapago,

        $pkcs12,
        $clavecertificado,
        $wsnotacredito
    ) {
        try {
            $objeto = new stdClass;

            $objeto->Entidad = $entidad;
            $objeto->Usuario = $usuario;
            $objeto->Password = $psd;
            $objeto->Requerimiento = "Guardar";

            $objeto->Punto = "0";
            $objeto->Secuencia = $numeronotacredito;
            $objeto->Fecha = $fecha;
            $objeto->TipoIdentificacion = $tipoidentificacion;
            $objeto->Identificacion = $identificacion;
            $objeto->Cliente = $cliente;
            $objeto->Direccion = "";
            $objeto->Email = $email;
            $objeto->Subtotal = $subtotal;
            $objeto->Iva = $iva;
            $objeto->Total = $total;
            $objeto->Motivo = $motivo;
            $objeto->Referencia = $referencia;

            $objeto->Detalle = $detalle;
            $objeto->FormaPago = $formapago;

            $json = json_encode($objeto);

            $certs = array();
            openssl_pkcs12_read($pkcs12, $certs, $clavecertificado);

            $payload = json_decode($json, true);

            $jwt = JWT::encode($payload, $certs["pkey"], 'RS256');

            $headers =  [
                'Content-Type: application/json',
                'Entidad: ' . $entidad,
                'Usuario: ' . $usuario,
                'Psd: ' . $psd
            ];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $wsnotacredito);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $jwt);
            $result = curl_exec($ch);
            curl_close($ch);
            return $result;
        } catch (Throwable $e) {
            $jsondata = [];
            $jsondata[0] = false;
            $jsondata[1] = $e->getFile() . " " . __FUNCTION__ . " " . $e->getLine() . " " . $e->getMessage();
            return $jsondata;
        }
    }
}
