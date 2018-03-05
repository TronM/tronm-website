<template>
    <div class="reset-password">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">修改密码</h5>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">新密码</label>
                    <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputPassword" placeholder="新密码">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword2" class="col-sm-3 col-form-label">确认新密码</label>
                    <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputPassword2" placeholder="确认新密码">
                    </div>
                </div>
                <div class="row confirm">
                    <div class="col-12">
                        <button type="button" class="btn btn-primary" @click="submit()" :disabled="!isActive">确认修改</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card" v-if="isPasswordChanged">
            <div class="card-body">
                <h5 class="card-title">修改成功</h5>
                <p class="card-text">即将返回首页</p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import auth from '@/api/website/auth';

export default {
    data() {
        return {
            isActive: false,
            isPasswordChanged: false,
            accessToken: '',
            password: ''
        };
    },
    mounted() {
        this.accessToken = this.$route.query.access_token;
        auth.activate(this.accessToken)
            .then(() => {
                this.isActive = true;
                this.$notify.success('用户激活成功，你现在可以修改初始密码了。');
            })
            .catch((err) => {
                console.log(err);
                this.$notify.error('用户激活失败');
            });
    },
    methods: {
        async submit() {
            await auth.resetPassword(this.password, this.accessToken);
            this.isPasswordChanged = true;
            this.$notify.success('密码修改成功');
            $('#login').modal('show');
        }
    }
};
</script>

<style lang="less">
.reset-password {
    .card {
        margin: 100px auto 0 auto;
        width: 500px;
        max-width: 100%;
    }

    .confirm {
        text-align: right;
    }
}
</style>