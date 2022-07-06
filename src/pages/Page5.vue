<template>
  <a-spin :spinning="spinning">
    <a-card class="card">
      <a-descriptions title="nft信息" bordered>
        <a-descriptions-item label="nft数量">{{
          nftInfo.total
        }}</a-descriptions-item>
        <a-descriptions-item label="合约余额">{{
          nftInfo.eth
        }}</a-descriptions-item>
      </a-descriptions>
      <br />
      <a-card title="铸币">
        url:
        <Input :value="url" :onChange="(val) => (url = val)"></Input>
        price:<Input :value="price" :onChange="(val) => (price = val)" />
        <a-button @click="handleMint">铸币</a-button>
      </a-card>
      <a-button @click="handleApprove">授权</a-button>
      <a-button @click="handleTransFrom">转移</a-button>
      <a-button @click="handleTrad">直接转账</a-button>
      <a-button @click="test2">返回数据</a-button>
    </a-card>
    <a-card class="card">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="所有nft" class="tabItem">
          <a-card class="card">
            <a-row :gutter="[16, 16]">
              <a-col :span="12" v-for="(item, index) of nftList" :key="index">
                <a-card>
                  <p>
                    <span>tokenId: </span><span>{{ item.id }}</span>
                  </p>
                  <p>
                    <span>url: </span><span>{{ item.url }}</span>
                  </p>
                  <p>
                    <span>price: </span
                    ><span class="text-orange-600 text-2xl"
                      >{{ item.price }} eth</span
                    >
                  </p>
                  <p>
                    <span>isSale: </span
                    ><span :class="item.isSale ? 'sale' : 'noSale'">{{
                      item.isSale ? "出售中" : "待出售"
                    }}</span>
                  </p>
                  <p>
                    <span>owner: </span>
                    <span>{{ item.owner }}</span>
                  </p>
                  <template
                    v-if="
                      $store.state.userInfo.address ===
                      item.owner.toLocaleLowerCase()
                    "
                  >
                    <a-button v-if="!item.isSale" @click="startSale(item.id)"
                      >发起售卖</a-button
                    >
                    <a-button
                      v-else
                      @click="handleEndSale(item.id)"
                      :class="!item.isSale ? 'sale' : 'noSale'"
                      >撤销售卖</a-button
                    >
                  </template>
                  <template v-else>
                    <a-button
                      v-if="item.isSale"
                      type="primary"
                      @click="handleBuy(item.id, item.price)"
                      >购买</a-button
                    >
                  </template>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的nft" class="tabItem">
          <a-card class="card">
            <a-row :gutter="[16, 16]">
              <a-col
                :span="12"
                v-for="(item, index) of filList($store.state.userInfo.address)"
                :key="index"
              >
                <a-card>
                  <p>
                    <span>tokenId: </span><span>{{ item.id }}</span>
                  </p>
                  <p>
                    <span>url: </span><span>{{ item.url }}</span>
                  </p>
                  <p>
                    <span>price: </span
                    ><span class="text-orange-600 text-2xl"
                      >{{ item.price }} eth</span
                    >
                  </p>
                  <p>
                    <span>isSale: </span
                    ><span :class="item.isSale ? 'sale' : 'noSale'">{{
                      item.isSale ? "出售中" : "待出售"
                    }}</span>
                  </p>
                  <p>
                    <span>owner: </span>
                    <span>{{ item.owner }}</span>
                  </p>
                </a-card>
              </a-col>
            </a-row>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-modal
      :visible="saleModel.visible"
      title="填写价格"
      @ok="handleSale"
      @cancel="closeModal"
    >
      <a-spin :spinning="saleModel.loading">
        price:
        <Input
          :value="saleModel.currentPrice"
          :onChange="(val) => (saleModel.currentPrice = val)"
        ></Input>
      </a-spin>
    </a-modal>
  </a-spin>
</template>

<script>
import { reactive, ref } from "vue";
import {
  getAllNftNum,
  getNftInfo,
  mint,
  getNftOwner,
  onSale,
  rectiveSale,
  transFrom,
  arrpove,
  buyNft,
  test1,
  test2,
} from "@/utils/contract";
import { onMounted } from "@vue/runtime-core";
import Input from "@/components/base_components/Input.vue";
import { message } from "ant-design-vue";
import web3 from "@/utils/web3";

