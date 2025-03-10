package com.ecommerce.exception;

public class PaymentException extends Exception {
    private String code;

    public PaymentException(String message, String code) {
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