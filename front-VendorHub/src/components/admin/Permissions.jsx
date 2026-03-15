import { useEffect, useState } from 'react';
import { adminApi } from '../../api';
import toast from 'react-hot-toast';

export default function AdminPermissions() {
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Vendor');
  const [loading, setLoading] = useState(true);

  const load = (role) => {
    setLoading(true);
    adminApi.getRolePermissions(role).then(({ data }) => {
      if (data.success) setPermissions(data.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(selectedRole); }, [selectedRole]);

  const toggle = async (permId, current) => {
    try {
      await adminApi.updateRolePermission({ role: selectedRole, permissionId: permId, isGranted: !current });
      toast.success('Permission updated');
      load(selectedRole);
    } catch { toast.error('Failed'); }
  };

  const modules = [...new Set(permissions.map((p) => p.module))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Permission Management</h1>
        <p className="text-gray-500">Control what vendors can do in the system.</p>
      </div>

      <div className="flex gap-3">
        {['Vendor'].map((role) => (
          <button key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedRole === role ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {role} Role
          </button>
        ))}
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-gray-200 rounded-xl" />
      ) : (
        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module} className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">{module}</h2>
              <div className="space-y-3">
                {permissions.filter((p) => p.module === module).map((perm) => (
                  <div key={perm.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{perm.displayName}</p>
                      <p className="text-xs text-gray-500 font-mono">{perm.name}</p>
                    </div>
                    <button
                      onClick={() => toggle(perm.id, perm.isGranted)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        perm.isGranted ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        perm.isGranted ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}