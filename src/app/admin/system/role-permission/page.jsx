"use client";
import React, { useState, useMemo } from "react";

// --- MASTER MODULE LIST ---
// All available modules in the system. Roles can pick from this list.
const masterModules = [
  { id: "students", name: "Student Management" },
  { id: "attendance", name: "Attendance" },
  { id: "finance", name: "Finance & Billing" },
  { id: "exams", name: "Examinations" },
  { id: "library", name: "Library" },
];

// --- INITIAL MOCK DATA ---
const initialRoles = [
  {
    id: "role_admin", name: "Admin", isSystem: true, // isSystem prevents deletion
    // Admin has all modules by default
    permissions: { 
      students: { view: true, create: true, edit: true, delete: true }, 
      attendance: { view: true, create: true, edit: true, delete: true }, 
      finance: { view: true, create: true, edit: true, delete: true },
      exams: { view: true, create: true, edit: true, delete: true },
      library: { view: true, create: true, edit: true, delete: true },
    }
  },
  {
    id: "role_teacher", name: "Teacher", isSystem: true,
    permissions: { 
      students: { view: true, create: false, edit: false, delete: false }, 
      attendance: { view: true, create: true, edit: false, delete: false },
      exams: { view: true, create: true, edit: false, delete: false }
      // Notice: Teacher doesn't have finance or library here
    }
  }
];

const initialUsers = [
  { id: "u1", name: "Imran Ahmed", assignedRoles: ["role_teacher"] },
  { id: "u2", name: "Rahim Uddin", assignedRoles: ["role_teacher"] },
  { id: "u3", name: "Karim Hossain", assignedRoles: ["role_admin"] },
];

