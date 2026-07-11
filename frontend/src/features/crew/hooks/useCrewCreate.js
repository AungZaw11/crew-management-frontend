// src/features/crew/hooks/useCrewCreate.js
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCrew, updateCrew } from "../services/crewSlice";
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

export const useCrewCreate = (isEditMode = false, initialData = null) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ===== General Crew State =====
  const [activeTab, setActiveTab] = useState(TAB_KEYS[0]);
  const [crewMember, setCrewMember] = useState(
    isEditMode && initialData ? initialData : initialCrewState
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // ===== Qualification State =====
  const [qualificationData, setQualificationData] = useState({});
  const [qualificationErrors, setQualificationErrors] = useState({});
  const [qualificationFile, setQualificationFile] = useState(null);

  // ===== Appointment State =====
  const [appointmentData, setAppointmentData] = useState({});
  const [appointmentErrors, setAppointmentErrors] = useState({});

  // ===== Replacement State =====
  const [replacementData, setReplacementData] = useState({});
  const [replacementErrors, setReplacementErrors] = useState({});

  // ===== Payment State =====
  const [paymentData, setPaymentData] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});

  // ===== Family State =====
  const [familyData, setFamilyData] = useState({});
  const [familyErrors, setFamilyErrors] = useState({});

  // ===== Injury State =====
  const [injuryData, setInjuryData] = useState({});
  const [injuryErrors, setInjuryErrors] = useState({});

  // ===== Health State =====
  const [healthData, setHealthData] = useState({});
  const [healthErrors, setHealthErrors] = useState({});

  // ===== Experience State =====
  const [experienceData, setExperienceData] = useState({});
  const [experienceErrors, setExperienceErrors] = useState({});

  // ===== Evaluation State =====
  const [evaluationData, setEvaluationData] = useState({});
  const [evaluationErrors, setEvaluationErrors] = useState({});

  // ===== Accident State =====
  const [accidentData, setAccidentData] = useState({});
  const [accidentErrors, setAccidentErrors] = useState({});

  // ===== Handle Change (Personal Info) =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCrewMember((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // ===== Handle File Upload (Avatar) =====
  const handleFileUpload = useCallback((file) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      toastHelper.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  }, []);

  // ===== Handle Remove Avatar =====
  const handleRemoveAvatar = useCallback(() => {
    setAvatarPreview(null);
    setAvatarFile(null);
    toastHelper.info("Avatar removed");
  }, []);

  // ===== Validate (Personal Info) =====
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

  // ===== Handle Save (Personal Info) =====
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
    const toastId = toastHelper.loading(
      isEditMode ? "Updating crew..." : "Saving crew..."
    );

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
      if (isEditMode && crewMember.id) {
        // ✅ Update
        result = await dispatch(updateCrew({ id: crewMember.id, data: formData })).unwrap();
        toastHelper.updateLoadingToSuccess(toastId, "Crew updated successfully!");
        navigate(`/crew/${crewMember.id}`);
      } else {
        // ✅ Create
        result = await dispatch(createCrew(formData)).unwrap();
        toastHelper.updateLoadingToSuccess(toastId, "Crew saved successfully!");
        navigate(`/crew/${result.id}`);
      }
    } catch (error) {
      toastHelper.updateLoadingToError(toastId, error.message || "Failed to save crew");
    } finally {
      setIsLoading(false);
    }
  }, [crewMember, avatarFile, validate, dispatch, navigate, isEditMode]);

  // ===== Helper: Create Form Handlers =====
  const createFormHandlers = (data, setData, errors, setErrors, name) => {
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }, [errors]);

    const handleSave = useCallback(() => {
      toastHelper.success(`${name} saved successfully!`);
    }, [name]);

    const handleCancel = useCallback(() => {
      setData({});
      setErrors({});
      toastHelper.info(`${name} creation cancelled`);
    }, [name, setData, setErrors]);

    return { handleChange, handleSave, handleCancel };
  };

  // ===== Qualification Handlers =====
  const {
    handleChange: handleQualificationChange,
    handleSave: handleQualificationSave,
    handleCancel: handleQualificationCancel,
  } = createFormHandlers(
    qualificationData,
    setQualificationData,
    qualificationErrors,
    setQualificationErrors,
    "Qualification"
  );

  // ===== Appointment Handlers =====
  const {
    handleChange: handleAppointmentChange,
    handleSave: handleAppointmentSave,
    handleCancel: handleAppointmentCancel,
  } = createFormHandlers(
    appointmentData,
    setAppointmentData,
    appointmentErrors,
    setAppointmentErrors,
    "Appointment"
  );

  // ===== Replacement Handlers =====
  const {
    handleChange: handleReplacementChange,
    handleSave: handleReplacementSave,
    handleCancel: handleReplacementCancel,
  } = createFormHandlers(
    replacementData,
    setReplacementData,
    replacementErrors,
    setReplacementErrors,
    "Replacement"
  );

  // ===== Payment Handlers =====
  const {
    handleChange: handlePaymentChange,
    handleSave: handlePaymentSave,
    handleCancel: handlePaymentCancel,
  } = createFormHandlers(
    paymentData,
    setPaymentData,
    paymentErrors,
    setPaymentErrors,
    "Payment"
  );

  // ===== Family Handlers =====
  const {
    handleChange: handleFamilyChange,
    handleSave: handleFamilySave,
    handleCancel: handleFamilyCancel,
  } = createFormHandlers(
    familyData,
    setFamilyData,
    familyErrors,
    setFamilyErrors,
    "Family"
  );

  // ===== Injury Handlers =====
  const {
    handleChange: handleInjuryChange,
    handleSave: handleInjurySave,
    handleCancel: handleInjuryCancel,
  } = createFormHandlers(
    injuryData,
    setInjuryData,
    injuryErrors,
    setInjuryErrors,
    "Injury"
  );

  // ===== Health Handlers =====
  const {
    handleChange: handleHealthChange,
    handleSave: handleHealthSave,
    handleCancel: handleHealthCancel,
  } = createFormHandlers(
    healthData,
    setHealthData,
    healthErrors,
    setHealthErrors,
    "Health"
  );

  // ===== Experience Handlers =====
  const {
    handleChange: handleExperienceChange,
    handleSave: handleExperienceSave,
    handleCancel: handleExperienceCancel,
  } = createFormHandlers(
    experienceData,
    setExperienceData,
    experienceErrors,
    setExperienceErrors,
    "Experience"
  );

  // ===== Evaluation Handlers =====
  const {
    handleChange: handleEvaluationChange,
    handleSave: handleEvaluationSave,
    handleCancel: handleEvaluationCancel,
  } = createFormHandlers(
    evaluationData,
    setEvaluationData,
    evaluationErrors,
    setEvaluationErrors,
    "Evaluation"
  );

  // ===== Accident Handlers =====
  const {
    handleChange: handleAccidentChange,
    handleSave: handleAccidentSave,
    handleCancel: handleAccidentCancel,
  } = createFormHandlers(
    accidentData,
    setAccidentData,
    accidentErrors,
    setAccidentErrors,
    "Accident"
  );

  // ===== Handle File Upload (Qualification) =====
  const handleQualificationFileUpload = useCallback((file) => {
    setQualificationFile(file);
    toastHelper.success("Certificate file uploaded successfully!");
  }, []);

  const handleQualificationFileRemove = useCallback(() => {
    setQualificationFile(null);
    toastHelper.info("Certificate file removed");
  }, []);

  // ===== Reset Form =====
  const resetForm = useCallback(() => {
    setCrewMember(initialCrewState);
    setErrors({});
    setAvatarPreview(null);
    setAvatarFile(null);
    setActiveTab(TAB_KEYS[0]);
  }, []);

  return {
    // Personal Info
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
    resetForm,
    isEditMode,

    // Qualification
    qualificationData,
    qualificationErrors,
    qualificationFile,
    handleQualificationChange,
    handleQualificationFileUpload,
    handleQualificationFileRemove,
    handleQualificationSave,
    handleQualificationCancel,

    // Appointment
    appointmentData,
    appointmentErrors,
    handleAppointmentChange,
    handleAppointmentSave,
    handleAppointmentCancel,

    // Replacement
    replacementData,
    replacementErrors,
    handleReplacementChange,
    handleReplacementSave,
    handleReplacementCancel,

    // Payment
    paymentData,
    paymentErrors,
    handlePaymentChange,
    handlePaymentSave,
    handlePaymentCancel,

    // Family
    familyData,
    familyErrors,
    handleFamilyChange,
    handleFamilySave,
    handleFamilyCancel,

    // Injury
    injuryData,
    injuryErrors,
    handleInjuryChange,
    handleInjurySave,
    handleInjuryCancel,

    // Health
    healthData,
    healthErrors,
    handleHealthChange,
    handleHealthSave,
    handleHealthCancel,

    // Experience
    experienceData,
    experienceErrors,
    handleExperienceChange,
    handleExperienceSave,
    handleExperienceCancel,

    // Evaluation
    evaluationData,
    evaluationErrors,
    handleEvaluationChange,
    handleEvaluationSave,
    handleEvaluationCancel,

    // Accident
    accidentData,
    accidentErrors,
    handleAccidentChange,
    handleAccidentSave,
    handleAccidentCancel,
  };
};