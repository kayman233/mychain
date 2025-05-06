import {
  Bip39,
  EnglishMnemonic,
  Secp256k1,
  Slip10,
  Slip10Curve,
  stringToPath,
} from '@cosmjs/crypto';
import * as secp256k1 from '@noble/secp256k1';

export const uint8ArrayToBase64 = (array: Uint8Array): string =>
  btoa(String.fromCharCode(...array));

export const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const generateKeysFromMnemonic = async (mnemonic: string) => {
  try {
    // Проверяем мнемонику
    const mnemonicChecked = new EnglishMnemonic(mnemonic);

    // Генерируем seed из мнемоники
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked);

    // Создаем HD путь для Cosmos (m/44'/118'/0'/0/0)
    const hdPath = stringToPath("m/44'/118'/0'/0/0");

    // Получаем приватный ключ используя SLIP10
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);

    // Создаем keypair из приватного ключа
    const keypair = await Secp256k1.makeKeypair(privkey);

    // Получаем компрессированный публичный ключ
    const compressedPubkey = Secp256k1.compressPubkey(keypair.pubkey);
    const pubkeyFull = Secp256k1.uncompressPubkey(compressedPubkey);

    return {
      privateKey: Buffer.from(privkey).toString('base64'),
      publicKey: Buffer.from(compressedPubkey).toString('base64'),
      // Дополнительно можем вернуть некомпрессированный публичный ключ
      publicKeyFull: Buffer.from(pubkeyFull).toString('base64'),
    };
  } catch (error) {
    console.error('Error generating keys:', error);
    throw error;
  }
};

export const encryptWithSecp256k1 = async (
  message: string,
  recipientPubKeyBase64: string
): Promise<{
  ephemeralPubKey: string;
  encryptedMsg: string;
  iv: string;
}> => {
  try {
    // Генерируем эфемерный приватный ключ
    const ephemeralPrivKey = secp256k1.utils.randomPrivateKey();

    // Получаем эфемерный публичный ключ
    const ephemeralPubKey = secp256k1.getPublicKey(ephemeralPrivKey);

    // Декодируем публичный ключ получателя из base64
    const recipientPubKey = base64ToUint8Array(recipientPubKeyBase64);

    // Получаем общий секрет используя ECDH
    const sharedSecret = await secp256k1.getSharedSecret(ephemeralPrivKey, recipientPubKey);

    // Создаем ключ для AES из общего секрета (берем первые 32 байта)
    const aesKey = await window.crypto.subtle.importKey(
      'raw',
      sharedSecret.slice(1), // Пропускаем первый байт (0x02 или 0x03)
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );

    // Генерируем IV для AES
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Шифруем сообщение
    const encodedMessage = new TextEncoder().encode(message);
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encodedMessage
    );

    return {
      ephemeralPubKey: uint8ArrayToBase64(ephemeralPubKey),
      encryptedMsg: uint8ArrayToBase64(new Uint8Array(encryptedData)),
      iv: uint8ArrayToBase64(iv),
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Encryption failed');
  }
};

export const decryptWithSecp256k1 = async (
  encryptedData: {
    ephemeralPubKey: string;
    encryptedMsg: string;
    iv: string;
  },
  privateKeyBase64: string
): Promise<string> => {
  try {
    // Декодируем приватный ключ из base64
    const privateKey = base64ToUint8Array(privateKeyBase64);

    // Декодируем эфемерный публичный ключ
    const ephemeralPubKey = base64ToUint8Array(encryptedData.ephemeralPubKey);

    // Получаем общий секрет
    const sharedSecret = await secp256k1.getSharedSecret(privateKey, ephemeralPubKey);

    // Создаем ключ для AES из общего секрета
    const aesKey = await window.crypto.subtle.importKey(
      'raw',
      sharedSecret.slice(1), // Пропускаем первый байт
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );

    // Декодируем IV и зашифрованное сообщение
    const iv = base64ToUint8Array(encryptedData.iv);
    const encryptedMsg = base64ToUint8Array(encryptedData.encryptedMsg);

    // Расшифровываем сообщение
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encryptedMsg
    );

    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Decryption failed');
  }
};
