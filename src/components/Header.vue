<template>
  <header>
    <div class="wrapper">
      <div class="logoRouterBox">
        <img src="@/assets/icon/logo.png" data-aos="fade-down" data-aos-delay="100" />
      </div>
      <div>
        <button @click="handleLogin">
          {{ isLogin ? $store.state.userInfo.address : 'connect wallet' }} - ({{
              $store.state.userInfo.chain
          }})
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { useStore } from "vuex";
import { getAddress, getChain } from "@/utils/web3";
import { ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { getChainName } from '@/utils/other'

export default {
  setup() {
    const isLogin = ref(false);
    const store = useStore();

    // 判断钱包连接-监控钱包
    onMounted(async () => {
      // console.log("window.ethereum", window.ethereum);
      const currentAddress = window.ethereum.selectedAddress;
      const currentChain = getChainName(await getChain());
      store.commit("setUserInfo", {
        address: currentAddress || "",
        chain: currentChain
      });
      isLogin.value = currentAddress ? true : false;
      // 监控账户切换
      window.ethereum.on("accountsChanged", addressList => {
        const userInfo = store.getters.getUserInfo;
        store.commit("setUserInfo", {
          ...userInfo,
          address: addressList.length ? addressList[0] : ""
        });
        isLogin.value = addressList.length ? true : false;
      });
      // 监控网络切换
      window.ethereum.on("chainChanged", async () => {
        const userInfo = store.getters.getUserInfo;
        const chain = getChainName(await getChain());
        store.commit("setUserInfo", {
          ...userInfo,
          chain
        });
      });
    });

    // 连接钱包
    const handleLogin = async () => {
      if (isLogin.value) {
        message.info("钱包已连接!");
      } else {
        const address = await getAddress();
        if (address) {
          const chain = getChainName(await getChain());
          store.commit("setUserInfo", {
            address,
            chain
          });
          isLogin.value = true;
        }
      }
    };

    return {
      isLogin,
      handleLogin
    };
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 72px;
  background-color: #24242a;
  position: sticky;
  top: 0;
  z-index: 99;

  &>div.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;

    &>div.logoRouterBox {
      display: flex;
      align-items: center;

      &>img {
        width: 100px;
        margin-right: 20px;
      }
    }

  }
}
</style>