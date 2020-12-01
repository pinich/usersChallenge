import { Logger } from '@nestjs/common';
import * as Knex from 'knex';

const knex = Knex({
    client: 'sqlite3',
    connection: {
        filename: process.env.DB_FILE,
        multipleStatements: true,
        timezone: 'UTC'
    },
    useNullAsDefault: true
});
Logger.log(`Create db at ${process.env.DB_FILE}`, 'DAL');
export abstract class DAL {
    static getKnex() {
        return knex;
    }

    static executeBatchSQL(queries: string[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                knex.transaction(trx => {
                    const buildTables = queries.map(
                        async (strQuery: string) => {
                            return trx.raw(strQuery);
                        },
                    );
                    return Promise.all(buildTables)
                        .then(obj => {
                            return trx.commit;
                        })
                        .catch(err => {
                            console.log(err);
                            trx.rollback;
                        })
                        .then(() => {
                            console.log('Batch queries finished');
                            resolve(true);
                        });
                });
            } catch (err) {
                reject(false);
            }
        });
    }

}