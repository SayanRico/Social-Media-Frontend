import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAppeals, resolveAppeal } from "../../../redux/actions/platformAction";
import Button from "../../UI/Button";
import Badge from "../../UI/Badge";

const AppealsManagement = () => {
  const { auth, platform } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [note, setNote] = useState("");

  useEffect(() => {
    dispatch(getAppeals(auth.token));
  }, [dispatch, auth.token]);

  return (
    <>
      <header className="admin-page-header">
        <h1>Appeals</h1>
        <p>Review user appeals against moderation actions.</p>
      </header>

      <div className="admin-panel admin-panel--wide">
        {platform.appeals.length === 0 ? (
          <div className="admin-empty"><p>No pending appeals.</p></div>
        ) : (
          platform.appeals.map((a) => (
            <div className="admin-report-row" key={a._id}>
              <div>
                <strong>{a.user?.username}</strong>
                <p>{a.reason}</p>
                <Badge label={a.status} size="sm" />
              </div>
              {a.status === "pending" && (
                <div className="admin-user-row__actions">
                  <Button
                    size="sm"
                    onClick={() =>
                      dispatch(resolveAppeal(auth.token, a._id, "approved", note))
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      dispatch(resolveAppeal(auth.token, a._id, "denied", note))
                    }
                  >
                    Deny
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AppealsManagement;
