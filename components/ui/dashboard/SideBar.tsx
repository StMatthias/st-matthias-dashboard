import Link from 'next/link'; // Or use 'react-router-dom' if using React Router
import { FaRegFileAlt, FaUpload, FaCheckCircle, FaGlobe, FaCog, FaBaby, FaMusic, FaUser, FaChurch, FaBuilding, FaStar, FaUserPlus, FaMicrophone, FaBookOpen } from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black flex flex-col p-15 pt-20 ">

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard/index" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaUser className="mr-3" />
        Church Members
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaBaby className="mr-3" />
        Children
        </Link>
        <Link href="/dashboard/upload" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaMusic className="mr-3" />
        Choir
        </Link>
        <Link href="/dashboard/audit" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaChurch className="mr-3" />
        Communicants
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaBuilding className="mr-3" />
        Development
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaStar className="mr-3" />
        Elim
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaUserPlus className="mr-3" />
        Kama
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaUser className="mr-3" />
        MU
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaUser className="mr-3" />
        Kayo
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaCheckCircle className="mr-3" />
        PCC
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaMicrophone className="mr-3" />
        Praise & Worship
        </Link>
        <Link href="/dashboard/checklist" className="block py-2 px-6 rounded-lg hover:bg-blue-300 flex items-center">
        <FaBookOpen className="mr-3" />
        Titus
        </Link>
      </nav>
    </div>
  );
};

