"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_model_1 = require("./user.model");
const user_service_1 = __importDefault(require("./user.service"));
const constants_1 = require("../../common/constants");
const check_valid_uiid_1 = require("../../common/check-valid-uiid");
const router = express_1.default.Router();
router.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = user_service_1.default.getAll();
    res
        .status(constants_1.StatusCode.OK)
        .json(users.map(user_model_1.User.toResponse));
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserBody = req.body;
    const newUser = user_service_1.default.createUser(UserBody);
    res
        .status(constants_1.StatusCode.Created)
        .json(user_model_1.User.toResponse(newUser));
}));
router.route('/:id')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(userId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `User id = ${userId} is not valid` });
    }
    else {
        const user = user_service_1.default.getUserBy(userId);
        if (!user) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `User id = ${userId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(user_model_1.User.toResponse(user));
        }
    }
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const UserBody = req.body;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(userId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `User id = ${userId} is not valid` });
    }
    else {
        const updatedUser = yield user_service_1.default.updateUserBy(userId, UserBody);
        if (!updatedUser) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `User id = ${userId} is not found` });
        }
        else {
            res
                .status(constants_1.StatusCode.OK)
                .json(user_model_1.User.toResponse(updatedUser));
        }
    }
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if (!(0, check_valid_uiid_1.checkvalidityUIID)(userId)) {
        res
            .status(constants_1.StatusCode.BadRequest)
            .json({ error: `User id = ${userId} is not valid` });
    }
    else {
        const user = yield user_service_1.default.getUserBy(userId);
        if (!user) {
            res
                .status(constants_1.StatusCode.NotFound)
                .json({ error: `User id = ${userId} is not found` });
        }
        else {
            yield user_service_1.default.deleteUserBy(userId);
            res
                .status(constants_1.StatusCode.NoContent)
                .end();
        }
    }
}));
module.exports = router;
//# sourceMappingURL=user.router.js.map