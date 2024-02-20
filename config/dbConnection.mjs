import { connect as _connect } from "mongoose";

const connectDb = async () => {
  try {
    const connect = await _connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected",
      `DB: ${connect.connection.host} DB_NAME:${connect.connection.name}`
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
