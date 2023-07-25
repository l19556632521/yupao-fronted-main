<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"  
          @click="toEdit('username', '昵称', user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="">
          <img style="height: 48px" :src="user.avatarUrl" :value="user.avatarUrl"
          @click="toEdit('avatarUrl', '头像', user.avatarUrl)"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" 
          @click="toEdit('gender', '性别', user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" 
          @click="toEdit('phone', '电话', user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" 
          @click="toEdit('email', '邮箱', user.email)"/> 
    <van-cell :value = "user.tags" is-link
              @click="tagUpdate(user.tags,user.id,'tags')">
      <template #title>
        <span class="custom-title">我的标签</span>
      </template>
    </van-cell>
    <van-cell title="星球编号" is-link to="/user/edit" :value="user.planetCode"
          @click="toEdit('planetCode', '星球编号', user.planetCode)"/>
    <van-cell title="注册时间"  :value="user.createTime" />
  </template>
</template>



<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import { getCurrentUser } from "../services/user";

const router = useRouter();
const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})


const toEdit = (editKey: string, editName: string, currentValue: string) => {
  console.log("发请求啦" + editKey + editName + currentValue)
  let avatarUrl = '';
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue: avatarUrl,
    }
  })
}

/**
 * 更改标签
 */
 const tagUpdate = (tags: string, id: number) => {
  router.push({
    path: "/search",
    query: {
      id: id,
      tags: JSON.parse(tags),
    }
  })
}
</script>

<style scoped>

</style>