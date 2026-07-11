// src/features/crew/hooks/useCrewCreate.js
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCrew } from "../services/crewSlice";
import toastHelper from "../../../utils/toastHelper";
import { TAB_KEYS } from "../components/TabPills";

const initialCrewState = {
  crew_code: "",
  rank: "",
  hire_date: "",
  name_kor: "",
  name_eng: "",
  name_chinese: "",
  address: "",
  address_kor: "",
  phone: "",
  mobile: "",
  email: "",
  emergency_1: "",
  emergency_2: "",
  resident_id: "",
  birth_date: "",
  nationality: "",
  religion: "",
  education_university: "",
  education_school: "",
  vessel: "Sun Rio",
  waist: "",
  safety_shoes: "",
  garments: "",
  drinking: "",
  smoking: "",
  monthly_position: "",
  chemical: "",
  tanker: "",
  watch_office: "",
  note: "",
  mariners_license: "",
  passport: "",
  telecom_license: "",
  physical_exam: "",
  seaman_handbook: "",
  contract_period: "",
};

export const useCrewCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);
  const [crewMember, setCrewMember] = useState(initialCrewState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Handle Change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // Handle File Upload
  const handleFileUpload = useCallback((file) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      toastHelper.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle Remove Avatar
  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreview(null);
    setAvatarFile(null);
    toastHelper.info('Avatar removed');
  }, []);

  // Validate
  const validate = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      { key: "crew_code", label: "Crew Code" },
      { key: "rank", label: "Position" },
      { key: "hire_date", label: "Hire Date" },
      { key: "address", label: "Address" },
      { key: "phone", label: "Phone Number" },
      { key: "mobile", label: "Mobile Number" },
      { key: "email", label: "Email Address" },
      { key: "birth_date", label: "Birth Date" },
      { key: "nationality", label: "Nationality" },
      { key: "vessel", label: "Boarding Vessel" },
      { key: "resident_id", label: "Resident Number" },
    ];

    let hasError = false;
    requiredFields.forEach((field) => {
      const value = crewMember[field.key];
      if (!value || value.trim() === "") {
        newErrors[field.key] = `${field.label} is required`;
        hasError = true;
      }
    });

    if (crewMember.email && !/\S+@\S+\.\S+/.test(crewMember.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) {
      toastHelper.validation(newErrors);
    }
    return !hasError;
  }, [crewMember]);

  // Handle Save
  const handleSave = useCallback(async () => {
    if (!validate()) {
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }

    setIsLoading(true);
    const toastId = toastHelper.loading("Saving crew...");

    try {
      const formData = new FormData();
      Object.keys(crewMember).forEach((key) => {
        if (crewMember[key] !== null && crewMember[key] !== undefined) {
          formData.append(key, crewMember[key]);
        }
      });
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const result = await dispatch(createCrew(formData)).unwrap();
      toastHelper.updateLoadingToSuccess(toastId, "Crew saved successfully!");
      navigate(`/crew/${result.id}`);
    } catch (error) {
      toastHelper.updateLoadingToError(toastId, error.message || "Failed to save crew");
    } finally {
      setIsLoading(false);
    }
  }, [crewMember, avatarFile, validate, dispatch, navigate]);

  // Qualification Handlers
  const handleQualificationSave = useCallback(() => {
    toastHelper.success("Qualification saved successfully!");
  }, []);

  const handleQualificationCancel = useCallback(() => {
    toastHelper.info("Qualification creation cancelled");
  }, []);

  return {
    activeTab,
    setActiveTab,
    crewMember,
    setCrewMember,
    errors,
    isLoading,
    avatarPreview,
    avatarFile,
    handleChange,
    handleFileUpload,
    handleRemoveAvatar,
    handleSave,
    handleQualificationSave,
    handleQualificationCancel,
  };
};