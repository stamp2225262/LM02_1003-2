import PetFooter from "../components/footer";
import PetMenu from "../components/menu";
import { useParams, useNavigate, Link } from "react-router"
import React, { useState, useEffect } from 'react';

export default function PetView ()
{
  const { petId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getdata/${petId}`);
        
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          setItem(null);
        }
      } catch (error) {
        console.error('Error fetching item detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [petId]);

  if (loading) {
    return <p className="text-center">กำลังโหลดรายละเอียด...</p>;
  }

  if (!item) {
    return <p className="text-center text-red-500">[ERROR] ไม่พบข้อมูลสำหรับ ID: {petId}</p>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <PetMenu />
          <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">รายละเอียดข้อมูลสัตว์เลี้ยง (รหัส: {item.petId})</h2>
            <div className="space-y-4">
              <p><strong>ชื่อสัตว์เลี้ยง:</strong> <span className="text-gray-700">{item.petName}</span></p>
              <p><strong>เพศ:</strong> <span className="text-green-600 font-semibold">{item.petSex}</span></p>
              <p><strong>ประเภทสัตว์เลี้ยง:</strong> <span className="text-green-600 font-semibold">{item.petType}</span></p>
              <p><strong>รายละเอียด:</strong> <span className="text-gray-700">{item.petDesc}</span></p>
              <p><strong>ผู้ดูแล:</strong> <span className="text-gray-700">{item.ownerName}</span></p>
              <p><strong>ติดต่อผู้ดูแล:</strong> <span className="text-gray-700">{item.ownerEmail}</span></p>
            </div>
            
            <div className="mt-6">
              <Link to="/app/petlist"  
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                กลับไปหน้ารายการสัตว์เลี้ยง
              </Link>
            </div>
          </div>
        <PetFooter stdname=".........." fburl=".........." />
      </div>
    </>
  );
}