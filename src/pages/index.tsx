import LeftSidebar from '@/components/LeftSidebar';
import CenterContent from '@/components/CenterContent';
import RightSidebar from '@/components/RightSidebar';

function Home() {

  return (
    <div className="flex justify-between h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200">
        <LeftSidebar />
      </div>
      
      {/* Center Content */}
      <div className="w-1/2 bg-gray-300">
        <CenterContent />
      </div>
      
      {/* Right Sidebar */}
      <div className="w-1/4 bg-gray-200">
        <RightSidebar />
      </div>
    </div>
  );
}

export default Home;
