# Dreams - A Future-Oriented Dating App

Dreams is a unique dating app designed to connect people who share similar aspirations and plans for the future. By focusing on alignment in values and goals, Dreams fosters meaningful relationships that stand the test of time.

## Features

- **Future Goals Matching**: Connect with individuals based on shared plans and ambitions.
- **Real-Time Chat**: Secure and seamless communication.
- **User Profiles**: Create a personalized profile showcasing your goals and interests.
- **Firebase Integration**: Fast, secure, and scalable backend services.
- **Responsive Design**: Tailored for all devices using Tailwind CSS.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) for server-side rendering and optimized performance.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern, responsive design.
- **Backend & Database**: [Firebase](https://firebase.google.com/) for real-time data synchronization and authentication.

## Getting Started

Follow these steps to get Dreams running on your local machine.

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dreams.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dreams
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory and configure the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Build for Production

To create a production-ready build:

```bash
npm run build
npm start
```

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact us at [przemyslaw.gorecki93@gmail.com](mailto:przemyslaw.gorecki93@gmail.com).
