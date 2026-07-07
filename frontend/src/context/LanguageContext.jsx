// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const translations = {
  en: {
    // Common
    app_name: 'Crew Management System',
    sign_in: 'Sign In',
    sign_out: 'Sign Out',
    cancel: 'Cancel',
    logout_success: 'Logout successful!',
    dashboard: 'Dashboard',
    crew: 'Crew',
    register: 'Register',
    payment: 'Payment',
    settings: 'Settings',
    export: 'Export',
    add_crew: 'Add Crew',
    search: 'Search',
    no_data: 'No data found',
    loading: 'Loading...',
    
    // Login
    user_name: 'User Name',
    password: 'Password',
    remember_me: 'Remember Me',
    forgot_password: 'Forgot Password?',
    login_success: 'Login successful!',
    login_failed: 'Login failed',
    
    // Crew
    crew_management: 'Crew Management',
    total_crews: 'Total Crews',
    on_board: 'On Board',
    active_crews: 'Active Crews',
    compliance_issues: 'Compliance Issues',
    boarding_vessel: 'Boarding Vessel',
    rank: 'Rank',
    seaman_code: 'Seaman Code',
    name: 'Name',
    validity: 'Validity',
    division: 'Division',
    type: 'Type',
    remaining: 'Remaining',
    note: 'Note',
    actions: 'Actions',
    view_details: 'View Details',
    
    // Calendar
    calendar: 'Calendar',
    overview: 'Overview',
    certificate: 'Certificate',
    contract: 'Contract',
    ppt: 'PPT',
    expire: 'Expire',
    days: 'Days',
    vessel_name: "Vessel's Name",
    crew_class: 'Crew Class',
    sign_on: 'Sign On',
    include_period_contract: 'Include Period Contract',
    
    // Footer
    all_rights_reserved: 'All rights reserved.',
    privacy_policy: 'Privacy Policy',
    terms: 'Terms',
    support: 'Support',
    version: 'Version',
  },
  kr: {
    // Common
    app_name: '승무원 관리 시스템',
    sign_in: '로그인',
    sign_out: '로그아웃',
    cancel: '취소',
    logout_success: '로그아웃 성공!',
    dashboard: '대시보드',
    crew: '승무원',
    register: '등록',
    payment: '결제',
    settings: '설정',
    export: '내보내기',
    add_crew: '승무원 추가',
    search: '검색',
    no_data: '데이터가 없습니다',
    loading: '로딩 중...',
    
    // Login
    user_name: '사용자 이름',
    password: '비밀번호',
    remember_me: '로그인 상태 유지',
    forgot_password: '비밀번호를 잊으셨나요?',
    login_success: '로그인 성공!',
    login_failed: '로그인 실패',
    
    // Crew
    crew_management: '승무원 관리',
    total_crews: '전체 승무원',
    on_board: '승선 중',
    active_crews: '활성 승무원',
    compliance_issues: '규정 준수 문제',
    boarding_vessel: '승선 선박',
    rank: '직급',
    seaman_code: '선원 코드',
    name: '이름',
    validity: '유효성',
    division: '구분',
    type: '유형',
    remaining: '잔여 일수',
    note: '비고',
    actions: '작업',
    view_details: '상세 보기',
    
    // Calendar
    calendar: '달력',
    overview: '개요',
    certificate: '자격증',
    contract: '계약',
    ppt: 'PPT',
    expire: '만료',
    days: '일',
    vessel_name: '선박 이름',
    crew_class: '승무원 등급',
    sign_on: '승선',
    include_period_contract: '계약 기간 포함',
    
    // Footer
    all_rights_reserved: '모든 권리 보유.',
    privacy_policy: '개인정보 처리방침',
    terms: '이용약관',
    support: '지원',
    version: '버전',
  },
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang) => {
    if (lang === 'en' || lang === 'kr') {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      api.defaults.headers.language = lang;
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    api.defaults.headers.language = language;
    document.documentElement.lang = language;
  }, []);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    isKorean: language === 'kr',
    isEnglish: language === 'en',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};