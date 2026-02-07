"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctioneerController = void 0;
const common_1 = require("@nestjs/common");
const createAuctioneerDTO_1 = __importDefault(require("./dto/createAuctioneerDTO"));
const auctioneer_service_1 = __importDefault(require("./auctioneer.service"));
let AuctioneerController = class AuctioneerController {
    auctioneerSerive;
    constructor(auctioneerSerive) {
        this.auctioneerSerive = auctioneerSerive;
    }
    createAuctioneer(createAuctioneerDTO) {
        return this.auctioneerSerive.create(createAuctioneerDTO);
    }
};
exports.AuctioneerController = AuctioneerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAuctioneerDTO_1.default]),
    __metadata("design:returntype", void 0)
], AuctioneerController.prototype, "createAuctioneer", null);
exports.AuctioneerController = AuctioneerController = __decorate([
    (0, common_1.Controller)('/auctioneer'),
    __metadata("design:paramtypes", [auctioneer_service_1.default])
], AuctioneerController);
//# sourceMappingURL=auctioneer.controller.js.map