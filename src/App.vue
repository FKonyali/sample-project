<template>
    <div id="app">
        <Header />
        <router-view/>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"

export default {
    name: "App",
    components: {
        Header,
        Footer
    },
    beforeCreate() {
        const html = document.documentElement;
        const localeLang = navigator.language.slice(0,2);
        html.setAttribute('lang', localeLang);
    },
    watch: {
        $route(to) {
            const localeLang = this.$i18n.locale;
            document.title = to.meta[localeLang];
            
            this.$store.commit('updateMobileMenuStatus', false);
        }
    }
}
</script>

<style lang="sass">
//reset
*
    margin: 0
    padding: 0
    box-sizing: border-box

body
    font-family: "Arial", "sans-serif"

#inner
    min-height: 500px

.container
    width: 960px
    max-width: 100%
    margin: 0 auto
    padding: 0 15px

a
    text-decoration: none
    color: #000

ul
    list-style: none

button
    cursor: pointer
    border: 0
    background: none

</style>
