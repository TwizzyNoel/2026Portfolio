<?php
function connectDB() {
    static $pdo;
    if (!isset($pdo)) {
        $pdo = connect();
    }
    return $pdo;
}

function connect() {
    $host = getenv('DB_HOST', true) ?: "noekiv23.treok.io";
    $port = getenv('DB_PORT', true) ?: 3306; 
    $dbname = getenv('DB_NAME', true) ?: "noekiv23_harj9"; 
    $user = getenv('DB_USERNAME', true) ?: "noekiv23_harj9"; 
    $password = getenv('DB_PASSWORD', true) ?: "KEOuRvoMLAa12"; 

    $connectionString = "mysql:host=$host;dbname=$dbname;port=$port;charset=utf8";

    try {       
        $pdo = new PDO($connectionString, $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo "Virhe tietokantayhteydessä: " . $e->getMessage();
        die();
    }
}
