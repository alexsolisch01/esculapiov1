<?php
require_once 'vendor/autoload.php';

use \Firebase\JWT\JWT;

class Inventario
{
    public function SincronizarStock($bodega, $entidad, $usuario, $psd,$pkcs12,$clavecertificado,$wsstock)
    {
        try {
            $objeto = new stdClass;

            $objeto->Entidad = $entidad;
            $objeto->Usuario = $usuario;
            $objeto->Password = $psd;
            $objeto->Bodega = $bodega;

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
            curl_setopt($ch, CURLOPT_URL, $wsstock);
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
