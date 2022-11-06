import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data: {
      name: 'Zé Pedro',
      email: 'ze.pedro@email.com',
      avatarUrl: 'https://github.com/guisaoncella.png',
    }
  })

  await prisma.user.create({
    data: {
      name: 'Deyverson',
      email: 'dey.verson@email.com',
      avatarUrl: 'https://github.com/guisaoncella.png',  
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,
      
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-07T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'DE',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-06T12:00:00.201Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()