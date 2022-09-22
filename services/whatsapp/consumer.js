const { Kafka } = require("kafkajs");

module.exports = async (clientId, brokers, topic) => {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId: "whatsapp" });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, partition }) => {
      const data = JSON.parse(message.value.toString());
      // await new Promise((resolve) => setTimeout(() => resolve(), 1000 * 15));
      console.log(`New WhatsApp message on partition ${partition}`);
    },
  });
};
