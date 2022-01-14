import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

export default connect;
