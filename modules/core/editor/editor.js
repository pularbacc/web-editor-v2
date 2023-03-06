import RenderCode from './renderCode.js';

export default class {
    #arrTabEditor = {
        html: {
            idTab: _id_app.tabHtml,
            idEditor: _id_app.editorHtml,
            elementTab: null,
            elementEditor: null,
            editorMode: "ace/mode/html",
            editor: null
        },
        css: {
            idTab: _id_app.tabCss,
            idEditor: _id_app.editorCss,
            elementTab: null,
            elementEditor: null,
            editorMode: "ace/mode/css",
            editor: null
        },
        js: {
            idTab: _id_app.tabJs,
            idEditor: _id_app.editorJs,
            elementTab: null,
            elementEditor: null,
            editorMode: "ace/mode/javascript",
            editor: null
        }
    }
    #renderCode;
    constructor() {
        this.#renderCode = new RenderCode();
        this.#mountTab();
        this.#choseTabEditor();
    }
    #mountTab() {
        for (const key in this.#arrTabEditor) {
            const elementTab = document.getElementById(this.#arrTabEditor[key].idTab);
            elementTab.addEventListener("click", (event) => {
                this.#choseTabEditor(event);
            });
            this.#arrTabEditor[key].elementTab = elementTab;

            const elementEditor = document.getElementById(this.#arrTabEditor[key].idEditor);
           
            this.#arrTabEditor[key].elementEditor = elementEditor;

            const editor = this.#buildEditor(this.#arrTabEditor[key].idEditor, this.#arrTabEditor[key].editorMode);

            editor.on("change",()=>{
                this.#codeInputChange();
            })

            this.#arrTabEditor[key].editor = editor;
        }
    }

   
    #highLightTabEditor(tab, isHighLight) {
        if (isHighLight) {
            tab.style.color = "#3ab37d";
            tab.style.borderBottom = "3px solid #42d392";
        } else {
            tab.style.color = "#aaaaaa";
            tab.style.borderBottom = "none";
        }
    }
    #choseTabEditor(event,key) {
        let tabChose;
        if (event != undefined) {
            tabChose = event.srcElement;
        } else {
            if(key != undefined){
                tabChose = this.#arrTabEditor[key].elementTab;
            }else{
                tabChose = this.#arrTabEditor.html.elementTab;
            }
        }
        this.#highLightTabEditor(tabChose, true);
        for (const key in this.#arrTabEditor) {
            if (tabChose.id == this.#arrTabEditor[key].idTab) {
                this.#arrTabEditor[key].elementEditor.style.display = "block";
            }
            if (tabChose.id != this.#arrTabEditor[key].idTab) {
                this.#arrTabEditor[key].elementEditor.style.display = "none";
                this.#highLightTabEditor(this.#arrTabEditor[key].elementTab, false);
            }
        }
    }

    #buildEditor(idElment, mode) {
        const editor = ace.edit(idElment);
        editor.session.setMode(mode);
        editor.setTheme("ace/theme/monokai");
        return editor;
    }
    
    #runCode() {
        const htmlCode = this.#arrTabEditor.html.editor.getValue();
        const cssCode = this.#arrTabEditor.css.editor.getValue();
        const jsCode = this.#arrTabEditor.js.editor.getValue();

        this.#renderCode.render(htmlCode, cssCode, jsCode);
    }

    #codeInputChange() {
        this.#runCode();
    }

    loadSource(textSource,typeSource,openTab){
        for (const key in this.#arrTabEditor) {
            if (typeSource == this.#arrTabEditor[key].idEditor) {
                this.#arrTabEditor[key].editor.setValue(textSource,-1);
                if(openTab){
                    this.#choseTabEditor(undefined,key);
                }
            }
        }
    }

    getCodes(){
        return {
            html:this.#arrTabEditor.html.editor.getValue(),
            css:this.#arrTabEditor.css.editor.getValue(),
            js:this.#arrTabEditor.js.editor.getValue()
        }
    }
}