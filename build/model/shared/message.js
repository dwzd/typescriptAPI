"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(name, message, status) {
        super();
        this.status = status;
        this.name = name;
        this.message = message;
    }
}
exports.ApiError = ApiError;
class PublicInfo {
    constructor(message, status, properties) {
        this.status = status;
        this.properties = properties;
    }
}
exports.PublicInfo = PublicInfo;
