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

## Output(Screenshots)
![Screenshot 2025-02-28 225134](https://github.com/user-attachments/assets/5e25b475-0149-432b-ac08-ee55d37bba31)
![Screenshot 2025-02-28 225150](https://github.com/user-attachments/assets/2db446fc-25ec-4664-8393-dc0e7a97a877)
![Screenshot 2025-02-28 225200](https://github.com/user-attachments/assets/ab9f879f-3d42-4e01-8926-bed307182333)
![Screenshot 2025-02-28 225210](https://github.com/user-attachments/assets/555ce99b-7a1f-43c4-9433-192020cdb514)
![Screenshot 2025-02-28 225218](https://github.com/user-attachments/assets/43cfac32-5e72-4b3d-8934-c3f7eb383f20)
![Screenshot 2025-02-28 225338](https://github.com/user-attachments/assets/701690e2-2690-4bfc-a397-cc68a20919e8)
![Screenshot 2025-02-28 225355](https://github.com/user-attachments/assets/99849446-e1d0-4d86-acce-3278e05367d1)
![Screenshot 2025-02-28 225409](https://github.com/user-attachments/assets/75cf87a6-4e8b-4fec-a1da-736e87920503)







