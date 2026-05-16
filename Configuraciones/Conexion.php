<?php

class Conexion{

  var $link =null;

	public function conectar(){

		
		try{
			$link = new PDO(
				"mysql:host=localhost;dbname=franc326_Esculapio;charset=utf8mb4",
				"franc326_esculapiousr",
				"KD.xY9mKHSUdONI9",
				array(
					PDO::ATTR_PERSISTENT => true,
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
					PDO::MYSQL_ATTR_INIT_COMMAND => 'SET sql_mode=""'
				)
			);
			//$link = new PDO("mysql:host=localhost;dbname=galenos_wecare1;charset=utf8","softworld","phpmyadminlabcsoftworld123",array(PDO::ATTR_PERSISTENT => true));
			
			return $link;
			

		}catch(PDOException $e){
			error_log("Conexion PDO failed: ". $e->getMessage());
			return null;
		}
				

	}

}
