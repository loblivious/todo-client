import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `[${level}] ${timestamp} ${message}`;
});

export const logger = (() => {
	return createLogger({
		level: 'info',
		format: combine(timestamp(), myFormat),
		transports: [
			new transports.Console(),
			new transports.File({ filename: 'errors.log' }),
		],
	});
})();