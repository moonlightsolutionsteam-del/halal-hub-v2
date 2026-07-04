const CACHE_NAME = "halalhub-prayer-v1"

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener("message", (event) => {
  if (event.data?.type !== "SCHEDULE_PRAYER_NOTIFICATIONS") return
  const { prayers } = event.data

  self.registration.getNotifications().then((existing) => {
    existing.forEach((n) => n.close())
  })

  prayers.forEach(({ name, timestamp }) => {
    const delay = timestamp - Date.now()
    if (delay <= 0) return
    setTimeout(() => {
      self.registration.showNotification(`${name} Prayer Time`, {
        body: `It's time for ${name} prayer.`,
        icon: "/icon-192.png",
        tag: `prayer-${name}`,
        requireInteraction: false,
      })
    }, delay)
  })
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes("/prayer-times") && "focus" in client) return client.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow("/prayer-times")
    })
  )
})
