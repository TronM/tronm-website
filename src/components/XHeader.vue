<template>
    <header class="container-fluid border-bottom">
        <div class="row">
            <div class="col logo">
                <router-link :to="{name:'home'}"><img src="../assets/img/logo.png" alt="创睦互动"></router-link>
            </div>
            <div class="col-6 d-none d-sm-block title">创睦互动</div>
            <div class="col user">用户</div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less">
header {
    @height: 90px;
    height: @height;

    .row > div {
        line-height: @height;
        height: @height;
    }

    .logo {
        img {
            height: 80%;
        }
    }

    .title {
        text-align: center;
        font-size: 36px; /* no */
        font-weight: bold;
        letter-spacing: 4px;
    }

    .user {
        text-align: right;
    }
}

@media screen and (max-width: 768px) {
// 手机
header {
    @height: 60px;
    height: @height;

    .row > div {
        line-height: @height;
        height: @height;
    }
}

}
</style>