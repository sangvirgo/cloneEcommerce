package com.ecommerce.model;

import jakarta.persistence.*;


@Entity
@Table(name = "payment_detail")
public class PaymentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "payment_method")
    private String paymentMethod; // "VNPay"

    @Column(name = "status")
    private String status; // "pending", "completed", "failed"

    @Column(name = "amount")
    private int amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // 4 trường quan trọng nhất cho VNPay
    @Column(name = "vnp_TxnRef")
    private String vnp_TxnRef; // Mã tham chiếu giao dịch tại hệ thống bạn

    @Column(name = "vnp_TransactionNo")
    private String vnp_TransactionNo; // Mã giao dịch tại hệ thống VNPay

    @Column(name = "vnp_ResponseCode")
    private String vnp_ResponseCode; // Mã phản hồi từ VNPay ("00" là thành công)

    @Column(name = "vnp_SecureHash")
    private String vnp_SecureHash; // Mã kiểm tra tính toàn vẹn dữ liệu từ VNPay

    public PaymentDetail() {
    }

    public PaymentDetail(String paymentId, String paymentMethod, String status, int amount, Order order, String vnp_TxnRef, String vnp_TransactionNo, String vnp_ResponseCode, String vnp_SecureHash) {
        this.paymentId = paymentId;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.amount = amount;
        this.order = order;
        this.vnp_TxnRef = vnp_TxnRef;
        this.vnp_TransactionNo = vnp_TransactionNo;
        this.vnp_ResponseCode = vnp_ResponseCode;
        this.vnp_SecureHash = vnp_SecureHash;
    }

    public String getVnp_TxnRef() {
        return vnp_TxnRef;
    }

    public void setVnp_TxnRef(String vnp_TxnRef) {
        this.vnp_TxnRef = vnp_TxnRef;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getVnp_TransactionNo() {
        return vnp_TransactionNo;
    }

    public void setVnp_TransactionNo(String vnp_TransactionNo) {
        this.vnp_TransactionNo = vnp_TransactionNo;
    }

    public String getVnp_ResponseCode() {
        return vnp_ResponseCode;
    }

    public void setVnp_ResponseCode(String vnp_ResponseCode) {
        this.vnp_ResponseCode = vnp_ResponseCode;
    }

    public String getVnp_SecureHash() {
        return vnp_SecureHash;
    }

    public void setVnp_SecureHash(String vnp_SecureHash) {
        this.vnp_SecureHash = vnp_SecureHash;
    }
}