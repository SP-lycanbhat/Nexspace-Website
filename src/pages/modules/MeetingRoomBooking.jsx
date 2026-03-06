import React from 'react';
import { MODULES } from '../../data/modules';
import { ModulePageLayout } from '../../components/ModulePageLayout';

const MeetingRoomBooking = () => {
    const module = MODULES.find(m => m.id === "rooms");
    return <ModulePageLayout module={module} />;
};

export default MeetingRoomBooking;
