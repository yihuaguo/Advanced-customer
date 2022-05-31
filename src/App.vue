<script>
import AOS from "aos";
import 'aos/dist/aos.css';

export default {

  setup() {
    AOS.init({
      duration: 1000,
      once: true
    });

    return {

    }
  }
}

</script>

<template>
  <header>
    <div class="wrapper">
      <div class="logoRouterBox">
        <img src="./assets/icon/logo.png" data-aos="fade-down" data-aos-delay="100" />
        <ul>
          <li data-aos="fade-down" data-aos-delay="100">Home</li>
          <li data-aos="fade-down" data-aos-delay="200">Home2</li>
          <li data-aos="fade-down" data-aos-delay="300">Home3</li>
          <li data-aos="fade-down" data-aos-delay="400">Home4</li>
        </ul>
      </div>
      <ul class="shareBox">
        <li><img src="./assets/icon/airplane.png" /></li>
        <li><img src="./assets/icon/camera.png" /></li>
        <li><img src="./assets/icon/robot.png" /></li>
        <li><img src="./assets/icon/twitter.png" /></li>
      </ul>
    </div>
  </header>
  <router-view>
  </router-view>
  <footer>footer</footer>
</template>

<style lang="less" scoped>
header {
  width: 100%;
  height: 72px;
  background-color: #24242A;
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

      &>ul {
        display: flex;
        align-items: center;
        margin-bottom: 0;

        &>li {
          color: white;
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    &>ul.shareBox {
      display: flex;
      align-items: center;
      margin-bottom: 0;

      &>li {
        margin-left: 10px;

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}


/* <=992 笔记本 */
@media screen and (max-width: 992px) {}

/* <=768 平板电脑 */
@media screen and (max-width: 768px) {}

/* <= 576 移动手机 */
@media screen and (max-width: 576px) {}
</style>
