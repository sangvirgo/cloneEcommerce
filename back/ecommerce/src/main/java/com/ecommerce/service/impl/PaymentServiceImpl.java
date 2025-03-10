package com.ecommerce.service.impl;

import com.ecommerce.exception.PaymentException;
import com.ecommerce.model.PaymentDetail;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public PaymentDetail createPayment(PaymentDetail paymentDetail) throws PaymentException {
        try {
            return paymentRepository.save(paymentDetail);
        } catch (Exception e) {
            throw new PaymentException("Error creating payment: " + e.getMessage(), "PAYMENT_CREATE_ERROR");
        }
    }

    @Override
    public PaymentDetail getPaymentById(Long paymentId) throws PaymentException {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentException("Payment not found with id: " + paymentId, "PAYMENT_NOT_FOUND"));
    }

    @Override
    public PaymentDetail updatePayment(Long paymentId, PaymentDetail paymentDetail) throws PaymentException {
        PaymentDetail existingPayment = getPaymentById(paymentId);
        try {
            paymentDetail.setId(paymentId);
            return paymentRepository.save(paymentDetail);
        } catch (Exception e) {
            throw new PaymentException("Error updating payment: " + e.getMessage(), "PAYMENT_UPDATE_ERROR");
        }
    }

    @Override
    public void deletePayment(Long paymentId) throws PaymentException {
        try {
            paymentRepository.deleteById(paymentId);
        } catch (Exception e) {
            throw new PaymentException("Error deleting payment: " + e.getMessage(), "PAYMENT_DELETE_ERROR");
        }
    }
} 