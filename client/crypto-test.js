/* eslint-disable @typescript-eslint/no-var-requires */
const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');

// Исходный ключ из 16 байт для AES-128-CBC
const key = Buffer.from('973D9D2C6DF8F66F973D9D2C6DF8F66F', 'hex');

// Разделяем ключ на две половины по 8 байт для схемы Шамира
const keyPart1 = Buffer.from(key.slice(0, 8));
const keyPart2 = Buffer.from(key.slice(8, 16));

// Function to encrypt data using AES-128-CBC
const encrypt = (text, key) => {
  try {
    // Generate a random initialization vector (IV)
    const iv = randomBytes(16);

    // Create a cipher using AES-128-CBC with the provided key and IV
    const cipher = createCipheriv('aes-128-cbc', key, iv);

    // Encrypt the data
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV and encrypted data as a combined hex string
    // IV is returned as part of the result so it can be used for decryption
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted,
    };
  } catch (error) {
    console.error('Encryption error:', error.message);
    throw error;
  }
};

// Function to decrypt data using AES-128-CBC
const decrypt = (encryptedData, iv, key) => {
  try {
    // Create a decipher using AES-128-CBC with the provided key and IV
    const decipher = createDecipheriv('aes-128-cbc', key, Buffer.from(iv, 'hex'));

    // Decrypt the data
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error.message);
    throw error;
  }
};

// --------------------- SHAMIR SECRET SHARING IMPLEMENTATION -----------------------

// Prime number for modular arithmetic in Shamir's Secret Sharing
// This is the 12th Mersenne Prime (2^127 - 1), same as in the Go implementation
const PRIME = 2n ** 127n - 1n;

// Convert bytes to BigInt (similar to Go implementation)
const bytesToBigInt = bytes => {
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) + BigInt(byte);
  }
  return result;
};

// Convert BigInt back to bytes (similar to Go implementation)
const bigIntToBytes = (n, length) => {
  const bytes = new Uint8Array(length);
  let temp = n;

  for (let i = length - 1; i >= 0; i--) {
    bytes[i] = Number(temp & 0xffn);
    temp = temp >> 8n;
  }

  return Buffer.from(bytes);
};

// Generate a random BigInt less than max
const randomBigInt = max => {
  const bytes = randomBytes(Math.ceil(max.toString(2).length / 8));
  let num = bytesToBigInt(bytes);
  return num % max;
};

// Evaluate a polynomial at point x
const evalPolynomial = (poly, x, prime) => {
  let accum = 0n;

  // Using Horner's method for polynomial evaluation
  for (let i = poly.length - 1; i >= 0; i--) {
    accum = (accum * x + poly[i]) % prime;
  }

  return accum;
};

// Generate random shares for a given secret
const generateShares = (secret, threshold, numShares) => {
  if (threshold > numShares) {
    throw new Error('Threshold cannot be greater than the number of shares');
  }

  // Generate a random polynomial with constant term as the secret
  const poly = new Array(threshold);
  poly[0] = secret;

  // Generate random coefficients for the polynomial
  for (let i = 1; i < threshold; i++) {
    poly[i] = randomBigInt(PRIME);
  }

  // Generate shares by evaluating the polynomial at different x values
  const shares = [];
  for (let i = 1; i <= numShares; i++) {
    const x = BigInt(i);
    const y = evalPolynomial(poly, x, PRIME);
    shares.push([x, y]);
  }

  return shares;
};

// Calculate modular inverse using Extended Euclidean Algorithm
const modInverse = (a, m) => {
  if (m === 1n) return 0n;

  let m0 = m;
  let [x, y] = [0n, 1n];

  while (a > 1n) {
    const q = a / m;
    [a, m] = [m, a % m];
    [x, y] = [y - q * x, x];
  }

  return y < 0n ? y + m0 : y;
};

// Calculate division modulo prime
const divmod = (num, den, p) => {
  const inv = modInverse(den, p);
  if (inv === null) {
    throw new Error('No modular inverse exists');
  }
  return (num * inv) % p;
};

// Recover the secret from shares using Lagrange interpolation
const recoverSecret = (shares, prime = PRIME) => {
  if (shares.length < 2) {
    throw new Error('Need at least 2 shares to recover the secret');
  }

  // Extract x and y coordinates
  const xs = shares.map(share => share[0]);
  const ys = shares.map(share => share[1]);

  // Check for distinct x coordinates
  const xSet = new Set(xs.map(x => x.toString()));
  if (xSet.size !== shares.length) {
    throw new Error('Points must have distinct x coordinates');
  }

  // Prepare arrays for Lagrange basis polynomials
  const nums = new Array(shares.length);
  const dens = new Array(shares.length);

  // Compute Lagrange basis polynomials evaluated at x = 0
  for (let i = 0; i < shares.length; i++) {
    let num = 1n;
    let den = 1n;

    for (let j = 0; j < shares.length; j++) {
      if (i === j) continue;

      // Calculate the numerator: (0 - x_j) mod prime
      num = (num * (0n - xs[j])) % prime;
      if (num < 0n) num += prime;

      // Calculate the denominator: (x_i - x_j) mod prime
      den = (den * (xs[i] - xs[j])) % prime;
      if (den < 0n) den += prime;
    }

    nums[i] = num;
    dens[i] = den;
  }

  // Combine terms to recover the secret
  let secret = 0n;
  for (let i = 0; i < shares.length; i++) {
    const term = (divmod(nums[i], dens[i], prime) * ys[i]) % prime;
    secret = (secret + term) % prime;
  }

  return secret;
};

