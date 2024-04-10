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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientsRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// import Ingredients from "../models/ingredient";
// Global Config
exports.ingredientsRouter = express_1.default.Router();
exports.ingredientsRouter.use(express_1.default.json());
// GET
// Get all ingredients
exports.ingredientsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = (yield database_service_1.collections.ingredients.find({}).toArray());
        res.status(200).send(ingredients);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.ingredientsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const ingredient = (yield database_service_1.collections.ingredients.findOne(query));
        if (ingredient) {
            res.status(200).send(ingredient);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
exports.ingredientsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const newIngredient = req.body;
        console.log(req.body);
        const result = yield database_service_1.collections.ingredients.insertOne(newIngredient);
        result
            ? res.status(201).send(`Successfully created a new ingredient with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new ingredient.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// PUT
exports.ingredientsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    console.log(id);
    try {
        const updatedIngredient = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.ingredients.updateOne(query, { $set: updatedIngredient });
        result
            ? res.status(200).send(`Successfully updated ingredient with id ${id}`)
            : res.status(304).send(`Ingredient with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// DELETE
exports.ingredientsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    console.log('ID ', id);
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.ingredients.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed ingredient with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove ingredient with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=ingredients.route.js.map