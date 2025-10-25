#!/usr/bin/env node

/**
 * Safe Prisma Generate Script
 * Runs prisma generate only if DATABASE_URL is available
 * Used in postinstall to prevent build failures
 */

const { execSync } = require('child_process');

function safelyGeneratePrisma() {
  // Check if DATABASE_URL exists
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not found. Skipping prisma generate.');
    console.log('💡 This is expected during initial npm install.');
    console.log('📝 Run "npx prisma generate" after setting up your .env file');
    return;
  }

  try {
    console.log('🔧 Generating Prisma Client...');
    execSync('prisma generate', { stdio: 'inherit' });
    console.log('✅ Prisma Client generated successfully!');
  } catch (error) {
    console.error('❌ Failed to generate Prisma Client:', error.message);
    // Don't fail the install process
    process.exit(0);
  }
}

safelyGeneratePrisma();
