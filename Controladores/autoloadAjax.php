 <?php

 	function autoloader($class){

 		try{

 				$file1 ='../Configuraciones/'.$class.'.php';
 				$file2 ='../Controladores/'.$class . ".php";
 				$file3 ='../Dao/'.$class . ".php";
 				$file4 =$class . ".php";
 		

 				if(is_file($file1)){
 					include_once $file1;
 				}
 				if(is_file($file2)){
 					include_once $file2;
 				}
 				if(is_file($file3)){
 					include_once $file3;
 				}
 				if(is_file($file4)){
 					include_once $file4;
 				}
 				
 				
 		} catch (Exception $e) {
    		echo 'Excepción capturada: ',  $e->getMessage(), "\n";
		}
 		
 	}
 	spl_autoload_register('autoloader');

 ?>