const AlarmService = require("./service");

module.exports = {
  async save(req, res) {
    const { body: data } = req;
    const result = await new AlarmService(data).save();
    res.status(201).send(result);
  },

  async comment(req, res) {
    const { body: data } = req;
    await AlarmService.comment(data);
    res.sendStatus(200);
  },

  async terminate(req, res) {
    const { body: data } = req;
    await AlarmService.terminate(data);
    res.sendStatus(200);
  },
};
