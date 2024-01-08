let editor;
require.config({
  paths: {
    vs: "https://unpkg.com/monaco-editor@0.12.0/min/vs",
  },
});

window.MonacoEnvironment = { getWorkerUrl: () => proxy };

let proxy = URL.createObjectURL(
  new Blob(
    [
      `
    self.MonacoEnvironment = {
      baseUrl: 'https://unpkg.com/monaco-editor@0.12.0/min/'
    };
    importScripts('https://unpkg.com/monaco-editor@0.12.0/min/vs/base/worker/workerMain.js');
  `,
    ],
    { type: "text/javascript" }
  )
);

const makeCodeEditor = (
  code = "console.log(123)",
  idContainer = "container"
) => {
  require(["vs/editor/editor.main"], function () {
    editor = monaco.editor.create(document.getElementById(idContainer), {
      value: [
        code,
        //   "function x() {",
        //   '\tconsole.log("Hello world!");',
        //   "}",
      ].join("\n"),
      language: "javascript",
      theme: "vs-dark",
    });

    // editor.onDidChangeModelContent(() => {
    //   console.log(editor.getValue());
    // });
  });
};
