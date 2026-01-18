import React, { useState, useEffect } from "react";
import { useCookies } from "../hooks/useCookies";
import { ModernButton } from "../ui/standardControls/button/Button";
import getIcon from "./iconRef";
export const CookieManagerForm = () => {
  const { getAll, set, deleteCookie, deleteAll } = useCookies();
  const [cookies, setCookies] = useState({});

  const refreshCookies = () => {
    setCookies(getAll());
  };

  useEffect(() => {
    refreshCookies();
  }, []);

  const handleDelete = (name) => {
    deleteCookie(name);
    refreshCookies();
  };

  const handleDeleteAll = () => {
    deleteAll();
    refreshCookies();
  };

  const handleToggle = (name, currentValue) => {
    set(name, !currentValue);
    refreshCookies();
  };

  const entries = Object.entries(cookies);

  return (
    <div>
      {/* <h3>Cookies</h3> */}
   <p>... you know there's no dev tools on ios.. ? only toglges bool vals or deletes. 
    just usign individual values & not json here ..
     </p>
      {entries.length === 0 ? (
        <p>No cookies found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries.map(([name, value]) => {
            const isBoolean = typeof value === "boolean";

            return (
              <li
                key={name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                  gap: "1rem",
                }}
              >
                     
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <strong>{name}</strong>

                  {isBoolean ? (
                    <label style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleToggle(name, value)}
                      />
                      {String(value)}
                    </label>
                  ) : (
                    <code>{String(value)}</code>
                  )}
                </div>

                <ModernButton
                  label="Delete"
                  icon={getIcon("cross")}
                  variant="dev"
                  callback={() => handleDelete(name)}
                />
              </li>
            );
          })}
        </ul>
      )}

      {entries.length > 0 && (
        <ModernButton
          label="Delete All Cookies"
          icon={getIcon("trash")}
          variant="dev"
          callback={handleDeleteAll}
          style={{ marginTop: "1rem" }}
        />
      )}
    </div>
  );
};
