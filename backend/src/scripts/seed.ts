import prisma from '../config/prisma';

async function main() {
  console.log('Seeding database...');

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      name: 'Alice Example',
      email: 'alice@example.com',
      contactNumber: '09123456789',
      userType: 'customer'
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      contactNumber: '09998887766',
      userType: 'admin'
    }
  });

  const item1 = await prisma.menuItem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Chef Salad',
      description: 'Fresh greens and roasted vegetables',
      price: 199.0,
      image: '/images/salad.jpg',
      category: 'Salads',
      status: 'Available'
    }
  });

  const item2 = await prisma.menuItem.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Spaghetti Bolognese',
      description: 'Classic pasta with meaty sauce',
      price: 249.0,
      image: '/images/spaghetti.jpg',
      category: 'Pasta',
      status: 'Available'
    }
  });

  const order = await prisma.order.create({
    data: {
      status: 'Pending',
      total: item1.price * 1 + item2.price * 2,
      customerId: alice.id,
      items: {
        create: [
          { menuItemId: item1.id, quantity: 1, price: item1.price },
          { menuItemId: item2.id, quantity: 2, price: item2.price }
        ]
      }
    }
  });

  await prisma.complaint.create({
    data: {
      issue: 'Late delivery',
      details: 'Order arrived 30 minutes late',
      status: 'Open',
      userId: alice.id
    }
  });

  await prisma.promotion.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      description: '10% off for new customers',
      type: 'Percentage',
      value: 10,
      usageLimit: 'One-time',
      status: 'Active'
    }
  });

  await prisma.flaggedAccount.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'fraud@example.com',
      reason: 'Multiple chargebacks',
      orderCount: 7,
      promoUsage: 'Abuse',
      status: 'Flagged'
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });