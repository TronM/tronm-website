<template>
    <header class="container-fluid border-bottom">
        <div class="row">
            <div class="col logo">
                <router-link :to="{name:'home'}"><img src="../assets/img/logo.png" alt="创睦互动"></router-link>
            </div>
            <div class="col-6 d-none d-sm-block title">创睦互动</div>
            <div class="col user"><span></span>{{nick}} <a href="javascript:;" v-show="nick !== ''" @click="logout()">Logout</a></div>
        </div>

        <Modal modal-id="login" title="登陆">
            <template slot="body">
                <div class="form-group row loginError" v-show="isLoginError">
                    <div class="col-12">登陆失败，用户名或密码错误</div>
                </div>
                <div class="form-group row">
                    <label for="inputUsername" class="col-sm-3 col-form-label">用户名</label>
                    <div class="col-sm-9">
                    <input type="text" class="form-control username" placeholder="用户名" v-model="form.fields.username" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword2" class="col-sm-3 col-form-label">密码</label>
                    <div class="col-sm-9">
                    <input type="password" class="form-control" placeholder="请输入密码" v-model="form.fields.password" @keyup.enter="login()">
                    </div>
                </div>
            </template>
            <template slot="footer">
                <button type="button" class="btn btn-primary" @click="login()">登入</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            </template>
        </Modal>
    </header>
</template>

<script>
import $ from 'jquery';
import Modal from '@/components/Modal.vue';
import auth from '@/api/website/auth';

const fields = {
    username: '',
    password: ''
};

export default {
    components: { Modal },
    data() {
        return {
            nick: '',
            isLoginError: false,
            form: {
                fields
            }
        };
    },
    mounted() {
        $('#login').on('shown.bs.modal', () => {
            $('.username').trigger('focus');
        });
        $('header .user span').on('click', () => {
            if (this.nick) { return; }
            $('#login').modal('show');
        });

        if (localStorage.user) {
            this.nick = localStorage.user;
        }
    },
    methods: {
        async login() {
            try {
                await auth.login({ username: this.form.fields.username, password: this.form.fields.password });
                $('#login').modal('hide');
                this.nick = this.form.fields.username;
                this.form.fields = Object.assign({}, fields);

                this.$router.push({ path: '/' });
            } catch (err) {
                this.isLoginError = true;
                this.form.fields.password = '';
            }
        },
        async logout() {
            try {
                await auth.logout();
                this.nick = '';
                // this.$router.push({ path: '/' });
            } catch (err) {
                console.log(err);
            }
        }
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
            background-image: url('../assets/icon/main.png');
            background-size: auto;
            background-position-y: 0;
            float: right;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            margin-left: 20px;
            background-position-x: 0;

            &:hover {
                background-position-y: -35px;
            }
        }

        a {
            margin-left: 20px;
            cursor: pointer;
            color: #000;
        }
    }

    .modal-dialog {
        top: 50vh;
        transform: translateY(-60%) !important;

        .loginError {
            color: red;
            text-align: center;

            div {
                text-align: center;
            }
        }
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