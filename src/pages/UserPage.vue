<template>
  <template v-if="user">
    <van-image style="margin-left: 25%"
          round
          width="12rem"
          height="12rem"
          :src="user.avatarUrl"
    />
    <van-cell title="当前用户账号" :value="user?.userAccount"/>
    <van-cell title="修改个人信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
  </template>
  <van-button type="danger" block @click="logout" style="width: 80%;margin-left: 10%;margin-top: 30%">注销
  </van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUserState} from "../states/user";
import {currentID} from "../states/currentID";

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const logout = () => {
  const res = myAxios.post('/user/logout?id='+currentID.value)
  console.log(res.data, '用户注销');
  console.log(res.code, '退出码');
  if (res.code === undefined  ) {
    Toast.success('注销成功！');
    // 跳转到之前的页面
    router.push({
      path: '/user/login'
    });
  } else {
    Toast.fail('注销失败！');
  }
}


</script>

<style scoped>

</style>
