import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";
import { ObjectId } from "bson";

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
  try {
    const _id = new ObjectId(req.params._id);

    const result = await rolesModel.deleteOne({ _id });

    // if (!result.deletedCount === 0) return Message(res, 404, "Role Id not found");

    Message(res, 200, "Delete data Succes", result);
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
