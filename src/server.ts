import dotenv from "dotenv";
import app from "./app";
import { envAppConfig } from "../src/libs/configs/config.env";

// Initialize dotenv
dotenv.config();

// Validate essential env variables
if (!envAppConfig.APP_PORT || !envAppConfig.APP_API_PATH) {
    console.error("Missing required environment configuration.");
    process.exit(1);
}

// Start server
const startServer = async () => {
    try {
        const PORT = envAppConfig.APP_PORT;

        app.listen(PORT, () => {
            if (envAppConfig.APP_ENV === "development") {
                console.log(`🚀 Server running at http://localhost:${PORT}`);
                console.log(
                    `📚 API docs available at http://localhost:${PORT}/documentation`,
                );
            }
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

startServer();