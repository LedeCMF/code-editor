<template>
    <div id="app">
        <lede-code-editor @update="doUpdate" ref="codeEditor" :auto-p="true"></lede-code-editor>

        {{ code }}
    </div>
</template>

<script>

    import LedeCodeEditor from './components/LedeCodeEditor'

    export default {
        name: 'app',
        components: {
            LedeCodeEditor,

        },

        data() {
            return {
                code: '',
            }
        },

        methods: {
            doUpdate() {
                this.code = this.$refs.codeEditor.getValue()
            },
        },
    }
</script>

<style lang="scss">
    $dialog-border-color: rgb(240, 240, 240);
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        color: #2c3e50;
        margin: 60px auto 0;
        width: 600px;

    }


    .lede-code-toolbar {
        border: 1px solid $dialog-border-color;
    }

    .lede-editor-button {
        border: 0;
        padding: 5px;
        margin: 0 5px;
        border-radius: 4px;
        background: transparent;
        box-shadow: none;
        cursor: pointer;
        width: 34px;
        height:34px;

    }



    .lede-code-editor {
        border: 0;
        .toolbar-sep {
            display: inline-block;
            margin: 0 6px;
            border-left: 1px solid $dialog-border-color;
            height: 24px;
        }

        button {
            border:0;
            background: transparent;
            cursor: pointer;
            &:hover {
                background:rgb(230,230,230);
            }
        }

        .code-editor-resize {
            background: #f7f7f7;
            height: 20px;
            line-height: 15px;
            user-select: none;
            cursor: row-resize;
            // border-top: 1px solid #ddd;
            // border-bottom: 1px solid #ddd;

            &:before {
                content: '\2261'; /* https://en.wikipedia.org/wiki/Triple_bar */
                color: #999;
                position: absolute;
                left: 50%;
            }
        }
    }

    .lede-code-toolbar {
        border: 1px solid $dialog-border-color;
        display: flex;
        padding: 5px 0;

    }

    .lede-code-editor {
        .CodeMirror-wrap {
            border: 1px solid $dialog-border-color;
            border-top: 0;
        }
    }

    .editor-button-link {
        &.is-opened {
            button {
                background: $dialog-border-color;
            }
        }
        .button-drop-inner {
            display: flex;
            box-shadow: 1px 1px 3px -1px rgba(0,0,0,0.8);
            input {
                display: block;
                width: 150px;
                padding: 6px 12px;
                font-weight: 400;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
            }
        }
    }
</style>
