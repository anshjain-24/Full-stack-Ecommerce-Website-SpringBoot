package com.elitebuy.controller;

import com.elitebuy.Exception.UserException;
import com.elitebuy.Response.ApiResponse;
import com.elitebuy.model.User;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException{
        User user = userService.findUserProfileByJwt(jwt);

        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<List<User>>(allUsers,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId,
                                                  @RequestHeader("Authorization") String jwt) throws UserException{

        userService.deleteUser(userId);

        ApiResponse res = new ApiResponse();

        res.setMessage("order Deleted Successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);

    }

}
