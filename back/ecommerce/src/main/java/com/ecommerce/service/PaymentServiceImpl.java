package com.ecommerce.service;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.PaymentDetail;
import com.ecommerce.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public PaymentDetail createPayment(PaymentDetail paymentDetail) throws GlobalExceptionHandler {
        try {
            return paymentRepository.save(paymentDetail);
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error creating payment: " + e.getMessage(), "PAYMENT_CREATE_ERROR");
        }
    }

    @Override
    public PaymentDetail getPaymentById(Long paymentId) throws GlobalExceptionHandler {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new GlobalExceptionHandler("Payment not found with id: " + paymentId, "PAYMENT_NOT_FOUND"));
    }

    @Override
    public PaymentDetail updatePayment(Long paymentId, PaymentDetail paymentDetail) throws GlobalExceptionHandler {
        PaymentDetail existingPayment = getPaymentById(paymentId);
        try {
            paymentDetail.setId(paymentId);
            return paymentRepository.save(paymentDetail);
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error updating payment: " + e.getMessage(), "PAYMENT_UPDATE_ERROR");
        }
    }

    @Override
    public void deletePayment(Long paymentId) throws GlobalExceptionHandler {
        try {
            paymentRepository.deleteById(paymentId);
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error deleting payment: " + e.getMessage(), "PAYMENT_DELETE_ERROR");
        }
    }
} 