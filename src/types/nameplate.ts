/**
 * Nameplate content
 */
export type Nameplate = {
    name: string;
    position?: string;
};

/**
 * Type of the message to show a nameplate
 */
export type ShowNameplateMsg = {
    duration: number;
    data: Nameplate;
};
