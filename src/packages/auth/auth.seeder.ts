import { User } from "@prisma/client"
import { prisma } from "../../core/prisma/client"
import { generateHashedPassword } from "../../core/utils/auth/password"
import { UserFactory } from "./auth.factory"

export class UserSeeder {
  static async run() {
    console.log("> Seeding users...")

    const users = UserFactory.count(10).make()


    const admins: Omit<User, 'id' | 'created_at' | 'updated_at'>[] = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: await generateHashedPassword("vira"),
        role: "SUPER_ADMIN",
      },
    ]

    const result = await prisma.user.createMany({
      data: [
        ...users,
        ...admins
      ],
      skipDuplicates: true,
    })

    console.log(`⩥ Seeded ${result.count} users`)
  }

  static async truncate() {
    console.log("🧹 Truncating users table...")
    const result = await prisma.user.deleteMany({})
    console.log(`⩥ Truncated ${result.count} users`)
  }
}
