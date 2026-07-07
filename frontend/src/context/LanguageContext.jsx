// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

// ==================== TRANSLATIONS ====================
const translations = {
  // ==================== ENGLISH ====================
  en: {
    // Common
    app_name: "Crew Management System",
    sign_in: "Sign In",
    sign_out: "Sign Out",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    export: "Export",
    import: "Import",
    add: "Add",
    add_crew: "Add Crew",
    search: "Search",
    search_placeholder: "Search by name, code, vessel...",
    no_data: "No data found",
    loading: "Loading...",
    yes: "Yes",
    no: "No",
    ok: "OK",
    close: "Close",
    back: "Back",
    next: "Next",
    previous: "Previous",

    // Navigation
    dashboard: "Dashboard",
    crew: "Crew",
    register: "Register",
    payment: "Payment",
    settings: "Settings",
    overview: "Overview",
    calendar: "Calendar",

    // Login
    user_name: "User Name",
    password: "Password",
    remember_me: "Remember Me",
    forgot_password: "Forgot Password?",
    login_success: "Login successful!",
    login_failed: "Login failed. Please check your credentials.",

    // Crew
    crew_management: "Crew Management",
    total_crews: "Total Crews",
    on_board: "On Board",
    active_crews: "Active Crews",
    compliance_issues: "Compliance Issues",
    boarding_vessel: "Boarding Vessel",
    rank: "Rank",
    seaman_code: "Seaman Code",
    name: "Name",
    validity: "Validity",
    division: "Division",
    type: "Type",
    remaining: "Remaining",
    note: "Note",
    actions: "Actions",
    view_details: "View Details",

    // Certificate / Summary
    certificate: "Certificate",
    contract: "Contract",
    ppt: "PPT",
    expire: "Expire",
    days: "Days",
    see_all: "See All →",
    vessel_name: "Vessel's Name",
    crew_class: "Crew Class",
    sign_on: "Sign On",
    include_period_contract: "Include Period Contract",

    // Dashboard
    dashboard_overview: "Dashboard Overview",
    total_crew: "Total Crew",
    active_on_board: "Active on Board",
    pending_contracts: "Pending Contracts",
    expiring_certs: "Expiring Certs",
    quick_actions: "Quick Actions",
    recent_activity: "Recent Activity",
    upcoming_tasks: "Upcoming Tasks",

    // Footer
    all_rights_reserved: "All rights reserved.",
    privacy_policy: "Privacy Policy",
    terms: "Terms",
    support: "Support",
    version: "Version",

    // Messages
    logout_success: "Logout successful!",
    logout_failed: "Logout failed.",
    crew_created: "Crew created successfully.",
    crew_updated: "Crew updated successfully.",
    crew_deleted: "Crew deleted successfully.",
    crew_not_found: "Crew not found.",
    confirm_delete: "Are you sure you want to delete?",
    confirm_delete_message:
      "Do you really want to delete this records? This process cannot be undone.",

    // Profile
    profile: "Profile",
    personal_info: "Personal Information",
    contact_info: "Contact Information",
    details_info: "Details Information",
    address: "Address",
    phone: "Phone",
    email: "Email",
    birth_date: "Birth Date",
    nationality: "Nationality",

    // Appointment
    appointment: "Appointment",
    replacement: "Replacement",
    family: "Family",
    health: "Health",
    injury: "Injury",
    experiences: "Experiences",
    evaluation: "Evaluation",
    certificates: "Certificates",
    qualification: "Qualification",
    accident: "Accident",

    // Payment
    payroll: "Payroll",
    payment_info: "Payment Information",
    bank_name: "Bank Name",
    account_number: "Account Number",
    holder_name: "Holder Name",
    relation: "Relation",
    basic_wage: "Basic Wage",
    overtime: "Overtime",
    allowances: "Allowances",
    deductions: "Deductions",
    currency: "Currency",
    payment_date: "Payment Date",
  },

  // ==================== KOREAN ====================
  kr: {
    // Common
    app_name: "승무원 관리 시스템",
    sign_in: "로그인",
    sign_out: "로그아웃",
    cancel: "취소",
    save: "저장",
    delete: "삭제",
    edit: "수정",
    view: "보기",
    export: "내보내기",
    import: "가져오기",
    add: "추가",
    add_crew: "승무원 추가",
    search: "검색",
    search_placeholder: "이름, 코드, 선박명으로 검색...",
    no_data: "데이터가 없습니다",
    loading: "로딩 중...",
    yes: "예",
    no: "아니오",
    ok: "확인",
    close: "닫기",
    back: "뒤로",
    next: "다음",
    previous: "이전",

    // Navigation
    dashboard: "대시보드",
    crew: "승무원",
    register: "등록",
    payment: "결제",
    settings: "설정",
    overview: "개요",
    calendar: "달력",

    // Login
    user_name: "사용자 이름",
    password: "비밀번호",
    remember_me: "로그인 상태 유지",
    forgot_password: "비밀번호를 잊으셨나요?",
    login_success: "로그인 성공!",
    login_failed: "로그인 실패. 자격 증명을 확인하세요.",

    // Crew
    crew_management: "승무원 관리",
    total_crews: "전체 승무원",
    on_board: "승선 중",
    active_crews: "활성 승무원",
    compliance_issues: "규정 준수 문제",
    boarding_vessel: "승선 선박",
    rank: "직급",
    seaman_code: "선원 코드",
    name: "이름",
    validity: "유효성",
    division: "구분",
    type: "유형",
    remaining: "잔여 일수",
    note: "비고",
    actions: "작업",
    view_details: "상세 보기",

    // Certificate / Summary
    certificate: "자격증",
    contract: "계약",
    ppt: "PPT",
    expire: "만료",
    days: "일",
    see_all: "전체 보기 →",
    vessel_name: "선박 이름",
    crew_class: "승무원 등급",
    sign_on: "승선",
    include_period_contract: "계약 기간 포함",

    // Dashboard
    dashboard_overview: "대시보드 개요",
    total_crew: "전체 승무원",
    active_on_board: "승선 중",
    pending_contracts: "대기 중인 계약",
    expiring_certs: "만료 예정 자격증",
    quick_actions: "빠른 작업",
    recent_activity: "최근 활동",
    upcoming_tasks: "예정된 작업",

    // Footer
    all_rights_reserved: "모든 권리 보유.",
    privacy_policy: "개인정보 처리방침",
    terms: "이용약관",
    support: "지원",
    version: "버전",

    // Messages
    logout_success: "로그아웃 성공!",
    logout_failed: "로그아웃 실패.",
    crew_created: "승무원이 성공적으로 생성되었습니다.",
    crew_updated: "승무원이 성공적으로 업데이트되었습니다.",
    crew_deleted: "승무원이 성공적으로 삭제되었습니다.",
    crew_not_found: "승무원을 찾을 수 없습니다.",
    confirm_delete: "삭제하시겠습니까?",
    confirm_delete_message:
      "이 기록을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",

    // Profile
    profile: "프로필",
    personal_info: "개인 정보",
    contact_info: "연락처 정보",
    details_info: "상세 정보",
    address: "주소",
    phone: "전화번호",
    email: "이메일",
    birth_date: "생년월일",
    nationality: "국적",

    // Appointment
    appointment: "임명",
    replacement: "교체",
    family: "가족",
    health: "건강",
    injury: "부상",
    experiences: "경력",
    evaluation: "평가",
    certificates: "자격증",
    qualification: "자격",
    accident: "사고",

    // Payment
    payroll: "급여",
    payment_info: "결제 정보",
    bank_name: "은행명",
    account_number: "계좌번호",
    holder_name: "예금주",
    relation: "관계",
    basic_wage: "기본급",
    overtime: "초과 근무",
    allowances: "수당",
    deductions: "공제",
    currency: "통화",
    payment_date: "결제일",
  },
};

// ==================== LANGUAGE CONTEXT ====================
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Change language
  const changeLanguage = (lang) => {
    if (lang === "en" || lang === "kr") {
      setLanguage(lang);
      localStorage.setItem("language", lang);

      // Update API default header
      if (api && api.defaults) {
        api.defaults.headers.language = lang;
      }

      // Update HTML lang attribute
      document.documentElement.lang = lang;

      console.log(`🌐 Language changed to: ${lang.toUpperCase()}`);
    }
  };

  // Set initial language on mount
  useEffect(() => {
    // Update API default header
    if (api && api.defaults) {
      api.defaults.headers.language = language;
    }

    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, []);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    isKorean: language === "kr",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
