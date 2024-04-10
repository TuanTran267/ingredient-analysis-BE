import { ObjectId } from "mongodb";

export default class Ingredient {
    // constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}

    constructor(public name: string, public definition: string, public otherName: string[], public id?: ObjectId) {}
}   


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