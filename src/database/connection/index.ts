import mongoose from "mongoose";

interface ConnectionProp {
  isConnected: any;
}

class Database {
  private static instance: Database;
  private connection: ConnectionProp;

  private constructor() {
    this.connection = { isConnected: null };
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connectDB(): Promise<void> {
    if (this.connection.isConnected !== null) {
      console.log("Database is already connected!...");
      return;
    }

    if (mongoose.connections.length > 0) {
      this.connection.isConnected = mongoose.connections[0].readyState;

      if (this.connection.isConnected === 1) {
        return;
      }
      await mongoose.disconnect();
    }

    const databaseOptions = {
      autoIndex: true,
    };
    try {
      console.log('DB string: ', process.env.DATABASE_URI)
      const db = await mongoose.connect(
        process.env.DATABASE_URI as string,
        databaseOptions
      );
      this.connection.isConnected = db.connection.readyState;
    } catch (e) {
      console.log("Error Connecting to DB!: ", e);
    }
  }

  public async disconnectDB(): Promise<void> {
    if (
      this.connection.isConnected !== null &&
      process.env.NODE_ENV === "production"
    ) {
      await mongoose.disconnect();
      this.connection.isConnected = false;
    }
  }
}

const db = Database.getInstance();
export default db;
