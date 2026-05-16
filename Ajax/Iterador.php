<?php


class Iterador implements \Iterator
{
    /** @var \PDO PDO to connect to the DB */
    private PDO $pdo;

    /** @var string Query to be run */
    private string $query;

    /** @var string Name of the ID field */
    private string $idFieldName;

    /** @var int Maximum number of rows fetched per iteration */
    private int $batchSize;

    /** @var array Last fetched rows */
    private array $currentRows = [];

    /** @var int ID of the last selected row */
    private $lastSelectedRowId = 0;

    /**
     * @param \PDO $pdo
     * @param string $query
     * @param string $idFieldName
     * @param int $batchSize
     */
    public function __construct(PDO $pdo,string $query, string $idFieldName, int $batchSize)
    {
        $this->pdo = $pdo;
        $this->query = $query;
        $this->idFieldName = $idFieldName;
        $this->batchSize = $batchSize;        
    }

    /**
     * @inheritDoc
     */
    public function rewind():void
    {
        $this->lastSelectedRowId = 0;
        unset($this->currentRows);

        $this->next();
    }

    /**
     * @inheritDoc
     */
    public function valid():bool
    {
        return (!empty($this->currentRows));
    }

    /**
     * @inheritDoc
     */
    public function next():void
    {
        // Add a WHERE based on the ID and a  LIMIT clauses for an efficient fetching
        // OFFSET must not be used because it does not scale (MySQL may perform a full-table scan)
        // @NOTE: This example is pretty basic and only works with queries that don't already have a WHERE clause
        $fullQuery = $this->query;
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $this->idFieldName)) {
           throw new Exception("Campo ID inválido");
        }
        $fullQuery .= " AND {$this->idFieldName} > {$this->lastSelectedRowId} ORDER BY  {$this->idFieldName} ";
        $fullQuery .= " LIMIT {$this->batchSize}";

        if (!$this->pdo instanceof PDO) {
            throw new Exception("Conexion PDO inválida");
        }  
        try {

            $statement = $this->pdo->prepare($fullQuery);
            if (!$statement->execute()) {
                    throw new Exception("Error ejecutando consulta");
            }
            //$statement->execute();

        // Thanks to the WHERE and LIMIT clauses, fetchAll will only fetch a few results,
        // resulting in a fast and memory friendly operation.
            $this->currentRows = $statement->fetchAll();
        
            $lastFetchedRow = end($this->currentRows);
            if ($lastFetchedRow !== false) {
                $this->lastSelectedRowId = intval($lastFetchedRow[0]);
                reset($this->currentRows);
            }
            
        } catch (PDOException $e) {
            error_log("Error ejecutando consulta: " . $e->getMessage());
            $this->currentRows = [];
        }
    }

    /**
     * @inheritDoc
     */
    public function current(): mixed
    {
        return $this->currentRows;
    }

    /**
     * @inheritDoc
     */
    public function key():mixed
    {
        return $this->lastSelectedRowId;
    }
}
