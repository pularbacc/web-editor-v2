export default class {
    #uploadElement;
    #editor;
    constructor(editor) {
        this.#editor = editor;
        this.#uploadElement = document.getElementById(_id_app.btnUploadFiles);
        this.#uploadElement.addEventListener("click",()=>{
            this.#loadFile();
        })
    }

    #loadFile() {
        let loadLink = document.createElement("input");
        loadLink.type = "file";
        loadLink.accept = ".html,.css,.js";
        loadLink.style.display = "none";
        document.body.appendChild(loadLink);
        loadLink.click();
        loadLink.onchange = ()=> {
            const file = loadLink.files[0];
            let fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent) =>{
                const textLoad = fileLoadedEvent.target.result;
                const type = this.#checkTypeFile(file.name);
                const openTab = true;
                this.#editor.loadSource(textLoad,type,openTab);
            };
            fileReader.readAsText(file, "UTF-8");
        };
        loadLink.remove();
    }

    #checkTypeFile(nameFile){
        if(nameFile.endsWith(".html")){
            return _id_app.editorHtml;
        }
        if(nameFile.endsWith(".css")){
            return _id_app.editorCss;
        }
        if(nameFile.endsWith(".js")){
            return _id_app.editorJs;
        }
    }
}