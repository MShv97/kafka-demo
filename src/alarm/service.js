const producer = require("./produce");

class AlarmService {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.sms = true || Math.random() * 10 > 5;
    this.whatsApp = true || Math.random() * 10 > 5;
    this.telegram = true || Math.random() * 10 > 5;
  }

  async save() {
    await producer(this.id, this);
  }

  static async comment(id, data) {
    await producer(id, data);
  }

  static async terminate(data) {}
}

module.exports = AlarmService;

// setInterval(() => {
//   new AlarmService({ id: "1000", type: "gg" }).save();
//   new AlarmService({ id: "1000", type: "gg" }).save();
//   new AlarmService({ id: "1001", type: "gg" }).save();
//   new AlarmService({ id: "1001", type: "gg" }).save();
// }, 200);
