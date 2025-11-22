const sizes = {
  mobile: "576px",
  tablet: "768px",
  laptop: "992px",
  desktop: "1200px",
};

export const Device = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};

// Colores del tema
export const primaryColor = "#003459";
export const secondaryColor = "#007ea7";
export const accentColor = "#0095d8";
export const backgroundColor = "#f8f9fa";
export const successColor = "#28a745";
export const errorColor = "#dc3545";
export const warningColor = "#ffc107";