package com.ecommerce.repository;

import com.ecommerce.model.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentDetail, Long> {
} 