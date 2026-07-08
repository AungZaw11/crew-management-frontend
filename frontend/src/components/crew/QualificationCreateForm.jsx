// src/components/crew/QualificationCreateForm.jsx
import React from "react";
import { ChevronDown, Calendar, UploadCloud, X } from "lucide-react";

function FieldLabel({ children }) {
  return (
    <label className="text-base font-medium text-[#315888]">{children}</label>
  );
}

export function QualificationCreateForm({ onCancel, onSave }) {
  return (
    <div className="flex-1 bg-white px-6 py-8 md:px-10">
      <div className="mx-auto max-w-[1152px]">
        <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
          <h2 className="text-[17px] font-medium text-[#3C5065]">
            New Qualification
          </h2>
        </div>

        <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
            {/* Certificate Name */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>Certificate Name</FieldLabel>
              <div className="relative">
                <input
                  placeholder="Certificate Name"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Expiration */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>Expiration</FieldLabel>
              <div className="relative">
                <input
                  placeholder="Expiration"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Training Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>Training Date</FieldLabel>
              <div className="relative">
                <input
                  type="date"
                  placeholder="2025-05-00"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Expire Date */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>Expire Date</FieldLabel>
              <div className="relative">
                <input
                  type="date"
                  placeholder="2025-05-00"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 pr-9 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3C5065]" />
              </div>
            </div>

            {/* Attach File */}
            <div className="flex flex-col gap-2.5">
              <FieldLabel>Attach File</FieldLabel>
              <div className="flex h-[147px] items-center justify-center gap-6 rounded-lg border-[3px] border-dashed border-gray-200 px-6">
                <UploadCloud className="h-8 w-8 shrink-0 text-[#293056]" />
                <div className="flex flex-col gap-2 text-left">
                  <p className="text-sm font-semibold text-[#293056]">
                    Upload or Drag and Drop your document file
                  </p>
                  <p className="text-xs font-semibold text-[#667085]">
                    Maximum File Size is 20MB
                  </p>
                  <p className="text-xs text-[#667085]">
                    Supported File Types are .png, .jpeg, .pdf, .csv
                  </p>
                </div>
              </div>
            </div>

            {/* License Number + Remarks */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2.5">
                <FieldLabel>License Number</FieldLabel>
                <input
                  placeholder="Please Fill License Number"
                  className="h-[41px] w-full rounded-md border border-gray-200 bg-[#FBFDFF] px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <FieldLabel>Remarks</FieldLabel>
                <textarea
                  placeholder="Fill Remarks"
                  rows={7}
                  className="w-full resize-none rounded-md border border-gray-200 bg-[#FBFDFF] px-3 py-2.5 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-5">
          <button
            onClick={onCancel}
            className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
