const { Router } = require("express");
const Joi = require("joi");
const validate = require("../middleware/validate");
const User = require("../models/User");

const router = new Router();

router.get("/me", async (req, res) => {
  return res.json(req.user);
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  job: Joi.string().optional(),
  avatar: Joi.string().uri().optional(),
});
router.patch("/me", validate(updateUserSchema), async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  return res.json(user);
});

module.exports = router;
