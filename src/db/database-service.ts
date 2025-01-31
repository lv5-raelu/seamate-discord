import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { Logger } from '../services/index.js';

const client = new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
});

client.$on('query', e => {
    Logger.info(
        `QUERY: ${e.query.replaceAll(/\\?/g, '')} <==========> ` +
            `PARAMS: ${e.params} <==========> ` +
            `DURATION: ${e.duration}ms <==========> ` +
            `TIMESTAMP: ${e.timestamp.toISOString()}`
    );
});

const extendedClient = client
    .$extends({
        name: 'prisma-users-extension',
        query: {
            users: {
                async create({ args, query }: { args: any; query: any }) {
                    const user = args.data;
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                    args.data = user;

                    return query(args);
                },

                async update({ args, query }: { args: any; query: any }) {
                    const user = args.data;
                    if (user.password != undefined) {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(String(user.password), salt);
                        user.password = hash;
                        args.data = user;
                    }

                    return query(args);
                },
            },
        },
    })
    .$extends({
        query: {
            $allModels: {
                $allOperations: async ({ operation, model, args, query }) => {
                    const start = performance.now();
                    const result = await query(args);
                    const end = performance.now();
                    const time = end - start;
                    Logger.info(
                        `OPERATION: ${model}.${operation}(${JSON.stringify(args)}) <==========> ` +
                            `DURATION: ${time}ms`
                    );
                    return result;
                },
            },
        },
    });

export class DatabaseService extends PrismaClient {
    readonly extendedClient = extendedClient;

    constructor() {
        super();
        return new Proxy(this, {
            get: (target: any, key: string) =>
                Reflect.get(key in extendedClient ? extendedClient : target, key),
        });
    }
}
