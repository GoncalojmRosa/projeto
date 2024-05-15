import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";

interface RequestWithApiKey extends FastifyRequest {
  headers: {
    apikey?: string;
  };
}

export async function authenticateApiKey(
  req: RequestWithApiKey,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) {
  const apiKey = req.headers.apikey;

  if (!apiKey) {
    res.status(401).send({ error: "Unauthorized: API key missing" });
    return;
  }
  if (apiKey !== process.env.PROTOTYPE_API_KEY) {
    res.status(401).send({ error: "Unauthorized: Invalid API key" });
    return;
  }
  next();
}
