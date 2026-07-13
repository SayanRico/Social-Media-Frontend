import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Main from "../main/Main";
import AdminManagement from "../adminManagement/AdminManagement";
import Spam from "../spamManagement/Spam";
import UsersManagement from "../usersManagement/UsersManagement";
import ReportsManagement from "../reportsManagement/ReportsManagement";
import User360 from "../user360/User360";
import AppealsManagement from "../appealsManagement/AppealsManagement";
import AuditLog from "../auditLog/AuditLog";
import Announcements from "../announcements/Announcements";
import FeatureFlags from "../featureFlags/FeatureFlags";
import FirebaseSettings from "../firebaseSettings/FirebaseSettings";
import SystemHealth from "../systemHealth/SystemHealth";
import Button from "../../UI/Button";
import { logout } from "../../../redux/actions/authAction";

const NAV = [
  { id: 1, label: "Dashboard", icon: "fa-th-large", section: "Overview" },
  { id: 5, label: "Reports Queue", icon: "fa-flag", section: "Moderation" },
  { id: 6, label: "User 360°", icon: "fa-id-card", section: "Moderation" },
  { id: 7, label: "Appeals", icon: "fa-gavel", section: "Moderation" },
  { id: 3, label: "Spam Management", icon: "fa-ban", section: "Moderation" },
  { id: 4, label: "Users", icon: "fa-users", section: "Users" },
  { id: 8, label: "Audit Log", icon: "fa-history", section: "Security" },
  { id: 9, label: "Announcements", icon: "fa-bullhorn", section: "Platform" },
  { id: 10, label: "Feature Flags", icon: "fa-toggle-on", section: "Platform" },
  { id: 12, label: "Firebase Settings", icon: "fa-fire", section: "Platform" },
  { id: 11, label: "System Health", icon: "fa-heartbeat", section: "Ops" },
  { id: 2, label: "Admin Management", icon: "fa-user-shield", section: "Settings" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [adminMenu, setAdminMenu] = useState(1);
  const [navOpen, setNavOpen] = useState(false);

  const active = NAV.find((n) => n.id === adminMenu);

  const selectMenu = (id) => {
    setAdminMenu(id);
    setNavOpen(false);
  };

  const sections = [...new Set(NAV.map((n) => n.section))];

  const renderPanel = () => {
    switch (adminMenu) {
      case 1: return <Main />;
      case 2: return <AdminManagement />;
      case 3: return <Spam />;
      case 4: return <UsersManagement />;
      case 5: return <ReportsManagement />;
      case 6: return <User360 />;
      case 7: return <AppealsManagement />;
      case 8: return <AuditLog />;
      case 9: return <Announcements />;
      case 10: return <FeatureFlags />;
      case 12: return <FirebaseSettings />;
      case 11: return <SystemHealth />;
      default: return <Main />;
    }
  };

  return (
    <div className={`admin-shell ${navOpen ? "is-nav-open" : ""}`}>
      <aside className="admin-sidebar" id="sidebar">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">FM</div>
          <div>
            <h1>Face Meet</h1>
            <span>Enterprise Console</span>
          </div>
        </div>

        {sections.map((section) => (
          <React.Fragment key={section}>
            <p className="admin-sidebar__section">{section}</p>
            {NAV.filter((n) => n.section === section).map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-sidebar__link ${
                  adminMenu === item.id ? "is-active" : ""
                }`}
                onClick={() => selectMenu(item.id)}
              >
                <i className={`fa ${item.icon}`} />
                {item.label}
              </button>
            ))}
          </React.Fragment>
        ))}

        <div className="admin-sidebar__logout">
          <Link to="/" onClick={() => dispatch(logout())}>
            <i className="fa fa-power-off" />
            Log out
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <div className="admin-mobile-nav">
          <Button
            size="sm"
            variant="secondary"
            design="solid"
            onClick={() => setNavOpen((v) => !v)}
          >
            Menu
          </Button>
          <strong>{active?.label}</strong>
        </div>

        {navOpen && (
          <div
            role="presentation"
            onClick={() => setNavOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,0.35)",
              zIndex: 30,
            }}
          />
        )}

        {renderPanel()}
      </div>
    </div>
  );
};

export default Sidebar;
