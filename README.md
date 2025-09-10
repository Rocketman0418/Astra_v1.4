# Astra Intelligence - RocketHub Team Chat

Internal RocketHub team chat tool for company information queries powered by AI with data visualization capabilities.

## Features

- 🚀 AI-powered chat interface with Astra Intelligence
- 📊 Dynamic data visualization generation using Gemini AI
- 📱 Progressive Web App (PWA) support
- 🎨 Beautiful, responsive design with dark theme
- 💬 Real-time chat with company data integration

## Setup

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" and create a new API key
4. Copy the API key and add it to your `.env` file

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set the build command to: `npm run build`
3. Set the publish directory to: `dist`
4. Add environment variables in Netlify dashboard:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key

### Environment Variables for Production

Make sure to set the following environment variables in your Netlify dashboard:

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

## Usage

1. Open the application
2. Chat with Astra about company information
3. Click "Create Visualization" on any Astra response to generate interactive charts and dashboards
4. View detailed financial dashboards and data insights

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini 2.5 Flash API
- **Charts**: Custom SVG-based visualizations
- **PWA**: Service Worker + Web App Manifest
- **Deployment**: Netlify

## Security Notes

- API keys are handled securely through environment variables
- Visualizations are rendered in sandboxed iframes
- No sensitive data is stored in the client

## Support

For issues or questions, please contact the RocketHub development team.
