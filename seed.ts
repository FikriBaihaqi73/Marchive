import 'dotenv/config';
import { db } from './src/db';
import { users } from './src/db/schema';
import bcrypt from 'bcryptjs';


async function seed() {
  console.log('🌱 Starting Seeding Process...');
  
  // 1. SEED ADMIN USER
  console.log('👤 Seeding admin user...');
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (username && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await db.insert(users).values({
        username,
        password: hashedPassword,
      }).onConflictDoNothing();
      console.log(`   ✅ Admin user "${username}" created/ready.`);
    } catch (e) {
      console.error('   ❌ Failed to seed user:', e);
    }
  } else {
    console.warn('   ⚠️ Skipping admin user: ADMIN_USERNAME or ADMIN_PASSWORD not found in .env');
  }

  console.log('✨ Seeding completed!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
