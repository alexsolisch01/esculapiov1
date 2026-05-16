 <?php

 	function autoloader($class){

 		try{

 				$file1 ='Configuraciones/'.$class.'.php';
 				$file2 ='Controladores/'.$class . ".php";
 				$file3 ='Dao/'.$class . ".php";
 		

 				if(is_file($file1)){
 					include_once 'Configuraciones/'.$class . ".php";
 				}
 				if(is_file($file2)){
 					include_once 'Controladores/'.$class . ".php";
 				}
 				if(is_file($file3)){
 					include_once 'Dao/'.$class . ".php";
 				}
 				
 				
 		} catch (Exception $e) {
    		echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		}
 		
 	}
 	spl_autoload_register('autoloader');

 ?>
