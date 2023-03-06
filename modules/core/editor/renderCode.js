export default class{
    #codeOutputContainer;
    constructor(){
        this.#codeOutputContainer = this.#initOutputCode();
    }
    #initOutputCode() {
        const outputContainer = document.getElementById(_id_app.codeOutput);

        const iframe = document.createElement("iframe");
        iframe.className ="code-editor-output";
        outputContainer.appendChild(iframe);

        const outPutDoc = iframe.contentWindow ||
            iframe.contentDocument.document ||
            iframe.contentDocument;


        return outPutDoc;
    }

    render(htmlCode, cssCode, jsCode) {
        const codeOutput = this.#connectCode(htmlCode, cssCode, jsCode)

        this.#codeOutputContainer.document.open();
        this.#codeOutputContainer.document.write(codeOutput);
        this.#codeOutputContainer.document.close();
    }

    #connectCode(htmlCode, cssCode, jsCode) {
        const codeOutput = `
            <!DOCTYPE html>
            <style>${cssCode}</style>
            ${htmlCode}
            <script>${jsCode}</script>
        `
        return codeOutput;
    }
}