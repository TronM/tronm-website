<template>
    <div class="portfolio-list container-fluid">
        <div class="row tags">
            <div class="col-sm-12 col-md-10 offset-sm-0 offset-md-1">
                <div class="toggle">所有项目分类</div>
                <ul class="list">
                    <li v-for="item in tags"
                        :key="item.name"
                        @click="$router.push({ name: 'portfolio-index', params: { tag: item.name } })"
                        :class="{ 'active': filters.tag === item.name }">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="row portfolio">
            <div class="col-lg-3 col-md-4 col-sm-6" v-for="item in list" :key="item.id">
                <img v-bind:src="item.headlineImage" alt="">
                <div class="mask">
                    <div class="info">
                        <h5 v-text="item.headline"></h5>
                        <router-link :to="{name: 'portfolio-detail', params: { id: item.id }}">查看更多</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" class="infinite-scroll list-more" v-text="loadInfo"></div>
    </div>
</template>

<script>
import resource from '@/api/website/resource';
// import utils from '@/utils/utils';
import $ from 'jquery';

export default {
    data() {
        return {
            page: 1,
            pagesize: 8,
            loadInfo: '加载中',
            busy: true,
            filters: {
                tag: ''
            },
            list: [],
            tags: ['111', '2222']
        };
    },
    mounted() {
        this.bindEvents();
        this.refresh();
        this.loadTags();
    },
    beforeRouteUpdate(to, from, next) {
        this.setFilterTag(to);
        next();
    },
    beforeRouteEnter(to, from, next) {
        next(vm => vm.setFilterTag(to));
    },
    methods: {
        refresh() {
            this.page = 1;
            this.loadList();
        },
        async loadList(flagConcat = false) {
            const res = await resource.getPortfolios(this.listParams);

            if (res && res.length > 0) {
                const list = res;

                if (flagConcat) {
                    this.list = this.list.concat(list);

                    // 如果获取的数量小于分页数，则表示没有数据了
                    this.busy = list.length < this.pagesize;
                    this.loadInfo = list.length < this.pagesize ? '没有更多了' : '加载中';
                } else {
                    this.list = list;

                    // 如果获取的数量刚好等于分页数，则表示可能还有数据
                    if (list.length === this.pagesize) {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.busy = false;
                                this.loadInfo = '加载中';
                            }, 500);
                        });
                    } else {
                        this.loadInfo = '没有更多了';
                    }
                }
            } else {
                this.loadInfo = '没有更多了';
            }
        },
        setFilterTag(route) {
            const tag = route.params.tag || '';
            this.filters.tag = tag;
            this.refresh();
        },
        async loadTags() {
            const res = await resource.getTags();
            this.tags = res;
        },
        loadMore() {
            this.busy = true;

            setTimeout(() => {
                this.page++;
                this.loadList(true);
            }, 1000);
        },
        bindEvents() {
            $('.tags .toggle').on('click', () => {
                $('.tags .list').toggle();
            });
        }
    },
    computed: {
        listParams() {
            let params = {
                page: this.page,
                pagesize: this.pagesize,
                filters: this.filters
            };

            return params;
        }
    }
};
</script>

<style lang="less">
.portfolio-list {
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

                &:hover, &.active {
                    color: #49c5b6;
                    border-color: #49c5b6;
                }
            }
        }
    }

    .portfolio {
        margin: 0 50px;

        >div {
            margin-top: 30px;
            position: relative;

            &:hover {
                .mask {
                    opacity: 1;
                    transition: all .3s ease-in-out;
                }
            }

            img {
                width: 100%;
            }
        }

        .mask {
            opacity: 0;
            position: absolute;
            top: 0;
            left: 15px;
            right: 15px;
            bottom: 0;
            background-color: rgba(0, 0, 0, .5);
            color: #FFF;
            text-align: center;
            line-height: 100%;
            transition: all .3s ease-in-out;

            a {
                color: #FFF;
                font-size: 16px;
            }

            .info {
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

    .list-more {
        text-align: center;
        line-height: 60px;
    }
}

@media screen and (max-width: 768px) {
.portfolio-list {
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

    .portfolio {
        margin: 0;
    }
}
}
</style>