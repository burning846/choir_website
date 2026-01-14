export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-gray-800">404</div>
        <div className="text-gray-600">页面不存在或已移除</div>
        <a href="/" className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          返回首页
        </a>
      </div>
    </div>
  )
}

