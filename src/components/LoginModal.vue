<template>
    <div class="modal">
        <div class="modal__inner">
            <div class="form">
                <h3>
                    {{ $t('login_modal.title') }}
                </h3>
                <div class="form__group" :class="{ 'has-error': $v.formData.name.$error }">
                    <input type="text" :placeholder="`${ $t('login_modal.name') }*`" class="form__control" v-model="formData.name">
                </div>
                <div class="form__group" :class="{ 'has-error': $v.formData.email.$error }">
                    <input type="text" :placeholder="`${ $t('login_modal.email') }*`" class="form__control" v-model="formData.email">
                </div>
                <div class="form__group" :class="{ 'has-error': $v.formData.password.$error }">
                    <input type="password" :placeholder="`${ $t('login_modal.password') }*`" class="form__control" v-model="formData.password">
                </div>
                <div class="form__group">
                    <select class="form__control" v-model="formData.lang">
                        <option v-for="item in getLangueages" :key="item.id">
                            {{ item.text }}
                        </option>
                    </select>
                </div>
                <div class="form__group">
                    <Button v-on:click.native="login">
                        {{ $t('login_modal.login') }}
                    </Button>
                </div>
            </div>
            <div class="modal__close" v-on:click="modalClose">
                X
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'

    import Button from "./Button.vue"

    export default {
        name: "Modal",
        components: {
            Button
        },
        validations: {
            formData: {
                name: {
                    required
                },
                email: {
                    required,
                    email
                },
                password: {
                    required
                }
            }
        },
        methods: {
            modalClose() {
                this.$store.commit('updateModalStatus', false);
            },
            login() {
                this.$v.$touch();
                if(!this.$v.$invalid) {
                    this.$store.commit('updateUserInfo', this.formData);
                    this.modalClose();
                    this.$i18n.locale = this.getLangueages.filter(item => item.text == this.formData.lang)[0].id;
                }
            }
        },
        computed: {
            getLangueages() {
                return this.$store.getters.getLangueages
            },
            getDefaultLanguage() {
                return this.getLangueages.filter(data => data.id == navigator.language.slice(0,2))[0].text
            }
        },
        data() {
            return {
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    lang: ''
                }
            }
        },
        mounted() {
            this.formData.lang = this.getDefaultLanguage
        }
    }
</script>

<style lang="sass" scoped>
    //modal
    .modal
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: rgba(0,0,0,.4)
        z-index: 2

        &__inner
            width: 400px
            max-width: 100%
            background: #FFF
            border-radius: 7px
            padding: 15px
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)

        &__close
            position: absolute
            top: -10px
            right: -10px
            background: #FFF
            padding: 10px
            border-radius: 50%
            width: 35px
            height: 35px
            text-align: center
            background: #FFF
            cursor: pointer
            box-shadow: 0 1px 2px 2px rgba(0,0,0,.1)

    @import "../assets/css/form.sass"

</style>