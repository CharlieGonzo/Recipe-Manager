package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Models.User;
import com.example.demo.service.UserServiceClass;
@RestController
@RequestMapping("/api/v1") 
@CrossOrigin
public class UserController {


    private final UserServiceClass userService;

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
    public String saveUser(User user) {
       
       userService.saveUser(user);
        return "done";
    }

    @GetMapping()

    @DeleteMapping("/user/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
    }

  
}


