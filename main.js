
import Editor from '/modules/core/editor/editor.js';
import Source from '/modules/core/source/source.js';
import UploadFiles from '/modules/core/files/uploadFiles.js';
import DownloadFiles from '/modules/core/files/downloadFiles.js';

const editor = new Editor();
const source = new Source(editor);
const uploadFIles = new UploadFiles(editor);
const downloadFiles = new DownloadFiles(editor,source);
