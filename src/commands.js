import LinkButton from './components/LinkButton.vue'


export function CMWrapCommand(codeMirror, open, close) {
    let text = codeMirror.getSelection()
    let replace = open + text + close
    codeMirror.replaceSelection(replace)
    codeMirror.focus()
    if (!text.length) {
        setTimeout(() => {
            let cursorPos = codeMirror.getCursor()
            let search = codeMirror.getSearchCursor(close, cursorPos)
            if (search.findPrevious()) {
                codeMirror.setCursor(search.pos.from)
            }
            
        })
    }
}

export class WrapCommand {
    constructor(open, close) {
        this._open = open
        this._close = close
    }
    
    exec(codeMirror) {
        CMWrapCommand(codeMirror, this._open, this._close);
    }
}

class Commands {
    
    constructor() {
        this._commands = {}
    }
    
    exists(name) {
        return this._commands.hasOwnProperty(name)
    }
    
    add(name, icon, label, command) {
        this._commands[name] = {
            icon: icon,
            label: label,
            command: command,
        }
        return this
    }
    
    addComponent(name, icon, label, component) {
        this._commands[name] = {
            icon: icon,
            label: label,
            component: component,
        }
        return this
    }
    
    get(name) {
        return this._commands[name]
    }
}

let commands = new Commands()

commands.add('bold', 'bold', 'Bold', new WrapCommand('<strong>', '</strong>'))
commands.add('italic', 'italic', 'Italic', new WrapCommand('<em>', '</em>'))
commands.add('underline', 'underline', 'Underline',
    new WrapCommand('<u>', '</u>'))
commands.add('strike', 'strike', 'Strike through',
    new WrapCommand('<del>', '</del>'))
commands.addComponent('link', 'link', 'Link', LinkButton)
commands.add('blockquote', 'blockquote', 'Blockquote', new WrapCommand('<blockquote>', '</blockquote>'))
export default commands
