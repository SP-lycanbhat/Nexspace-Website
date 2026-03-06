import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const RoleUserManagement = () => {
    const module = MODULES.find(m => m.id === "roles");
    return <ModulePageLayout module={module} />;
};

export default RoleUserManagement;
