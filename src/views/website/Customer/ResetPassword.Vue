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
                        <button type="button" class="btn btn-primary">确认修改</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">修改成功</h5>
                <p class="card-text">即将返回首页</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
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