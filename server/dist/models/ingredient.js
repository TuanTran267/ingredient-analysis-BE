"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ingredient {
    // constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
    constructor(name, definition, otherName, id) {
        this.name = name;
        this.definition = definition;
        this.otherName = otherName;
        this.id = id;
    }
}
exports.default = Ingredient;
/**
 {"_id":{"$oid":"65df217974f6dcb0f94306e1"},
 "name":"",
 "definition":"",
 "otherName":[""],
 "chemFomular":"",
 "benefits":[""],
 "containedProducts":[""],
 "contraindication":[""],
 "safety":{"$numberInt":"0"},
 "sideEffects":[""],
 "altIngredients":[""]}
 */ 
//# sourceMappingURL=ingredient.js.map