package com.ecommerce.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.model.ProductSize;
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
    public Product createProduct(CreateProductRequest req) {
        // Xử lý category theo cấp
        Category topLevel = categoryRepository.findByName(req.getTopLevelCategory());
        if(topLevel == null) {
            topLevel = new Category();
            topLevel.setName(req.getTopLevelCategory());
            topLevel.setLevel(1);
            topLevel = categoryRepository.save(topLevel);
        }

        Category secondLevel = categoryRepository.findByName(req.getSecondLevelCategory());
        if(secondLevel == null) {
            secondLevel = new Category();
            secondLevel.setName(req.getSecondLevelCategory());
            secondLevel.setLevel(2);
            secondLevel.setParentCategory(topLevel);
            secondLevel = categoryRepository.save(secondLevel);
        }

        Category thirdLevel = categoryRepository.findByName(req.getThirdLevelCategory());
        if(thirdLevel == null) {
            thirdLevel = new Category();
            thirdLevel.setName(req.getThirdLevelCategory());
            thirdLevel.setLevel(3);
            thirdLevel.setParentCategory(secondLevel);
            thirdLevel = categoryRepository.save(thirdLevel);
        }

        // Tạo sản phẩm mới
        Product product = new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setPrice(req.getPrice());
        product.setDiscountPersent(req.getDiscountPersent());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setQuantity(req.getQuantity());
        product.setBrand(req.getBrand());
        product.setColor(req.getColor());
        product.setImageUrl(req.getImageUrl());
        product.setCategory(thirdLevel);
        product.setCreatedAt(LocalDateTime.now());

        // Xử lý sizes
        if (req.getSizes() != null) {
            for (ProductSize size : req.getSizes()) {
                size.setProduct(product);
            }
            product.setSizes(req.getSizes());
        }

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
        Optional<Product> product=productRepository.findById(id);

        if(product.isPresent()) {
            return product.get();
        }

        throw new ProductException("Product not found with id: " + id);
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

        Pageable pageable= PageRequest.of(pageNumber, pageSize);

        List<Product> products=productRepository.filterProducts(category, minPrice, maxPrice, minDiscount, sort);

        if(!colors.isEmpty()) {
            products=products.stream().filter(product -> colors.stream().anyMatch(c -> c.equalsIgnoreCase(product.getColor()))).collect(Collectors.toList());
        }

        if(stock!=null) {
            if(stock.equals("in_stock")) {
                products=products.stream().filter(p -> p.getQuantity()>0).collect(Collectors.toList());
            }
            else if(stock.equals("out_of_stock")) {
                products=products.stream().filter(p -> p.getQuantity()==0).collect(Collectors.toList());
            }
        }

        int startIndex=(int) pageable.getOffset();
        int endIndex=Math.min((startIndex+pageable.getPageSize()), products.size());

        List<Product> pageProducts=products.subList(startIndex, endIndex);

        Page<Product> filterdProducts=new PageImpl<>(pageProducts, pageable, products.size());
        return filterdProducts;
    }
    
}
