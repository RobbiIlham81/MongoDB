import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";
import { ObjectId } from "bson";

import Validation from "../../utils/validation.js";
import { z } from "zod";

const schema = {
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
    const _id = new ObjectId(req.params._id);

    const result = await rolesModel.findOneAndUpdate({ _id }, { $set: validation.data });

    if (!result) return Message(res, 404, "Role Id not found");

    Message(res, 200, "Update Data Success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
