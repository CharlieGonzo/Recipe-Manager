package com.example.demo.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Models.Recipe;
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    // You can add custom query methods if needed
}           