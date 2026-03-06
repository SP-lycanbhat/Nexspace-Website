import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const HelpdeskTicketing = () => {
    const module = MODULES.find(m => m.id === "helpdesk");
    return <ModulePageLayout module={module} />;
};

export default HelpdeskTicketing;
