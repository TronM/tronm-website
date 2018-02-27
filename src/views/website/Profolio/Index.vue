<template>
    <div class="profolio-list container-fluid">
        <div class="row tags">
            <div class="col-10 col-sm-12 offset-1 offset-sm-0">
                <div class="toggle">所有项目分类</div>
                <ul class="list">
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>Javascript</li>
                    <li>PHP</li>
                    <li>Nodejs</li>
                    <li>Vue</li>
                    <li>Angular</li>
                </ul>
            </div>
        </div>
        <div class="row profolio">
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">11</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    data() {
        return {
            x: ''
        };
    },
    mounted() {
        this.bindEvents();
    },
    methods: {
        bindEvents() {
            $('.tags .toggle').on('click', () => {
                $('.tags .list').toggle();
            });
        }
    }
};
</script>

<style lang="less">
.profolio-list {
    .tags {
        margin-top: 20px;

        .toggle {
            height: 30px;
            line-height: 30px;
            margin-bottom: 20px;
            text-align: center;
            display: none;
        }
        .list {
            padding: 0;
            margin: 0;
            text-align: center;
            
            li {
                list-style: none;
                display: inline-block;
                height: 36px;
                padding: 0 20px;
                line-height: 34px;
                color: #202121;
                border: 1px solid #202121;
                border-radius: 36px;
                font-size: 16px;
                overflow: hidden;
                transition: all 0.3s ease-in-out;
                margin: 4px 6px;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    color: #49c5b6;
                    border-color: #49c5b6;
                }
            }
        }
    }

    .profolio {
        margin: 0 50px;

        >div {
            margin-top: 30px;
        }
    }
}

@media screen and (max-width: 768px) {
.profolio-list {
    .tags {
        .toggle {
            display: block;
        }
        .list {
            display: none;

            li {
                height: 30px;
                padding: 0 16px;
                line-height: 28px;
                border-radius: 15px;
                font-size: 14px;
                margin: 4px 6px;
            }
        }
    }

    .profolio {
        margin: 0;
    }
}
}
</style>