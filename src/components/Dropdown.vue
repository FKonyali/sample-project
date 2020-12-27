<template>
    <div class="dropdown" :class="direction">
        <button class="dropdown__item">
            <slot name="item"></slot>
        </button>
        <div class="dropdown__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: {
            direction: {
                type: String,
                default: "right"
            }
        }
    }
</script>

<style lang="sass" scoped>
    //dropdown
    .dropdown
        position: relative
        font-size: 14px 
        $dropdown: &

        &:hover
            #{$dropdown}
                &__content
                    display: block

        &__item
            padding: 10px

        &__content
            display: none
            position: absolute
            top: 100%
            right: 0
            background: #eee
            padding: 15px

        &.left
            #{$dropdown}
                &__content
                    left: 0
                    right: inherit

        &.right
            right: 0

            #{$dropdown}
                &__content
                    right: 0
                    left: inherit

    @media (max-width: 675px)
        .dropdown
            &__item
                padding: 10px 20px

            &__content
                display: block
                position: relative
                padding: 0 20px
                background: #e1e1e1

</style>