import PDFViewer from "./PDFViewer";

function App() {
  // const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  // const pdfUrl = "/api/pdf/pdf/specifiche-short.pdf";
  const pdfApiUrl = "/api/pdf/Report/GetReport";

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Visualizzatore PDF</h1>
      <PDFViewer pdfApiUrl={pdfApiUrl} />
    </div>
  );
}

export default App;
