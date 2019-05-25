<template>
    <div class="lede-code-toolbar" v-if="codeMirror">
        <template v-for="(button, idx) in buttons">
            <span :key="idx" v-if="button === '|'" class="toolbar-sep"></span>
            <component :key="idx" v-else-if="button.component" :is="button.component" :code-mirror="codeMirror" :label="button.label" :icon="button.icon"></component>
            <editor-button :key="idx" v-else :icon="button.icon" @click="doCommand(button)"></editor-button>
        </template>

    </div>
</template>

<script>
    import Commands from '../commands.js';
    import  { EditorButton } from '@ledecmf/editor-core'
    export default {
        name: 'EditorToolbar',
        components: {EditorButton},
        props: {
            items: {
                type: String,
                required: true
            },
            codeMirror: {
                type: null,
                required: true
            }
        },

        computed: {
            buttons() {
                let items = this.items.split(' ').map((item) => {return item.trim()})
                    .filter((item) => item.length > 0)
                let buttons = [];
                items.forEach((item) => {
                    if (item === '|') {
                        buttons.push('|')
                    } else {
                        let command = Commands.get(item);
                        if (command) {
                            buttons.push(command);
                        }
                    }
                })
                console.log(buttons);
                return buttons
            }
        },

        methods: {
            doCommand(button) {
                button.command.exec(this.codeMirror);
            },
        },
    }
</script>

<style scoped>

</style>
