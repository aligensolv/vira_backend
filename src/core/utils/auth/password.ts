import argon from "argon2";

export async function generateHashedPassword(password: string, saltRounds = 12): Promise<string> {
  return argon.hash(password, { timeCost: saltRounds });
}

interface IsPasswordValidPayload {
  hashed: string
  plain: string
}

export async function isPasswordValid({ hashed, plain }: IsPasswordValidPayload): Promise<boolean> {
  return argon.verify(hashed, plain);
}