import express from 'express';
import { logger } from './logger';

const app = express();

const port = 3000;

app.listen(port, () => {
    logger.info(`Starting express on port ${port}`);
});

app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500);
    res.send(`internal error!`);
    next();
});

app.get(`*`, (req, res) => {
    logger.warn(`Global fallback - sending 404`);
    res.status(404);
    res.send(`${req.path} Not found!`);
});

module.exports = app;