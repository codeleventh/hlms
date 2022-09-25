package ru.eleventh.hlms.error;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
