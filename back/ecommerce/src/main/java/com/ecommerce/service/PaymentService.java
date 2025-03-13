package com.ecommerce.service;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.PaymentDetail;

public interface PaymentService {
    PaymentDetail createPayment(PaymentDetail paymentDetail) throws GlobalExceptionHandler;
    PaymentDetail getPaymentById(Long paymentId) throws GlobalExceptionHandler;
    PaymentDetail updatePayment(Long paymentId, PaymentDetail paymentDetail) throws GlobalExceptionHandler;
    void deletePayment(Long paymentId) throws GlobalExceptionHandler;
} 