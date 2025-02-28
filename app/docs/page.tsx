'use client';

import { Navbar } from '@/components/ui/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Documentation</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Learn how to use the CSV Processor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">CSV Format</h3>
              <p>Your CSV file should have headers and include at least the following columns:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                name,email
                John Doe,john@example.com
                Jane Smith,jane@example.com
              </pre>
              
              <h3 className="text-xl font-semibold mt-6">Upload Process</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Click on the file input to select a CSV file.</li>
                <li>The file should have at least the following columns:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li><code>name</code>: The user's name</li>
                    <li><code>email</code>: A valid email address</li>
                  </ul>
                </li>
                <li>Click the "Upload CSV" button to start the upload and processing.</li>
                <li>The application will show the progress and status of the job.</li>
              </ol>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Endpoints available for developers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">Upload Endpoint</h3>
              <p><code>POST /api/upload</code></p>
              <p>Upload a CSV file for processing.</p>
              <p>Request: <code>multipart/form-data</code> with a <code>file</code> field containing the CSV file.</p>
              <p>Response:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "message": "File uploaded successfully",
  "jobId": "uuid-string",
  "totalRecords": 100
}`}
              </pre>
              
              <h3 className="text-xl font-semibold mt-6">Job Status Endpoint</h3>
              <p><code>GET /api/job-status?jobId=uuid-string</code></p>
              <p>Check the status of a processing job.</p>
              <p>Response:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
{`{
  "jobId": "uuid-string",
  "status": "pending|processing|completed|failed",
  "totalRecords": 100,
  "processedRecords": 50,
  "failedRecords": 2,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "startedAt": "2023-01-01T00:00:05.000Z",
  "completedAt": "2023-01-01T00:01:00.000Z"
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}