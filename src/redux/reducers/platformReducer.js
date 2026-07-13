import { PLATFORM_TYPES } from "../actions/platformAction";

const initialState = {
  reports: [],
  auditLogs: [],
  adminUsers: [],
  user360: null,
  appeals: [],
  announcements: [],
  featureFlags: [],
  firebaseConfig: null,
  systemHealth: null,
  analytics: null,
};

const platformReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLATFORM_TYPES.SET_REPORTS:
      return { ...state, reports: action.payload };
    case PLATFORM_TYPES.SET_AUDIT_LOGS:
      return { ...state, auditLogs: action.payload };
    case PLATFORM_TYPES.SET_ADMIN_USERS:
      return { ...state, adminUsers: action.payload };
    case PLATFORM_TYPES.SET_USER_360:
      return { ...state, user360: action.payload };
    case PLATFORM_TYPES.SET_APPEALS:
      return { ...state, appeals: action.payload };
    case PLATFORM_TYPES.SET_ANNOUNCEMENTS:
      return { ...state, announcements: action.payload };
    case PLATFORM_TYPES.SET_FEATURE_FLAGS:
      return { ...state, featureFlags: action.payload };
    case PLATFORM_TYPES.SET_FIREBASE_CONFIG:
      return { ...state, firebaseConfig: action.payload };
    case PLATFORM_TYPES.SET_SYSTEM_HEALTH:
      return { ...state, systemHealth: action.payload };
    case PLATFORM_TYPES.SET_ANALYTICS:
      return { ...state, analytics: action.payload };
    default:
      return state;
  }
};

export default platformReducer;
