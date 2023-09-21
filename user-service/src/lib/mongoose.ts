import mongoose, { ConnectOptions } from 'mongoose';




export default class Mongoose {
    constructor() {
        const DB = process.env.DATABASE.replace(
            '<password>',
            process.env.DATABASE_PASSWORD
        );

        mongoose.connect(DB)
            .then(() => console.log('DB connection went successful!'));


        const { connection: db } = mongoose;

        db.once('open', () => console.log('Connected to mongodb'));
        db.once('disconnected', () => console.log('Disconnected from mongodb'));
        db.on('error', err => console.log(`Error connecting to mongodb `, err));
    }
}

