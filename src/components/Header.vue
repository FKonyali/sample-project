<template>
    <div class="header">
        <div class="container header__container">
            <div class="header__left header__flex">
                <router-link to="/" title="$t('header.home')" class="header__flex">
                    <img src="../assets/img/logo.svg" alt="Logo" class="header__logo">
                </router-link>
                <h3 class="header__title">
                    {{ $route.meta[$i18n.locale] }}
                </h3>
            </div>
            <div class="header__right header__flex">
                <div class="header__bars" v-on:click="mobileMenuOpen" :class="{'is-active': getMobileMenuStatus}">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="header__nav header__flex" :class="{'is-active': getMobileMenuStatus}">
                    <ul class="header__links header__flex">
                        <li>
                            <router-link to="/" :title="$t('header.home')">
                                {{ $t('header.home') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/about" :title="$t('header.about')">
                                {{ $t('header.about') }}
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/contact-us" :title="$t('header.contact_us')">
                                {{ $t('header.contact_us') }}
                            </router-link>
                        </li>
                    </ul>
                    <div class="header__lang">
                        <Dropdown direction="left">
                            <template v-slot:item>
                                {{ $t('header.language') }}
                            </template>
                            <template v-slot:content>
                                <ul class="header__langs">
                                    <li v-for="(item, index) in getLangueages" :key="index" v-on:click="clickLanguage(item.id, index)">
                                        {{ item.text }}
                                    </li>
                                </ul>
                            </template>
                        </Dropdown>
                    </div>
                    <Button class="header__login-btn" v-on:click.native="openLoginModal" v-if="!getUserInfo.name">
                        {{ $t('header.login') }}
                    </Button>
                    <Dropdown direction="right" v-if="getUserInfo.name">
                        <template v-slot:item>
                            {{ getUserInfo.name }}
                        </template>
                        <template v-slot:content>
                            <ul class="header__user-dropdown">
                                <li>
                                    {{ getUserInfo.email }}
                                </li>
                                <li>
                                    <Button class="header__logout-btn" v-on:click.native="logout">
                                        {{ $t('header.logout') }}
                                    </Button>
                                </li>
                            </ul>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </div>
        <LoginModal v-if="getOpenModal" />
    </div>
</template>

<script>
    import Button from "./Button.vue"
    import Dropdown from "./Dropdown.vue"
    import LoginModal from "./LoginModal.vue"

    export default {
        name: "Header",
        components: {
            Button,
            Dropdown,
            LoginModal
        },
        methods: {
            openLoginModal() {
                this.$store.commit('updateModalStatus', !this.modalVisibility);
            },
            clickLanguage(id) {
                this.$i18n.locale = id;
                document.title = this.$route.meta[this.$i18n.locale];
            },
            logout() {
                this.$store.commit('updateUserInfo', '');
            },
            mobileMenuOpen() {                
                this.$store.commit('updateMobileMenuStatus', !this.getMobileMenuStatus);
            }
        },
        computed: {
            getLangueages() {
                return this.$store.getters.getLangueages
            },
            getUserInfo() {
                return this.$store.getters.getUserInfo
            },
            getOpenModal() {
                return this.$store.getters.getOpenModal
            },
            getMobileMenuStatus() {
                return this.$store.getters.getMobileMenuStatus
            }
        },
        data() {
            return {
                modalVisibility: false
            }
        }
    }
</script>

<style lang="sass" scoped>
    //header
    .header
        background: #eee
        padding: 15px 0
        font-size: 14px
        position: relative
        $header: &

        &__flex
            display: flex
            align-items: center

        &__container
            display: flex
            align-items: center
            justify-content: space-between

        &__logo
            width: 80px
            margin-right: 15px

        &__title
            font-weight: 400

        &__links
            flex-wrap: wrap

            a
                display: block
                padding: 10px

        &__login
            &-btn
                margin-left: 10px

        &__lang
            a
                display: block
                padding: 10px

        &__ltext
            cursor: pointer
            padding: 10px

        &__langs
            li
                cursor: pointer
                padding: 5px 0

        &__username
            margin-left: 10px
            cursor: pointer
            padding: 10px 0

        &__user
            position: relative

            &:hover
                #{$header}
                    &__user
                        &-dropdown
                            display: block

            &-dropdown
                li
                    margin-bottom: 10px
                    
                    &:last-child
                        margin-bottom: 0

        &__nav
            &.is-active
                display: block

        &__bars
            width: 40px
            height: 40px
            border-radius: 50%
            background: #009e81
            padding: 12px 10px
            position: relative
            display: none
            cursor: pointer

            span
                background: #FFF
                height: 2px
                width: 20px
                border-radius: 4px
                transition: all 500ms
                display: block
                position: absolute

                &:first-child
                    top: 14px

                &:nth-child(2)
                    top: 19px

                &:nth-child(3)
                    top: 24px 

                &:first-child, &:nth-child(2), &:nth-child(3)
                    transition: top .3s .3s, transform .3s

            &.is-active
                span
                    &:first-child
                        top: 19px
                        transform: rotate(45deg)
                        transition: top .3s, transform .3s .3s

                    &:nth-child(2), &:nth-child(3)
                        top: 19px
                        transform: rotate(-45deg)
                        transition: top .3s, transform .3s .3s

        &--is-active
            background: #FFF
            box-shadow: 0 2px 3px rgba(0,0,0,.1)

            #{$header}__nav
                transition: all 300ms

                a
                    color: #00489a


    @media (max-width: 675px)
        .header
            &__nav
                display: none
                position: absolute
                left: 0
                top: 100%
                right: 0
                background: #eee
                border-top: 1px solid #333
                z-index: 2

            &__bars
                display: block

            &__links
                flex-direction: column
                align-items: flex-start

                li
                    width: 100%

                a
                    padding: 15px 20px

            &__login
                &-btn
                    margin: 10px

            &__langs
                li
                    padding: 15px 0

</style>