import SQLite from 'react-native-sqlite-storage';
import { DatabaseInitialization } from './DatabaseInitialization';

class DatabaseImpl implements Database {
    constructor() {
        this.databaseName = 'addressbook.db';
        this.database = undefined;
    }

    // Open the connection to the database
    open() {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
        let databaseInstance: SQLite.SQLiteDatabase;

        return SQLite.openDatabase({
            name: this.databaseName,
            location: 'Library'
        })
            .then(db => {
                databaseInstance = db;

                // Perform any database initialization or updates, if needed
                const databaseInitialization = new DatabaseInitialization();
                return databaseInitialization.updateDatabaseTables(databaseInstance);
            })
            .then(() => {
                this.database = databaseInstance;
                return databaseInstance;
            });
    }

    // Close the connection to the database
    close() {
        if (this.database === undefined) {
            return Promise.reject('[db] Database was not open; unable to close.');
        }
        return this.database.close().then(status => {
            this.database = undefined;
        });
    }

    addAddress(text, lat, lng) {
        return this.getDatabase()
            .then(db =>
                db.executeSql('INSERT INTO Address (text, lat, lng) VALUES (?, ?, ?);', [
                    text,
                    lat,
                    lng
                ])
            )
    }

    getAddresses() {
        return this.getDatabase()
            .then(db =>
                db.executeSql('SELECT * FROM Address ORDER BY id DESC;')
            )
            .then(([results]) => {
                const count = results.rows.length;
                const addresses = [];
                for (let i = 0; i < count; i++) {
                    const row = results.rows.item(i);
                    const { text, id, lat, lng } = row;
                    addresses.push({ id, text, lat, lng });
                }
                return addresses;
            });
    }

    getDatabase() {
        if (this.database !== undefined) {
            return Promise.resolve(this.database);
        }
        // otherwise: open the database first
        return this.open();
    }
}

// Export a single instance of DatabaseImpl
const database = new DatabaseImpl();
export default database;
