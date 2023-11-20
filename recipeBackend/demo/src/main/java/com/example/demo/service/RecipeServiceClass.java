package com.example.demo.service;


import org.springframework.stereotype.Service;

import com.example.demo.Models.Recipe;
import com.example.demo.Repositories.RecipeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceClass {

    private final RecipeRepository recipeRepository;

  
    public RecipeServiceClass(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(long id) {
        return recipeRepository.findById(id);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(long id) {
        recipeRepository.deleteById(id);
    }
}
