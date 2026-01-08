import { createBLAKE3, IHasher } from 'hash-wasm';

let blake3: IHasher | null = null;

export async function initHash(): Promise<void> {
  if (!blake3) {
    blake3 = await createBLAKE3();
  }
}

export function getHash(buffer: Buffer): string {
  if (!blake3) {
    return 'pending';
  }

  try {
    blake3.init();
    blake3.update(buffer);

    return blake3.digest('hex');
  } catch (err: unknown) {
    console.error('BLAKE3 hash error:', err);

    throw { success: false, error: (err as Error).message };
  }
}
