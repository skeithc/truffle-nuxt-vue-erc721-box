<script setup lang="ts">
definePageMeta({ title: 'Mint' })

let wallet;
let ethers;

async function onMint() {
  if (!process.client) {
    return;
  }

  if (!wallet || !ethers) {
    wallet = (await import('../store/wallet')).useWallet();
    ethers = await import('ethers');
  }

  if (!wallet.provider) {
    await wallet.connect();
  }

  const contractInfo = await $fetch('/api/contract');
  const contract = new ethers.Contract(
    contractInfo.address,
    contractInfo.abi,
    wallet.provider.getSigner()
  );

  const mintPrice = await contract.MINT_PRICE();

  await contract.mint({ value: mintPrice });
}
</script>

<template>
  <section>

    <header class="fixed top-0 w-screen text-center p-10">
      <span class="text-2xl">
        Magic Token Mint
      </span>
    </header>

    <footer class="fixed bottom-0 w-screen text-center p-10">
      <button class="rounded-full bg-yellow-500 p-5 px-10 text-xl text-black" @click="onMint">
        Mint Now!
      </button>
    </footer>

  </section>
</template>

<style scoped lang="stylus">

</style>
