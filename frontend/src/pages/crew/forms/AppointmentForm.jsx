// src/pages/crew/forms/AppointmentForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { SubHeader } from "../../../components/crew/SubHeader";

export default function AppointmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    division: "",
    content: "",
    ship: "",
    rank: "",
    boardingDate: "",
    leavingDate: "",
    boardingPeriod: "",
    place: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving appointment:", formData);
      // Add your API call here
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const crewLabel = "New Appointment";

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        onAddNew={() => {}}
        crewLabel={crewLabel}
        showAddNew={false}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
            <h2 className="text-[17px] font-medium text-[#3C5065]">
              New Appointment
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              {/* Division */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Deployment Division
                </label>
                <input
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  placeholder="Deployment Division"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Deployment Content
                </label>
                <input
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Deployment Content"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Ship Name */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Ship's Name
                </label>
                <input
                  name="ship"
                  value={formData.ship}
                  onChange={handleChange}
                  placeholder="Ship's Name"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Rank */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Rank
                </label>
                <input
                  name="rank"
                  value={formData.rank}
                  onChange={handleChange}
                  placeholder="Rank"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Boarding Date */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Boarding Date
                </label>
                <input
                  type="date"
                  name="boardingDate"
                  value={formData.boardingDate}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Leaving Date */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Leaving Date
                </label>
                <input
                  type="date"
                  name="leavingDate"
                  value={formData.leavingDate}
                  onChange={handleChange}
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Boarding Period */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Boarding Period
                </label>
                <input
                  name="boardingPeriod"
                  value={formData.boardingPeriod}
                  onChange={handleChange}
                  placeholder="Boarding Period"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Place */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium text-[#315888]">
                  Place
                </label>
                <input
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  placeholder="Place"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>

              {/* Remarks */}
              <div className="flex flex-col gap-2.5 md:col-span-2">
                <label className="text-base font-medium text-[#315888]">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Fill Remarks"
                  rows={4}
                  className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              onClick={handleCancel}
              className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
