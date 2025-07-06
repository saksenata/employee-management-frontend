import Link from 'next/link';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Admin</div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-700 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li>
            <Link 
              href="/inventories" 
              className="block p-4 hover:bg-gray-700"
              onClick={onClose}
            >
              Inventories
            </Link>
          </li>
          <li>
            <Link 
              href="/users" 
              className="block p-4 hover:bg-gray-700"
              onClick={onClose}
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}