const { Kafka } = require("kafkajs");
const kafka = new Kafka({ clientId: "my-app", brokers: ["kafka:9092"] });
const [admin, producer] = [kafka.admin(), kafka.producer()];

let isConnected = false;
producer.on(producer.events.CONNECT, () => {
  isConnected = true;
});
producer.on(producer.events.DISCONNECT, () => {
  isConnected = false;
});

module.exports = async (key, value) => {
  if (!isConnected) await producer.connect();

  await producer
    .send({
      topic: "Notification",
      messages: [{ key, value: JSON.stringify(value) }],
    })
    .catch((err) => console.error("could not write message " + err));
};
