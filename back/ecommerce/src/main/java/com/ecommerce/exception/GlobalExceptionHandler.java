package com.ecommerce.exception;

import com.ecommerce.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends Exception {
    private String message;
    private String code;

    public GlobalExceptionHandler(String message) {
        super(message);
        this.message = message;
        this.code = "GLOBAL_ERROR";
    }

    public GlobalExceptionHandler(String message, String code) {
        super(message);
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        ErrorResponse error = new ErrorResponse(e.getMessage(), "INTERNAL_SERVER_ERROR");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CartItemException.class)
    public ResponseEntity<ErrorResponse> handleCartItemException(CartItemException e) {
        ErrorResponse error = new ErrorResponse(e.getMessage(), e.getCode());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ErrorResponse> handlePaymentException(PaymentException e) {
        ErrorResponse error = new ErrorResponse(e.getMessage(), e.getCode());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
}