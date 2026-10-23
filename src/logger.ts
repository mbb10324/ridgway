/**
 * @stig V-222468 | The application must initiate session auditing upon startup.
 * @stig V-222482 | The application must be configured to write application logs to a centralized log repository.
 */
import log from 'loglevel';
import { env } from '@/env/server';

/**
 * @stig V-222476 | The application must produce audit records that contain information to establish the outcome of the events.
 *
 * Each log entry must include an outcome field that indicates the result of the event.
 * By default, the outcome is tied to the log level. In the case of an error or warning, the outcome is 'failure' unless otherwise specified.
 * In all other cases, the omission of an outcome will result in a 'success' outcome.
 */
export type LogOutcome = 'success' | 'failure' | 'pending';

// NOTE: More robust logging libraries, like Morgan, are not
// compatible with the Edge Runtime in which Next.js middleware runs.

// Reformat default log message format.
const originalFactory = log.methodFactory;
log.methodFactory = (methodName, logLevel, loggerName) => {
	const rawMethod = originalFactory(methodName, logLevel, loggerName);
	return function (...args) {
		const [message = '', specifiedOutcome] = args as [string, LogOutcome?];
		const inferredOutcome = methodName == 'error' || methodName == 'warn' ? 'failure' : 'success';
		const outcome = specifiedOutcome ?? inferredOutcome;

		const logEntry = {
			level: methodName,
			// @stig V-222446 | The application must record a time stamp indicating when the event occurred.
			// @stig V-222473 | The application must produce audit records containing information to establish when (date and time) the events occurred.
			// @stig V-222497 | The applications must use internal system clocks to generate time stamps for audit records.
			// @stig V-222498 | The application must record time stamps for audit records that can be mapped to Coordinated Universal Time (UTC) or Greenwich Mean Time (GMT).
			// @stig V-222499 | The application must record time stamps for audit records that meet a granularity of one second for a minimum degree of precision.
			timestamp: new Date().toISOString(),
			// @stig V-222476 | The application must produce audit records that contain information to establish the outcome of the events.
			outcome,
			message
		};
		rawMethod(JSON.stringify(logEntry));
	};
};
log.rebuild();

if (env.LOG_LEVEL) {
	log.setLevel(env.LOG_LEVEL);
} else if (env.NODE_ENV === 'development') {
	log.setLevel('debug');
} else if (env.NODE_ENV === 'test') {
	log.setLevel('warn');
} else {
	log.setLevel('info');
}

const extendedLog = {
	...log,
	audit: (message: string, outcome: LogOutcome = 'success') => {
		// @stig V-222482 | The application must be configured to write application logs to a centralized log repository.
		log.info({ audit: message }, outcome);
	}
};

export default extendedLog;
