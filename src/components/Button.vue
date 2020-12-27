<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button"
    }
</script>

<style lang="sass" scoped>
    //button
    .button
        border: 1px solid #333
        padding: 7px 10px
        border-radius: 3px
        font-size: 14px

</style>