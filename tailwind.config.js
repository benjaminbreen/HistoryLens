/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/App.js',
    './src/App.test.js',
    './src/AssessmentAgent.js',
    './src/AssessmentPopup.js',
    './src/CommonplaceBook.js',
    './src/ContentGuide.js',
    './src/CritiqueAgent.js',
    './src/EntityList.js',
    './src/gameState.js',
    './src/Header.js',
    './src/HistoryAgent.js',
    './src/index.js',
    './src/InputBox.js',
    './src/Inventory.js',
    './src/InventoryItem.js',
    './src/InventoryPane.js',
    './src/Journal.js',
    './src/journalAgent.js',
    './src/LoadingIndicator.js',
    './src/Mixing.js',
    './src/PortraitSection.js',
    './src/PrescribePopup.js',
    './src/SimulationHistory.js',
    './src/Symptoms.js',
    './src/TipBox.js',
    './src/**/*.css', // Include all CSS files in /src
    './src/**/*.jsx', // Include all JSX files in /src
    './src/**/*.tsx', // Include all TSX files in /src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        medievalSharp: ['MedievalSharp', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        customGray: '#f7fafc',  // Custom light gray
        customBlue: {
          DEFAULT: '#3b82f6',  // Custom blue
          hover: '#2563eb', // Darker blue on hover
        },
        customDarkGray: {
          DEFAULT: '#2d3748', // Dark gray
          hover: '#1a202c', // Even darker gray on hover
        },
        seashell: '#fff5f5', // Light seashell color
      },
      spacing: {
        '75': '18.75rem',  // 300px
        '7.5': '1.875rem', // 30px
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '1rem',  // Custom border radius
        '2xl': '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
      },
      transitionProperty: {
        right: 'right',
        transform: 'transform',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}