// eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/unused-import
import type { DefaultSession, User, Session } from 'next-auth';

declare module 'next-auth' {
    interface User {
        isActive: boolean;
    }

    interface Session {
        expires: Date;
        user: {
            isActive: boolean;
        } & DefaultSession['user']
    }
}
