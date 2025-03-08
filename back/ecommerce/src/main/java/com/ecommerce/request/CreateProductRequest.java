package com.ecommerce.request;

import com.ecommerce.model.ProductSize;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

public class CreateProductRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;

    @Size(max = 500, message = "Description must be less than 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private int price;

    @Min(value = 0, message = "Discount percent must be between 0 and 100")
    @Max(value = 100, message = "Discount percent must be between 0 and 100")
    private int discountPersent;

    @Min(value = 0, message = "Discounted price must be greater than or equal to 0")
    private int discountedPrice;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    private int quantity;

    @NotBlank(message = "Brand is required")
    @Size(max = 50, message = "Brand must be less than 50 characters")
    private String brand;

    @Size(max = 20, message = "Color must be less than 20 characters")
    private String color;

    private List<ProductSize> sizes = new ArrayList<>();

    @Size(max = 255, message = "Image URL must be less than 255 characters")
    private String imageUrl;

    @NotBlank(message = "Top level category is required")
    private String topLevelCategory;

    @NotBlank(message = "Second level category is required")
    private String secondLevelCategory;

    @NotBlank(message = "Third level category is required")
    private String thirdLevelCategory;

    public CreateProductRequest() {
    }

    public CreateProductRequest(String title, String description, int price, int discountPersent, int discountedPrice, int quantity, String brand, String color, List<ProductSize> sizes, String imageUrl, String topLevelCategory, String secondLevelCategory, String thirdLevelCategory) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountPersent = discountPersent;
        this.discountedPrice = discountedPrice;
        this.quantity = quantity;
        this.brand = brand;
        this.color = color;
        this.sizes = sizes;
        this.imageUrl = imageUrl;
        this.topLevelCategory = topLevelCategory;
        this.secondLevelCategory = secondLevelCategory;
        this.thirdLevelCategory = thirdLevelCategory;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getDiscountPersent() {
        return discountPersent;
    }

    public void setDiscountPersent(int discountPersent) {
        this.discountPersent = discountPersent;
    }

    public int getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(int discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<ProductSize> getSizes() {
        return sizes;
    }

    public void setSizes(List<ProductSize> sizes) {
        this.sizes = sizes;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTopLevelCategory() {
        return topLevelCategory;
    }

    public void setTopLevelCategory(String topLevelCategory) {
        this.topLevelCategory = topLevelCategory;
    }

    public String getSecondLevelCategory() {
        return secondLevelCategory;
    }

    public void setSecondLevelCategory(String secondLevelCategory) {
        this.secondLevelCategory = secondLevelCategory;
    }

    public String getThirdLevelCategory() {
        return thirdLevelCategory;
    }

    public void setThirdLevelCategory(String thirdLevelCategory) {
        this.thirdLevelCategory = thirdLevelCategory;
    }


}
