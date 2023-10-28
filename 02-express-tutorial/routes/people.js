const express = require("express");
const router = express.Router();
const {
  addPerson,
  getPeople,
  findPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

router.route("/").get(getPeople).post(addPerson);
router.route("/:id").get(findPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
