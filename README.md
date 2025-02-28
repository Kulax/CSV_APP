# CSV File Upload and Processing with Background Jobs

This is a Next.js application that allows users to upload CSV files containing user data. The server parses the CSV file and processes the data in the background, simulating API requests to add users.

## Features

- CSV file upload with validation
- Background processing of CSV data
- Job status tracking
- Error handling and validation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/csv-upload-processor.git
cd csv-upload-processor
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Click on the file input to select a CSV file.
2. The file should have at least the following columns:
   - `name`: The user's name
   - `email`: A valid email address
3. Click the "Upload CSV" button to start the upload and processing.
4. The application will show the progress and status of the job.

## CSV Format

Your CSV file should have headers and include at least the following columns:
```
name,email
John Doe,john@example.com
Jane Smith,jane@example.com
```

## Deployment on Vercel

This application is designed to be deployed on Vercel. To deploy:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and sign up or log in.
3. Click "New Project" and import your GitHub repository.
4. Configure the project settings if needed.
5. Click "Deploy".

### Environment Variables

For the Vercel KV store to work, you need to set up the following environment variables in your Vercel project:

- `KV_URL`: The URL of your Vercel KV database
- `KV_REST_API_URL`: The REST API URL of your Vercel KV database
- `KV_REST_API_TOKEN`: The token for your Vercel KV database
- `KV_REST_API_READ_ONLY_TOKEN`: The read-only token for your Vercel KV database

You can set these up by following the [Vercel KV documentation](https://vercel.com/docs/storage/vercel-kv).

## License

This project is licensed under the MIT License.