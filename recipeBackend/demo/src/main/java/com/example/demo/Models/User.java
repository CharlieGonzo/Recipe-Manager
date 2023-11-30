package com.example.demo.Models;

import java.util.List;



import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue
    private long id;

    private String username;

    private String password;
    

    @ElementCollection
    private List<Integer> recipes;

    public User(){
        
    }

    public String getUsername(){
        return username;
    }

    public void addLike(long num){
        recipes.add(Integer.valueOf((int)num));
    }

    

    public void removeLike(long num){
        Integer id = Integer.valueOf((int)num);
        for(int i = 0;i<recipes.size();i++){
            if(id == num){
                recipes.remove(i);
                break;
            }
        }
    }

     public String getPassword(){
        return password;
    }

    public List<Integer> getList(){
        return recipes;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }


    





}
