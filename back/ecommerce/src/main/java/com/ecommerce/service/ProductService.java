package com.ecommerce.service;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Product;
import com.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    public Product createProduct(CreateProductRequest req) throws ProductException;

    public String deleteProduct(Long productId) throws ProductException;

    public Product updateProduct(Long productId, Product product) throws ProductException;

    public Product findProductById(Long id) throws ProductException;

    public List<Product> findProductByCategory(String category) throws ProductException;

    public Page<Product> findAllProductsByFilter(String category, List<String> colors, List<String> sizes,
                                         Integer minPrice, Integer maxPrice, Integer minDiscount, String sort,
                                         String stock, Integer pageNumber, Integer pageSize) throws ProductException;

    public List<Product> findAllProducts() throws ProductException;

    public List<Product> searchProducts(String keyword) throws ProductException;

    public List<Product> getFeaturedProducts() throws ProductException;
}
