'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, FileUp, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/ui/navbar';
import { HeroSection } from '@/components/hero-section';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/csv') {
        setError('Please upload a CSV file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload file');
      }

      const data = await response.json();
      setJobId(data.jobId);
      
      // Poll for job status
      const statusInterval = setInterval(async () => {
        if (!data.jobId) {
          clearInterval(statusInterval);
          return;
        }
        
        try {
          const statusResponse = await fetch(`/api/job-status?jobId=${data.jobId}`);
          const statusData = await statusResponse.json();
          
          setJobStatus(statusData.status);
          
          if (statusData.status === 'completed' || statusData.status === 'failed') {
            clearInterval(statusInterval);
          }
        } catch (err) {
          console.error('Error checking job status:', err);
        }
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setJobId(null);
    setJobStatus(null);
    setError(null);
    setUploadProgress(0);
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      
      <div id="upload-section" className="container mx-auto py-16">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Upload Your CSV</h2>
          <Card>
            <CardHeader>
              <CardTitle>CSV User Upload</CardTitle>
              <CardDescription>
                Upload a CSV file with user data to process in the background
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {jobId && jobStatus && (
                <Alert className="mb-4" variant={jobStatus === 'completed' ? 'default' : jobStatus === 'failed' ? 'destructive' : 'default'}>
                  <AlertTitle>Job Status: {jobStatus}</AlertTitle>
                  <AlertDescription>
                    {jobStatus === 'completed' 
                      ? 'Your CSV file has been processed successfully!' 
                      : jobStatus === 'failed'
                      ? 'There was an error processing your file. Please try again.'
                      : 'Your file is being processed...'}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      disabled={uploading || !!jobId}
                    />
                    {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
                  </div>
                  
                  {uploading && (
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {jobId ? (
                <Button onClick={resetForm} className="w-full">
                  Upload Another File
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!file || uploading} 
                  className="w-full"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading
                    </>
                  ) : (
                    <>
                      <FileUp className="mr-2 h-4 w-4" />
                      Upload CSV
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Features section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Background Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Process large CSV files in the background without blocking your application. Our system handles the heavy lifting while you focus on your work.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Real-time Status Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track the progress of your file processing in real-time. Get notified when the job is complete or if any errors occur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Validation</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Automatic validation of your CSV data ensures only valid records are processed, saving you time and preventing errors.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>LAV RAMAN SINHA © 2025 CSV Processor. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}