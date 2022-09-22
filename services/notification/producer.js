const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "my-app", brokers: ["kafka:9092"] });
const producer = kafka.producer();

let isConnected = false;
producer.on(producer.events.CONNECT, () => {
  isConnected = true;
});
producer.on(producer.events.DISCONNECT, () => {
  isConnected = false;
});

module.exports = async (topic, message) => {
  if (!isConnected) await producer.connect();

  await producer
    .send({ topic, messages: [message] })
    .catch((err) => console.error("could not write message " + err));
};
