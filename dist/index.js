'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const helmet_1 = __importDefault(require('helmet'));
const config_1 = require('./config.js');
const errorMiddleware_1 = __importDefault(require('./middleware/errorMiddleware.js'));
const oAuth_1 = require('./controller/oAuth.js');
const app = (0, express_1.default)();
const corsOption = {
  origin: config_1.config.cors.allowedOrigin,
  optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.get('/', (req, res, next) => {
  res.sendStatus(200);
  return '서버 홈';
});
app.use('/oauth/kakao/callback', oAuth_1.kakaoCallBack);
app.use((req, res, next) => {
  res.sendStatus(404);
});
app.use(errorMiddleware_1.default);
app.listen(config_1.config.port.port);
