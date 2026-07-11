// src/features/appointment/pages/AppointmentEditPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAppointment } from "../hooks/useAppointment";
import { fetchAppointmentById } from "../services/appointmentSlice";
import AppointmentForm from "../components/AppointmentForm";
import LoadingSpinner from "../../../common/components/LoadingSpinner";

export default function AppointmentEditPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedAppointment, isLoading: isFetching } = useSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAppointmentById(id));
    }
  }, [dispatch, id]);

  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSave,
    handleCancel,
  } = useAppointment(selectedAppointment);

  if (isFetching) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AppointmentForm
      formData={formData}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={handleCancel}
      mode="edit"          // ✅ edit mode
      isLoading={isLoading}
    />
  );
}