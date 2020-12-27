<template>
    <div class="content">
        <div class="container">
            <h1>
                {{ $route.meta[$i18n.locale] }}
            </h1>
            <div class="form">
                <div class="form__group" :class="{ 'has-error': $v.formData.name.$error }">
                    <input type="text" class="form__control" :placeholder="`${ $t('countact_us.name') }*`" v-model="formData.name">
                </div>
                <div class="form__group" :class="{ 'has-error': $v.formData.email.$error }">
                    <input type="email" class="form__control" :placeholder="`${ $t('countact_us.email') }*`" v-model="formData.email">
                </div>
                <div class="form__group" :class="{ 'has-error': $v.formData.phonenumber.$error }">
                    <input type="tel" class="form__control" :placeholder="`${ $t('countact_us.phone_number') }*`" v-model="formData.phonenumber">
                </div>
                <div class="form__group" :class="{ 'has-error': $v.formData.country_code.$error }">
                    <div class="section">
                        <button class="section__item" v-on:click="chooseCountry" ref="sectionItem">
                            {{ $t('countact_us.country') }}*
                        </button>
                        <div class="section__content" ref="sectionContent">
                            <input type="text" class="form__control" ref="sectionSearch" v-model="countryFilterInput">
                            <ul>
                                <li v-for="(item, index) in countryFilterList" :key="item.id" v-on:click="clickedCountry(index)" ref="countryList">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="form__group">
                    <textarea cols="30" rows="10" :placeholder="$t('countact_us.message')" v-model="formData.text" class="form__control"></textarea>
                </div>
                <div class="form__group">
                    <Button v-on:click.native="sendForm">
                        {{ $t('countact_us.send') }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'

    import Button from "../components/Button.vue"

    export default {
        name: "ContactUs",
        components: {
            Button
        },
        computed: {
            countryFilterList() {
                let filter = this.countryList[this.$i18n.locale].filter((item) => {
                    return item.name.toLowerCase().includes(this.countryFilterInput.toLowerCase())
                });

                return filter
            },
            getUserInfo() {
                return this.$store.getters.getUserInfo
            }
        },
        methods: {
            chooseCountry() {
                this.countryFilterInput = ''

                let sectionContent = this.$refs.sectionContent;
                let sectionSearch = this.$refs.sectionSearch;

                sectionContent.classList.toggle('is-active');
                sectionSearch.focus();
            },
            clickedCountry(index) {
                let countryListValue = this.$refs.countryList[index].innerHTML.trim();
                let sectionSearch = this.$refs.sectionSearch;
                let sectionContent = this.$refs.sectionContent;
                let sectionItem = this.$refs.sectionItem;

                this.countryFilterInput = countryListValue;
                this.countryFilterIndex = index;
                this.formData.country_code = this.countryList[this.$i18n.locale][index].id;
                sectionItem.innerHTML = this.countryFilterInput;
                sectionContent.classList.toggle('is-active');
                sectionSearch.focus();
            },
            sendForm() {
                this.$v.$touch();
                if(!this.$v.$invalid) {
                    console.log(JSON.stringify(this.formData));
                }
            }
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
                phonenumber: {
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(13)
                },
                country_code: {
                    required
                }
            }
        },
        watch: {
            'getUserInfo': function() {
                this.formData.name = this.getUserInfo.name;
                this.formData.email = this.getUserInfo.email
            },
            '$i18n.locale': function() {
                if(this.countryFilterIndex) {
                    let sectionItem = this.$refs.sectionItem;
                    let countryListValue = this.countryList[this.$i18n.locale][this.countryFilterIndex].name;

                    this.countryFilterInput = countryListValue;
                    sectionItem.innerHTML = this.countryFilterInput;
                }
            }
        },
        data() {
            return {
                countryList: {
                    "tr": [
                        { id: "TR", name: "Türkiye" },
                        { id: "US", name: "Amerika Birleşik Devletleri" },
                        { id: "GB", name: "Birleşik Krallık" },
                        { id: "DE", name: "Almanya" },
                        { id: "SE", name: "İsveç" },
                        { id: "KE", name: "Kenya" },
                        { id: "BR", name: "Brazilya" },
                        { id: "ZW", name: "Zimbabve" }
                    ],
                    "en": [
                        { id: "TR", name: "Turkey" },
                        { id: "US", name: "United States of America" },
                        { id: "GB", name: "United Kingdom" },
                        { id: "DE", name: "Germany" },
                        { id: "SE", name: "Sweden" },
                        { id: "KE", name: "Kenya" },
                        { id: "BR", name: "Brazil" },
                        { id: "ZW", name: "Zimbabwe" }
                    ]
                },
                countryFilterInput: '',
                countryFilterIndex: '',
                formData: {
                    name: '',
                    email: '',
                    phonenumber: '',
                    country_code: '',
                    text: ''
                }
            }
        },
        mounted() {
            this.formData.name = this.getUserInfo.name;
            this.formData.email = this.getUserInfo.email
        }
    }
</script>

<style lang="sass" scoped>
    @import "../assets/css/content.sass" 
    @import "../assets/css/form.sass" 

    //section
    .section
        position: relative

        &__item
            padding: 10.5px 40px 10.5px 16px
            border: 1px solid #C9C9C9
            width: 100%
            text-align: left

        &__content
            display: none
            position: absolute
            top: 0
            left: 0
            right: 0
            background: #eee
            
            ul
                padding: 10px
                max-height: 200px
                overflow: auto

            li
                padding: 5px
                cursor: pointer

            &.is-active
                display: block

</style>