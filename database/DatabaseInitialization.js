import SQLite from 'react-native-sqlite-storage';

export class DatabaseInitialization {
    updateDatabaseTables(database) {
        let dbVersion = 0;
        return database
            .transaction(this.createTables)
            .then(() => {
                return this.getDatabaseVersion(database);
            })
            .then(version => {
                dbVersion = version;
                return;
            })
    }

    // Perform initial setup of the database tables
    createTables(transaction) {
        // Address table
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS Address(
                id INTEGER PRIMARY KEY NOT NULL,
                text TEXT,
                lat INTEGER DEFAULT 0,
                lng INTEGER DEFAULT 0
            );`
        );
        // Version table
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS Version(
                id INTEGER PRIMARY KEY NOT NULL,
                version INTEGER
            );`
        );
    }

    getDatabaseVersion(database) {
        return database
            .executeSql('SELECT version FROM Version ORDER BY version DESC LIMIT 1;')
            .then(([results]) => {
                if (results.rows && results.rows.length > 0) {
                    const version = results.rows.item(0).version;
                    return version;
                } else {
                    return 0;
                }
            })
            .catch(error => {
                return 0;
            });
    }
}