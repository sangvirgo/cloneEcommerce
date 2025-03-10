package com.ecommerce.exception;

public class CartItemException extends Exception {
    private String code;

    public CartItemException(String message, String code) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
