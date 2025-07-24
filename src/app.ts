import express, { type Express } from "express";
import { errorHandler, NotFoundHandler } from "./libs/utils/NotFoundHandler";

const createApp = () => {

    //initialise express app
    const app: Express = express();

    // server side rendering
    app.use(express.urlencoded({ extended: true }));

    // Serve static files
    app.use(express.static(process.cwd() + "/public"));

    // middleware for json files
    app.use(express.json());

    //index page request
    app.get(["/", "/index", "/index.html"], (_req, res) => {
        res.type("html").sendFile(process.cwd() + "/public/views/index.html");
    });

    app.get("/api/health", (_req, res) => {
        res.json({
            success: true,
            message: "API is running",
            timestamp: new Date().toISOString(),
        });
    });
    // Catch-all 404 handler
    app.use(NotFoundHandler);

    // Error handling middleware (must be last)
    app.use(errorHandler);

    return app;
};

/**
 * Get the configured Express app instance
 * This is used by both the local server and Vercel serverless function
 */
const app = createApp();

export default app;
