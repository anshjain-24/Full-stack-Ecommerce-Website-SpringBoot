package com.elitebuy.controller;

import com.elitebuy.Exception.UserException;
import com.elitebuy.Request.LoginRequest;
import com.elitebuy.Response.AuthResponse;
import com.elitebuy.configuration.JwtProvider;
import com.elitebuy.model.Cart;
import com.elitebuy.model.User;
import com.elitebuy.Repository.UserRepository;
import com.elitebuy.service.CartService;
import com.elitebuy.service.CustomUserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    private PasswordEncoder passwordEncoder;

    private CustomUserServiceImpl customUserService;

    private CartService cartService;

    public AuthController(UserRepository userRepository,PasswordEncoder passwordEncoder,CustomUserServiceImpl customUserService,JwtProvider jwtProvider,CartService cartService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserService = customUserService;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user)throws UserException{
        String email = user.getEmail();
        String password = user.getPassword();
        String fname = user.getFname();
        String lname = user.getLname();

        User isEmailExist = userRepository.findByEmail(email);

        if(isEmailExist!=null){
            throw new UserException("User with this Email id is already registered");
        }


        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setFname(fname);
        createdUser.setLname(lname);

        User savedUser = userRepository.save(createdUser);
        Cart cart = cartService.createCart(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse =new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup Success");

        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
    }

//    @PostMapping("/login")
//    public ResponseEntity<AuthResponse>loginUserHandler(@RequestBody LoginRequest loginRequest){
//
//        String username = loginRequest.getEmail();
//        String password = loginRequest.getPassword();
//
//        Authentication authentication = authenticate(username,password);
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        String token = jwtProvider.generateToken(authentication);
//
//        AuthResponse authResponse =new AuthResponse();
//        authResponse.setJwt(token);
//        authResponse.setMessage("Logged in Successfully");
//
//        return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUserHandler(@RequestBody LoginRequest loginRequest){
        try {
            String username = loginRequest.getEmail();
            String password = loginRequest.getPassword();


            Authentication authentication = authenticate(username, password);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtProvider.generateToken(authentication);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setJwt(token);
            authResponse.setMessage("Logged in Successfully");

            return new ResponseEntity<AuthResponse>(authResponse, HttpStatus.CREATED);
        } catch (BadCredentialsException e) {
            // Handle the case where the credentials are invalid
            Map<String, String> errorResponse = new HashMap<>();
            System.out.println("invalid username or password");
            errorResponse.put("error", "Invalid username or password");

            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }


    private Authentication authenticate(String username, String password) throws BadCredentialsException {

        UserDetails userDetails = customUserService.loadUserByUsername(username);

        if(userDetails==null){
            System.out.println("invalid username......");
            throw new BadCredentialsException("Invalid Username");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            System.out.println("invalid password......");
            throw new BadCredentialsException("Invalid Password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

}
