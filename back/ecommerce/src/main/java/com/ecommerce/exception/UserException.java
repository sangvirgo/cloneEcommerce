package com.ecommerce.exception;

public class UserException extends RuntimeException {
    private final String errorCode;
    private final long timestamp;

    public UserException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.timestamp = System.currentTimeMillis();
    }

    public String getErrorCode() {
        return errorCode;
    }

    public long getTimestamp() {
        return timestamp;
    }
}


//  Mục đích: Lớp ngoại lệ tùy chỉnh để xử lý lỗi liên quan đến người dùng.

