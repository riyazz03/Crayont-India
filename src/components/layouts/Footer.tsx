export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/favicon/favicon-32x32.png" 
              alt="Crayont" 
              className="h-8 w-8 mr-3"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Crayont
            </span>
          </div>
          
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              Crafted by <span className="font-semibold text-white">Crayont</span>
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Crayont India Private Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}