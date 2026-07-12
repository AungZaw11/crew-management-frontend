// src/features/health/hooks/useHealth.js
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchInjuryById,
  fetchMedicalCheckupById,
  fetchDiseaseById,
  createInjury,
  createMedicalCheckup,
  createDisease,
  updateInjury,
  updateMedicalCheckup,
  updateDisease,
} from "../services/healthSlice";
import toastHelper from "../../../utils/toastHelper";

export const useHealth = (initialData = null, onSuccess) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crewId, tab, id } = useParams();
  const isEdit = !!id;

  // Active tab
  const activeTab = tab || "injury";

  // State
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redux State
  const {
    selectedInjury,
    selectedMedicalCheckup,
    selectedDisease,
    isLoading: isFetching,
  } = useSelector((state) => state.health);

  // ===== GET SELECTED DATA BASED ON TAB =====
  const getSelectedData = () => {
    switch (activeTab) {
      case "injury":
        return selectedInjury;
      case "medical_checkup":
        return selectedMedicalCheckup;
      case "disease":
        return selectedDisease;
      default:
        return null;
    }
  };

  const selectedData = getSelectedData();

  // ===== FETCH BY ID =====
  const fetchById = useCallback(() => {
    if (!id) return;
    
    switch (activeTab) {
      case "injury":
        dispatch(fetchInjuryById(id));
        break;
      case "medical_checkup":
        dispatch(fetchMedicalCheckupById(id));
        break;
      case "disease":
        dispatch(fetchDiseaseById(id));
        break;
      default:
        break;
    }
  }, [dispatch, id, activeTab]);

  // ===== CREATE =====
  const createRecord = useCallback(async (data) => {
    let result;
    switch (activeTab) {
      case "injury":
        result = await dispatch(createInjury(data)).unwrap();
        break;
      case "medical_checkup":
        result = await dispatch(createMedicalCheckup(data)).unwrap();
        break;
      case "disease":
        result = await dispatch(createDisease(data)).unwrap();
        break;
      default:
        throw new Error("Invalid tab");
    }
    return result;
  }, [dispatch, activeTab]);

  // ===== UPDATE =====
  const updateRecord = useCallback(async (updateId, data) => {
    let result;
    const payload = { id: updateId, data };
    
    switch (activeTab) {
      case "injury":
        result = await dispatch(updateInjury(payload)).unwrap();
        break;
      case "medical_checkup":
        result = await dispatch(updateMedicalCheckup(payload)).unwrap();
        break;
      case "disease":
        result = await dispatch(updateDisease(payload)).unwrap();
        break;
      default:
        throw new Error("Invalid tab");
    }
    return result;
  }, [dispatch, activeTab]);

  // ===== LOAD DATA FOR EDIT =====
  useEffect(() => {
    if (isEdit && id) {
      fetchById();
    }
  }, [isEdit, id, fetchById]);

  useEffect(() => {
    if (isEdit && selectedData) {
      setFormData(selectedData);
    }
  }, [isEdit, selectedData]);

  // ===== HANDLE CHANGE =====
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // ===== VALIDATE =====
  const validate = useCallback(() => {
    const newErrors = {};
    const requiredFields = [
      { key: "date", label: "Date" },
    ];

    // For Disease, startDate and endDate are required
    if (activeTab === "disease") {
      requiredFields.push({ key: "startDate", label: "Start Date" });
      requiredFields.push({ key: "endDate", label: "End Date" });
    }

    let hasError = false;
    requiredFields.forEach((field) => {
      const value = formData[field.key];
      if (!value || value.trim() === "") {
        newErrors[field.key] = `${field.label} is required`;
        hasError = true;
      }
    });

    setErrors(newErrors);
    if (hasError) {
      toastHelper.validation(newErrors);
    }
    return !hasError;
  }, [formData, activeTab]);

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
    const toastId = toastHelper.loading(
      isEdit ? "Updating health record..." : "Saving health record..."
    );

    try {
      let result;
      const payload = { ...formData, crewId };

      if (isEdit) {
        result = await updateRecord(id, payload);
      } else {
        result = await createRecord(payload);
      }

      toastHelper.updateLoadingToSuccess(
        toastId,
        isEdit ? "Health record updated successfully!" : "Health record saved successfully!"
      );

      if (onSuccess) {
        onSuccess(result);
      } else {
        const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
        navigate(`/crew/${crewId}/health${tabPath}`);
      }
    } catch (error) {
      toastHelper.updateLoadingToError(
        toastId,
        error.message || (isEdit ? "Failed to update health record" : "Failed to save health record")
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, isEdit, id, activeTab, crewId, validate, updateRecord, createRecord, navigate, onSuccess]);

  // ===== HANDLE CANCEL =====
  const handleCancel = useCallback(() => {
    const tabPath = activeTab === "injury" ? "" : `/${activeTab}`;
    navigate(`/crew/${crewId}/health${tabPath}`);
  }, [navigate, crewId, activeTab]);

  return {
    formData,
    setFormData,
    errors,
    isLoading: isLoading || isFetching,
    isEdit,
    activeTab,
    crewId,
    handleChange,
    handleSave,
    handleCancel,
  };
};