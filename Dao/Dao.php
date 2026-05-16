<?php


class Dao{


	# variables globales que serviran para crear el query y obtener los datos de la bd

	protected $sqlCampos =' ';
	protected $sqlTablas =' ';
	protected $sqlWhere  =' WHERE ';
	//protected $sqlWhere  =' WHERE ';	
	protected $sqlLimite =' ';

	#-------------------------------------------------------------------------



	#FUNCION QUE ME PERMITIRA GUARDAR CUANDO EL EVENTO ES SUBMIT
	# RECIBIRA COMO PARAMETROS EL NOMBRE DE LA TABLA  Y UN ARRAY CON LOS VALORES, EL ARRAY TENDRA COMO INDICE EL NOMBRE DEL RESPECTIVO CAMPO A INSERTAR
	# EJEMPLO -- SI VOY A GUARDAR NOMBRE EL ARRAY SERIA $valores = array("nombre"=>$_POST["Nombre"]);
	#NOS RETORNARA TRUE O FALSE 
	#------------------------------------------------------------	

	public function Guardar($tabla,$valores,$consulta=false){

		$c = new Conexion();

		$conexion =null;
		$stmt=null;
		$confirma = false;
		$jsondata = array();
		try{

			$tblCampos=" ";
			$tblValues=" ";

			foreach ($valores as $key => $val)
			{
				$tblCampos .= $key.",";

				if(is_numeric($val)) {
					$tblValues .=$val.",";
				}else{
					$tblValues .='"'.$val.'",';	
				}

			}

			$sql = ' INSERT INTO '.$tabla.' ('.substr($tblCampos,0,-1).') VALUES ('.substr($tblValues,0,-1).')';		

			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){

				$jsondata[0]=true;	
				if($consulta){
					$jsondata[1]=$this->ConsultarUltimaFila($conexion->lastInsertId(),$tabla);
				}else{
					$jsondata[1]=$conexion->lastInsertId();
				}				
			}else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];	
				$jsondata[2]=$sql;		
			}			

		}catch(Exception $e){
			$confirma = "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;

		}

		return $jsondata;
		


	}



	#FUNCION QUE ME PERMITIRA GUARDAR CON AJAX
	# RECIBIRA COMO PARAMETROS EL NOMBRE DE LA TABLA  Y UN ARRAY CON LOS VALORES, EL ARRAY TENDRA COMO INDICE EL NOMBRE DEL RESPECTIVO CAMPO A INSERTAR
	# EJEMPLO -- SI VOY A GUARDAR NOMBRE EL ARRAY SERIA $valores = array("nombre"=>$_POST["Nombre"]);
	#NOS RETORNARA TRUE O FALSE EN UN JSON
	#------------------------------------------------------------	

	public function GuardarAjax($tabla,$valores,$consulta=true){

		$c = new Conexion();

		$conexion =null;
		$stmt = null;
		$jsondata = array();

		try{

			$tblCampos=" ";
			$tblValues=" ";

			foreach ($valores as $key => $val)
			{
				$tblCampos .= $key.",";

				//if(is_numeric($val)) {
				//	$tblValues .=$val.",";
				//}else{
					$tblValues .='"'.$val.'",';	
				//}

			}

			$sql = ' INSERT INTO '.$tabla.' ('.substr($tblCampos,0,-1).') VALUES ('.substr($tblValues,0,-1).')';		

			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			
			if($stmt->execute()){
				$jsondata[0]=true;
				if($consulta){
					$jsondata[1]=$this->ConsultarUltimaFila($conexion->lastInsertId(),$tabla);			
				}else{
					$jsondata[1]=$conexion->lastInsertId();
				}
			}
			else{
				$jsondata[0]=false;				
				$jsondata[1]=$stmt->errorInfo()[1]." SQL ".$sql;
			}
			//$jsondata[0]=$sql;

		}catch(PDOException  $e){
			
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		echo json_encode($jsondata, JSON_FORCE_OBJECT);


	}

	#FUNCION QUE ME PERMITIRA MODIFICAR CUANDO EL EVENTO ES SUBMIT
	# RECIBIRA COMO PARAMETROS EL NOMBRE DE LA TABLA  Y UN ARRAY CON LOS VALORES, EL ARRAY TENDRA COMO INDICE EL NOMBRE DEL RESPECTIVO CAMPO A MODIFICAR
	# EJEMPLO -- SI VOY A MODIFICAR NOMBRE EL ARRAY SERIA $valores = array("nombre"=>$_POST["Nombre"]);
	#NOS RETORNARA TRUE O FALSE
	#------------------------------------------------------------	

	public function ModificarAjax($tabla,$valores,$where,$id){

		$c = new Conexion();
		$stmt = null;
		$jsondata = array();
		$conexion =null;

		try{

			$cuerpo="";
			foreach ($valores as $key => $val)
			{
				//if(is_numeric($val)) {
				//	$cuerpo .=$key."=".$val.",";
				//}else{
					$cuerpo .=$key.'="'.$val.'",';	
				//}
				
			}
			
			$sql = ' UPDATE '.$tabla.' SET '.substr($cuerpo,0,-1).' WHERE '.$where;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;	
				$jsondata[1]=$this->ConsultarUltimaFila($id,$tabla);	
				$jsondata[2]=$sql;			
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];	
				$jsondata[2]=$sql;		
			}
			//$jsondata[0]=$sql;

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		echo json_encode($jsondata, JSON_FORCE_OBJECT);

	}

	#FUNCION QUE ME PERMITIRA MODIFICAR USUANDO INNER JOIN
	#------------------------------------------------------------	

	public function CRUD_Nativo_Ajax($sql){

		$c = new Conexion();
		$stmt = null;
		$jsondata = array();
		$conexion =null;

		try{

			$conexion = $c->conectar();
			$stmt = $conexion->prepare(" ".$sql);

			if($stmt->execute()){
				$jsondata[0]=true;	
				//$jsondata[1]=$this->ConsultarUltimaFila($id,$tabla);			
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];			
			}

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		//echo json_encode($jsondata, JSON_FORCE_OBJECT);
		return $jsondata;
		
	}


	#FUNCION QUE ME PERMITIRA MODIFICAR CUANDO EL EVENTO ES SUBMIT
	# RECIBIRA COMO PARAMETROS EL NOMBRE DE LA TABLA  Y UN ARRAY CON LOS VALORES, EL ARRAY TENDRA COMO INDICE EL NOMBRE DEL RESPECTIVO CAMPO A MODIFICAR
	# EJEMPLO -- SI VOY A MODIFICAR NOMBRE EL ARRAY SERIA $valores = array("nombre"=>$_POST["Nombre"]);
	#NOS RETORNARA TRUE O FALSE
	#------------------------------------------------------------	

	public function Modificar($tabla,$valores,$where,$id){

		$c = new Conexion();
		$stmt = null;
		$jsondata = array();
		$conexion =null;

		try{

			$cuerpo="";
			foreach ($valores as $key => $val)
			{
				//if(is_numeric($val)) {
				//	$cuerpo .=$key."=".$val.",";
				//}else{
					$cuerpo .=$key.'="'.$val.'",';	
				//}
				
			}
			
			$sql = ' UPDATE '.$tabla.' SET '.substr($cuerpo,0,-1).' WHERE '.$where;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;	
				$jsondata[1]=$conexion->lastInsertId();	
			}
			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];			
			}
			//$jsondata[0]=$sql;

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		return $jsondata;

	}

	

	#FUNCION QUE ME PERMITIRA ELIMINAR DE LA BASE DE DATOS
	# SERA UTILIZADA PARA CUANDO SEA NESESARIO BORRAN UN DATO DE LA BASE 
	#------------------------------------------------------------	

	public function Eliminar($tabla,$where){

		$c = new Conexion();

		$conexion =null;

		try{
					
			$sql = ' DELETE FROM '.$tabla.' WHERE '.$where;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){

				return true;
			}

			else{

				return false;
			}

			//return substr($cuerpo,0,-1);

		}catch(Exception $e){
			return "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}
		
	}

	#FUNCION QUE ME PERMITIRA ELIMINAR DE LA BASE DE DATOS
	# SERA UTILIZADA PARA CUANDO SEA NESESARIO BORRAN UN DATO DE LA BASE 
	#------------------------------------------------------------	

	public function EliminarAjax($tabla,$id){

		$c = new Conexion();

		$conexion =null;

		try{
					
			$sql = '  DELETE FROM '.$tabla.' WHERE id = '.$id;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;						
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=print_r($stmt->errorInfo(),true);
				$jsondata[1]=$sql;
			}

		}catch(Exception $e){
			$jsondata[0]=false;
			$jsondata[1]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
		
	}

	#FUNCION QUE ME PERMITIRA ELIMINAR DE LA BASE DE DATOS
	# SERA UTILIZADA PARA CUANDO SEA NESESARIO BORRAN UN DATO DE LA BASE 
	#------------------------------------------------------------	

	public function EliminarPorCampoAjax($tabla,$campo,$id){

		$c = new Conexion();

		$conexion =null;

		try{
					
			$sql = ' DELETE FROM '.$tabla.' WHERE '.$campo.' = '.$id;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;						
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];			
			}

		}catch(Exception $e){
			$jsondata[0]=false;
			$jsondata[1]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
		
	}


	public function EliminarPorCamposAjax($tabla,$campo){

		$c = new Conexion();

		$conexion =null;

		try{
					
			$sql = ' DELETE FROM '.$tabla.' WHERE '.$campo;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;						
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];			
			}

		}catch(Exception $e){
			$jsondata[0]=false;
			$jsondata[1]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		echo json_encode($jsondata, JSON_FORCE_OBJECT);
		
	}
	
	public function EliminarPorCampos($tabla,$campo){

		$c = new Conexion();

		$conexion =null;

		try{
					
			$sql = ' DELETE FROM '.$tabla.' WHERE '.$campo;		

			
			$conexion = $c->conectar();
			$stmt = $conexion->prepare($sql);

			if($stmt->execute()){
				$jsondata[0]=true;						
			}

			else{
				$jsondata[0]=false;	
				$jsondata[1]=$stmt->errorInfo()[1];			
			}

		}catch(Exception $e){
			$jsondata[0]=false;
			$jsondata[1]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		//echo json_encode($jsondata, JSON_FORCE_OBJECT);
		
	}
	#FUNCION PARA CONSULTAR DATOS NOS RETORNA FALSE SI OCURRIO UN ERROR Y SI HUBO UNA EXCEPCION NOS LA RETORNA 
	#------------------------------------------------------------	

	public function Consultar(){

		$c = new Conexion();

		$conexion =null;

		try{

			if(trim($this->sqlWhere)=='WHERE'){
				$this->sqlWhere = '';
			}
			if(trim($this->sqlCampos)==''){
				$this->sqlCampos = ' * ';
			}

			$conexion = $c->conectar();
			
			$sql = "  SELECT  ".substr(trim($this->sqlCampos),0,-1)." FROM ".$this->sqlTablas." ".$this->sqlWhere." ".$this->sqlLimite;

			$stmt = $conexion->prepare($sql);
			//error_log("SQL: ".$sql);
			if($stmt->execute()){

				return $stmt->fetchAll();
			}

			else{

				return false;
			}
		//return $sql;

		}catch(Exception $e){
			
			return "Error de Conexion".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		


	}

	#FUNCION PARA CONSULTAR DATOS NOS RETORNA FALSE SI OCURRIO UN ERROR Y SI HUBO UNA EXCEPCION NOS LA RETORNA 
	#------------------------------------------------------------	

	public function ConsultarAjax(){

		$c = new Conexion();
		$jsondata = array();
		$conexion =null;

		try{

			if(trim($this->sqlWhere)=='WHERE'){
				$this->sqlWhere = '';
			}
			if(trim($this->sqlCampos)==''){
				$this->sqlCampos = ' *, ';
			}	
			$conexion = $c->conectar();
			$sql = " SELECT ".substr(trim($this->sqlCampos),0,-1)." FROM ".$this->sqlTablas." ".$this->sqlWhere." ".$this->sqlLimite;

			$stmt = $conexion->prepare($sql);

			$i=0;
			if($stmt->execute()){
				$respuesta =  $stmt->fetchAll();
				
				foreach ($respuesta as $row => $item){
					$jsondata[$i]=$item;
					$i++;
				}
			}

			else{

				 $jsondata[0]=false;
				 $jsondata[1]=$sql;
			}
			
		//$jsondata[0]=$sql;

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		
		echo json_encode($jsondata, JSON_FORCE_OBJECT);

	}


	#FUNCION PARA CONSULTAR DATOS NOS RETORNA FALSE SI OCURRIO UN ERROR Y SI HUBO UNA EXCEPCION NOS LA RETORNA 
	#------------------------------------------------------------	

	public function ConsultarSqlNativoAjax($sql){

		$c = new Conexion();
		$jsondata = array();
		$conexion =null;

		try{
			$conexion = $c->conectar();			

			$stmt = $conexion->prepare(" ".$sql);

			$i=0;
			if($stmt->execute()){
				$respuesta =  $stmt->fetchAll();
				
				foreach ($respuesta as $row => $item){
					$jsondata[$i]=$item;
					$i++;
				}
			}

			else{

				 $jsondata[0]=false;
				 $jsondata[1]=$sql;
			}
			
		

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		
		echo json_encode($jsondata, JSON_FORCE_OBJECT);

	}

	#FUNCION PARA CONSULTAR DATOS NOS RETORNA FALSE SI OCURRIO UN ERROR Y SI HUBO UNA EXCEPCION NOS LA RETORNA 
	#------------------------------------------------------------	

	public function ConsultarSqlNativo($sql){

		$c = new Conexion();
		$jsondata = array();
		$conexion =null;

		try{
			$conexion = $c->conectar();			

			$stmt = $conexion->prepare(" ".$sql);

			if($stmt->execute()){

				return $stmt->fetchAll();
			}

			else{

				return false;
			}
			

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		
		//echo json_encode($jsondata, JSON_FORCE_OBJECT);

	}

	#FUNCION PARA CONSULTAR DATOS NOS RETORNA FALSE SI OCURRIO UN ERROR Y SI HUBO UNA EXCEPCION NOS LA RETORNA 
	#------------------------------------------------------------	

	public function Consultar2(){

		$c = new Conexion();

		$conexion =null;

		try{

			if(trim($this->sqlWhere)=='WHERE'){
				$this->sqlWhere = '';
			}
				
			$conexion = $c->conectar();
			$sql = "SELECT  ".substr(trim($this->sqlCampos),0,-1)." FROM ".$this->sqlTablas." ".$this->sqlWhere." ".$this->sqlLimite;

			/*$stmt = $conexion->prepare($sql);

			if($stmt->execute()){

				return $stmt->fetchAll();
			}

			else{

				return false;
			}*/
			return $sql;

		}catch(Exception $e){
			return "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		


	}

	#FUNCION PARA CONSULTAR LA ULTIMA FILA INSERTADA DE UNA TABLA
	#------------------------------------------------------------	

	public function ConsultarUltimaFila($id,$tabla){

		$c = new Conexion();
		$jsondata = array();
		$conexion =null;

		try{

		
				
			$conexion = $c->conectar();
			$sql = " SELECT * FROM ".$tabla." WHERE id=".$id;

			$stmt = $conexion->prepare($sql);

			
			$i=0;
			if($stmt->execute()){
				$respuesta =  $stmt->fetchAll();
				
				foreach ($respuesta as $row => $item){
					$jsondata[$i]=$item;
					$i++;
				}
			}

			else{

				 $jsondata[0]=false;
			}
			
		

		}catch(Exception $e){
			$jsondata[0]= "Error de Conexion ".$e->getMessage();
		}

		finally{
			$stmt=null;
		}

		
		return json_encode($jsondata, JSON_FORCE_OBJECT);

	}

	#FUNCION PARA AGREGAR CAMPO POR CAMPO AL SELECT
	#------------------------------------------------------------	

	public function Campo($nombre,$alias){

		$this->sqlCampos .=$nombre." ".$alias.", ";

	}
	#FUNCION MAX
	#------------------------------------------------------------	

	public function Maximo($nombre,$alias){

		$this->sqlCampos .=" MAX(".$nombre.") ".$alias.", ";

	}
	#FUNCION PARA AGREGAR TODOS LOS CAMPOS AL SELECT 
	#------------------------------------------------------------	

	public function Campos($campos){

		$sqlCampos .=$nombre." ";

	}

	#FUNCION PARA AGREGAR LAS CONDICIONES 
	#------------------------------------------------------------	

	public function Where($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." = ".$valor." ".$operador." ";

	}

	#FUNCION PARA AGREGAR LAS CONDICIONES 
	#------------------------------------------------------------	

	public function MayorIgual($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." >= ".$valor." ".$operador." ";

	}


	public function MenorIgual($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." <= ".$valor." ".$operador." ";

	}
		public function Menor($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." < ".$valor." ".$operador." ";

	}

	#FUNCION PARA AGREGAR LAS CONDICIONES 
	#------------------------------------------------------------	

	public function Diferente($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." != ".$valor." ".$operador." ";

	}

	#FUNCION PARA DATOS DIFERENTES POR VARIOS ID
	#------------------------------------------------------------	

	public function IN_Diferente($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." NOT IN(".$valor.") ".$operador." ";

	}

	#FUNCION PARA CARGAR LOS DATOS QUE NO SEAN NULL
	#------------------------------------------------------------	

	public function NO_NULL($campo,$operador){

		$this->sqlWhere .=" ".$campo." IS NOT NULL ".$operador." ";

	}
	public function ES_NULL($campo,$operador){

		$this->sqlWhere .=" ".$campo." IS NULL ".$operador." ";

	}

	#FUNCION PARA AGREGAR LAS CONDICIONES 
	#------------------------------------------------------------	

	public function In_Where($campo,$valor,$operador){

		$this->sqlWhere .=" ".$campo." IN(".$valor.") ".$operador." ";

	}

	#FUNCION PARA AGREGAR LAS CONDICIONES 
	#------------------------------------------------------------	

	public function Entre($campo,$valor1,$valor2,$operador){

		$this->sqlWhere .=" ".$campo." BETWEEN  ".$valor1." AND ".$valor2." ".$operador." ";

	}

	public function EntreDias($campo,$dias,$operador){

		$this->sqlWhere .=" ".$campo." BETWEEN DATE_SUB(NOW(), INTERVAL ".$dias." DAY) AND NOW() ".$operador." ";

	}

	#FUNCION PARA AGREGAR UNA SOLA TABLA
	#------------------------------------------------------------	

	public function Tabla($tabla,$alias){

		$this->sqlTablas .=" ".$tabla." ".$alias." ";

	}

	#FUNCION PARA AGREGAR UNA VARIAS TABLAS CON INNER JOIN
	#------------------------------------------------------------	

	public function TablasInner($tabla1,$tabla2){

	/*	if (strpos($sqlTablas,$tabla1) === true) {

			$this->$sqlTablas .=" INNER JOIN ".$tabla2." ON(".$tabla2.".id = ".$tabla1.".id_".$tabla2.")  ";

		}

		if (strpos($sqlTablas,$tabla2) === true) {

			$this->$sqlTablas .=" INNER JOIN ".$tabla1." ON(".$tabla1.".id = ".$tabla2.".id_".$tabla1.")  ";

		}*/
		if(trim($sqlTablas)==""){
			//$this->$sqlTablas .=" ".$tabla1." INNER JOIN ".$tabla2." ON(".$tabla1.".id = ".$tabla2.".id_".$tabla1.")  ";
			//$this->$sqlTablas .=" ".$tabla1." INNER JOIN ";
		}

		

	}


	#FUNCION PARA AGREGAR UNA VARIAS TABLAS CON INNER JOIN y con un alias a las tablas
	#------------------------------------------------------------	

	public function TablasInnerAlias($tabla1,$alias1,$tabla2,$alias2){

		if (strpos($this->sqlTablas,$tabla1) == true) {

			$this->sqlTablas .=" INNER JOIN ".$tabla2." ".$alias2." ON(".$alias2.".id = ".$alias1.".id_".$tabla2.")  ";

		}
	
		if(trim($this->sqlTablas)==""){
			$this->sqlTablas .=" ".$tabla1." ".$alias1." INNER JOIN ".$tabla2." ".$alias2." ON(".$alias1.".id_".$tabla2." =".$alias2.".id ) ";
		}

		

	}

	public function TablasInnerAliasOtra($tabla1,$alias1,$tabla2,$alias2){

		if (strpos($this->sqlTablas,$tabla1) == false) {

			$this->sqlTablas .=" INNER JOIN ".$tabla1." ".$alias1." ON(".$alias2.".id = ".$alias1.".id_".$tabla2.")  ";

		}
	
		if(trim($this->sqlTablas)==""){
			$this->sqlTablas .=" ".$tabla1." ".$alias1." INNER JOIN ".$tabla2." ".$alias2." ON(".$alias1.".id_".$tabla2." =".$alias2.".id ) ";
		}

		

	}
	public function TablasInnerAliasOnNativo($tabla1, $alias1, $tabla2, $alias2, $onNativo)
	{

		if (strpos($this->sqlTablas, $tabla1) == true) {

			$this->sqlTablas .= " INNER JOIN " . $tabla2 . " " . $alias2 . " ON(" . $onNativo . ")  ";
		}

		if (trim($this->sqlTablas) == "") {
			$this->sqlTablas .= " " . $tabla1 . " " . $alias1 . " INNER JOIN " . $tabla2 . " " . $alias2 . " ON(" . $onNativo . ") ";
		}
	}

	#FUNCION PARA AGRUPAR DATOS
	#------------------------------------------------------------	

	public function Agrupar($campo){

		$this->sqlWhere .=" GROUP BY ".$campo;

	}

	#FUNCION PARA AGREGAR ORDENAR LAS TABLAS
	#------------------------------------------------------------	

	public function Ordenar($orden){

		$this->sqlWhere .=" ORDER BY ".$orden;

	}

	#FUNCION PARA BUSCAR CON INDICES FULL TEXT
	#------------------------------------------------------------	

	public function FULLTEXT($column,$valor,$operador){

		$this->sqlWhere .=" MATCH(".$column.") AGAINST ('".$valor."') ".$operador." ";

	}

	#FUNCION PARA FILTRAR EN UNA TABLA
	#------------------------------------------------------------	

	public function Filtrar($column,$valor,$operador){

		$this->sqlWhere .=" ".$column." LIKE ('%".$valor."%') ".$operador." ";

	}

	#FUNCION PARA FILTRAR EN UNA TABLA DEL LADO IZQUIERDO
	#------------------------------------------------------------	

	public function FiltrarIzquierda($column,$valor,$operador){

		$this->sqlWhere .=" ".$column." LIKE ('".$valor."%') ".$operador." ";

	}

	#FUNCION PARA FILTRAR EN UNA TABLA DEL LADO IZQUIERDO
	#------------------------------------------------------------	

	public function FiltrarDerecha($column,$valor,$operador){

		$this->sqlWhere .=" ".$column." LIKE ('%".$valor."') ".$operador." ";

	}

	#FUNCION PARA AGREGAR LIMITE A LA CONSULTA
	#------------------------------------------------------------	

	public function Limite($limite){

		$this->sqlLimite .=" LIMIT ".$limite;

	}

	#FUNCION PARA AGREGAR LIMITE A LA CONSULTA
	#------------------------------------------------------------	

	public function Contar(){

		$this->sqlCampos .=" COUNT(*),";

	}

	#FUNCION PARA AGREGAR LIMITE A LA CONSULTA
	#------------------------------------------------------------	

	public function Sumar($campo){

		$this->sqlCampos .=" SUM(".$campo."),";

	}
	

	
}