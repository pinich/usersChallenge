export const UserSqlQueries = {
    buildTable: `CREATE TABLE IF NOT EXISTS users (
        id        INTEGER       PRIMARY KEY AUTOINCREMENT NOT NULL,
        name VARCHAR (30) ,
        email  VARCHAR (50)  NOT NULL,
        password  VARCHAR (250) NOT NULL,
        date DATETIME DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
        other  TEXT
    );
    `,
    createUser: `INSERT INTO users (
        name,
        email,
        password,
        other
    )
    VALUES (
        ?,
        ?,
        ?,
        ?
    );
    `,
    //SELECT last_insert_rowid();
    selectByEmail: `SELECT * FROM users WHERE "email" = ?;`,
    selectById: `SELECT * FROM users WHERE "id" = ?;`,
    selectAllUsers:'SELECT id,name,email,date,other FROM users ORDER BY name ASC'
};
