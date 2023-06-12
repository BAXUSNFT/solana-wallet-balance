const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

const walletAddress = '9T6LCiDaEFn76sLeVHL98AxwNjj7hfFwrh62ksJwVdge';
const usdcMintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

async function getWalletBalance() {
  const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
  const walletPublicKey = new web3.PublicKey(walletAddress);
  const usdcMintPublicKey = new web3.PublicKey(usdcMintAddress);

  // Fetch token account balance
  const usdcTokenAccount = await splToken.getAssociatedTokenAddress(
    usdcMintPublicKey,
    walletPublicKey
  );
  // const accountInfo = await connection.getAccountInfo(usdcTokenAccount);

  const solBalance = await connection.getBalance(walletPublicKey);
  const tokenAmount = await connection.getTokenAccountBalance(usdcTokenAccount);
  const balance = {
    sol: solBalance / web3.LAMPORTS_PER_SOL,
    usdc: tokenAmount.value.uiAmount || 0,
  };
  return balance;
}

getWalletBalance().then((balance) =>
  console.log('USDC BALANCE: ', balance.usdc)
);
