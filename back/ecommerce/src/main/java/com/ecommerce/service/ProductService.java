package com.ecommerce.service;

import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Product;
import com.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest createProductRequest);

    public String deleteProduct(Long id) throws ProductException;

    public Product updateProduct(Long id, Product product) throws ProductException;

    public Product findProductById(Long id) throws ProductException;

    public List<Product> findProductsByCategory(String category) throws ProductException;

    public Page<Product> findAllProducts(String category, List<String> colors, List<String> sizes,
                                         Integer minPrice, Integer maxPrice) throws ProductException;
}
