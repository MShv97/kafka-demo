const consumer = require("./consumer");

const clientId = "my-app";
const brokers = ["kafka:9092"];
const topic = "WhatsApp";

// start the consumer, and log any errors
consumer(clientId, brokers, topic).catch((err) => {
  console.error("error in consumer: ", err);
});
