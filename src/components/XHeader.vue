<template>
    <header class="container-fluid border-bottom">
        <div class="row">
            <div class="col logo">
                <router-link :to="{name:'home'}"><img src="../assets/img/logo.png" alt="创睦互动"></router-link>
            </div>
            <div class="col-6 d-none d-sm-block title">创睦互动</div>
            <div class="col user"><span></span>username</div>
        </div>

        <Modal modal-id="login" title="登陆">
            <template slot="body">
                <div class="form-group row">
                    <label for="inputUsername" class="col-sm-3 col-form-label">用户名</label>
                    <div class="col-sm-9">
                    <input type="text" class="form-control" id="inputUsername" placeholder="用户名">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword2" class="col-sm-3 col-form-label">密码</label>
                    <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputPassword2" placeholder="确认新密码">
                    </div>
                </div>
            </template>
            <template slot="footer">
                <button type="button" class="btn btn-primary">登入</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            </template>
        </Modal>
    </header>
</template>

<script>
import Modal from '@/components/Modal.vue';
import $ from 'jquery';

export default {
    components: { Modal },
    data() {
        return {};
    },
    mounted() {
        // $('#login').on('shown.bs.modal', function () {
        //     $('#myInput').trigger('focus')
        // })
        $('header .user').on('click', () => {
            $('#login').modal('show');
        });
    }
};
</script>

<style lang="less">
header {
    @height: 90px;
    height: @height;

    >.row > div {
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

        span {
            display: block;
            width: 35px;
            height: 35px;
            background-image: url('../assets/icon/user.png');
            background-size: 100% auto;
            background-position-y: 0;
            float: right;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            margin-left: 10px;

            &:hover {
                background-position-y: -35px;
            }
        }
    }

    .modal-dialog {
        top: 50%;
        transform: translateY(-60%) !important;
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