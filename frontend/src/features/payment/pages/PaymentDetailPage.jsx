// src/features/payment/pages/PaymentDetailPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentById } from "../services/paymentSlice";
import { fetchCrewById } from "../../crew/services/crewSlice";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import SubHeader from "../../crew/components/SubHeader";
import { Building2, User, Wallet, Calendar, FileText } from "lucide-react";

export default function PaymentDetailPage() {
  const { crewId, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const { selectedPayment, isLoading: isPaymentLoading } = useSelector((state) => state.payment);
  const { selectedCrew, isLoading: isCrewLoading } = useSelector((state) => state.crew);

  useEffect(() => {
    if (crewId) {
      dispatch(fetchCrewById(crewId));
    }
  }, [dispatch, crewId]);

  useEffect(() => {
    if (id) {
      dispatch(fetchPaymentById(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(`/crew/${crewId}`);
  };

  const handleEdit = () => {
    navigate(`/crew/${crewId}/payment/${id}/edit`);
  };

  if (isPaymentLoading || isCrewLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!selectedPayment) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">{t("not_found") || "Payment not found"}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t("back") || "Back"}
        </button>
      </div>
    );
  }

  const crewName = selectedCrew?.name_eng || selectedCrew?.name_kor || "";
  const crewCode = selectedCrew?.crew_code || "";
  const crewRank = selectedCrew?.rank || "";
  const vesselName = selectedCrew?.vessel || "";

  const subHeaderLabel = `${crewName}${crewCode ? ` [${crewCode}]` : ''}${crewRank ? ` - ${crewRank}` : ''}${vesselName ? ` - ${vesselName}` : ''} \\ ${t("payment") || "Payment"}`;

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <SubHeader
        onBack={handleBack}
        isNew={false}
        crewLabel={subHeaderLabel}
        showAddNew={false}
        showEdit={true}
        onEdit={handleEdit}
        isEditMode={false}
        crewName={crewName}
        crewCode={crewCode}
        crewRank={crewRank}
        vesselName={vesselName}
        activeTabLabel={t("payment") || "Payment"}
      />

      <div className="flex-1 bg-white px-6 py-8 md:px-10">
        <div className="mx-auto max-w-[1152px]">
          <div className="rounded-md border border-gray-200 bg-white p-6 md:p-7">
            <div className="grid grid-cols-1 gap-x-16 gap-y-7 md:grid-cols-2">
              
              {/* ===== LEFT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Bank Name */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("bank_name") || "Bank Name"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedPayment.bankName || "-"}
                    </p>
                  </div>
                </div>

                {/* Account Number */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("account_number") || "Account Number"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065] font-mono">
                      {selectedPayment.accountNumber || "-"}
                    </p>
                  </div>
                </div>

                {/* Account Holder */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("account_holder") || "Account Holder"}
                  </label>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedPayment.accountHolder || "-"}
                    </p>
                  </div>
                </div>

                {/* Relation */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("relation") || "Relation"}
                  </label>
                  <p className="text-sm text-[#3C5065]">
                    {selectedPayment.relation || "-"}
                  </p>
                </div>
              </div>

              {/* ===== RIGHT COLUMN ===== */}
              <div className="flex flex-col gap-7">
                
                {/* Amount */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("amount") || "Amount"}
                  </label>
                  <p className="text-lg font-bold text-[#002F67]">
                    {selectedPayment.amount ? `${selectedPayment.amount.toLocaleString()} MMK` : "-"}
                  </p>
                </div>

                {/* Payment Date */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("payment_date") || "Payment Date"}
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#315888]" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedPayment.paymentDate || "-"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("status") || "Status"}
                  </label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block w-fit ${
                    selectedPayment.status === "Paid" 
                      ? "bg-green-100 text-green-700" 
                      : selectedPayment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {selectedPayment.status || "-"}
                  </span>
                </div>

                {/* Remarks */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-medium text-[#315888]">
                    {t("remarks") || "Remarks"}
                  </label>
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#315888] mt-0.5" />
                    <p className="text-sm text-[#3C5065]">
                      {selectedPayment.remarks || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}