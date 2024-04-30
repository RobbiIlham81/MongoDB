import rolesModel from "../../models/roles.js";
import message from "../../utils/message.js";
import Message from "../../utils/message.js";

import Validation from "../../utils/validation.js";
import { z } from "zod";

const schema = {
  //   order: z.object({
  //     start: z.string().min(1, "Start is required"),
  //     end: z.string().min(1, "End is required"),
  //   }),
  name: z.string().min(1, "Name is required"),
};

/**
 *@typedef {import("express"). Request} ExpressRequest
 * @typedef {import("express"). Response} ExpressResponse
 */

/**
 * Route handler for the root endpoint
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressRequest} res - The Express response onject.
 */

export default async function (req, res) {
  const body = req.body;
  const validation = Validation(schema, body);

  if (!validation.success) return Message(res, 422, "Error Validation", { errors: validation.errors });

  try {
    await rolesModel.insertOne(validation.data);
    Message(res, 201, "Create Role Success");
  } catch (error) {
    Message(res, 500, error.Message || "Internal server error");
  }
}
