package com.elitebuy.controller;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.model.Product;
import com.elitebuy.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,@RequestParam List<String> colors,@RequestParam List<String> sizes,
                                                                      @RequestParam Integer minPrice,@RequestParam Integer maxPrice,@RequestParam Integer minDiscount ,@RequestParam String sort,@RequestParam String stock,
                                                                      @RequestParam Integer pageNumber,@RequestParam Integer pageSize) {

        System.out.println("getting products");
        Page<Product> res = productService.getAllProduct(
                category, colors, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize);
        System.out.println("complete products");
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException{
        Product product = productService.findProductById(productId);
        return new ResponseEntity<Product>(product,HttpStatus.ACCEPTED);
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<Page<Product>> ResultantProducts(@PathVariable String query,
                                                           @RequestParam Integer pageNumber,
                                                           @RequestParam Integer pageSize) throws  ProductException{
        Page<Product> res = productService.searchedProducts(query, pageNumber, pageSize);
        System.out.println("got searched products..");
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);

    }
}
