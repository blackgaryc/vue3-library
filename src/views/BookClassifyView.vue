<template>
    <div>
        <h1>{{ types.name }}</h1>
        <el-tree :data="types.children" node-key="id" default-expand-all :expand-on-click-node="false"
            :props="defaultProps">
        </el-tree>
    </div>
</template>

<script>

export default {
    name: "BookClassifyView",
    data: function () {
        return {
            types: [],
            defaultProps: {
                children: 'children',
                label: 'name',
                class: (data) => {
                    if (data.children.length > 0) {
                        return 'is-penultimate'
                    }
                    return null
                }
            }
        };
    },
    methods: {

    },
    components: {},
    computed: {
        getTopLevelKey() {
            let arr = []
            let types = this.types
            if (!types.children) {
                return arr
            }
            types.children.forEach(element => {
                arr.push(element.id)
            });
            return arr;
        }
    },
    beforeCreate() {
        this.axios.get('/api/category/tree').then((res) => {
            this.types = res.data.data
        })
    }
}
</script>

<style>
.is-penultimate>.el-tree-node__content {
    color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate>.el-tree-node__children {
    display: flex;
    text-align: center;
}

.is-penultimate>.el-tree-node__children>div {
    width: 25%;
}

@media only screen and (max-width: 768px) {
    .el-tree-node.is-expanded.is-penultimate>.el-tree-node__children {
        flex-direction: column;
    }
}

/* 大型设备（笔记本电脑/台式机，992px 及以上）横向展示 */
@media only screen and (min-width: 992px) {
    .el-tree-node.is-expanded.is-penultimate>.el-tree-node__children {
        flex-direction: row;
    }
}
</style>