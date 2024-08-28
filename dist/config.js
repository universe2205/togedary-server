"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function required(key, defaultValue) {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing required env variable : ${key}`);
    }
    return value;
}
exports.config = {
    port: {
        port: parseInt(required('PORT', '8080'), 10),
    },
    cors: {
        allowedOrigin: required('CORS_ALLOWED_ORIGIN'),
    },
    kakao: {
        restApiKey: required('KAKAO_RESTAPI'),
        redirectUri: required('REDIRECT_URI'),
    },
    google: {
        clientId: required('GOOGLE_CLIENT_ID'),
        clientPassword: required('GOOGLE_CLIENT_PASSWORD'),
        redirectUri: required('GOOGLE_REDIRECT_URI'),
    },
    naver: {
        clientId: required('NAVER_CLIENT_ID'),
        clientPassword: required('NAVER_CLIENT_PASSWORD'),
        redirectUri: required('NAVER_REDIRECT_URI'),
    },
};
