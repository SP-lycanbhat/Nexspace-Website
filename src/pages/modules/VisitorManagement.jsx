import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const VisitorManagement = () => {
    const module = MODULES.find(m => m.id === "visitor");
    return <ModulePageLayout module={module} />;
};

export default VisitorManagement;
