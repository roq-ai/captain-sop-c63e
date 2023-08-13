import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { sopValidationSchema } from 'validationSchema/sops';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sop
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSopById();
    case 'PUT':
      return updateSopById();
    case 'DELETE':
      return deleteSopById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSopById() {
    const data = await prisma.sop.findFirst(convertQueryToPrismaUtil(req.query, 'sop'));
    return res.status(200).json(data);
  }

  async function updateSopById() {
    await sopValidationSchema.validate(req.body);
    const data = await prisma.sop.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSopById() {
    const data = await prisma.sop.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
