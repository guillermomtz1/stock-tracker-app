import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  console.log("🔄 Connecting to MongoDB...");

  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });

    const { readyState, host, port, name } = mongoose.connection;

    console.log("✅ Connected successfully");
    console.log(`   Host:     ${host}:${port}`);
    console.log(`   Database: ${name}`);
    console.log(`   State:    ${readyState} (1 = connected)`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected cleanly");
  } catch (err) {
    console.error("❌ Connection failed:", (err as Error).message);
    process.exit(1);
  }
}

testConnection();
