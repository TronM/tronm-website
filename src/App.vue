<template>
    <div id="app">
        <x-header></x-header>
        <router-view/>
    </div>
</template>

<script>
import XHeader from '@/components/XHeader';
export default {
    name: 'app',
    components: { XHeader }
};
</script>

<style lang="less">
@import url('./assets/style/icon.less');

html, body {
    padding: 0;
    margin: 0;
}

body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
}
</style>