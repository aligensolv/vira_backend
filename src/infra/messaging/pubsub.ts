import { redisPub, redisSub } from "../cache/redis.client"

type Handler<T> = (data: T) => void

class RedisPubSub {
  private handlers = new Map<string, Set<Handler<unknown>>>()
  private initialized = false

  constructor() {
    this.init()
  }

  private init() {
    if (this.initialized) return
    this.initialized = true

    redisSub.on("message", (channel, message) => {
      const channelHandlers = this.handlers.get(channel)
      if (!channelHandlers || channelHandlers.size === 0) return

      let parsed: unknown
      try {
        parsed = JSON.parse(message)
      } catch (err) {
        console.error("Invalid pubsub message:", err)
        return
      }

      channelHandlers.forEach(handler => {
        try {
          handler(parsed)
        } catch (err) {
          console.error("PubSub handler error:", err)
        }
      })
    })
  }

  async publish(channel: string, payload: unknown) {
    return redisPub.publish(channel, JSON.stringify(payload))
  }

  async subscribe<T>(channel: string, handler: Handler<T>) {
    if (!this.handlers.has(channel)) {
      this.handlers.set(channel, new Set())
      await redisSub.subscribe(channel)
    }

    this.handlers.get(channel)!.add(handler as Handler<T | unknown>)
  }

  async unsubscribe<T>(channel: string, handler: Handler<T>) {
    const handlers = this.handlers.get(channel)
    if (!handlers) return

    handlers.delete(handler as Handler<T | unknown>)

    if (handlers.size === 0) {
      this.handlers.delete(channel)
      await redisSub.unsubscribe(channel)
    }
  }
}

export const pubsub = new RedisPubSub()