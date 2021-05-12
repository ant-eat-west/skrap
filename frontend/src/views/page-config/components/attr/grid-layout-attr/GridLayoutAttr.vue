<template>
    <el-form
        v-if="option.type == 'grid-layout'"
        label-position="top"
        label-width="80px"
        :model="option">
        <el-form-item label="栅格列数">
            24
        </el-form-item>
        <el-form-item
            label="栅格组"
            class="grid-setting">
            <i
                class="oper ri-add-circle-fill"
                @click="addChild">
            </i>
            <ul class="col-setting">
                <li
                    v-for="child in option.children"
                    :key="child.id">
                    <el-input-number
                        v-model="child.span"
                        :min="1"
                        :max="24">
                    </el-input-number>
                    <i
                        class="oper ri-delete-bin-fill"
                        @click="deleteChild(child)">
                    </i>
                </li>
            </ul>
        </el-form-item>
        <el-form-item label="栅格间隔">
            <el-input v-model.number="option.options.gutter"></el-input>
        </el-form-item>
        <el-form-item label="高度">
            <el-input v-model="option.options.height"></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'GridLayoutAttr',
    componentName: 'GridLayoutAttr',
    components: {
    },
    props: ['option', 'name'],
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        addChild() {
            let span = 0;
            let index = this.option.children.length - 1;
            let sum = 0;
            while (index > -1) {
                sum += this.option.children[index].span;
                index -= 1;
            }
            console.log(sum);
            if (sum < 22) {
                this.addCol(2);
                return;
            }
            while (index >= 0 && span === 0) {
                const currentSpan = this.option.children[index].span;
                if (currentSpan > 2) {
                    this.option.children[index].span = currentSpan - 2;
                    span = 2;
                    console.log(this.option.children[index], this.option.children[index].span);
                }
                index -= 1;
            }
            if (span > 0) {
                this.addCol(span);
            }
        },
        addCol(span) {
            this.option.children.push({
                id: `col${new Date().getTime()}`,
                type: 'grid-layout-item',
                name: `grid_layout_${new Date().getTime()}`,
                children: [],
                span
            });
        },
        deleteChild(child) {
            const { children } = this.option;
            children.splice(children.indexOf(child), 1);
        }
    },
    watch: {
    },
    beforeCreate() {
    },
    created() {
    }
};
</script>
<style scoped>
    @import './styles/index.scss';
</style>
