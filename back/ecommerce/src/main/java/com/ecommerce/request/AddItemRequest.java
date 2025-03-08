package com.ecommerce.request;

import com.ecommerce.model.ProductSize;

import java.util.List;

public class AddItemRequest {
    private Long productId;
    private int quantity;
    private List<ProductSize> size;
    private int price;

    public AddItemRequest() {
    }

    public AddItemRequest(Long productId, int quantity, List<ProductSize> size, int price) {
        this.productId = productId;
        this.quantity = quantity;
        this.size = size;
        this.price = price;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public List<ProductSize> getSize() {
        return size;
    }

    public void setSize(List<ProductSize> size) {
        this.size = size;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
