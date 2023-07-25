<template>
  <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="14">搜索</van-icon>
    </template>
  </van-nav-bar>


  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route v-if="!NOT_SHOW_NAVBAR_AND_TABBAR.includes(route.path)" @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">房间</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {useRoute, useRouter } from "vue-router";
import {ref} from "vue";
import routes from "../config/route";

const NOT_SHOW_NAVBAR_AND_TABBAR = ["/user/login", '/user/register']
const router = useRouter();
const route = useRoute()
const DEFAULT_TITLE = '伙伴汇';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})


const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  router.push('/search')
  // 在路由跳转完成后执行的逻辑
  console.log('跳转到/search页面了');
};

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
