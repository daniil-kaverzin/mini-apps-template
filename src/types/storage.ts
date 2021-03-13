/**
 * List of keys, which can be placed into bridge storage
 */
export enum StorageFieldEnum {
  ONBOARDING_DISABLED = 'onboardingDisabled',
}

/**
 * Describes which bridge storage key has stated data type
 */
export interface StorageValuesMap {
  [StorageFieldEnum.ONBOARDING_DISABLED]: boolean;
}
