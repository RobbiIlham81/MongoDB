import usersModel from "../../models/users.js";
import rolesModel from "../../models/roles.js";
import Message from "../../utils/message.js";

import Validation from "../../utils/validation.js";
import { z } from "zod";

const Schema = {
  email: z.string().min(1, "Email is required").email("Email must be valid"),
  password: z.string().min(8, "password must be equal 8 character"),
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
  const validation = Validation(Schema, body);

  if (!validation.success)
    return Message(res, 422, "Error validation", {
      errors: validation.errors,
    });
  try {
    const findRoleCostumer = await rolesModel.findOne({ name: "customer" });

    if (!findRoleCostumer) return Message(res, 404, "Role not found");

    const { _id } = findRoleCostumer;

    // await usersModel.create({
    //   ...validation.data,
    //   role_id: _id,
    // });

    await new usersModel({
      ...validation.data,
      role_id: _id,
    }).save();

    Message(res, 201, "Create user success");
  } catch (error) {
    Message(res, 500, error.message || "Internal server error");
  }
}
