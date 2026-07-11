// src/features/personal-info/hooks/usePersonalInfo.js
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createPersonalInfo, updatePersonalInfo } from "../services/personalInfoSlice";
import toastHelper from "../../../utils/toastHelper";

const initialPersonalInfoState = {
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
  vessel: "",
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

export const usePersonalInfo = (initialData = null, onSuccess, onError) => {
  const dispatch = useDispatch();
  const [crewMember, setCrewMember] = useState(initialData || initialPersonalInfoState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // ===== HANDLE CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // ===== HANDLE FILE UPLOAD =====
  const handleFileUpload = useCallback((file) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      toastHelper.success('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }, []);

  // ===== HANDLE REMOVE AVATAR =====
  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreview(null);
    setAvatarFile(null);
    toastHelper.info('Avatar removed');
  }, []);

  // ===== VALIDATE =====
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

  // ===== HANDLE SAVE =====
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
    const toastId = toastHelper.loading("Saving personal info...");

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

      let result;
      if (crewMember.id) {
        result = await dispatch(updatePersonalInfo({ id: crewMember.id, data: formData })).unwrap();
      } else {
        result = await dispatch(createPersonalInfo(formData)).unwrap();
      }

      toastHelper.updateLoadingToSuccess(toastId, "Personal info saved successfully!");
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      toastHelper.updateLoadingToError(toastId, error.message || "Failed to save personal info");
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [crewMember, avatarFile, validate, dispatch, onSuccess, onError]);

  // ===== RESET =====
  const reset = useCallback(() => {
    setCrewMember(initialPersonalInfoState);
    setErrors({});
    setAvatarPreview(null);
    setAvatarFile(null);
  }, []);

  return {
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
    reset,
  };
};