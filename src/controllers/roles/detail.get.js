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

    const detail = await rolesModel.findOne({ _id });

    Message(res, 200, "Detail data", detail);
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
