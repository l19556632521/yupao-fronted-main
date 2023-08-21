<template>
  <van-row justify="center">
      <van-image v-if="user && user.avatarUrl" :src="user?.avatarUrl" round width="128" height="128"/>
      <van-image v-else src="https://img.qimuu.icu/typory/teamImg1.jpg" round width="128" height="128" />
  </van-row>
  <van-cell-group inset style="margin-top: 20px">
      <van-cell title="昵称：" :value="user?.username"/>
      <van-cell title="标签：">
          <template #value>
              <van-tag v-if="user?.tags.length>0" v-for="tag in user?.tags" plain type="danger"
                       style="margin-right: 8px">
                  {{ tag }}
              </van-tag>
              <span v-else>该用户暂未填写标签</span>
          </template>
      </van-cell>
      <van-cell title="简介" :value="user?.profile || '该用户暂未填写个人简介'"/>
      <van-cell title="性别：">
          <span v-if="user?.gender===0">男</span>
          <span v-else-if="user?.gender===1">女</span>
          <span v-else>该用户暂未填写性别</span>
      </van-cell>
      <van-cell title="联系方式：" :value="user?.phone || '该用户暂未填写联系方式'"/>
      <van-cell title="个人邮箱：" :value="user?.email || '该用户暂未填写个人邮箱'"/>
  </van-cell-group>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {Toast} from "vant";
import myAxios from "../plugins/myAxios";

const route = useRoute()
const user = ref()

onMounted(async () => {
    //接口 /user/get?id=?
    const res = await myAxios.get("/user/" + route.query.id);
    // @ts-ignore
    if (res?.code === 0) {
        if (res.data.tags) {
            res.data.tags = JSON.parse(res.data.tags);
        }       
        user.value = res.data;
        Toast.success('获取成功');
    } else {
        Toast.fail("获取失败");
    }
})

</script>

<style scoped>

</style>