// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Ingredient from "../models/ingredient";
import { collections } from "../services/database.service";
// import Ingredients from "../models/ingredient";


// Global Config
export const ingredientsRouter = express.Router();

ingredientsRouter.use(express.json());

// GET
// Get all ingredients
ingredientsRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const ingredients = (await collections.ingredients.find({}).toArray());

        res.status(200).send(ingredients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ingredientsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const ingredient = (await collections.ingredients.findOne(query));

        if (ingredient) {
            res.status(200).send(ingredient);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});


// POST
ingredientsRouter.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const newIngredient = req.body as Ingredient;
        console.log(req.body);
        const result = await collections.ingredients.insertOne(newIngredient);
        
        result
            ? res.status(201).send(`Successfully created a new ingredient with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new ingredient.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT

ingredientsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    console.log(id);

    try {
        const updatedIngredient: Ingredient = req.body as Ingredient;
        const query = { _id: new ObjectId(id) };
        const result = await collections.ingredients.updateOne(query, { $set: updatedIngredient });

        result
            ? res.status(200).send(`Successfully updated ingredient with id ${id}`)
            : res.status(304).send(`Ingredient with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE

ingredientsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;
    console.log('ID ',id);
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.ingredients.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed ingredient with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove ingredient with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});