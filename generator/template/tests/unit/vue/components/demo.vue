<template>
    <div>
        <div>{{data}}</div>
        <div>{{count}}</div>
        <div class="increase" @click="increase">increase</div>
    </div>
</template>
<script>
    export default {
        props: ['data'],
        data() {
            return {
                count: 0
            }
        },
        methods: {
            increase() {
                this.count ++
            }
        }
    }
</script>