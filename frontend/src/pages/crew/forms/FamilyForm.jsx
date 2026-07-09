// src/pages/crew/forms/FamilyForm.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

// ===== RELATION OPTIONS =====
const RELATION_OPTIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandfather",
  "Grandmother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Niece",
  "Other",
];

function FieldLabel({ children, required = false }) {
  return (
    <label className="text-base font-medium text-[#315888]">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export default function FamilyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, name: "mgmg", relation: "brother", birth: "22-07-87", remarks: "-" },
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    birth: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.relation) {
      alert(t("fill_required_fields") || "Please fill required fields");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: formData.name,
      relation: formData.relation,
      birth: formData.birth || "-",
      remarks: formData.remarks || "-",
    };

    setFamilyMembers([...familyMembers, newMember]);
    setFormData({ name: "", relation: "", birth: "", remarks: "" });
    setIsAdding(false);
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      relation: member.relation,
      birth: member.birth === "-" ? "" : member.birth,
      remarks: member.remarks === "-" ? "" : member.remarks,
    });
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.relation) {
      alert(t("fill_required_fields") || "Please fill required fields");
      return;
    }

    setFamilyMembers((prev) =>
      prev.map((member) =>
        member.id === editingId
          ? {
              ...member,
              name: formData.name,
              relation: formData.relation,
              birth: formData.birth || "-",
              remarks: formData.remarks || "-",
            }
          : member
      )
    );
    setFormData({ name: "", relation: "", birth: "", remarks: "" });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure you want to delete?")) {
      setFamilyMembers(familyMembers.filter((member) => member.id !== id));
    }
  };

  const handleCancel = () => {
    navigate(`/crew/${id}`);
  };

  const handleBack = () => {
    navigate(`/crew/${id}`);
  };

  const handleSave = async () => {
    try {
      console.log("Saving family members:", familyMembers);
      // Add your API call here
      navigate(`/crew/${id}`);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", relation: "", birth: "", remarks: "" });
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* ===== SUBHEADER ဖယ်ရှားပြီး ===== */}
      
      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="flex items-center rounded-t-md border border-gray-200 bg-[#FBFDFF] px-6 py-3.5">
            <h2 className="text-[17px] font-medium text-[#3C5065]">
              {t("family_details") || "Family Details"}
            </h2>
          </div>

          <div className="rounded-b-md border border-t-0 border-gray-200 bg-white p-6 md:p-7">
            {/* Add Family Member Button */}
            {!isAdding && !editingId && (
              <button
                onClick={() => setIsAdding(true)}
                className="mb-6 flex items-center gap-2 rounded-md bg-[#002F67] px-4 py-2 text-sm font-medium text-white hover:bg-[#00397e] transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t("add_family_member") || "Add Family Member"}
              </button>
            )}

            {/* Add/Edit Form */}
            {(isAdding || editingId) && (
              <div className="mb-6 rounded-lg border border-gray-200 bg-[#FBFDFF] p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-[#3C5065]">
                    {editingId 
                      ? t("edit_family_member") || "Edit Family Member"
                      : t("add_family_member") || "Add Family Member"
                    }
                  </h3>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("name") || "Name"}
                    </FieldLabel>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("enter_name") || "Enter name"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FieldLabel required={true}>
                      {t("relation") || "Relation"}
                    </FieldLabel>
                    <select
                      name="relation"
                      value={formData.relation}
                      onChange={handleChange}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] appearance-none focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    >
                      <option value="">
                        {t("select_relation") || "Select Relation..."}
                      </option>
                      {RELATION_OPTIONS.map((relation) => (
                        <option key={relation} value={relation}>
                          {relation}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("birth") || "Birth"}
                    </FieldLabel>
                    <input
                      type="date"
                      name="birth"
                      value={formData.birth}
                      onChange={handleChange}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <FieldLabel>
                      {t("remarks") || "Remarks"}
                    </FieldLabel>
                    <input
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder={t("enter_remarks") || "Enter remarks"}
                      className="h-[41px] w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-[#3C5065] placeholder:text-[#3C5065]/70 focus:border-[#002F67] focus:outline-none focus:ring-1 focus:ring-[#002F67]"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={cancelEdit}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-[#3C5065] hover:bg-gray-50 transition-colors"
                  >
                    {t("cancel") || "Cancel"}
                  </button>
                  <button
                    onClick={editingId ? handleUpdate : handleAdd}
                    className="rounded-md bg-[#002F67] px-4 py-2 text-sm font-medium text-white hover:bg-[#00397e] transition-colors"
                  >
                    {editingId ? (t("update") || "Update") : (t("add") || "Add")}
                  </button>
                </div>
              </div>
            )}

            {/* Family Members Table */}
            {familyMembers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-sm font-medium text-[#3C5065]">
                        {t("name") || "Name"}
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-[#3C5065]">
                        {t("relation") || "Relation"}
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-[#3C5065]">
                        {t("birth") || "Birth"}
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-[#3C5065]">
                        {t("remarks") || "Remarks"}
                      </th>
                      <th className="px-4 py-3 text-sm font-medium text-[#3C5065] text-center">
                        {t("actions") || "Actions"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {familyMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-[#3C5065]">
                          {member.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#3C5065]">
                          {member.relation}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#3C5065]">
                          {member.birth}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#3C5065]">
                          {member.remarks}
                        </td>
                        <td className="px-4 py-3 text-sm text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(member)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-[#9CA3AF]">
                <p>{t("no_family_members") || "No family members added yet"}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-end gap-5">
            <button
              onClick={handleCancel}
              className="w-[171px] rounded-md border border-[#3B6598] bg-white py-2.5 text-sm text-[#3C5065] hover:bg-slate-50"
            >
              {t("cancel") || "Cancel"}
            </button>
            <button
              onClick={handleSave}
              className="w-[171px] rounded-md bg-[#002F67] py-2.5 text-sm font-medium text-white hover:bg-[#00397e]"
            >
              {t("save") || "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}