<template>
    <div class="lede-code-editor">
        <editor-toolbar v-if="toolbar" :items="toolbar" :code-mirror="codeMirror"></editor-toolbar>
        <div class="code-editor-container" ref="container">
            <textarea class="lede-code-editor" ref="textarea" :value="value"></textarea>
        </div>
        <div class="code-editor-resize"
             ref="resize"
             @mousedown="startResize"
        ></div>
    </div>

</template>

<script>
    import 'codemirror/addon/edit/matchtags.js'
    import 'codemirror/addon/edit/closetag.js'
    import CodeMirror from 'codemirror'

    require('codemirror/lib/codemirror.css')
    require('codemirror/mode/htmlmixed/htmlmixed')
    import 'codemirror/addon/search/searchcursor'
    import AutoP from '../utils/autop.js'
    import EditorToolbar from './EditorToolbar.vue'

    const defaultConfig = {
        lineNumbers: true,
        mode: 'htmlmixed',
        matchTags: {bothTags: true},
        autoCloseTags: true,
        lineWrapping: true,
        extraKeys: {'Ctrl-J': 'toMatchingTag'},
    }
    export default {
        name: 'LedeCodeEditor',
        components: {EditorToolbar},
        props: {
            config: {
                type: Object,
                default() {return {}},
            },

            value: {
                type: String,
            },

            autoP: {
                type: [Boolean, Object],
            },

            toolbar: {
                type: String,
                default: 'bold  italic  underline  strike  |  link blockquote',
            },

        },

        computed: {
            code() {
                return this.value
            },
        },

        watch: {
            value(val) {
                this.setValue(val)
            },
        },

        data() {
            return {
                codeMirror: null,
            }
        },
        mounted() {
            this.init()
        },

        destroy() {
            // garbage cleanup
            const element = this.codeMirror.doc.codeMirror.getWrapperElement()
            element && element.remove && element.remove()
        },

        methods: {
            init() {
                let config = Object.assign(this.config, defaultConfig)
                this.codeMirror = CodeMirror.fromTextArea(this.$refs.textarea, config)
                this.codeMirror.on('change', codeMirror => {
                    if (this.$emit) {

                        this.$emit('update', codeMirror.getValue())
                    }
                })

                this.codeMirror.on('focus', () => {
                    this.$emit('focus')
                })
                this.codeMirror.on('blur', () => {
                    this.$emit('blur')
                })

            },

            focus(atBeginning) {
                if (!this.codeMirror) {
                    return
                }
                this.codeMirror.focus()
                if (!atBeginning) {
                    this.codeMirror.setCursor(this.codeMirror.lineCount(), 0)
                }
            },

            setValue(value) {
                if (this.codeMirror) {
                    this.codeMirror.setValue(value)
                }
            },

            getValue() {
                let content = this.codeMirror.getValue()
                return this.autoP ? AutoP(content, this.autoP) : content
            },

            startResize(e) {
                function height_of($el) {
                    return parseInt(window.getComputedStyle($el).height.replace(/px$/, ''))
                }

                const MIN_HEIGHT = 200

                let start_y
                let start_h
                let cm = this.codeMirror

                function on_drag(e) {
                    cm.setSize(null, Math.max(MIN_HEIGHT, (start_h + e.y - start_y)) + 'px')
                }

                function on_release() {
                    document.body.removeEventListener('mousemove', on_drag)
                    window.removeEventListener('mouseup', on_release)
                }

                start_x = e.x
                start_y = e.y
                start_h = height_of(this.$refs.container)

                document.body.addEventListener('mousemove', on_drag)
                window.addEventListener('mouseup', on_release)
            },
        },
    }
</script>

<style lang="scss">
    @import "../style/code-editor";
</style>
