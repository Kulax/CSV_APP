import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import { v4 as uuidv4 } from 'uuid';
import { kv } from '@vercel/kv';

// In-memory job queue for Vercel serverless environment
const JOBS_KEY = 'csv_processing_jobs';

export async function POST(request: NextRequest) {
  try {
    // Process the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if it's a CSV file
    if (!file.name.endsWith('.csv')) {
      return NextResponse.json(
        { message: 'Please upload a CSV file' },
        { status: 400 }
      );
    }

    // Read the file content
    const fileContent = await file.text();

    try {
      // Parse CSV
      const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
      });

      // Validate required fields
      const validRecords = records.filter((record: any) => {
        return record.name && record.email && isValidEmail(record.email);
      });

      if (validRecords.length === 0) {
        return NextResponse.json(
          { message: 'No valid records found in CSV' },
          { status: 400 }
        );
      }

      // Create a job ID
      const jobId = uuidv4();

      // Store job in KV store
      await kv.set(`job:${jobId}`, {
        id: jobId,
        status: 'pending',
        records: validRecords,
        totalRecords: validRecords.length,
        processedRecords: 0,
        createdAt: new Date().toISOString(),
      });

      // Add job to the queue
      const jobIds = (await kv.get(JOBS_KEY) || []) as string[];
      await kv.set(JOBS_KEY, [...jobIds, jobId]);

      // Process the job in the background
      processJob(jobId);

      return NextResponse.json({ 
        message: 'File uploaded successfully',
        jobId,
        totalRecords: validRecords.length
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
      return NextResponse.json(
        { message: 'Error parsing CSV file' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Process job in the background
async function processJob(jobId: string) {
  try {
    // Get job data
    const job = await kv.get(`job:${jobId}`);
    
    if (!job) {
      console.error(`Job ${jobId} not found`);
      return;
    }

    // Update job status
    await kv.set(`job:${jobId}`, {
      ...job,
      status: 'processing',
      startedAt: new Date().toISOString(),
    });

    // Process each record
    const records = job.records;
    let processedCount = 0;
    let failedCount = 0;

    for (const record of records) {
      try {
        // Simulate API call to add user
        await simulateApiCall(record);
        processedCount++;
        
        // Update progress every 5 records
        if (processedCount % 5 === 0 || processedCount === records.length) {
          await kv.set(`job:${jobId}`, {
            ...job,
            processedRecords: processedCount,
            failedRecords: failedCount,
          });
        }
        
        // Add a small delay to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error processing record:`, error);
        failedCount++;
      }
    }

    // Update job status to completed
    await kv.set(`job:${jobId}`, {
      ...job,
      status: failedCount === records.length ? 'failed' : 'completed',
      processedRecords: processedCount,
      failedRecords: failedCount,
      completedAt: new Date().toISOString(),
    });

    // Remove job from queue
    const jobIds = (await kv.get(JOBS_KEY) || []) as string[];
    await kv.set(JOBS_KEY, jobIds.filter(id => id !== jobId));

  } catch (error) {
    console.error(`Error processing job ${jobId}:`, error);
    
    // Update job status to failed
    await kv.set(`job:${jobId}`, {
      ...job,
      status: 'failed',
      error: error.message || 'Unknown error',
      completedAt: new Date().toISOString(),
    });
  }
}

// Simulate API call to add user
async function simulateApiCall(userData: any) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate random failure (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('API call failed');
  }
  
  // Log success
  console.log(`User added: ${userData.name} (${userData.email})`);
  return { success: true };
}