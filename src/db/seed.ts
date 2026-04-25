import { db } from './index';
import { categories, users } from './schema';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function seed() {
  console.log('🌱 Starting Seeding Process...');
  
  // 1. SEED CATEGORIES
  console.log('📦 Seeding categories...');
  const initialCategories = [
    { name: 'Novel', slug: 'novel', type: 'book', description: 'Multi-chaptered fiction stories' },
    { name: 'Short Story', slug: 'short-story', type: 'book', description: 'Brief fiction stories, can be serialized' },
    { name: 'Poetry', slug: 'poetry', type: 'single', description: 'Literary art in metrical form' },
    { name: 'Design', slug: 'design', type: 'single', description: 'Visual art and graphic design projects' },
    { name: 'Photography', slug: 'photography', type: 'single', description: 'Capturing moments through the lens' },
  ];

  for (const cat of initialCategories) {
    await db.insert(categories).values(cat).onConflictDoNothing();
    console.log(`   ✅ Category "${cat.name}" ready.`);
  }

  // 2. SEED ADMIN USER
  console.log('👤 Seeding admin user...');
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (username && password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      username,
      password: hashedPassword,
    }).onConflictDoNothing();
    console.log(`   ✅ Admin user "${username}" ready.`);
  } else {
    console.log('   ⚠️ ADMIN_USERNAME or ADMIN_PASSWORD not found in .env, skipping user seed.');
  }

  console.log('✨ Seeding successfully finished!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
