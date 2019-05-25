<template>
    <editor-drop-button :icon="icon" :label="label" @open="setLink" ref="button" class="editor-button-link">
        <input type="url" placeholder="link" v-model="link">
        <button @click="insert">
            <editor-icon icon="check"></editor-icon>
        </button>
    </editor-drop-button>
</template>

<script>
    import {EditorDropButton} from '@ledecmf/editor-core'
    import {CMWrapCommand} from '../commands.js'
    import {EditorIcon} from '@ledecmf/editor-core'

    export default {
        name: 'LinkButton',
        components: {EditorIcon, EditorDropButton},
        props: {
            codeMirror: {
                type: null,
                required: true,
            },

            icon: String,
            label: String,
        },
        data() {
            return {
                link: '',
            }
        },

        methods: {
            setLink() {
                this.link = ''
            },

            insert() {
                if (this.link) {
                    CMWrapCommand(this.codeMirror, '<a href="' + this.link + '">', '</a>')
                }
                this.$refs.button.close()
            },
        },
    }
</script>

<style lang="scss">

</style>
