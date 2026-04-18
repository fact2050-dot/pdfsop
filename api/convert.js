export default async function handler(req, res) {
  const API_KEY = "PASTE_YOUR_API_KEY_HERE";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const response = await fetch("https://api.cloudconvert.com/v2/jobs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tasks: {
          "import-file": { operation: "import/upload" },
          "convert-file": {
            operation: "convert",
            input: "import-file",
            input_format: "pdf",
            output_format: "docx"
          },
          "export-file": {
            operation: "export/url",
            input: "convert-file"
          }
        }
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: "Conversion failed" });
  }
}
