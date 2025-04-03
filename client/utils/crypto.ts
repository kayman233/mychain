import { randomBytes } from 'crypto';

// Prime number for modular arithmetic in Shamir's Secret Sharing
const PRIME = 2n ** 127n - 1n;

// Convert bytes to BigInt
export const bytesToBigInt = (bytes: Buffer): bigint => {
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) + BigInt(byte);
  }
  return result;
};

// Generate a random BigInt less than max
const randomBigInt = (max: bigint): bigint => {
  const bytes = randomBytes(Math.ceil(Number(max.toString(2).length) / 8));
  const num = bytesToBigInt(bytes);
  return num % max;
};

// Evaluate a polynomial at point x
const evalPolynomial = (poly: Array<bigint>, x: bigint, prime: bigint): bigint => {
  let accum = 0n;
  for (let i = poly.length - 1; i >= 0; i--) {
    accum = (accum * x + poly[i]) % prime;
  }
  return accum;
};

// Generate random shares for a given secret
const generateShares = (
  secret: bigint,
  threshold: number,
  numShares: number
): Array<[bigint, bigint]> => {
  if (threshold > numShares) {
    throw new Error('Threshold cannot be greater than the number of shares');
  }

  const poly = new Array(threshold);
  poly[0] = secret;

  for (let i = 1; i < threshold; i++) {
    poly[i] = randomBigInt(PRIME);
  }

  const shares: Array<[bigint, bigint]> = [];
  for (let i = 1; i <= numShares; i++) {
    const x = BigInt(i);
    const y = evalPolynomial(poly, x, PRIME);
    shares.push([x, y]);
  }

  return shares;
};

// Generate shares for a split key
export const generateKeyShares = (key: Buffer, threshold: number, numShares: number) => {
  const part1 = key.slice(0, 8);
  const part2 = key.slice(8, 16);

  const secret1 = bytesToBigInt(part1);
  const secret2 = bytesToBigInt(part2);

  const shares1 = generateShares(secret1, threshold, numShares);
  const shares2 = generateShares(secret2, threshold, numShares);

  return shares1.map((share1, index) => ({
    index: index + 1,
    x1: share1[0],
    y1: share1[1],
    x2: shares2[index][0],
    y2: shares2[index][1],
  }));
};
