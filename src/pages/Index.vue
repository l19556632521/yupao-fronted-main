<template>
  <van-cell center title="匹配模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <template v-if="!isMatchMode">
    <van-empty v-if="!userList || userList.length < 1" description="无符合的队伍"/>
      <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
          style="margin-bottom: 0"
      />
  </template>
</template>


<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref(true);
const currentPage =ref(1)
/**
 * 加载数据
 */
const loadData = async () => {
  let userListData;
  loading.value = true;
  // 心动模式，根据标签匹配用户
  if (isMatchMode.value) {
    const num = 5;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed', response);
          Toast.success("开启匹配模式");
          console.log('Response data:', response.data); // 添加这行打印语句
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          Toast.fail('请求失败');
        })
    } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageNum:currentPage.value,
        pageSize:10,
      }
    })
        .then(function (response) {
          console.log(response);
          if (response?.data === null){
            Toast.fail( '' + (response.data?.description ? `${response.data?.description}` : ''))
            return null;
          }
          console.log('Response data:', response.data); // 添加这行打印语句
          return response?.data;
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
  }
  console.log('userListData= ' + userListData);
  if (userListData) {
    userListData.forEach((user: UserType) => {
      // console.log('Looping through user:', user);
      if (user.tags) {
        console.log('user.tags' + user.tags); // 将要解析的 JSON 字符串
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

</script>

<style scoped>

</style>
