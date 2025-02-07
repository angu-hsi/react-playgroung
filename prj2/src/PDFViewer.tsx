import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";

interface PDFViewerProps {
  pdfApiUrl: string; // URL dell'API per scaricare il PDF
}

const PDFViewer = ({ pdfApiUrl }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

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

  const fetchPdf = async () => {
    try {
      const response = await fetch(pdfApiUrl);
      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      // Decodifica Base64 in un array di byte
      const byteCharacters = atob(data.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Crea un Blob con i dati del PDF
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);

      // Carica il PDF nell'iframe nascosto per la stampa
      if (iframeRef.current) {
        iframeRef.current.src = blobUrl;
      }
    } catch (error) {
      console.error("Errore nel caricamento del PDF:", error);
    }
  };

  // Funzione per stampare il PDF
  const handlePrint = () => {
    if (!pdfBlobUrl) {
      alert("Scarica prima il PDF!");
      return;
    }

    if (iframeRef.current) {
      iframeRef.current.contentWindow?.print();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Bottone per scaricare e visualizzare il PDF */}
      <button onClick={fetchPdf} style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}>
        📥 Scarica e Visualizza PDF
      </button>

      {/* Bottone per stampare il PDF */}
      <button onClick={handlePrint} style={{ padding: "10px 20px", margin: "10px", cursor: "pointer" }}>
        🖨️ Stampa PDF
      </button>

      {/* Visualizzazione PDF */}
      {pdfBlobUrl && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Document file={pdfBlobUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
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
        </div>
      )}

      {/* Iframe nascosto per la stampa */}
      <iframe ref={iframeRef} style={{ display: "none" }} />
    </div>
  );
};

export default PDFViewer;
