import { Link, PrismaClient, Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Error = {
  message: string;
};

interface FullLink extends Link {
  fullLink: string;
}

const links = async (
  req: NextApiRequest,
  res: NextApiResponse<FullLink | Error>
) => {
  // Handle the gathering a link.
  if (req.method === 'GET') {
    console.log(req);

    res.status(200).json({
      message: 'Coucou',
    });
  }

  // Handle the creation of a link.
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    if (!body.url || !body.slug) {
      res.status(400).json({
        message: 'Missing parameters',
      });
    }

    try {
      await prisma.link
        .create({
          data: {
            url: body.url,
            slug: body.slug,
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
            message: 'Slug already in use',
          });
        }
      }
    }
  }
};

export default links;
