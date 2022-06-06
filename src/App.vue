<script>
import AOS from "aos";
import 'aos/dist/aos.css';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  setup() {
    AOS.init({
      duration: 1000,
      once: true
    });
    return {}
  }
}

</script>

<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<style lang="less" scoped>
/* <=992 笔记本 */
@media screen and (max-width: 992px) {}

/* <=768 平板电脑 */
@media screen and (max-width: 768px) {}

/* <= 576 移动手机 */
@media screen and (max-width: 576px) {}
</style>
