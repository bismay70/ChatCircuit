import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        // Remove trailing slash from MONGODB_URI if it exists before appending the database name
        const baseUri = MONGODB_URI.endsWith('/') ? MONGODB_URI.slice(0, -1) : MONGODB_URI;
        cached.promise = mongoose.connect(`${baseUri}/chat-circuit`, opts).then((mongoose) => {
            console.log('Database connected');
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};