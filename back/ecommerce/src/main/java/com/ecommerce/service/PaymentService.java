package com.ecommerce.service;

import com.ecommerce.exception.PaymentException;
import com.ecommerce.model.PaymentDetail;

public interface PaymentService {
    PaymentDetail createPayment(PaymentDetail paymentDetail) throws PaymentException;
    PaymentDetail getPaymentById(Long paymentId) throws PaymentException;
    PaymentDetail updatePayment(Long paymentId, PaymentDetail paymentDetail) throws PaymentException;
    void deletePayment(Long paymentId) throws PaymentException;
} 