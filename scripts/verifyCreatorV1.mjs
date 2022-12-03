import { retryVerify } from './contract.mjs';
import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
import esMain from 'es-main';

dotenv.config({
  path: `.env.${process.env.CHAIN}`
});

export async function setupContracts() {
  console.log('verifying creator implementation');
  const dropContractAddress = '0xAa5C3B724c24B71a7F1e4E7b4F1579e55D8481db';
  const editionsMetadataAddress = '0x57309F60C2f675A34214e65AAF935A651287D798';
  const dropMetadataAddress = '0x4C020920423bd626CB777E5836CDaDF935238cd2';
  const creatorV1Address = '0xEa1fa522d070E0c12Ce1375AA1431c4fDC6Fb44A';
  const contract = "'src/ZoraNFTCreatorV1.sol:ZoraNFTCreatorV1'";
  const verified = await retryVerify(3, creatorV1Address, contract, [
    dropContractAddress,
    editionsMetadataAddress,
    dropMetadataAddress
  ]);
  console.log(`[verified] ${verified}`);
}

async function main() {
  await setupContracts();
}

if (esMain(import.meta)) {
  // Run main
  await main();
}
