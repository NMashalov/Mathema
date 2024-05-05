interface SandBoxProps{
    running: boolean
    script: string
}

export function SandBox({running, script}: SandBoxProps) {
    const srcdoc = (src) =>
    `<!doctype html>
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"></script>
      </head>
      <body style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
      </body>
      <script>
        delete window.fetch;
        delete window.XMLHttpRequest;

        console.log = function(logMsg) {
          window.parent.postMessage(JSON.stringify({ logMsg }), '*');
        };

        ${src}
      </script>
    </html>`;
    
    if (!running) {
      return <div className="Canvas">Пока рисунка нет</div>
    }
    return (
        <iframe  className="Canvas" srcDoc={srcdoc(script)} sandbox="allow-scripts" />
    );
  }