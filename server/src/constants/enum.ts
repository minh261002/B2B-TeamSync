export const Provider = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  GITHUB: "github",
  EMAIL: "email",
}

export type ProviderType = keyof typeof Provider;