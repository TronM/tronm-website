<template>
    <div class="portfolio-detail">
        <section class="kv">
            <img :src="detail.kv" alt="">
            <div class="button">
                <a class="icon icon-pc" :href="`http://${detail.browseUrl.pc}`" target="_blank"></a>
                <span class="icon icon-mobile" @click="show.qr = !show.qr">
                    <div class="qr-box" :class="{ 'qr-hidden': !show.qr }">
                        <div class="qr"></div>
                        <div class="triangle"></div>
                    </div>
                </span>
                <span class="icon icon-share" @click="show.share = !show.share"></span>
                <span class="icon icon-weibo" :class="{ hidden: !show.share }"></span>
                <span class="icon icon-weixin" :class="{ hidden: !show.share }"></span>
            </div>
            <div class="page">
                <span class="icon icon-prev" @click="linkto('prev')"></span>
                <span class="icon icon-next" @click="linkto('next')"></span>
            </div>
        </section>
        <section class="category col-sm-12 col-md-10 offset-sm-0 offset-md-1">
            <ul class="list">
                <li v-for="item in detail.tag" :key="item">
                    {{ item }}
                </li>
            </ul>
        </section>
        <section class="content col-sm-12 col-md-10 offset-sm-0 offset-md-1">
            <h3>{{ detail.headline }}</h3>
            <div v-html="detail.body"></div>
        </section>
    </div>
</template>

<script>
import resource from '@/api/website/resource';
import portfolio from '@/api/website/portfolio';
import $ from 'jquery';

export default {
    data() {
        return {
            sibling: {
                prev: { id: '' },
                next: { id: '' }
            },
            show: {
                qr: false,
                share: false
            },
            detail: {
                tag: [],
                browseUrl: {
                    h5: '',
                    pc: ''
                }
            }
        };
    },
    beforeRouteUpdate(to, from, next) {
        this.loadInfo(to);
        next();
    },
    mounted() {
        this.loadInfo();
    },
    methods: {
        async loadInfo(route) {
            route = route || this.$route;
            const res = await resource.getPortfoliosDetail(route.params.id);

            if (res) {
                this.detail = res;
                this.sibling = await portfolio.sibling(res.id);
                $('.qr').qrcode({width: 60, height: 60, text: res.browseUrl.h5});
            }
        },
        linkto(param) {
            if (this.sibling[param]) {
                this.$router.push({ name: 'portfolio-detail', params: { id: this.sibling[param].id } });
            }
        }
    }
};
</script>

<style lang="less">
.portfolio-detail {
    .kv {
        position: relative;

        >img {
            // height: 500px;
            width: 100%;
        }

        .button {
            position: absolute;
            left: 80px;
            bottom: 45px;
            font-size: 0px;
        }

        .page {
            position: absolute;
            right: 80px;
            bottom: 45px;
            font-size: 0px;
        }

        span, a {
            margin: 0 8px;
            cursor: pointer;
            transition-property: opacity, transform, left, visibility;
            transition-duration: .4s;
            transition-timing-function: ease-in-out;
            position: relative;
            z-index: 1;
            left: 0;

            &.hidden {
                opacity: 0;
                transform: scale(0.5) rotate(-180deg);
                left: -51px;
                z-index: 0;
                visibility: hidden;
            }
        }

        .qr-box {
            position: absolute;
            width: 70px;
            height: 70px;
            border: 4px solid #49c5b6;
            transform: translate(-50%, -120%);
            transition-property: opacity, transform, visibility;
            transition-duration: .3s;
            transition-timing-function: ease-in-out;
            left: 50%;
            z-index: 1;

            .qr {
                border: 1px solid #fff;
                height: 100%;
                width: 100%;
                position: absolute;
                z-index: 1;
            }
        }

        .qr-hidden {
            opacity: 0;
            transform: translate(-50%, -90%);
            z-index: 0;
            visibility: hidden;
        }

        .triangle {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: #49c5b6;
            transform: translateX(-50%) rotate(45deg);
            transform-origin: center;
            left: 50%;
            bottom: -8px;
            z-index: 0;
        }
    }

    .category {
        margin-top: 40px;
        margin-bottom: 40px;

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

    .content {
        font-size: 16px;

        h3 {
            text-align: center;
        }

        img {
            max-width: 100%;
        }
    }
}
</style>