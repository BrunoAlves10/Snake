// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import CustomResponse from "../models/customResponse";
import Highscore from "../models/leaderboard";

// Global Config

// Creating router from index
export const leaderboardRouter = express.Router();

// Setting up router to use express
leaderboardRouter.use(express.json());

// Custom response type for method's returns

/**
 ** --------------
 **      GET
 ** --------------
 */

leaderboardRouter.get("/", async (_req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  try {
    const leaderboard = (await collections
      .leaderboard!.find({})
      .toArray()) as unknown as Highscore[];

    cResponse.status = "SUCCESS";
    cResponse.message = "Leaderboard fetched from MongoDB";
    cResponse.payload = leaderboard;

    res.status(200).send(cResponse);
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = "Error when fetching from MongoDB";
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(500).send(cResponse);
  }
});

leaderboardRouter.get("/leaders", async (_req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  try {
    const leaderboard = (await collections
      .leaderboard!.find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray()) as unknown as Highscore[];

    cResponse.status = "SUCCESS";
    cResponse.message = "Leaders from Leaderboard fetched from MongoDB";
    cResponse.payload = leaderboard;

    res.status(200).send(cResponse);
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = "Error when fetching from MongoDB";
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(500).send(cResponse);
  }
});

/**
 *? --------------
 *?      POST
 *? --------------
 *  */

leaderboardRouter.post("/", async (req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  try {
    req.body.createdAt = new Date();

    const newHighscore = req.body as Highscore;
    const result = await collections.leaderboard!.insertOne(newHighscore);

    if (result) {
      cResponse.status = "SUCCESS";
      cResponse.message = `Successfully created a new message with id ${result.insertedId}`;
      cResponse.payload = result.insertedId;

      res.status(201).send(cResponse);
    } else {
      cResponse.status = "ERROR";
      cResponse.message = "Failed to create a new highscore";

      res.status(500).send(cResponse);
    }
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = "Error when creating message";
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(400).send(cResponse);
  }
});

leaderboardRouter.post("/highscore", async (req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  try {
    const query = { name: req.body.name };

    const highscore = (await collections
      .leaderboard!.find(query)
      .toArray()) as unknown as Highscore[];

    console.log(highscore);

    if (highscore.length != 0) {
      cResponse.status = "ERROR";
      cResponse.message = `Name already used in Leaderboard from MongoDB`;
      cResponse.payload = highscore;

      res.status(409).send(cResponse);
    } else {
      req.body.createdAt = new Date();

      const newHighscore = req.body as Highscore;
      const result = await collections.leaderboard!.insertOne(newHighscore);

      if (result) {
        cResponse.status = "SUCCESS";
        cResponse.message = `Successfully created a new message with id ${result.insertedId}`;
        cResponse.payload = result.insertedId;

        res.status(201).send(cResponse);
      } else {
        cResponse.status = "ERROR";
        cResponse.message = "Failed to create a new highscore";

        res.status(500).send(cResponse);
      }
    }
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = "Error when creating message";
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(400).send(cResponse);
  }
});

/**
 *TODO --------------
 *TODO      PUT
 *TODO --------------
 *  */

leaderboardRouter.put("/:id", async (req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  const id = req?.params?.id;

  try {
    req.body.updatedAt = new Date();

    const updatedHighscore: Highscore = req.body as Highscore;

    const query = { _id: new ObjectId(id) };

    const result = await collections.leaderboard!.updateOne(query, {
      $set: updatedHighscore,
    });

    if (result) {
      cResponse.status = "SUCCESS";
      cResponse.message = `Successfully updated highscore with id ${result.upsertedId}`;
      cResponse.payload = updatedHighscore;

      res.status(201).send(cResponse);
    } else {
      cResponse.status = "ERROR";
      cResponse.message = `Highscore with id ${id} not updated`;

      res.status(304).send(cResponse);
    }
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = `Error when updating highscore with id ${id}`;
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(400).send(cResponse);
  }
});

leaderboardRouter.put(
  "/highscore/:name",
  async (req: Request, res: Response) => {
    const cResponse: CustomResponse = {
      status: "ERROR",
      message: "Unable to execute function",
      payload: undefined,
    };

    const name = req?.params?.name;

    try {
      req.body.updatedAt = new Date();

      const updatedHighscore: Highscore = req.body as Highscore;

      const query = { name: name };

      const result = await collections.leaderboard!.updateOne(query, {
        $set: updatedHighscore,
      });

      if (result) {
        cResponse.status = "SUCCESS";
        cResponse.message = `Successfully updated highscore with id ${result.upsertedId}`;
        cResponse.payload = updatedHighscore;

        res.status(201).send(cResponse);
      } else {
        cResponse.status = "ERROR";
        cResponse.message = `Highscore of user with name ${name} not updated`;

        res.status(304).send(cResponse);
      }
    } catch (error) {
      cResponse.status = "ERROR";
      cResponse.message = `Error when updating highscore of user with name ${name}`;
      cResponse.payload = error;

      if (error instanceof Error) cResponse.payload = error.message;
      res.status(400).send(cResponse);
    }
  }
);

/**
 *! --------------
 *!     DELETE
 *! --------------
 *  */

leaderboardRouter.delete("/:id", async (req: Request, res: Response) => {
  const cResponse: CustomResponse = {
    status: "ERROR",
    message: "Unable to execute function",
    payload: undefined,
  };

  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };

    const result = await collections.leaderboard!.deleteOne(query);

    if (result && result.deletedCount) {
      cResponse.status = "SUCCESS";
      cResponse.message = `Successfully removed highscore with ${id}`;
      cResponse.payload = result.deletedCount;

      res.status(202).send(cResponse);
    } else if (!result) {
      cResponse.status = "ERROR";
      cResponse.message = `Failed to remove highscore with id ${id}`;

      res.status(400).send(cResponse);
    } else if (!result.deletedCount) {
      cResponse.status = "ERROR";
      cResponse.message = `Highscore with id ${id} does not exist`;

      res.status(404).send(cResponse);
    }
  } catch (error) {
    cResponse.status = "ERROR";
    cResponse.message = `Error when deleting highscore`;
    cResponse.payload = error;

    if (error instanceof Error) cResponse.payload = error.message;
    res.status(400).send(cResponse);
  }
});

leaderboardRouter.delete(
  "/highscore/:name",
  async (req: Request, res: Response) => {
    const cResponse: CustomResponse = {
      status: "ERROR",
      message: "Unable to execute function",
      payload: undefined,
    };

    const name = req?.params?.name;

    try {
      const query = { name: name };

      const result = await collections.leaderboard!.deleteOne(query);

      if (result && result.deletedCount) {
        cResponse.status = "SUCCESS";
        cResponse.message = `Successfully deleted highscore of user with name ${name}`;
        cResponse.payload = result.deletedCount;

        res.status(202).send(cResponse);
      } else if (!result) {
        cResponse.status = "ERROR";
        cResponse.message = `Failed to remove highscore of user with name ${name}`;

        res.status(400).send(cResponse);
      } else if (!result.deletedCount) {
        cResponse.status = "ERROR";
        cResponse.message = `Highscore of user with name ${name} does not exist`;

        res.status(400).send(cResponse);
      }
    } catch (error) {
      cResponse.status = "ERROR";
      cResponse.message = "Error when deleting highscore";
      cResponse.payload = error;

      if (error instanceof Error) cResponse.payload = error.message;
      res.status(400).send(cResponse);
    }
  }
);
