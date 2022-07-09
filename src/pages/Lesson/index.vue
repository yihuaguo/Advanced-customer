<template>
    <div class="documentLayout">
        <div class="sider">
            <ul v-for="item of $store.state.directoryList" :key="item.id">
                <li>{{ item.title }}</li>
                <li v-for="childrenItem of item.children" @click="selectDocument(childrenItem.id)"
                    :key="childrenItem.id" :class="{ 'active': childrenItem.id === $store.state.documentId }">{{
                            childrenItem.title
                    }}</li>
            </ul>
        </div>
        <div class="content">
            <div v-html="html"></div>
            <div class="footerInfo">123</div>
        </div>
    </div>
</template>

<script>
import { watch, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getDirectorListOfDocument, getHtml } from '@/services/global'
import { message } from 'ant-design-vue'
import nprogress from 'nprogress';
import { useRouter } from "vue-router"
import 'nprogress/nprogress.css';
import BlockLoading from '@/components/base_components/BlockLoading.vue';

export default {
    components: {
        BlockLoading
    },
    setup() {
        const store = useStore()
        const html = ref('')
        const routers = useRouter()
        const getLesson = computed(() => store.state.lesson)
        const getDocumentId = computed(() => store.state.documentId)

        const handleGetHtml = async (documentId) => {
            nprogress.start()
            getHtml(documentId).then(res => {
                html.value = res || ''
            }).catch(() => {
                message.error('获取文章错误！')
            }).finally(() => {
                nprogress.done();
            })
        }

        watch(getLesson, (lesson) => {
            const { id } = lesson
            if (!id) return
            getDirectorListOfDocument(id).then(res => {
                html.value = ''
                store.commit('setDirectoryList', res || [])
                if (res && res.length > 0) {
                    for (const item of res) {
                        if (item.children.length > 0) {
                            const currentId = item.children[0].id
                            store.commit('setDocumentId', currentId)
                            routers.push(`/lesson${store.state.lesson.url}/${currentId}`)
                            handleGetHtml(currentId)
                            break;
                        }
                    }
                }
            }).catch(() => {
                message.error('获取菜单错误！')
            }).finally(() => {
            })
        }, { immediate: true, deep: true });

        watch(getDocumentId, (documentId) => {
            handleGetHtml(documentId)
        })

        const selectDocument = async (documentId) => {
            if (documentId === store.state.documentId) return
            store.commit('setDocumentId', documentId)
            routers.push(`/lesson${store.state.lesson.url}/${documentId}`)
        }

        return {
            selectDocument,
            html
        }
    }
}

</script>

<style lang="less" scoped>
div.documentLayout {
    position: relative;

    div.sider {
        position: fixed;
        width: 300px;
        left: 0;
        height: calc(100vh - 80px);
        overflow-y: scroll;
        box-sizing: border-box;
        border-right: 1px solid rgb(220, 215, 215);
        padding: 20px;
        display: block;

        ul {
            margin-bottom: 30px;

            &>li {
                font-size: 16px;
                font-weight: 600;
                margin: 10px 0 10px 10px;
                color: #5f6c7b;
                cursor: pointer;

                &:first-child {
                    color: #094067;
                    font-size: 18px;
                    font-weight: 800;
                    margin-top: 0;
                    margin-left: 0;

                    &:hover,
                    &.active {
                        color: #094067;
                    }
                }

                &:hover,
                &.active {
                    color: #3da9fc;
                }
            }

        }
    }

    div.content {
        margin-left: 300px;
        min-height: 1500px;
        padding: 20px;

        div.footerInfo {}
    }
}
</style>