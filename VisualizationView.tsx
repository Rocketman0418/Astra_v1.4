import React from 'react';
import { ArrowLeft, BarChart3 } from 'lucide-react';

interface VisualizationViewProps {
  content: string;
  isGenerating?: boolean;
  onBack: () => void;
}

export const VisualizationView: React.FC<VisualizationViewProps> = ({
  content,
  isGenerating = false,
  onBack
}) => {
  React.useEffect(() => {
    if (!isGenerating) {
      // Create a new iframe to properly render the HTML with JavaScript
      const iframe = document.getElementById('visualization-iframe') as HTMLIFrameElement;
      if (iframe && content) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(content);
          doc.close();
        }
      }
    }
  }, [content, isGenerating]);

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
        <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
          <div className="flex items-center py-4 px-6">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-blue-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">
              Creating Visualization
            </h1>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center bg-gray-900">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="mb-8">
              <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Generating Your Visualization
              </h2>
              <p className="text-gray-300 mb-6">
                Astra is analyzing your data and creating an interactive visualization. This may take a few moments.
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 text-left">
              <h3 className="text-white font-semibold mb-2">Creating:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Interactive charts and graphs</li>
                <li>• Data analysis and insights</li>
                <li>• Visual dashboard layout</li>
                <li>• Responsive design elements</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4">
          <button
            onClick={onBack}
            className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors min-h-[44px] touch-manipulation"
          >
            Cancel and Return to Chat
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
        <div className="flex items-center py-4 px-6">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-blue-700 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">
            Data Visualization
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-auto bg-gray-900">
        <iframe
          id="visualization-iframe"
          className="w-full h-full border-0"
          title="Data Visualization"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-4">
        <button
          onClick={onBack}
          className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors min-h-[44px] touch-manipulation"
        >
          Back to Chat
        </button>
      </div>
    </div>
  );
};