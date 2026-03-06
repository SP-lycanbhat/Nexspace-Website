import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const FacilityManagement = () => {
    const module = MODULES.find(m => m.id === "facility");
    return <ModulePageLayout module={module} />;
};

export default FacilityManagement;
