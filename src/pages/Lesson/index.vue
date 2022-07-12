<template>
  <div class="documentLayout">
    <div class="sider">
      <a-collapse
        ghost
        class="collapse_tabs"
        v-model:activeKey="expandKey"
        :destroyInactivePanel="true"
        expandIconPosition="right"
      >
        <template #expandIcon="{ isActive }">
          <CaretRightOutlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          v-for="item of $store.state.directoryList"
          :key="item.id"
          :header="item.title"
        >
          <p
            v-for="childrenItem of item.children"
            @click="getDocument(childrenItem.id)"
            :key="childrenItem.id"
            :class="{ active: childrenItem.id === documentId }"
          >
            {{ childrenItem.title }}
          </p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div class="content">
      <span class="expand">
        <RightOutlined class="icon" @click="visible = true" />
      </span>
      <div class="html braft-output-content" v-html="html"></div>
      <div class="footerInfo">
        <span> 更新时间: {{ documentInfo.updatedAt }}</span>
        <div v-if="!documentInfo.clickNum">
          <span
            ><EyeOutlined :style="{ color: 'rgb(117 109 109)' }" /> 阅读量:
            {{ documentInfo.readNum }}</span
          >
          <!-- <span
            ><HeartFilled
              :style="{ color: 'red' }"
              class="like"
            />
            点赞量: {{ documentInfo.likeNum }}</span
          > -->
        </div>
        <div v-else>
          <span>点击量: {{ documentInfo.clickNum }}</span>
        </div>
      </div>
    </div>
  </div>
  <a-drawer
    v-model:visible="visible"
    class="expandDrawer"
    title=" "
    :bodyStyle="{
      paddingLeft: 0,
    }"
    placement="left"
    :closable="false"
    width="240"
  >
    <a-collapse
      ghost
      class="collapse_tabs"
      v-model:activeKey="expandKey"
      :destroyInactivePanel="true"
      expandIconPosition="right"
    >
      <template #expandIcon="{ isActive }">
        <CaretRightOutlined :rotate="isActive ? 90 : 0" />
      </template>
      <a-collapse-panel
        v-for="item of $store.state.directoryList"
        :key="item.id"
        :header="item.title"
      >
        <p
          v-for="childrenItem of item.children"
          @click="getDocument(childrenItem.id)"
          :key="childrenItem.id"
          :class="{ active: childrenItem.id === documentId }"
        >
          {{ childrenItem.title }}
        </p>
      </a-collapse-panel>
    </a-collapse>
  </a-drawer>
</template>

<script>
import { watch, computed, ref } from "vue";
import { useStore } from "vuex";
import {
  getDirectorListOfDocument,
  getHtml,
  getLessonHtml,
} from "@/services/global";
import "braft-editor/dist/output.css";
import BlockLoading from "@/components/base_components/BlockLoading.vue";
import { notice } from "@/utils/utils";
import moment from "moment";
import {
  EyeOutlined,
  HeartFilled,
  RightSquareOutlined,
  RightOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    BlockLoading,
    EyeOutlined,
    HeartFilled,
    RightSquareOutlined,
    RightOutlined,
    CaretRightOutlined,
  },
  setup() {
    const store = useStore();
    const html = ref("");
    const visible = ref(false);
    const documentInfo = ref({
      updatedAt: "",
      readNum: 0,
      likeNum: 0,
    });
    const documentId = ref(undefined);
    const expandKey = ref(undefined);
    const getLesson = computed(() => store.state.lesson);

    // 获取文章html内容
    const getDocument = async (currentID) => {
      if (!currentID) return;
      if (currentID === documentId.value) return;
      if (visible.value) {
        visible.value = false;
      }
      getHtml(currentID)
        .then((res = {}) => {
          const { html: documentHtml = "", readNum, likeNum, updatedAt } = res;
          window.scroll(0, 0);
          html.value = documentHtml;
          documentInfo.value = {
            readNum,
            likeNum,
            updatedAt: updatedAt
              ? moment(new Date(updatedAt).valueOf()).format("YYYY-M-D H:mm:ss")
              : "",
          };
          documentId.value = currentID;
        })
        .catch((err) => {
          console.log(err);
          notice(
            "error",
            "请求错误",
            "文章获取错误，请刷新网站或者联系管理员！"
          );
        })
        .finally(() => {});
    };

    // 请求目录数据
    const getDirectory = async (lessonId) => {
      if (!lessonId) return;
      expandKey.value = undefined;
      getDirectorListOfDocument(lessonId)
        .then((res = []) => {
          if (Array.isArray(res) && res.length > 0) {
            store.commit("setDirectoryList", res);
          } else {
            store.commit("setDirectoryList", []);
          }
        })
        .catch(() => {
          notice(
            "error",
            "请求错误",
            "课程目录获取错误，请刷新网站或者联系管理员！"
          );
        })
        .finally(() => {});
    };

    // 获取课程介绍文章
    const handleLessonHtml = async (id) => {
      if (!id) return;
      getLessonHtml(id)
        .then((res) => {
          const { html: documentHtml = "", clickNum, updatedAt } = res;
          window.scroll(0, 0);
          html.value = documentHtml;
          documentInfo.value = {
            clickNum,
            updatedAt: updatedAt
              ? moment(new Date(updatedAt).valueOf()).format("YYYY-M-D H:mm:ss")
              : "",
          };
        })
        .catch((err) => {})
        .finally(() => {});
    };

    // 监控路由切换
    watch(
      getLesson,
      async (lesson = {}) => {
        const { id } = lesson;
        if (id) {
          html.value = ""; // 重制文章内容
          documentId.value = undefined; // 重制选择文章id
          store.commit("setDirectoryList", []); // 重制目录
          // 载入课程文章
          handleLessonHtml(id);
          await getDirectory(id);
        }
      },
      { immediate: true, deep: true }
    );

    return {
      getDocument,
      documentId,
      documentInfo,
      html,
      visible,
      expandKey,
    };
  },
};
</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
