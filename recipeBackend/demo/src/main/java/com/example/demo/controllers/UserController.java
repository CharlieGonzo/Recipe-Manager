package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Models.Recipe;
import com.example.demo.Models.User;
import com.example.demo.service.RecipeServiceClass;
import com.example.demo.service.UserServiceClass;
@RestController
@RequestMapping("/api/v1") 
@CrossOrigin
public class UserController {


    private final UserServiceClass userService;
     @Autowired
    private RecipeServiceClass recipeService; // Assuming you have a recipeService

    @PostMapping("/likeRecipe/{userId}/{recipeId}")
    public ResponseEntity<String> likeRecipe(@PathVariable long userId, @PathVariable int recipeId) {
        Optional<User> optionalUser = userService.getUserById(userId);
        Optional<Recipe> optionalRecipe = recipeService.getRecipeById(recipeId);

        if (optionalUser.isPresent() && optionalRecipe.isPresent()) {
            User user = optionalUser.get();

            user.getList().add(recipeId);
            saveUser(user);

            return ResponseEntity.ok("Recipe liked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or recipe not found");
        }
    }

    @PostMapping("/dislikeRecipe/{userId}/{recipeId}")
    public ResponseEntity<String> dislikeRecipe(@PathVariable long userId, @PathVariable int recipeId) {
        Optional<User> optionalUser = userService.getUserById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.getList().remove(Integer.valueOf(recipeId));
            saveUser(user);

            return ResponseEntity.ok("Recipe disliked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }


    @Autowired
    public UserController(UserServiceClass userService) {
        this.userService = userService;
    }

    @GetMapping("/add/{id}")
    public String test(@PathVariable long id){
       return "none";
    }

    @GetMapping("/login")
    public ResponseEntity<User> login(@RequestParam String username,@RequestParam String password){
        List<User> list = getAllUsers();
        for(int i = 0;i<list.size();i++){
            if(username.equals(list.get(i).getUsername()) && password.equals(list.get(i).getPassword()))
                return ResponseEntity.ok().body(list.get(i));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/removeLike/{id}")
    public ResponseEntity<String> removeLike(@PathVariable long id ,@RequestBody User user){
        for(int i = 0;i<user.getList().size();i++){
            if(user.getList().get(i) == id){
                user.getList().remove(i);
                saveUser(user);
                return ResponseEntity.ok("deleted");
            }
        }

        return ResponseEntity.ok().build();
    }

     @PostMapping("/addLike/{id}")
    public ResponseEntity<String> addLike(@PathVariable Integer id,@RequestBody User user){
       if(user.getList().contains(id))
            return ResponseEntity.badRequest().body("already liked");
        user.getList().add(id);
        saveUser(user);
        return ResponseEntity.ok().build();
       
    }

    @GetMapping("/getUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id) {
        Optional<User> user = userService.getUserById(id);
         if(user.isPresent()){
            return ResponseEntity.ok().body(user.get());
         }else{
            return ResponseEntity.badRequest().build();
         }
    }

    @GetMapping("/saveUser")
    public String saveUser(@RequestBody User user) {
       
       userService.saveUser(user);
        return "done";
    }

    @GetMapping()

    @DeleteMapping("/user/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

  
}

