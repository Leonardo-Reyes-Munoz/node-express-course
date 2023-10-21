const { people } = require("../data");

const getPeople = (req, res) => {
  res.json({ sucess: true, data: people });
};

const addPerson = (req, res) => {
  if (req.body.name) {
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
    console.log(people);
  } else {
    res.status(400).json({ success: false, message: "Please provide a name" });
  }
};

const findPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: true, msg: `No person found with id:${id}` });
  }
  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: true, msg: `No person found with id:${id}` });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json(newPeople);
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: true, msg: `No person found with id:${id}` });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));

  res.status(200).json(newPeople);
};

module.exports = {
  addPerson,
  getPeople,
  findPerson,
  updatePerson,
  deletePerson,
};
