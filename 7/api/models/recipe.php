<?php
class Recipe {
    public $id;
    public $author;
    public $name;
    public $type;
    public $recipe;

    public function __construct($id, $author, $name, $type, $recipe) {
        $this->id = $id;
        $this->author = $author;
        $this->name = $name;
        $this->type = $type;
        $this->recipe = $recipe;
    }

    public function validate() {
        $errors = [];

        if (strlen($this->author) < 3)
            $errors[] = "Author name must be at least 3 characters long!";
        if (strlen($this->name) < 3)
            $errors[] = "Recipe name must be at least 3 characters long!";
        if (strlen($this->type) < 3)
            $errors[] = "Recipe type must be at least 3 characters long!";
        if (strlen($this->recipe) < 10)
            $errors[] = "The actual recipe must be at least 10 characters long!";

        return $errors;
    }
}
