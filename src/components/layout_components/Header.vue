<template>
  <header>
    <div class="logoBox" @click="goHome">
      <BookOutlined class="icon" data-aos="fade-down" data-aos-duration="800" />
      <span data-aos="fade-down" data-aos-duration="1000"
        >前端工程师培养计划</span
      >
    </div>
    <ul>
      <li
        v-for="(item, index) of menu"
        :key="item.id"
        data-aos="fade-left"
        @click="selectLesson(item)"
        :data-aos-delay="(index + 1) * 50"
        data-aos-duration="1000"
      >
        <a :class="{ active: item.id === $store.state.lesson.id }">{{
          item.name || ""
        }}</a>
      </li>
      <li data-aos="fade-left" :data-aos-delay="350" data-aos-duration="1000">
        <a-dropdown>
          <a>其他</a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">关于我</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </li>
    </ul>
    <svg-icon class="menu" name="menu" @click="visible = true" />
  </header>
  <a-drawer
    v-model:visible="visible"
    class="menuDrawer"
    title=" "
    placement="right"
    :closable="false"
    width="200"
  >
    <ul>
      <li v-for="item of menu" :key="item.id" @click="selectLesson(item)">
        <a :class="{ active: item.id === $store.state.lesson.id }">{{
          item.name || ""
        }}</a>
      </li>
      <li><a>其他</a></li>
    </ul>
  </a-drawer>
</template>

<script>
import { BookOutlined } from "@ant-design/icons-vue";
import { watch, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import menu from "@/config/menu";
import { FireOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    BookOutlined,
    FireOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRoute();
    const routers = useRouter();
    const visible = ref(false);

    const currentPath = computed(() => router.path);

    watch(currentPath, (path = "") => {
      if (path === "/") {
        store.commit("setLesson", {
          url: "",
          name: "",
          id: undefined,
        });
      }
      const pathList = path.split("/");
      pathList.map((item, index) => {
        if (item === "lesson") {
          if (pathList[index + 1]) {
            // 当前路由对象
            const currentMenu = menu.find(
              (item) => item.url === `/${pathList[index + 1]}`
            );
            if (!currentMenu) {
              routers.push("/404");
              return;
            }
            selectLesson(currentMenu);
          } else {
            routers.push("/404");
          }
        }
      });
    });

    // 选择课程
    const selectLesson = (currentLesson) => {
      const { url, id, name } = currentLesson;
      if (currentLesson.id === store.state.lesson.id) return;
      if (url === "/other") {
        return;
      }
      if (visible.value) {
        visible.value = false
      }
      store.commit("setLesson", { id, name, url });
      const pushPath = `/lesson${url}`;
      if (pushPath !== router.path) {
        routers.push(pushPath);
      }
    };

    const goHome = () => {
      if (router.path === "/") return;
      window.scroll(0, 0);
      routers.push("/");
    };

    return {
      menu,
      visible,
      goHome,
      selectLesson,
    };
  },
};
</script>

<style lang="less" scoped>
header {
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #d8eefe;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 99;

  div.logoBox {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .icon {
      font-size: 45px;
      color: #3da9fc;
      margin-right: 10px;
    }

    span {
      font-size: 26px;
      font-weight: 800;
    }
  }

  ul {
    list-style: none;
    display: block;

    & > li {
      float: left;
      margin: 0 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:last-child {
        margin-right: 0;
      }

      & > a {
        font-size: 20px;
        font-weight: 800;
        color: #0a4067;
        &:hover,
        &.current,
        &.active {
          color: #3da9fc;
        }
      }
    }
  }

  & > svg.menu {
    display: none;
  }
}

.menuDrawer {
  ul {
    list-style: none;
    font-size: 20px;
    font-weight: 600;
    color: #0a4067;
    & > li {
      margin: 5px 0;
      & > a {
        &:hover,
        &.current,
        &.active {
          color: #3da9fc;
        }
      }
    }
  }
}

@media screen and(max-width: 900px) {
  header {
    height: 50px;
    div.logoBox {
      .icon {
        font-size: 40px;
      }
    }
    div.logoBox {
      .icon {
        display: block;
      }
    }
    ul {
      display: none;
    }
    & > svg.menu {
      display: block;
      font-size: 40px;
    }
  }
}

@media screen and(max-width: 500px) {
  header {
    div.logoBox {
      span {
        display: none;
      }
    }
  }
}
</style>
