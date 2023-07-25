<template>
  <van-row justify="center">
      <van-image v-if="user && user.avatarUrl" :src="user?.avatarUrl" round width="128" height="128"/>
      <van-image v-else src="https://img.qimuu.icu/typory/teamImg1.jpg" round width="128" height="128" />
  </van-row>
  <van-cell-group inset style="margin-top: 20px">
      <van-cell title="昵称" :value="user?.username"/>
      <van-cell title="标签">
          <template #value>
              <van-tag v-if="user?.tags.length>0" v-for="tag in user?.tags" plain type="danger"
                       style="margin-right: 8px">
                  {{ tag }}
              </van-tag>
              <span v-else>该用户暂未填写标签</span>
          </template>
      </van-cell>
      <van-cell title="个性签名">
          <template #value>
              <van-cell :content="user?.profile || '该用户暂未填写个性签名'"/>
          </template>
      </van-cell>
      <van-cell title="性别">
          <span v-if="user?.gender===0">男</span>
          <span v-else-if="user?.gender===1">女</span>
          <!-- <span v-else-if="user?.gender===2">保密</span> -->
          <span v-else>该用户暂未填写性别</span>
      </van-cell>
      <!--        <van-cell title="电话" :value="user?.phone"/>-->
      <van-cell title="邮箱" :value="user?.email || '该用户暂未填写邮箱'"/>
  </van-cell-group>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Toast} from "vant";
import request from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";
import myAxios from "../plugins/myAxios";
//默认头像
const defaultPicture = "https://img.qimuu.icu/typory/teamImg1.jpg"
const currentUser = ref()
const route = useRoute()
const user = ref()
const loginUser = ref({
  user: {},
  userIds: []
})

onMounted(async () => {
    currentUser.value = await getCurrentUser();
    let res = await myAxios.get("/user/" + route.query.id);
    // let res = await request.get(`/user/${route.params.id}`);
    Toast.success(res.data);
    if (res?.data.code === 0) {
        if (res.data.data.tags) {
            res.data.data.tags = JSON.parse(res.data.data.tags)
        }
        user.value = res.data.data
    }
})
</script>

<style scoped>

</style>