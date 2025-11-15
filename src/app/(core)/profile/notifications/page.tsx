"use client";

import React, { useState } from "react";
import TopSpacingWrapper from "@/components/top-spacing/TopSpacing";
import SubHeader from "@/components/navigation/SubHeader";
import { NotificationToggle } from "@/components/profile";

const NotificationsPage = () => {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);

  const handlePushNotificationToggle = (enabled: boolean) => {
    setPushNotificationsEnabled(enabled);
    // In production, save to backend
    console.log("Push notifications:", enabled ? "ON" : "OFF");
  };

  const handleEmailNotificationToggle = (enabled: boolean) => {
    setEmailNotificationsEnabled(enabled);
    // In production, save to backend
    console.log("Email notifications:", enabled ? "ON" : "OFF");
  };

  return (
    <TopSpacingWrapper>
      <SubHeader title="Notifications" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        <div className="space-y-4 md:space-y-5">
          {/* Push Notification Section */}
          <NotificationToggle
            title="Push Notification"
            description="Enable push notifications to receive the latest news, exclusive offers, and important alerts directly on your device. Never miss out—turn on notifications now for a more personalized experience!"
            isEnabled={pushNotificationsEnabled}
            onToggle={handlePushNotificationToggle}
          />

          {/* Email Section */}
          <NotificationToggle
            title="Email"
            description="Enable email notifications to stay informed about the latest news, special offers, and important updates. Get everything you need delivered straight to your inbox. Turn on email notifications for a seamless experience!"
            isEnabled={emailNotificationsEnabled}
            onToggle={handleEmailNotificationToggle}
          />
        </div>
      </div>
    </TopSpacingWrapper>
  );
};

export default NotificationsPage;

