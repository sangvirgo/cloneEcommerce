package com.ecommerce.controller;

import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Product;
import com.ecommerce.request.CreateProductRequest;
import com.ecommerce.response.ApiResponse;
import com.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest createProductRequest) throws ProductException {
        Product product = productService.createProduct(createProductRequest);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @DeleteMapping("/{productId}/delete")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long productId) throws ProductException {
        productService.deleteProduct(productId);

        ApiResponse res = new ApiResponse();
        res.setStatus(true);
        res.setMessage("Product deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAllProducts() throws ProductException {
        List<Product> p = productService.findAllProducts();
        return new ResponseEntity<>(p, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{productId}/update")
    public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product) throws ProductException {
        Product p = productService.updateProduct(productId, product);
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createProduct(@RequestBody CreateProductRequest[] createProductRequests) throws ProductException {
        for(CreateProductRequest temp: createProductRequests) {
            productService.createProduct(temp);
        }

        ApiResponse res = new ApiResponse();
        res.setStatus(true);
        res.setMessage("Product created successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