const modelDefault = {
  visible: false,
  currentId: undefined,
  currentPrice: undefined,
  loading: false,
};

export default {
  components: {
    Input,
  },
  setup() {
    console.log("web3", web3);

    const spinning = ref(false);
    const activeKey = ref("1");
    let saleModel = ref(modelDefault);
    const nftInfo = reactive({
      total: 0,
      eth: 0,
    });

    const url = ref("");
    const price = ref();
    const nftList = ref([]);

    const getNftData = async () => {
      spinning.value = true;
      getAllNftNum().then(async (res) => {
        nftInfo.total = res.allNftNum || 0;
        nftInfo.eth = res.eth || 0;
        const list = [];
        for (let i = 1; i <= res; i++) {
          console.log("web3", web3);
          const result = await getNftInfo(i);
          const { isSale, price, url } = result;
          list.push({
            id: i,
            owner: await getNftOwner(i),
            isSale,
            price: web3.web3?.utils?.fromWei(price, "ether") || "NaN",
            url,
          });
        }
        nftList.value = list;
        spinning.value = false;
      });
    };

    onMounted(() => {
      getNftData();
    });

    const handleMint = async () => {
      if (!url.value || !price.value) return;
      spinning.value = true;
      await mint(url.value, price.value)
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {
          console.log("finally");
          spinning.value = false;
          url.value = "";
          price.value = undefined;
          getNftData();
        });
    };

    const startSale = async (id) => {
      saleModel.value = {
        ...saleModel.value,
        visible: true,
        currentId: id,
      };
    };

    const handleSale = async () => {
      if (saleModel.value.loading) return;
      const { currentId, currentPrice } = saleModel.value;
      if (!currentPrice) return;
      saleModel.value = {
        ...saleModel.value,
        loading: true,
      };
      onSale(currentId, currentPrice)
        .then((res) => {
          getNftData();
          message.success("success!");
        })
        .catch((err) => {
          message.error("error");
        })
        .finally(() => {
          closeModal();
        });
    };

    const handleEndSale = async (id) => {
      spinning.value = true;
      rectiveSale(id)
        .then((res) => {
          getNftData();
          message.success("success!");
        })
        .catch((err) => {
          message.error("error");
        })
        .finally(() => {
          spinning.value = false;
        });
    };

    const handleBuy = async (id, price) => {
      spinning.value = true;
      buyNft(id, price)
        .then((res) => {
          getNftData();
          message.success("success!");
        })
        .catch((err) => {
          message.error("error");
        })
        .finally(() => {
          spinning.value = false;
        });
    };

    const closeModal = () => {
      saleModel.value = modelDefault;
    };

    const filList = (cuurentAddress) =>
      nftList.value.filter(
        (item) => item.owner.toLocaleLowerCase() === cuurentAddress
      );

    const handleApprove = async () => {
      arrpove("0x55bB81b1EB0fAd454f454B620de5d3e9ddC091f3", 1);
    };

    const handleTransFrom = async () => {
      transFrom(
        "0x7C7c90c3c4CB54f8F4cc79c0b841e8CB5bAafe54",
        "0x55bB81b1EB0fAd454f454B620de5d3e9ddC091f3",
        1
      );
    };

    const handleTrad = async () => {
      test1(1.15);
    };

    return {
      nftInfo,
      nftList,
      spinning,
      url,
      saleModel,
      price,
      activeKey,
      handleMint,
      handleSale,
      startSale,
      closeModal,
      handleEndSale,
      filList,
      handleApprove,
      handleTransFrom,
      handleTrad,
      handleBuy,
      test2,
    };
  },
};
</script>

<style lang="less" scoped>
.card {
  margin: 10px;
}
.nftBox {
  display: flex;
  justify-content: space-between;
}

.tabItem {
  min-height: 500px;
}
.sale {
  color: green;
}
.noSale {
  color: red;
}
</style>
