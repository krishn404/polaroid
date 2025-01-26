export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: ReadonlyArray<string>
    readonly userChoice: Promise<{
      outcome: "accepted" | "dismissed"
      platform: string
    }>
    prompt(): Promise<void>
  }
  
  declare global {
    interface WindowEventMap {
      beforeinstallprompt: BeforeInstallPromptEvent
    }
  }