import bcrypt from "bcryptjs";
import { Admin } from "./models/Admin.js";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("Admin seed skipped: missing ADMIN_EMAIL or ADMIN_PASSWORD");
    return;
  }

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword
  });

  console.log("Default admin seeded");
};

