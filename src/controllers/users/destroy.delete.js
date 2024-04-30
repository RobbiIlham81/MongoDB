import usersModel from "../../models/users.js";
import Message from "../../utils/message.js";

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
    const _id = req.params._id;

    await usersModel.findOneAndDelete({ _id, deleted_at: null });

    Message(res, 200, "Delete user success");
  } catch (error) {
    Message(res, 500, error.message || "internal server error");
  }
}
