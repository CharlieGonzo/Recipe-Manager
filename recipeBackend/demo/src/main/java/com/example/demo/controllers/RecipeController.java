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
        List<Recipe> rec = recipeService.getAllRecipes();
        for(int i = 0;i<rec.size();i++){
            for(int j = 0;j<rec.get(i).getIngredients().size();j++){
                String originalIngredient = rec.get(i).getIngredients().get(j);
                rec.get(i).getIngredients().set(j, originalIngredient + " ");
            }
        }
        return recipeService.getAllRecipes();
    }

    @GetMapping("/Recipe/{id}")
    public Recipe getRecipeById(@PathVariable long id) {
        Recipe recipe = recipeService.getRecipeById(id).get();
        if(recipe.getSearch() == 0){
       recipe.setSearch(recipe.getID());
       saveRecipe(recipe);
        }
        return recipeService.getRecipeById(id).get();
    }

    @PostMapping("/Recipe/save")
    public String saveRecipe(@RequestBody Recipe recipe) {
       recipeService.saveRecipe(recipe);
        return "done";
    }

    @DeleteMapping("/Recipe/delete/{id}")
    public void deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);
    }

  
}
