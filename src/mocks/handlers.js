import { rest } from 'msw'
import { randIp, randFullAddress, randDog, randUuid, randNumber, randPastDate } from '@ngneat/falso'

export const handlers = [
  rest.get('/api/login-record', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        status: 0,
        msg: '',
        data: {
          total: 80,
          items: Array.from(Array(randNumber({ min: 10, max: 20 })), () => ({
            device: randUuid(),
            device_type: randDog(),
            ip: randIp(),
            location: randFullAddress(),
            date: randPastDate(),
          })),
        },
      }),
    ),
  ),
]
