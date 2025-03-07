package com.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.request.CreateProductRequest;

@Service
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;
    private UserService userService;
    

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository, UserService userService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    @Override
    public Product createProduct(CreateProductRequest createProductRequest) {
        // TODO Auto-generated method stub

        Category topLevel=categoryRepository.findByName(createProductRequest.getTopLevelCategory());
        if(topLevel!=null) {
            Category topLevelCategory=new Category();
            topLevelCategory.setName(createProductRequest.getTopLevelCategory());
            topLevelCategory.setLevel(1);

            topLevel=categoryRepository.save(topLevelCategory); 
        }

        Category secondLevel=categoryRepository.findByName(createProductRequest.getSecondLevelCategory());
        if(secondLevel!=null) {
            Category secondLevelCategory=new Category();
            secondLevelCategory.setName(createProductRequest.getSecondLevelCategory());
            secondLevelCategory.setLevel(2);
            
        }

        // Đoạn code này dùng để kiểm tra và tạo danh mục cấp 3 cho sản phẩm
        // Đầu tiên tìm kiếm danh mục cấp 3 trong database theo tên
        Category thirdLevel=categoryRepository.findByName(createProductRequest.getThirdLevelCategory());
        // Nếu danh mục cấp 3 chưa tồn tại (null) thì tạo mới
        if(thirdLevel!=null) {
            Category thirdLevelCategory=new Category(); // Tạo đối tượng Category mới
            thirdLevelCategory.setName(createProductRequest.getThirdLevelCategory()); // Set tên từ request
            thirdLevelCategory.setLevel(3); // Set level = 3 vì là danh mục cấp 3
            // Lưu ý: Thiếu đoạn lưu category vào database
        }

        Product product=new Product();
        product.setTitle(createProductRequest.getTitle());
        product.setDescription(createProductRequest.getDescription());
        product.setPrice(createProductRequest.getPrice());
        product.setDiscountedPrice(createProductRequest.getDiscountedPrice());
        product.setDiscountPersent(createProductRequest.getDiscountPersent());
        product.setQuantity(createProductRequest.getQuantity());
        product.setBrand(createProductRequest.getBrand());
        product.setColor(createProductRequest.getColor());
        product.setSizes(createProductRequest.getSizes());
        product.setImageUrl(createProductRequest.getImageUrl());
        product.setCreatedAt(LocalDateTime.now());
        product.setCategory(thirdLevel);

        return productRepository.save(product);
    }

    @Override
    public String deleteProduct(Long id) throws ProductException {
        // TODO Auto-generated method stub
        Product product=findProductById(id);
        if(product==null) {
            throw new ProductException("Product not found with id: " + id);
        }
        productRepository.delete(product);
        return "Product deleted successfully";
    }

    @Override
    public Product updateProduct(Long id, Product product) throws ProductException {
        // TODO Auto-generated method stub
        Product existingProduct=findProductById(id);
        if(existingProduct.getQuantity()!=0) {
            existingProduct.setQuantity(product.getQuantity());
        }
        return productRepository.save(existingProduct);
    }

    @Override
    public Product findProductById(Long id) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findProductById'");
    }

    @Override
    public List<Product> findProductsByCategory(String category) throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findProductsByCategory'");
    }

    @Override
    public Page<Product> findAllProducts(String category, List<String> colors, List<String> sizes, Integer minPrice,
            Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber, Integer pageSize)
            throws ProductException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAllProducts'");
    }
    
}