// Функция для создания долей ключа, разделенного на две части
const generateKeyShares = (key, threshold, numShares) => {
  // Разделяем ключ на две части
  const part1 = key.slice(0, 8);
  const part2 = key.slice(8, 16);

  // Конвертируем части в BigInt
  const secret1 = bytesToBigInt(part1);
  const secret2 = bytesToBigInt(part2);

  // Генерируем доли для каждой части
  const shares1 = generateShares(secret1, threshold, numShares);
  const shares2 = generateShares(secret2, threshold, numShares);

  // Объединяем доли в пары (первая часть, вторая часть)
  return shares1.map((share1, index) => ({
    index: index + 1,
    x1: share1[0],
    y1: share1[1],
    x2: shares2[index][0],
    y2: shares2[index][1],
  }));
};

// Функция для восстановления ключа из долей
const recoverKeyFromShares = shares => {
  // Разделяем доли на две группы для каждой части ключа
  const shares1 = shares.map(share => [share.x1, share.y1]);
  const shares2 = shares.map(share => [share.x2, share.y2]);

  // Восстанавливаем секреты для каждой части
  const secret1 = recoverSecret(shares1);
  const secret2 = recoverSecret(shares2);

  // Конвертируем секреты обратно в байты
  const part1 = bigIntToBytes(secret1, 8);
  const part2 = bigIntToBytes(secret2, 8);

  // Объединяем части в полный ключ
  return Buffer.concat([part1, part2]);
};

// --------------------- TEST FUNCTIONS -----------------------

// Test function to demonstrate encryption and decryption
const runTest = () => {
  // Original data to encrypt
  const originalData = 'This is a secret message that will be encrypted with AES-128-CBC';
  console.log('Original data:', originalData);

  // Validate key length
  if (key.length !== 16) {
    throw new Error('Key must be exactly 16 bytes (128 bits) for AES-128-CBC');
  }
  console.log('AES key (hex):', key.toString('hex'));
  console.log('Key part 1 (hex):', keyPart1.toString('hex'));
  console.log('Key part 2 (hex):', keyPart2.toString('hex'));

  // Encrypt the data
  console.log('\nEncrypting data...');
  const encrypted = encrypt(originalData, key);
  console.log('IV (hex):', encrypted.iv);
  console.log('Encrypted data (hex):', encrypted.encryptedData);

  // Decrypt the data
  console.log('\nDecrypting data...');
  const decrypted = decrypt(encrypted.encryptedData, encrypted.iv, key);
  console.log('Decrypted data:', decrypted);

  // Verify the decryption was successful
  console.log('\nVerification:');
  console.log('Original equals decrypted:', originalData === decrypted);
};

// Demonstrate Shamir Secret Sharing with the encryption key
const demonstrateShamirWithEncryption = () => {
  console.log('\n=== Shamir Secret Sharing with Encryption Demo (Split Key) ===');

  // Generate shares for the split key (threshold=3, total shares=6)
  const threshold = 3;
  const numShares = 6;
  const keyShares = generateKeyShares(key, threshold, numShares);

  // Display the generated shares
  console.log('\nGenerated Shares (for split key):');
  console.log('Share # | X1 | Y1 (hex) | X2 | Y2 (hex)');
  console.log('--------|----|---------|----|--------');
  keyShares.forEach(share => {
    console.log(
      `Share ${share.index} | ${share.x1.toString()} | ${share.y1.toString(16).padStart(20, '0')} | ${share.x2.toString()} | ${share.y2.toString(16).padStart(20, '0')}`
    );
  });

  // Recover the key using the first 3 shares
  const recoveredKey1 = recoverKeyFromShares(keyShares.slice(0, 3));
  console.log('\nKey recovered from first three shares (hex):', recoveredKey1.toString('hex'));
  console.log('Original key (hex):', key.toString('hex'));
  console.log(
    'Recovered key matches original:',
    recoveredKey1.toString('hex') === key.toString('hex')
  );

  // Recover with a different subset of shares
  const recoveredKey2 = recoverKeyFromShares(keyShares.slice(3));
  console.log('\nKey recovered from last three shares (hex):', recoveredKey2.toString('hex'));
  console.log(
    'Recovered key matches original:',
    recoveredKey2.toString('hex') === key.toString('hex')
  );

  // Demonstrate using the recovered key for decryption
  console.log('\nUsing recovered key for encryption/decryption:');
  const testMessage = 'Testing with recovered key';
  const encryptedWithRecovered = encrypt(testMessage, recoveredKey1);
  const decryptedWithRecovered = decrypt(
    encryptedWithRecovered.encryptedData,
    encryptedWithRecovered.iv,
    recoveredKey2
  );
  console.log('Original message:', testMessage);
  console.log('Decrypted message:', decryptedWithRecovered);
  console.log('Messages match:', testMessage === decryptedWithRecovered);
};

// Run the encryption/decryption test
runTest();

// Run the Shamir Secret Sharing demonstration
demonstrateShamirWithEncryption();
