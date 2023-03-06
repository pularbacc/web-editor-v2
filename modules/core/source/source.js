import listMap from "./map.js";

export default class {
    #sourceContainer;
    #preSource;
    #editor;
    constructor(editor) {
        this.#editor = editor;
        this.#sourceContainer = document.getElementById(_id_app.sourceContainer);
        this.#initSource();
    }

    #initSource() {
        for (const map of listMap) {
            const header = document.createElement("div");
            header.innerHTML = map.header;
            header.className = "source-header";

            this.#sourceContainer.appendChild(header);
            for (const map_element of map.elements) {
                const source = document.createElement("div");
                source.innerHTML = map_element.name;
                source.className = "source-element";
                source._source_link = map_element.link;
                source.addEventListener("click", (event) => {
                    this.#choseSource(event);
                })
                this.#sourceContainer.appendChild(source);
                if(map_element.link == 'hello_world'){
                    this.#choseSource({
                        srcElement:source
                    })
                }
            }
        }
    }

    #choseSource(event) {
        const source = event.srcElement;
        if (this.#preSource == undefined) {
            this.#preSource = source;
        } else {
            this.#preSource.className = "source-element";
            this.#preSource = source;
        }

        this.#preSource.className = "source-active";

        this.#openSource(source._source_link);
    }

    async #openSource(link) {
        if (link != undefined) {
            this.#fetchSource(link);
        } else {
            alert("Not find url");
        }
    }

    #fetchSource(link) {
        const dataSource = this.#createDataSource(link);

        dataSource.forEach(async source => {
            const fetchSource = await fetch(source.link);
            const textSource = await fetchSource.text();
            this.#editor.loadSource(textSource,source.type);
        });
    }

    #createDataSource(link) {
        return [{
            type: _id_app.editorHtml,
            link: `source_code/${link}/index.html`
        }, {
            type: _id_app.editorCss,
            link: `source_code/${link}/index.css`
        }, {
            type: _id_app.editorJs,
            link: `source_code/${link}/index.js`
        }]
    }

    getCurrentSource(){
        return this.#preSource._source_link;
    }
}