<template>
    <div class="ds-mgr">
        <div class="header">
            <div class="list-type" v-show="type == 'list'">
                <div class="content-header">
                    <span class="content-title">{{listTitle}}</span>
                     <span class="content-back" @click="goBack" v-if="isRouteBack==='true'||isRouteBack==true">
                    <span class="uex-icon-back"></span>返回</span>
                    <!-- <span class="content-back">返回</span> -->
                    <el-tooltip class="item btn-edit" effect="dark" :content="iconLabel" placement="left">
                        <div class="content-add-button" @click="goCreate" v-if="isAddBtn">
                             <i class="el-tooltip uex-icon-add"></i>
                        </div>
                    </el-tooltip>
                </div>
            </div>
            <div class="create-type" v-show="type == 'create'">
                <div class="content-header">
                    <span class="content-title">{{createTitle}}</span>
                    <span class="content-back" @click="goList">
                    <span class="uex-icon-back"></span>{{backTitle}}</span>
                    <!-- <span class="uex-icon-back"></span>{{backTitle}}</span> -->
                </div>
            </div>
        </div>
        <slot name="content" v-show="type == 'list'"></slot>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'CommonContent',
    componentName: 'CommonContent',
    props: {
        listTitle: String,
        createTitle: String,
        backTitle: {
            type: String,
            default: '返回'
        },
        iconLabel: {
            type: String,
            default: '新建'
        },
        type: {
            type: String,
            default: 'list'
        },
        isAddBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isRouteBack: null

        };
    },
    methods: {
        goCreate() {
            this.$emit('create');
        },
        goList() {
            // this.type = 'list';
            this.$emit('back'); // 返回事件
        },
        jumpView(name, params) {
            this.$router.push({ name, params });
        },
        // 从其他页面跳转到列表页
        goBack() {
            this.$emit('goBack'); // 从父组件点击返回事件
        }


    },
    mounted() {
        this.isRouteBack = this.$route.params.isRouteBack;
    },
    watch: {
        type(newVal) {
            this.type = newVal;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "deploy/src/theme/common/prd-color-var.scss";

.ds-mgr{
    position: relative;
    height: 100%;
    .header{
        .content-header{
            height: 42px;
            background-color:$--color-white;
            line-height: 42px;
            font-size: 14px;
            color:$--color-text-primary;
            .content-title{
                margin-left: 15px;
                color:$--color-text-primary;
                border-left: 2px solid $--color-black;
                padding-left: 8px;
            }
            .content-back{
                font-size: 13px;
                cursor: pointer;
                span{
                    margin-right: 5px;
                }
            }
            .content-add-button{
                background:$--color-pp-l;
                width: 42px;
                height: 42px;
                text-align: center;
                float: right;
                i{
                    font-size: 18px;
                    color:$--color-white;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
