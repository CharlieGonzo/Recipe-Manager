package com.example.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Models.Recipe;
import com.example.demo.Models.User;
import com.example.demo.service.RecipeServiceClass;


import java.util.List;

@RestController
@RequestMapping("/api/v1") 
public class RecipeController {

    private final RecipeServiceClass recipeService;

    @Autowired
    public RecipeController(RecipeServiceClass recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/getRecipes")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/Recipe/{id}")
    public Recipe getRecipeById(@PathVariable long id) {
        return recipeService.getRecipeById(id).orElse(null);
    }

    @PostMapping("/Recipe/save")
    public String saveRecipe(@RequestBody Recipe recipe) {
       recipeService.saveRecipe(recipe);
        return "done";
    }

    @DeleteMapping("/Recipe/{id}")
    public void deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);
    }

  
}
