<template>
  <header>
    <div class="logoBox">
      <BookOutlined class="icon" data-aos="fade-down" data-aos-duration="600" />
      <!-- <span data-aos="fade-down" data-aos-duration="800">前端面试指南</span> -->
      <span data-aos="fade-down" data-aos-duration="800">指南</span>
    </div>
    <ul v-if="menuList.length > 0">
      <li v-for="item, index of menuList" :key="item.id" @click="handleLesson(item.url, item.id)" data-aos="fade-left"
        :data-aos-delay="(index + 1) * 50" data-aos-duration="1000">{{ item.name }}
      </li>
    </ul>
    <LineLoading v-else />
  </header>
</template>

<script>
import {
  BookOutlined
} from '@ant-design/icons-vue';
import { getMenuList } from '@/services/global'
import { onMounted, ref } from 'vue'
import { notice } from '@/utils/utils'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import LineLoading from '../base_components/lineLoading.vue';

export default {
  components: {
    BookOutlined,
    LineLoading
  },
  setup() {

    const store = useStore()
    const routers = useRouter()
    const menuList = ref([])

    const handleLesson = (url, id) => {
      if (id === store.state.lesson.id) return
      routers.push(`/lesson${url}`)
      store.commit('setLesson', { url, id })
    }

    onMounted(() => {
      getMenuList().then(res => {
        menuList.value = res || []
        if (res && res.length > 0) {
          const { url, id } = res[0]
          handleLesson(url, id)
        }
      }).catch(() => {
        notice('warning', '请求错误', '菜单获取错误，请刷新网站或者联系管理员！')
      })
    });

    return {
      menuList,
      handleLesson
    };
  }
};
</script>

<style lang="less" scoped>
header {
  padding: 0 20px;
  height: 80px;
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

    &>li {
      float: left;
      font-size: 20px;
      font-weight: 800;
      margin: 0 10px;
      cursor: pointer;
      transition: all 0.3s;

      &:last-child {
        margin-right: 0;
      }

      &:hover,
      &.current {
        color: #3da9fc;
      }
    }
  }

}
</style>