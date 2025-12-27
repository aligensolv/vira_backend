import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily report job...");
  // generate report, send email, etc.
});