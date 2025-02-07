import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Calcola il miglior zoom per adattare la pagina alla viewport
  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Stima un rapporto ideale basato sulla larghezza della viewport
      const estimatedScale = Math.min(viewportWidth / 800, viewportHeight / 1000);
      setScale(estimatedScale);
    };

    updateScale(); // Imposta lo scale iniziale
    window.addEventListener("resize", updateScale); // Aggiorna lo scale quando la finestra cambia

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Funzione per stampare l'intero PDF
  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Iframe nascosto per la stampa */}
      <iframe ref={iframeRef} src={pdfUrl} style={{ display: "none" }} />
      {/* Documento PDF */}
      <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>

      {/* Controlli di navigazione */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))} disabled={pageNumber <= 1}>
          ◀ Pagina Precedente
        </button>
        <span style={{ margin: "0 10px" }}>
          Pagina {pageNumber} di {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev))}
          disabled={numPages ? pageNumber >= numPages : true}
        >
          Pagina Successiva ▶
        </button>
      </div>
      {/* Bottone di stampa */}
      <button onClick={handlePrint} style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}>
        🖨️ Stampa PDF
      </button>
    </div>
  );
};

export default PDFViewer;
