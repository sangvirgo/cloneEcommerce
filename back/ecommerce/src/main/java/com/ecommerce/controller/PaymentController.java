package com.ecommerce.controller;

import com.ecommerce.exception.PaymentException;
import com.ecommerce.model.PaymentDetail;
import com.ecommerce.service.PaymentService;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<PaymentDetail> createPayment(@RequestHeader("Authorization") String jwt,
            @RequestBody @Valid PaymentDetail paymentDetail) throws PaymentException {
        PaymentDetail payment = paymentService.createPayment(paymentDetail);
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<PaymentDetail> getPaymentById(@PathVariable Long paymentId) throws PaymentException {
        PaymentDetail payment = paymentService.getPaymentById(paymentId);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PutMapping("/{paymentId}/update")
    public ResponseEntity<PaymentDetail> updatePayment(@PathVariable Long paymentId,
            @RequestBody @Valid PaymentDetail paymentDetail) throws PaymentException {
        PaymentDetail payment = paymentService.updatePayment(paymentId, paymentDetail);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @DeleteMapping("/{paymentId}/delete")
    public ResponseEntity<Void> deletePayment(@PathVariable Long paymentId) throws PaymentException {
        paymentService.deletePayment(paymentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
