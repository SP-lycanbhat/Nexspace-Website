import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const AnalyticsInsights = () => {
    const module = MODULES.find(m => m.id === "analytics");
    return <ModulePageLayout module={module} />;
};

export default AnalyticsInsights;
