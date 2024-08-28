'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.kakaoCallBack = kakaoCallBack;
const axios_1 = __importDefault(require('axios'));
const config_1 = require('../config.js');
function kakaoCallBack(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const code = req.query.code;
    try {
      const tokenResponse = yield getAccessToken(code);
      if (tokenResponse) {
        const token = tokenResponse.access_token;
        const userInfo = yield getUserInfo(token);
        res.status(200).json(userInfo);
      } else {
        res.status(500).send('Failed to retrieve access token');
      }
    } catch (error) {
      console.error('Error in kakaoCallBack:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}
const getAccessToken = (code) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const restApiKey = config_1.config.kakao.restApiKey;
    const redirectUri = config_1.config.kakao.redirectUri;
    try {
      const response = yield axios_1.default.post(
        'https://kauth.kakao.com/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: restApiKey || '',
          redirect_uri: redirectUri || '',
          code,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching the token:', error);
      return undefined;
    }
  });
const getUserInfo = (token) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const infoUrl = 'https://kapi.kakao.com/v2/user/me';
    try {
      const response = yield axios_1.default.get(infoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return undefined;
    }
  });
