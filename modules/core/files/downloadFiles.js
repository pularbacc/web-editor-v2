
export default class {
    #editor;
    #downloadBtn;
    #source;
    constructor(editor, source) {
        this.#editor = editor;
        this.#source = source;

        this.#downloadBtn = this.#initDownloadFiles();
    }

    #initDownloadFiles() {
        const downloadBtn = document.getElementById(_id_app.btnDownloadFiles);
        downloadBtn.addEventListener("click", () => {
            this.#downloadFiles();
        })

        return downloadBtn;
    }

    #downloadFiles() {
        const nameDownload = this.#source.getCurrentSource() + ".zip";
        const codes = this.#editor.getCodes();

        var zip = new JSZip();
        for (const key in codes) {
            const nameFile = `index.${key}`;
            zip.file(nameFile, codes[key]);
        }

        zip.generateAsync({ type: "blob" })
            .then(function (blob) {
                let textToSaveAsURL = window.URL.createObjectURL(blob);
                let downloadLink = document.createElement("a");
                downloadLink.download = nameDownload;
                downloadLink.innerHTML = "Download File";
                downloadLink.href = textToSaveAsURL;
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                downloadLink.remove();
            });


    }
}