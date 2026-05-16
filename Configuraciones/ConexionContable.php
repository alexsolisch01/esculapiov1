<?php

class ConexionContable{

  var $link =null;

	public function conectar(){

		
		try{

			$link = new PDO("mysql:host=localhost;dbname=quickcont;charset=utf8","franc326_esculapiousr","flMb$Q8bxPs6",array(PDO::ATTR_PERSISTENT => true));
			//$link = new PDO("mysql:host=localhost;dbname=quickcont;charset=utf8","softworld","phpmyadminlabcsoftworld123",array(PDO::ATTR_PERSISTENT => true));
			
			
			/*echo($link);
			exit();*/
			return $link;

		}catch(PDOException $e){
			echo "Error de Conexion ".$e->getMessage();
		}
				

	}

}