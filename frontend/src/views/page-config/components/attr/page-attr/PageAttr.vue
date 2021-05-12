<template>
    <el-form
        v-if="option.type == 'page'"
        label-position="top"
        label-width="80px"
        :model="option">
        <el-form-item label="页面整体布局类型">
            <el-select
                v-model="option.options.type"
                placeholder="请选择内容">
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.label || item.value"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'PageAttr',
    componentName: 'PageAttr',
    components: {
    },
    props: ['option', 'name'],
    data() {
        return {
            types: [
                { label: '一屏布局', value: 'one-screen-layout' },
                { label: '可滚动布局', value: 'scrolling-layout' }
            ]
        };
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    }
};
</script>
