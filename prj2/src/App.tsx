import { useState } from "react";
import PDFViewer from "./PDFViewer";

function App() {
  const [showPdf, setShowPdf] = useState(false);
  // const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  const pdfUrl = "/api/pdf/pdf/specifiche-short.pdf";

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Visualizzatore PDF</h1>
      <button
        onClick={() => setShowPdf(!showPdf)}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {showPdf ? "Nascondi PDF" : "Mostra PDF"}
      </button>

      {showPdf && <PDFViewer pdfUrl={pdfUrl} />}
    </div>
  );
}

export default App;
