import jwt from 'jsonwebtoken'

export const baseURL = 'https://addons.mozilla.org/api/v5'

export function generateJWT(key: string, secret: string): string {
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload = {
    iss: key,
    jti: Math.random().toString(),
    iat: issuedAt,
    exp: issuedAt + 60
  }
  return jwt.sign(payload, secret, {
    algorithm: 'HS256'
  })
}
