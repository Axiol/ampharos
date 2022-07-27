import { Link, PrismaClient, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

type Error = {
  code: string;
  message: string;
};

interface FullLink extends Link {
  fullLink: string;
}

const links = async (
  req: NextApiRequest,
  res: NextApiResponse<FullLink | Error>
) => {
  // Handle the creation of a link.
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    if (!body.url || !body.slug) {
      res.status(400).json({
        code: 'MISSING-BODY',
        message: 'Missing parameters',
      });

      return;
    }

    const session = await getSession({ req });

    if (!session || !session?.user?.id) {
      res.status(400).json({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized user',
      });

      return;
    }

    try {
      await prisma.link
        .create({
          data: {
            url: body.url,
            slug: body.slug,
            userId: session.user.id,
          },
        })
        .then((r) => {
          res
            .status(200)
            .json({ fullLink: `${process.env.HOME_URL}/l/${body.slug}`, ...r });
        });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          res.status(400).json({
            code: 'DUPLICATE',
            message: 'Slug already in use',
          });
        }
      }
    }
  }
};

export default links;
