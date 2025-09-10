import { useState, useCallback } from 'react';
import { VisualizationState } from '../types';

export const useVisualization = () => {
  const [visualizations, setVisualizations] = useState<Record<string, VisualizationState>>({});
  const [currentVisualization, setCurrentVisualization] = useState<string | null>(null);

  const generateVisualization = useCallback(async (messageId: string, messageText: string) => {
    // Immediately show the visualization page with loading state
    setCurrentVisualization(messageId);
    
    setVisualizations(prev => ({
      ...prev,
      [messageId]: {
        messageId,
        isGenerating: true,
        content: null,
        isVisible: true
      }
    }));

    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured. Please set VITE_GEMINI_API_KEY environment variable.');
      }
      
      const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const prompt = `You are a data visualization expert. Create a complete, working HTML page with inline CSS and JavaScript that visualizes the following data.

From the text here, please create a brief yet comprehensive graphic visualization that helps me understand this information better. Use this color scheme:
Color Scheme:
- Primary background: #111827 (gray-900)
- Secondary background: #374151 (gray-700) to #1f2937 (gray-800) gradients
- Accent colors: #2563eb (blue-600) to #7c3aed (purple-600) gradients
- Text colors: #ffffff (white), #d1d5db (gray-300), #93c5fd (blue-300)
- Success/positive: #10b981 (emerald-500)
- Warning: #f59e0b (amber-500)
- Error: #ef4444 (red-500)

CRITICAL REQUIREMENTS:
1. Create a complete HTML page with <!DOCTYPE html>, <html>, <head>, and <body> tags
2. Include ALL CSS inline in <style> tags within the <head>
3. Include ALL JavaScript inline in <script> tags at the end of the <body>
4. Do NOT use any external libraries, CDN links, or external resources
5. Use the specified color scheme to match the app's dark theme
6. Make it responsive and mobile-friendly
7. Add smooth animations and transitions where appropriate
8. Include interactive elements if the data supports it (charts, graphs, etc.)
9. Ensure all JavaScript executes properly when the page loads
10. Use actual data from the message to populate charts and visualizations

Make it visually appealing and functional:

${messageText}

The output should be a complete, self-contained HTML file that renders properly with all JavaScript functionality working.`;

      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 1,
            maxOutputTokens: 16384
          }
        })
      });

      console.log('Gemini API response status:', response.status);
      
      if (!response.ok) {
        try {
          const errorData = await response.json();
          const errorMessage = errorData.error?.message || `API Error: ${response.status} ${response.statusText}`;
          console.error('Gemini API error:', response.status, response.statusText, errorData);
          throw new Error(errorMessage);
        } catch (parseError) {
          const errorText = await response.text();
          console.error('Gemini API error:', response.status, response.statusText, errorText);
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('Gemini API response:', data);
      
      let visualizationContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No visualization could be generated.';
      
      // Extract HTML from markdown code blocks if present
      const htmlMatch = visualizationContent.match(/```html\s*([\s\S]*?)```/);
      if (htmlMatch) {
        visualizationContent = htmlMatch[1].trim();
      } else {
        // Try to find HTML content without markdown wrapper
        const docTypeMatch = visualizationContent.match(/(<!DOCTYPE html[\s\S]*)/i);
        if (docTypeMatch) {
          visualizationContent = docTypeMatch[1].trim();
        }
      }
      
      console.log('Extracted visualization content:', visualizationContent);

      setVisualizations(prev => ({
        ...prev,
        [messageId]: {
          messageId,
          isGenerating: false,
          content: visualizationContent,
          isVisible: true
        }
      }));
    } catch (error) {
      console.error('Error generating visualization:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate visualization';
      setVisualizations(prev => ({
        ...prev,
        [messageId]: {
          messageId,
          isGenerating: false,
          content: `<div style="padding: 20px; text-align: center; color: #ef4444; background: #111827; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">${errorMessage}</div>`,
          isVisible: true
        }
      }));
    }
  }, []);

  const showVisualization = useCallback((messageId: string) => {
    setCurrentVisualization(messageId);
    setVisualizations(prev => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        isVisible: true
      }
    }));
  }, []);

  const hideVisualization = useCallback(() => {
    setCurrentVisualization(null);
  }, []);

  const getVisualization = useCallback((messageId: string) => {
    return visualizations[messageId] || null;
  }, [visualizations]);

  return {
    generateVisualization,
    showVisualization,
    hideVisualization,
    getVisualization,
    currentVisualization
  };
};