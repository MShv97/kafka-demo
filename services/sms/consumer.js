const { Kafka } = require("kafkajs");

module.exports = async (clientId, brokers, topic) => {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId: "sms" });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      // await new Promise((resolve) => setTimeout(() => resolve(), 1000 * 15));
      console.log("New SMS message");
    },
  });
};
