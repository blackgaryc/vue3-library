<template>
    <div>
        <p>图书管理后台</p>

        <el-row>
            <el-col :span="12">
                <div class="statistic-card">
                    <el-statistic :value="display.collectsTotal">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                总藏量
                                <el-tooltip effect="dark" content="图书馆所有的图书数量，同一本书不同文件仅计数一次." placement="top">
                                    <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-statistic>
                    <!-- <div class="statistic-footer">
                        <div class="footer-item">
                            <span>较昨日</span>
                            <span class="green">
                                24%
                                <el-icon>
                                    <CaretTop />
                                </el-icon>
                            </span>
                        </div>
                    </div> -->
                </div>
            </el-col>
            <el-col :span="12">
                <div class="statistic-card">
                    <el-statistic :value="display.downloadsTotal" title="总下载量">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                总下载量
                            </div>
                        </template>
                    </el-statistic>
                    <!-- <div class="statistic-footer">
                        <div class="footer-item">
                            <span>较昨日</span>
                            <span class="green">
                                16%
                                <el-icon>
                                    <CaretTop />
                                </el-icon>
                            </span>
                        </div>
                    </div> -->
                </div>
            </el-col>


            <el-col :span="12">
                <div class="statistic-card">
                    <el-statistic :value="display.viewsTotal">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                总浏览量
                                <el-tooltip effect="dark" content="历史浏览量" placement="top">
                                    <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-statistic>
                    <!-- <div class="statistic-footer">
                        <div class="footer-item">
                            <span>较昨日</span>
                            <span class="red">
                                12%
                                <el-icon>
                                    <CaretBottom />
                                </el-icon>
                            </span>
                        </div>
                    </div> -->
                </div>
            </el-col>
            <el-col :span="12">
                <div class="statistic-card">
                    <el-statistic :value="display.viewsToday">
                        <template #title>
                            <div style="display: inline-flex; align-items: center">
                                今日浏览量
                                <el-tooltip effect="dark" content="今日浏览量" placement="top">
                                    <el-icon style="margin-left: 4px" :size="12">
                                        <Warning />
                                    </el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-statistic>
                    <!-- <div class="statistic-footer">
                        <div class="footer-item">
                            <span>较昨日</span>
                            <span class="red">
                                12%
                                <el-icon>
                                    <CaretBottom />
                                </el-icon>
                            </span>
                        </div>
                    </div> -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'HomeView',
    data: function () {
        return {
            display: {
                downloadsTotal: 128,
                collectsTotal: 10,
                viewsTotal: 786,
                viewsToday: 55
            }
        }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>