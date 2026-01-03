import { out_prisma } from './prisma.connection';
import { Job } from 'bullmq';
import { createWorker } from './worker.factory';
import { pubsub } from '../../pubsub';

export interface SchedulerJobType {
  booking_id: number,
  action_type: 'activation' | 'expiration'
}


export async function startSchedulerWorker() {
  const worker = createWorker<SchedulerJobType, boolean>('scheduler', processor)
  return worker
}

async function processor(job: Job<SchedulerJobType>): Promise<boolean> {
  const { booking_id, action_type } = job.data

  if(action_type == 'activation') {
    await out_prisma.booking.update({
      where: {
        id: booking_id
      },
      data: {
        status: 'ACTIVE'
      }
    })
  } else if(action_type == 'expiration') {
    await out_prisma.booking.update({
      where: {
        id: booking_id
      },
      data: {
        status: 'COMPLETED'
      }
    })
  }

  pubsub.publish('booking:updated', { id: booking_id })

  return true
}