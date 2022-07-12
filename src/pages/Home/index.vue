<template>
  <div class="home">
    <ReadOutlined class="banner" :style="{ color: '#3EA9FC' }" />
    <h1>针对前端工程师的学习指南</h1>
    <div
      data-aos="fade-right"
      data-aos-offset="200"
      data-aos-delay="100"
      data-aos-duration="800"
    >
      <button
        @click="selectLesson(menu[0])"
        class="bttn-unite bttn-lg bttn-primary"
      >
        Get Started →
      </button>
    </div>
    <ul>
      <li
        v-for="(item, index) of menu"
        :key="index"
        data-aos="fade-up"
        data-aos-offset="100"
        @click="selectLesson(item)"
        :data-aos-delay="(index + 1) * 100"
        data-aos-duration="800"
      >
        <svg-icon :name="item.icon" />
        <span class="title">{{ item.name }}</span>
        <span class="describe">{{ item.describe }}</span>
      </li>
    </ul>
    <footer>
      <div>
        <p><a>关于我</a> | <a>© 2022 GitHub, Inc.</a></p>
      </div>
      <div>
        <GithubFilled class="icons" />
        <WechatFilled class="icons" :style="{ margin: '0 15px' }" />
        <WeiboCircleFilled class="icons" />
      </div>
    </footer>
  </div>
</template>

<script>
import {
  ReadOutlined,
  GithubFilled,
  WechatFilled,
  WeiboCircleFilled,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import menu from "@/config/menu";

export default {
  components: {
    ReadOutlined,
    GithubFilled,
    WechatFilled,
    WeiboCircleFilled,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const routers = useRouter();
    const filterMenu = () => menu.filter((item) => item.url !== "/other");

    // 选择课程
    const selectLesson = (currentLesson) => {
      const { url, id, name } = currentLesson;
      store.commit("setLesson", { id, name, url });
      const pushPath = `/lesson${url}`;
      if (pushPath !== router.path) {
        routers.push(pushPath);
      }
    };

    return {
      menu: filterMenu(menu),
      selectLesson,
    };
  },
};
</script>

<style lang="less" scoped>
@import url(./button.css);
@import url(./index.less);
</style>
