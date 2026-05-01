/**
 * @fileoverview Utility functions for Firebase Analytics tracking.
 */
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

/**
 * Tracks a custom event in Firebase Analytics.
 * @param {string} action - The action being tracked (e.g., 'expand_timeline', 'quiz_completed').
 * @param {string} category - The category of the event (e.g., 'Timeline', 'Quiz', 'Chat').
 * @param {string} [label] - Optional label for further classification (e.g., specific timeline step ID).
 * @param {number} [value] - Optional numeric value associated with the event (e.g., quiz score).
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (analytics) {
    try {
      logEvent(analytics, action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } catch (e) {
      console.warn('Analytics logging failed', e);
    }
  }
};
