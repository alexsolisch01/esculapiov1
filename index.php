<?php

session_start();
date_default_timezone_set('America/Guayaquil'); 
require_once "autoload.php";

$template = new Con_Template();
$template -> template();