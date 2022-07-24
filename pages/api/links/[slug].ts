import { Link, PrismaClient, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Error = {
  code: string;
  message: string;
};

const links = async (
  req: NextApiRequest,
  res: NextApiResponse<Link | Error>
) => {
  const slug = req.query['slug'];

  if (!slug || typeof slug !== 'string') {
    res.status(404).json({
      code: 'MISSING-BODY',
      message: 'Please use a slug',
    });

    return;
  }

  const link = await prisma.link.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!link) {
    res.status(404).json({
      code: 'NOT-FOUND',
      message: 'No link found',
    });

    return;
  }

  res.status(200).json(link);
};

export default links;
