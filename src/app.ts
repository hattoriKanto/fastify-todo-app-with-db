import { app } from "../api/index";

export const createServer = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server listening on port 3000`);
  } catch (err) {
    console.log("Error occurred while starting the server", err);
    app.log.error(err);
    process.exit(1);
  }
};

createServer();