export default function RbacDashboardPage() {
  // --- STATE MANAGEMENT ---
  const [roles, setRoles] = useState(initialRoles);
  const [users, setUsers] = useState(initialUsers);
  
  const [selectedRoleId, setSelectedRoleId] = useState("role_teacher");
  const [selectedUserId, setSelectedUserId] = useState("u1");
  
  const [newRoleName, setNewRoleName] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [moduleToAdd, setModuleToAdd] = useState(""); // For adding modules to a role
  
  const [userOverrides, setUserOverrides] = useState({});

  // --- DERIVED STATE ---
  const selectedRole = roles.find(r => r.id === selectedRoleId);
  const selectedUser = users.find(u => u.id === selectedUserId);

  // Filter users based on search (Name OR Role Name)
  const filteredUsers = useMemo(() => {
    if (!userSearchQuery.trim()) return users;
    const q = userSearchQuery.toLowerCase();
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(q);
      const roleMatch = user.assignedRoles.some(roleId => {
        const role = roles.find(r => r.id === roleId);
        return role && role.name.toLowerCase().includes(q);
      });
      return nameMatch || roleMatch;
    });
  }, [users, userSearchQuery, roles]);

  // --- HANDLERS: ROLE MANAGEMENT ---

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (!newRoleName.trim()) return;
    const newRole = {
      id: `custom_${Date.now()}`,
      name: newRoleName.trim(),
      isSystem: false,
      permissions: {} // Start with NO modules. Admin will add them.
    };
    setRoles(prev => [...prev, newRole]);
    setSelectedRoleId(newRole.id);
    setNewRoleName("");
  };

  const handleDeleteRole = (roleId) => {
    const roleToDelete = roles.find(r => r.id === roleId);
    if (roleToDelete?.isSystem) {
      alert("System default roles cannot be deleted.");
      return;
    }
    if (!confirm(`Are you sure you want to delete the role "${roleToDelete.name}"?`)) return;

    // 1. Remove role from master list
    setRoles(prev => prev.filter(r => r.id !== roleId));
    // 2. Remove role from any assigned users
    setUsers(prev => prev.map(user => ({
      ...user,
      assignedRoles: user.assignedRoles.filter(r => r !== roleId)
    })));
    // 3. Clear overrides related to this role for all users
    setUserOverrides(prev => {
      const newOverrides = {...prev};
      // Note: In a real app, overrides are stored by userId, so they remain, 
      // but the logic in getEffectivePermission handles missing roles gracefully.
      return newOverrides;
    });

    // Fallback selection if deleted role was selected
    if (selectedRoleId === roleId) {
      setSelectedRoleId(roles[0]?.id || "");
    }
  };

  const handleAddModuleToRole = (e) => {
    e.preventDefault();
    if (!moduleToAdd || !selectedRole) return;
    if (selectedRole.permissions[moduleToAdd]) {
      alert("This module is already added to the role.");
      return;
    }
    
    // Add module with all permissions set to false by default
    setRoles(prev => prev.map(role => {
      if (role.id !== selectedRoleId) return role;
      return {
        ...role,
        permissions: {
          ...role.permissions,
          [moduleToAdd]: { view: false, create: false, edit: false, delete: false }
        }
      };
    }));
    setModuleToAdd("");
  };

  const handleRemoveModuleFromRole = (moduleId) => {
    setRoles(prev => prev.map(role => {
      if (role.id !== selectedRoleId) return role;
      const newPerms = { ...role.permissions };
      delete newPerms[moduleId]; // Remove the module entirely
      return { ...role, permissions: newPerms };
    }));
  };

  const handleToggleBasePermission = (moduleId, action) => {
    setRoles(prev => prev.map(role => {
      if (role.id !== selectedRoleId) return role;
      return {
        ...role,
        permissions: {
          ...role.permissions,
          [moduleId]: { ...role.permissions[moduleId], [action]: !role.permissions[moduleId][action] }
        }
      };
    }));
  };

  // --- HANDLERS: USER MANAGEMENT ---

  const handleAssignRole = (roleId) => {
    setUsers(prev => prev.map(user => {
      if (user.id !== selectedUserId || user.assignedRoles.includes(roleId)) return user;
      return { ...user, assignedRoles: [...user.assignedRoles, roleId] };
    }));
  };

  const handleRemoveRoleFromUser = (roleId) => {
    setUsers(prev => prev.map(user => {
      if (user.id !== selectedUserId) return user;
      return { ...user, assignedRoles: user.assignedRoles.filter(r => r !== roleId) };
    }));
  };

  const handleToggleUserOverride = (moduleId, action) => {
    setUserOverrides(prev => {
      const currentOverrides = prev[selectedUserId] || {};
      const currentModuleOverrides = currentOverrides[moduleId] || {};
      const newStatus = !getEffectivePermission(moduleId, action);
      
      return {
        ...prev,
        [selectedUserId]: {
          ...currentOverrides,
          [moduleId]: { ...currentModuleOverrides, [action]: newStatus }
        }
      };
    });
  };

  const getEffectivePermission = (moduleId, action) => {
    if (!selectedUser) return false;
    const override = userOverrides[selectedUserId]?.[moduleId]?.[action];
    if (override !== undefined) return override;

    let hasPermission = false;
    selectedUser.assignedRoles.forEach(roleId => {
      const role = roles.find(r => r.id === roleId);
      if (role?.permissions[moduleId]?.[action]) hasPermission = true;
    });
    return hasPermission;
  };

  const isOverridden = (moduleId, action) => {
    if (!selectedUser) return false;
    const override = userOverrides[selectedUserId]?.[moduleId]?.[action];
    if (override === undefined) return false;

    let combinedRolePerm = false;
    selectedUser.assignedRoles.forEach(roleId => {
      const role = roles.find(r => r.id === roleId);
      if (role?.permissions[moduleId]?.[action]) combinedRolePerm = true;
    });
    return override !== combinedRolePerm;
  };

  // Get modules that haven't been added to the selected role yet
  const getAvailableModulesToAdd = () => {
    if (!selectedRole) return [];
    return masterModules.filter(m => !selectedRole.permissions[m.id]);
  };

  // --- UI RENDER ---
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden border-t border-slate-200">
      
      {/* ================= LEFT SIDE: ROLE MANAGEMENT ================= */}
      <div className="w-[45%] bg-white border-r border-slate-200 flex flex-col h-full">
        
        {/* Role Creation & List */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Roles & Modules</h2>
          
          <form onSubmit={handleCreateRole} className="flex gap-2 mb-3">
            <input type="text" placeholder="New role name..." value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 font-bold">+ Create</button>
          </form>

          <div className="flex flex-wrap gap-2">
            {roles.map(role => (
              <div key={role.id} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedRoleId === role.id ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                <button onClick={() => setSelectedRoleId(role.id)} className="focus:outline-none">
                  {role.name}
                  {role.isSystem && <span className="ml-1 text-[10px] opacity-60">(Default)</span>}
                </button>
                {/* Delete Button (Only for custom roles) */}
                {!role.isSystem && (
                  <button onClick={() => handleDeleteRole(role.id)} className="ml-1 text-red-400 hover:text-red-600 font-bold" title="Delete Role">✕</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Module Assignment to Role & Permissions */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          <h3 className="text-sm font-bold text-slate-700 mb-3">Configuring: {selectedRole?.name}</h3>
          
          {/* Add Module Dropdown */}
          <form onSubmit={handleAddModuleToRole} className="flex gap-2 mb-4">
            <select value={moduleToAdd} onChange={(e) => setModuleToAdd(e.target.value)} className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded bg-white focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>+ Add Module to this Role...</option>
              {getAvailableModulesToAdd().map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <button type="submit" className="px-3 py-2 bg-slate-200 text-slate-700 text-sm rounded hover:bg-slate-300 font-medium">Add</button>
          </form>

          {/* Permissions Table */}
          {Object.keys(selectedRole?.permissions || {}).length === 0 ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-sm p-8 text-center">
              This role has no modules assigned.<br/>Use the dropdown above to add modules.
            </div>
          ) : (
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-2 text-xs font-medium text-slate-500">Module</th>
                  <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">V</th>
                  <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">C</th>
                  <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">E</th>
                  <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">D</th>
                  <th className="p-2 text-xs font-medium text-slate-500 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedRole.permissions).map(moduleId => {
                  const modName = masterModules.find(m => m.id === moduleId)?.name || moduleId;
                  return (
                    <tr key={moduleId} className="border-t border-slate-100">
                      <td className="p-2 text-xs text-slate-700 font-medium">{modName}</td>
                      {["view", "create", "edit", "delete"].map(action => (
                        <td key={action} className="p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedRole.permissions[moduleId]?.[action] || false}
                            onChange={() => handleToggleBasePermission(moduleId, action)}
                            className="w-4 h-4 text-blue-600 rounded border-slate-300"
                          />
                        </td>
                      ))}
                      {/* Remove Module from Role Button */}
                      <td className="p-2 text-center">
                        <button onClick={() => handleRemoveModuleFromRole(moduleId)} className="text-slate-300 hover:text-red-500 transition-colors" title="Remove module from this role">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ================= RIGHT SIDE: USER ASSIGNMENT & OVERRIDE ================= */}
      <div className="w-[55%] flex flex-col h-full">
        
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">User Assignment & Overrides</h2>
          
          <div className="relative">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search by user name OR role name..."
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="mt-3 max-h-32 overflow-y-auto border border-slate-200 rounded-lg bg-white divide-y divide-slate-100">
            {filteredUsers.length === 0 ? (
              <p className="p-3 text-xs text-slate-500 text-center">No users found.</p>
            ) : (
              filteredUsers.map(user => (
                <button key={user.id} onClick={() => setSelectedUserId(user.id)} className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 transition-colors ${selectedUserId === user.id ? "bg-blue-50" : ""}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">{user.name.charAt(0)}</div>
                    <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {user.assignedRoles.length === 0 ? (
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">No Role</span>
                    ) : (
                      user.assignedRoles.map(rId => {
                        const rName = roles.find(r => r.id === rId)?.name || "Deleted";
                        return <span key={rId} className="text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded font-medium">{rName}</span>;
                      })
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {selectedUser ? (
            <div className="space-y-4">
              
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-800">Assign Roles to {selectedUser.name}</h3>
                  <select onChange={(e) => { if(e.target.value) handleAssignRole(e.target.value); e.target.value = ""; }} className="text-xs border border-slate-300 rounded px-2 py-1.5 bg-white" defaultValue="">
                    <option value="" disabled>+ Add Role</option>
                    {roles.filter(r => !selectedUser.assignedRoles.includes(r.id)).map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedUser.assignedRoles.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No roles assigned.</p>
                  ) : (
                    selectedUser.assignedRoles.map(roleId => {
                      const role = roles.find(r => r.id === roleId);
                      return (
                        <span key={roleId} className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium group">
                          {role?.name || "Unknown Role"}
                          <button onClick={() => handleRemoveRoleFromUser(roleId)} className="text-slate-400 hover:text-red-500 font-bold ml-1">✕</button>
                        </span>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <h3 className="text-sm font-bold text-slate-800 mb-1">Effective Permissions & Overrides</h3>
                <p className="text-[11px] text-slate-500 mb-4 bg-amber-50 p-2 rounded border border-amber-100">
                  Permissions are combined from assigned roles. Checking/Unchecking below creates a specific <b>Override</b> for {selectedUser.name}.
                </p>

                {/* Combine all modules from user's assigned roles to show here */}
                {(() => {
                  const combinedModules = new Set();
                  selectedUser.assignedRoles.forEach(roleId => {
                    const role = roles.find(r => r.id === roleId);
                    if(role) Object.keys(role.permissions).forEach(m => combinedModules.add(m));
                  });

                  if(combinedModules.size === 0) return <p className="text-xs text-slate-400 text-center py-4">Assign a role to see permissions.</p>;

                  return (
                    <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-2 text-xs font-medium text-slate-500">Module</th>
                          <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">V</th>
                          <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">C</th>
                          <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">E</th>
                          <th className="p-2 text-xs font-medium text-slate-500 text-center w-12">D</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from(combinedModules).map(moduleId => (
                          <tr key={moduleId} className="border-t border-slate-100">
                            <td className="p-2 text-xs text-slate-700 font-medium">{masterModules.find(m=>m.id===moduleId)?.name || moduleId}</td>
                            {["view", "create", "edit", "delete"].map(action => {
                              const isMod = isOverridden(moduleId, action);
                              return (
                                <td key={action} className="p-2 text-center">
                                  <input
                                    type="checkbox"
                                    checked={getEffectivePermission(moduleId, action)}
                                    onChange={() => handleToggleUserOverride(moduleId, action)}
                                    className={`w-4 h-4 rounded focus:ring-blue-500 ${isMod ? "text-orange-500 border-orange-400 bg-orange-50" : "text-blue-600 border-slate-300"}`}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>

              <button 
                onClick={() => { console.log("Saved:", { userId: selectedUserId, assignedRoles: selectedUser.assignedRoles, overrides: userOverrides[selectedUserId] }); alert("Saved!"); }}
                className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm"
              >
                Save User Configuration
              </button>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">Select a user</div>
          )}
        </div>
      </div>
    </div>
  );
}