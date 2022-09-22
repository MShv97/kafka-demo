const { Kafka } = require("kafkajs");
const producer = require("./producer");

module.exports = async (clientId, brokers, topic) => {
  const kafka = new Kafka({ clientId, brokers });
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message, partition }) => {
      const data = JSON.parse(message.value.toString());
      console.log(partition);

      await Promise.all([
        (async () => {
          if (!data.sms) return;
          await producer("SMS", message);
        })(),
        (async () => {
          if (!data.whatsApp) return;
          await producer("WhatsApp", message);
        })(),
        (async () => {
          if (!data.telegram) return;
          await producer("Telegram", message);
        })(),
      ]);
    },
  });
};
