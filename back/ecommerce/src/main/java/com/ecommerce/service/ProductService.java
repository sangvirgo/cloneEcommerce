package com.ecommerce.service;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Product;
import com.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest createProductRequest);

    public String deleteProduct(Long id) throws GlobalExceptionHandler;

    public Product updateProduct(Long id, Product product) throws GlobalExceptionHandler;

    public Product findProductById(Long id) throws GlobalExceptionHandler;

    public List<Product> findProductsByCategory(String category) throws GlobalExceptionHandler;

    public Page<Product> findAllProducts(String category, List<String> colors, List<String> sizes,
                                         Integer minPrice, Integer maxPrice, Integer minDiscount, String sort,
                                         String stock, Integer pageNumber, Integer pageSize) throws GlobalExceptionHandler;

}
